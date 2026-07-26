// Portfolio briefs, one per canonical role, built from the APPROVED role content
// (DOCS/KRAFT_PUBLIC_ROLE_COPY.md via roleContent) plus the approved portfolio page
// copy (KRAFT_PUBLIC_PAGE_COPY §13/§14) and shared block SB-06. Every brief is an
// explicitly simulated exercise; it never claims the user worked with a real protocol.

import { roles, type CareerLane } from "./roles";
import { getRoleContent } from "./roleContent";

export type PortfolioBrief = {
  slug: string;
  targetRole: string;
  roleTitle: string;
  lane: CareerLane;
  simulated: true;
  summary: string;
  scenario: string;
  objective: string;
  workflow: string[];
  deliverables: string[];
  constraints: string[];
  tools: { name: string; useCase: string }[];
  strongSubmission: string[];
  weakPatterns: string[];
  rubric: string[];
  caseStudy: string[];
  interviewQuestions: string[];
};

// Backwards-compatible alias for existing imports.
export type PortfolioProject = PortfolioBrief;

// Approved safety/ownership constraints (SB-06) applied to every simulated brief.
const BASE_CONSTRAINTS = [
  "Use only public sources or clearly simulated data.",
  "Never include seed phrases, private keys, or wallet secrets.",
  "Redact private user, company, security, legal, or compensation information.",
  "State every assumption you make.",
];

// Approved evaluation rubric (KRAFT_PUBLIC_PAGE_COPY §14).
const BASE_RUBRIC = [
  "Accuracy of claims and sources",
  "Relevance to the target role",
  "Decision quality and trade-offs",
  "Completeness of the deliverable",
  "Clarity of communication",
  "Honest limitations and next steps",
];

// Approved case-study packaging (KRAFT_PUBLIC_PAGE_COPY §14 + SB-06).
const BASE_CASE_STUDY = [
  "Explain the problem, sources, decisions, ownership, constraints, output, review, and what you would change.",
  "Show the final artifact before the process notes.",
  "State what you owned and what belonged to other people.",
  "Label the work as simulated, and keep any real contribution clearly separate.",
];

export const portfolioProjects: PortfolioBrief[] = roles.map((role) => {
  const content = getRoleContent(role.slug);
  const nextSteps = content?.nextSteps ?? [];
  const workflow = [
    ...nextSteps,
    "Review the result against the rubric, then package it as a case study.",
  ];
  return {
    slug: role.slug,
    targetRole: role.slug,
    roleTitle: role.title,
    lane: role.lane,
    simulated: true,
    summary: content?.summary ?? role.summary,
    scenario: `A simulated ${role.lane.toLowerCase()} exercise for ${role.title}. Treat it as realistic practice, not real client or protocol work.`,
    objective: nextSteps[0] ?? role.assignment,
    workflow,
    deliverables: content?.deliverables ?? role.expectedOutputs,
    constraints: BASE_CONSTRAINTS,
    tools: content?.tools ?? [],
    strongSubmission: content?.strongExamples ?? [],
    weakPatterns: content?.weakEvidence ?? [],
    rubric: BASE_RUBRIC,
    caseStudy: BASE_CASE_STUDY,
    interviewQuestions: content?.exampleQuestions ?? [],
  };
});

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
