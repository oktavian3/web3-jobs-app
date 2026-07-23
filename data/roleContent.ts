// Typed accessor for the approved role content generated from
// DOCS/KRAFT_PUBLIC_ROLE_COPY.md via scripts/build-role-content.mjs.
// Do not edit the generated JSON by hand; regenerate from the canonical source.

import generated from "./roleContent.generated.json";

export type RoleTool = {
  name: string;
  useCase: string;
};

export type RoleCadence = {
  typicalDay: string;
  weekly: string;
  reactive: string;
};

export type RoleLevels = {
  entry: string;
  mid: string;
  senior: string;
};

export type RoleContent = {
  slug: string;
  title: string;
  summary: string;
  whatItDoes: string[];
  whereItSits: string[];
  responsibilities: string[];
  cadence: RoleCadence;
  deliverables: string[];
  successSignals: string[];
  successCaveat: string;
  tools: RoleTool[];
  hardSkills: string[];
  workingSkills: string[];
  prerequisiteKnowledge: string;
  levels: RoleLevels;
  proofIntro: string[];
  strongExamples: string[];
  weakEvidence: string[];
  commonMistakes: string[];
  commonMisconception: string[];
  usuallyOwns: string[];
  usuallyDoesNotOwn: string[];
  interviewIntro: string[];
  exampleQuestions: string[];
  compensationIntro: string[];
  roleRisks: string[];
  progression: string[];
  fit: string[];
  nonFit: string[];
  nextSteps: string[];
};

export const roleContentBySlug = generated as Record<string, RoleContent>;

export function getRoleContent(slug: string): RoleContent | undefined {
  return roleContentBySlug[slug];
}

export const roleContentSlugs = Object.keys(roleContentBySlug);

// Employment models are derived from each role's APPROVED "Where the role sits" and
// "Compensation and role risks" copy (which names them explicitly), so the directory
// filter uses structured, source-grounded values rather than invented tags.
const EMPLOYMENT_MODEL_KEYWORDS: { label: string; test: RegExp }[] = [
  { label: "Full-time", test: /full-time|core-team/i },
  { label: "Contract", test: /\bcontract(or|ors|s|-based)?\b/i },
  { label: "Freelance", test: /freelance/i },
  { label: "Agency", test: /agenc(y|ies)/i },
  { label: "Contributor", test: /contributor/i },
  { label: "Part-time", test: /part-time/i },
  { label: "Retainer", test: /retainer/i },
  { label: "Grant-funded", test: /\bgrant(s|-funded)?\b/i },
];

export function getEmploymentModels(slug: string): string[] {
  const content = roleContentBySlug[slug];
  if (!content) return [];
  const text = [...content.whereItSits, ...content.compensationIntro].join(" ");
  return EMPLOYMENT_MODEL_KEYWORDS.filter(({ test }) => test.test(text)).map(({ label }) => label);
}
