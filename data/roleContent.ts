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
