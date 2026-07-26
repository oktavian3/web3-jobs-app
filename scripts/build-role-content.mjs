// Deterministically parse DOCS/KRAFT_PUBLIC_ROLE_COPY.md (approved canonical public copy)
// into a structured JSON dataset consumed by the role-detail experience.
//
// This keeps the app's role content faithful to the approved source (no paraphrasing,
// no manual transcription drift). Regenerate with: node scripts/build-role-content.mjs
//
// Output: data/roleContent.generated.json (keyed by canonical slug).

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");

const copyPath = join(repoRoot, "DOCS", "KRAFT_PUBLIC_ROLE_COPY.md");
const rolesPath = join(repoRoot, "data", "roles.ts");
const outPath = join(repoRoot, "data", "roleContent.generated.json");

const md = readFileSync(copyPath, "utf8");
const rolesSource = readFileSync(rolesPath, "utf8");

// ── canonical title → slug map (from the single source of truth) ──────────
const titleToSlug = new Map();
for (const m of rolesSource.matchAll(/slug:\s*"([^"]+)",\s*[\r\n]+\s*title:\s*"([^"]+)",/g)) {
  titleToSlug.set(m[2], m[1]);
}

// ── split into role blocks by "## N. Title" ───────────────────────────────
const headingRe = /^## \d+\.\s+(.+?)\s*$/gm;
const heads = [];
for (const m of md.matchAll(headingRe)) {
  heads.push({ title: m[1], index: m.index, end: m.index + m[0].length });
}

function paragraphize(lines) {
  // Join runs of non-blank content lines into paragraphs; drop bold-only header lines.
  const out = [];
  let buf = [];
  const flush = () => {
    if (buf.length) out.push(buf.join(" ").trim());
    buf = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^\*\*[^*]+\*\*$/.test(line)) { flush(); continue; } // standalone bold header
    if (/^- /.test(line)) { flush(); continue; }             // list item (handled elsewhere)
    buf.push(line);
  }
  flush();
  return out.filter(Boolean);
}

function listItems(lines) {
  const out = [];
  for (const raw of lines) {
    const m = raw.trim().match(/^- (.+?)\.?\s*$/);
    if (m) out.push(m[1].replace(/\s+$/, ""));
  }
  return out;
}

function sectionMap(block) {
  // Return { headingText: contentLines[] } for each "### heading".
  const lines = block.split(/\r?\n/);
  const sections = {};
  let current = null;
  let buf = [];
  const flush = () => { if (current !== null) sections[current] = buf; };
  for (const line of lines) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) { flush(); current = h[1]; buf = []; continue; }
    if (current !== null) buf.push(line);
  }
  flush();
  return { lines, sections };
}

function inlineLabels(lines) {
  // Parse "**Label:** text" paragraphs → [{ label, text }] (text may continue on
  // following non-blank lines until a blank line or the next label).
  const out = [];
  let cur = null;
  const flush = () => { if (cur) out.push({ label: cur.label, text: cur.text.join(" ").trim() }); cur = null; };
  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (m) { flush(); cur = { label: m[1], text: m[2] ? [m[2]] : [] }; continue; }
    if (!line) { flush(); continue; }
    if (cur) cur.text.push(line);
  }
  flush();
  return out;
}

function labeledBlocks(lines) {
  // Split lines into segments separated by standalone "**Header**" lines.
  // Returns { intro: string[], blocks: { [header]: string[] } }.
  const intro = [];
  const blocks = {};
  let currentHeader = null;
  for (const raw of lines) {
    const line = raw.trim();
    const h = line.match(/^\*\*([^*]+?)\*\*$/);
    if (h) { currentHeader = h[1]; blocks[currentHeader] = []; continue; }
    if (currentHeader === null) intro.push(raw);
    else blocks[currentHeader].push(raw);
  }
  return { intro, blocks };
}

function firstSummary(block) {
  const m = block.match(/^>\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "";
}

const records = {};
const problems = [];

for (let i = 0; i < heads.length; i++) {
  const start = heads[i].end;
  const end = i + 1 < heads.length ? heads[i + 1].index : md.length;
  const rawBlock = md.slice(start, end);
  const title = heads[i].title;
  const slug = titleToSlug.get(title);
  if (!slug) { problems.push(`No slug for title "${title}"`); continue; }

  const summary = firstSummary(rawBlock);
  const { sections } = sectionMap(rawBlock);
  const get = (name) => sections[name] ?? [];

  // Daily / weekly / reactive.
  const cadenceLabels = inlineLabels(get("Daily, weekly, and reactive work"));
  const cadence = { typicalDay: "", weekly: "", reactive: "" };
  for (const { label, text } of cadenceLabels) {
    if (/^Typical day/i.test(label)) cadence.typicalDay = text;
    else if (/^Weekly/i.test(label)) cadence.weekly = text;
    else if (/^When conditions change/i.test(label)) cadence.reactive = text;
  }

  // Success: list of signals + trailing caveat paragraph.
  const successLines = get("How success is judged");
  const successSignals = listItems(successLines);
  const successCaveat = paragraphize(successLines).join(" ");

  // Tools: "- **Name:** use case".
  const tools = [];
  for (const raw of get("Tools in practice")) {
    const m = raw.trim().match(/^- \*\*(.+?):\*\*\s*(.+?)\.?\s*$/);
    if (m) tools.push({ name: m[1].trim(), useCase: m[2].trim() });
  }

  // Skills.
  const skillLines = get("Skills and prerequisite knowledge");
  const skills = { hard: [], working: [], prerequisite: "" };
  {
    let mode = null;
    for (const raw of skillLines) {
      const line = raw.trim();
      if (/^\*\*Hard skills\*\*$/.test(line)) { mode = "hard"; continue; }
      if (/^\*\*Working skills\*\*$/.test(line)) { mode = "working"; continue; }
      const pk = line.match(/^\*\*Prerequisite knowledge:\*\*\s*(.*)$/);
      if (pk) { mode = "prereq"; skills.prerequisite = pk[1].trim(); continue; }
      const li = line.match(/^- (.+?)\.?\s*$/);
      if (li && mode === "hard") skills.hard.push(li[1].trim());
      else if (li && mode === "working") skills.working.push(li[1].trim());
      else if (mode === "prereq" && line) skills.prerequisite = `${skills.prerequisite} ${line}`.trim();
    }
  }

  // Levels.
  const levelLabels = inlineLabels(get("Expectations by level"));
  const levels = { entry: "", mid: "", senior: "" };
  for (const { label, text } of levelLabels) {
    if (/^Entry/i.test(label)) levels.entry = text;
    else if (/^Mid/i.test(label)) levels.mid = text;
    else if (/^Senior/i.test(label)) levels.senior = text;
  }

  // Proof.
  const proof = labeledBlocks(get("Proof of work and portfolio"));
  const proofIntro = paragraphize(proof.intro);
  const strongExamples = listItems(proof.blocks["Strong examples"] ?? []);
  const weakEvidence = listItems(proof.blocks["Weak evidence"] ?? []);

  // Mistakes.
  const mistakes = labeledBlocks(get("Common mistakes and misconceptions"));
  const commonMistakes = listItems(mistakes.blocks["Common mistakes"] ?? []);
  const misconKey = Object.keys(mistakes.blocks).find((k) => /^Common misconception/i.test(k));
  const commonMisconception = misconKey ? paragraphize(mistakes.blocks[misconKey]) : [];

  // Boundaries.
  const boundaries = labeledBlocks(get("Scope boundaries"));
  const usuallyOwns = listItems(boundaries.blocks["Usually owns"] ?? []);
  const usuallyDoesNotOwn = listItems(boundaries.blocks["Usually does not own"] ?? []);

  // Interview.
  const interview = labeledBlocks(get("Interview focus"));
  const interviewIntro = paragraphize(interview.intro);
  const exampleQuestions = listItems(interview.blocks["Example questions"] ?? []);

  // Compensation.
  const comp = labeledBlocks(get("Compensation and role risks"));
  const compensationIntro = paragraphize(comp.intro);
  const roleRisks = listItems(comp.blocks["Role risks"] ?? []);

  // Career.
  const career = labeledBlocks(get("Career path and role fit"));
  const progression = listItems(career.blocks["Common progression"] ?? []);
  const fitKey = Object.keys(career.blocks).find((k) => /^This role may fit/i.test(k));
  const nonFitKey = Object.keys(career.blocks).find((k) => /^This role may not fit/i.test(k));
  const fit = fitKey ? paragraphize(career.blocks[fitKey]) : [];
  const nonFit = nonFitKey ? paragraphize(career.blocks[nonFitKey]) : [];

  records[slug] = {
    slug,
    title,
    summary,
    whatItDoes: paragraphize(get("What this role actually does")),
    whereItSits: paragraphize(get("Where the role sits")),
    responsibilities: listItems(get("Core responsibilities")),
    cadence,
    deliverables: listItems(get("Deliverables")),
    successSignals,
    successCaveat,
    tools,
    hardSkills: skills.hard,
    workingSkills: skills.working,
    prerequisiteKnowledge: skills.prerequisite,
    levels,
    proofIntro,
    strongExamples,
    weakEvidence,
    commonMistakes,
    commonMisconception,
    usuallyOwns,
    usuallyDoesNotOwn,
    interviewIntro,
    exampleQuestions,
    compensationIntro,
    roleRisks,
    progression,
    fit,
    nonFit,
    nextSteps: listItems(get("Practical next steps")),
  };
}

// ── validation ────────────────────────────────────────────────────────────
const requiredNonEmpty = [
  "summary", "whatItDoes", "whereItSits", "responsibilities", "deliverables",
  "successSignals", "successCaveat", "tools", "hardSkills", "workingSkills",
  "prerequisiteKnowledge", "strongExamples", "weakEvidence", "commonMistakes",
  "commonMisconception", "usuallyOwns", "usuallyDoesNotOwn", "interviewIntro",
  "exampleQuestions", "compensationIntro", "roleRisks", "progression", "fit",
  "nonFit", "nextSteps",
];
const slugs = Object.keys(records);
for (const slug of slugs) {
  const r = records[slug];
  for (const field of requiredNonEmpty) {
    const v = r[field];
    const empty = v == null || (Array.isArray(v) ? v.length === 0 : String(v).trim() === "");
    if (empty) problems.push(`${slug}: empty field "${field}"`);
  }
  for (const k of ["typicalDay", "weekly", "reactive"]) {
    if (!r.cadence[k]) problems.push(`${slug}: empty cadence.${k}`);
  }
  for (const k of ["entry", "mid", "senior"]) {
    if (!r.levels[k]) problems.push(`${slug}: empty levels.${k}`);
  }
}

writeFileSync(outPath, JSON.stringify(records, null, 2) + "\n", "utf8");

console.log(JSON.stringify({
  parsedRoles: slugs.length,
  expected: 42,
  ok: slugs.length === 42 && problems.length === 0,
  problems,
}, null, 2));

if (slugs.length !== 42 || problems.length > 0) process.exitCode = 1;
