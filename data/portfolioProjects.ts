import { roles, type Role } from "./roles";

export type PortfolioProject = {
  slug: string;
  targetRole: string;
  title: string;
  context: string;
  task: string;
  deliverable: string;
  constraints: string[];
  executionPlan: string[];
  tools: string[];
  rubric: string[];
  caseStudyPackaging: string[];
  checklist: string[];
  presentation: string;
};

function titleFor(role: Role) {
  return `${role.title} proof-of-work brief`;
}

function deliverableFor(role: Role) {
  return role.expectedOutputs.slice(0, 4).join(", ");
}

function executionPlanFor(role: Role) {
  return [
    `Define the ${role.title.toLowerCase()} scenario, audience, and assumptions.`,
    "Collect public sources, examples, constraints, and any definitions needed to avoid guesswork.",
    `Create the core deliverable: ${deliverableFor(role)}.`,
    "Review the work against the rubric and add caveats, decisions, and next-step notes.",
    "Package the result as a concise case study with links, screenshots, or artifacts where useful.",
  ];
}

function rubricFor(role: Role) {
  return Array.from(
    new Set([
      "Clear problem framing",
      "Role-relevant output",
      "Evidence and caveats",
      "Readable presentation",
      "Actionable next step",
      ...role.mustHave.slice(0, 3),
    ])
  );
}

function checklistFor(role: Role) {
  return [
    "All assumptions are named.",
    "No private data, seed phrases, or wallet secrets are included.",
    "Sources are linked or described clearly.",
    `The deliverable matches ${role.title} expectations.`,
    "The case study explains what you would improve next.",
  ];
}

export const portfolioProjects: PortfolioProject[] = roles.map((role) => ({
  slug: role.slug,
  targetRole: role.slug,
  title: titleFor(role),
  context: `Use a real or realistic ${role.lane.toLowerCase()} workflow. ${role.summary}`,
  task: role.assignment,
  deliverable: deliverableFor(role),
  constraints: ["No private data", "No seed phrases or wallet secrets", "Use public sources", "Document assumptions"],
  executionPlan: executionPlanFor(role),
  tools: role.tools,
  rubric: rubricFor(role),
  caseStudyPackaging: [
    "Start with the problem, role context, and why the work matters.",
    "Show the final artifact before process notes.",
    "Explain three to five decisions, trade-offs, or definitions.",
    "Add a short limitations section and a next-iteration plan.",
    "Close with links, screenshots, source notes, or a downloadable artifact when available.",
  ],
  checklist: checklistFor(role),
  presentation: "Turn the final work into a case study with context, decisions, output, limitations, and links.",
}));

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
