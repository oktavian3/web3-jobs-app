import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const baseUrl = process.env.KRAFT_AUDIT_BASE_URL ?? "http://127.0.0.1:3000";

// ─────────────────────────────────────────────────────────────────────────
// Static taxonomy + redirect validation (offline, no running server required).
// ─────────────────────────────────────────────────────────────────────────

const rolesSource = readFileSync(join(repoRoot, "data", "roles.ts"), "utf8");
const nextConfigSource = readFileSync(join(repoRoot, "next.config.ts"), "utf8");

// Role slugs: a `slug: "x",` line immediately followed by a `title: "..."` line
// identifies a role record (career-lane entries are followed by `difficulty:`).
const roleSlugs = [];
for (const match of rolesSource.matchAll(/slug:\s*"([^"]+)",\s*[\r\n]+\s*title:\s*"/g)) {
  roleSlugs.push(match[1]);
}
const roleSlugSet = new Set(roleSlugs);
const duplicateSlugs = roleSlugs.filter((slug, index) => roleSlugs.indexOf(slug) !== index);

// Related-role references must resolve to a canonical slug.
const unresolvedRelatedRoles = [];
for (const block of rolesSource.matchAll(/relatedRoleSlugs:\s*\[([^\]]*)\]/g)) {
  for (const slugMatch of block[1].matchAll(/"([^"]+)"/g)) {
    if (!roleSlugSet.has(slugMatch[1])) unresolvedRelatedRoles.push(slugMatch[1]);
  }
}

// Known static (non-dynamic) app routes, derived from the app directory.
function collectStaticRoutes(dir, prefix, routes) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("[") || name.startsWith("(") || name === "api") continue;
    const routePath = `${prefix}/${name}`;
    const childDir = join(dir, name);
    if (existsSync(join(childDir, "page.tsx"))) routes.add(routePath);
    collectStaticRoutes(childDir, routePath, routes);
  }
  return routes;
}
const staticRoutes = collectStaticRoutes(join(repoRoot, "app"), "", new Set(["/"]));

// Redirects declared in next.config.ts.
const redirects = [];
for (const match of nextConfigSource.matchAll(/\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*permanent:\s*true\s*\}/g)) {
  redirects.push({ source: match[1], destination: match[2] });
}
const redirectSources = new Set(redirects.map((r) => r.source));

function destinationResolves(dest) {
  const roleMatch = dest.match(/^\/roles\/([^/]+)$/);
  if (roleMatch) return roleSlugSet.has(roleMatch[1]);
  const portfolioMatch = dest.match(/^\/portfolio\/([^/]+)$/);
  if (portfolioMatch) return roleSlugSet.has(portfolioMatch[1]);
  return staticRoutes.has(dest);
}

const redirectLoops = redirects.filter((r) => r.source === r.destination);
const redirectChains = redirects.filter((r) => redirectSources.has(r.destination));
const unresolvedRedirectDestinations = redirects.filter((r) => !destinationResolves(r.destination));

const staticChecks = {
  roleSlugCount: roleSlugs.length,
  expectedRoleSlugCount: 42,
  roleSlugCountOk: roleSlugs.length === 42,
  duplicateSlugs,
  uniqueSlugsOk: duplicateSlugs.length === 0,
  unresolvedRelatedRoles,
  relatedRolesOk: unresolvedRelatedRoles.length === 0,
  redirectCount: redirects.length,
  redirectLoops,
  redirectChains,
  unresolvedRedirectDestinations,
  redirectsOk:
    redirectLoops.length === 0 &&
    redirectChains.length === 0 &&
    unresolvedRedirectDestinations.length === 0,
};

const staticOk =
  staticChecks.roleSlugCountOk &&
  staticChecks.uniqueSlugsOk &&
  staticChecks.relatedRolesOk &&
  staticChecks.redirectsOk;

// ─────────────────────────────────────────────────────────────────────────
// Best-effort HTTP link crawl (skipped automatically when no server is up).
// ─────────────────────────────────────────────────────────────────────────

const seedRoutes = [
  "/",
  "/roles",
  "/skill-check",
  "/glossary",
  "/roadmaps",
  "/interview-prep",
  "/portfolio",
  "/get-hired",
  "/learn-web3",
  "/job-boards",
  "/disclaimers",
  "/faq",
];

function absolute(path) {
  return new URL(path, baseUrl).toString();
}

function extractInternalLinks(html) {
  const links = new Set();
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href || href === "#" || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    const url = new URL(href, baseUrl);
    if (url.origin === baseUrl) links.add(`${url.pathname}${url.search}`);
  }
  return [...links];
}

async function readRoute(path) {
  const response = await fetch(absolute(path), { redirect: "manual" });
  const text = await response.text().catch(() => "");
  return { path, status: response.status, text };
}

let crawlSummary = { skipped: true, reason: "server not reachable", checkedRoutes: 0, failures: [], emptyHrefRoutes: [] };

try {
  await fetch(absolute("/"), { redirect: "manual" });
  const visited = new Map();
  const queue = [...seedRoutes];
  while (queue.length) {
    const path = queue.shift();
    if (!path || visited.has(path)) continue;
    const result = await readRoute(path);
    visited.set(path, result);
    if (result.status >= 400) continue;
    for (const link of extractInternalLinks(result.text)) {
      if (!visited.has(link) && !queue.includes(link)) queue.push(link);
    }
  }
  const failures = [...visited.values()].filter((r) => r.status >= 400).map((r) => ({ path: r.path, status: r.status }));
  const emptyHrefRoutes = [...visited.values()]
    .filter((r) => /href=""|href="#"/.test(r.text))
    .map((r) => r.path);
  crawlSummary = { skipped: false, checkedRoutes: visited.size, failures, emptyHrefRoutes };
} catch {
  // Server not running; static checks above still validate the taxonomy and redirects.
}

const summary = {
  baseUrl,
  static: staticChecks,
  staticOk,
  crawl: crawlSummary,
};

console.log(JSON.stringify(summary, null, 2));

const crawlFailed = !crawlSummary.skipped && (crawlSummary.failures.length > 0 || crawlSummary.emptyHrefRoutes.length > 0);
if (!staticOk || crawlFailed) {
  process.exitCode = 1;
}
