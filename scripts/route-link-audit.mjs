const baseUrl = process.env.KRAFT_AUDIT_BASE_URL ?? "http://127.0.0.1:3000";

const seedRoutes = [
  "/",
  "/roles",
  "/skill-check",
  "/glossary",
  "/roadmaps",
  "/interview-prep",
  "/portfolio",
  "/get-hired",
  "/bridge",
  "/resources",
  "/learn-web3",
  "/learn/creator",
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

const failures = [...visited.values()].filter((result) => result.status >= 400);
const emptyHrefRoutes = [...visited.values()]
  .filter((result) => /href=""|href="#"/.test(result.text))
  .map((result) => result.path);

const summary = {
  baseUrl,
  checkedRoutes: visited.size,
  failures,
  emptyHrefRoutes,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length || emptyHrefRoutes.length) {
  process.exitCode = 1;
}
