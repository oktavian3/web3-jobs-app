import type { Role } from "./roles";

export type PortfolioProject = {
  slug: string;
  targetRole: string;
  context: string;
  task: string;
  deliverable: string;
  constraints: string[];
  rubric: string[];
  presentation: string;
};

const projects: Array<[Role["slug"], string, string]> = [
  ["community-moderator", "Create a moderation SOP for scams, spam, harassment, and escalation.", "SOP document, escalation flow, and example responses."],
  ["community-manager", "Design a 30-day community plan for a protocol with low-quality engagement.", "Goals, calendar, metrics, and report template."],
  ["ambassador-manager", "Redesign an ambassador program that rewards useful output.", "Program tiers, rubric, anti-spam rules, and review process."],
  ["content-creator", "Create a three-post educational series about one protocol feature.", "Research notes, posts, visual direction, and performance hypothesis."],
  ["research-writer", "Analyze one protocol using primary sources and disclose limitations.", "1,000-1,500 word memo with sources."],
  ["social-media-manager", "Build a two-week content calendar for a product launch.", "Calendar, copy samples, asset list, and reporting plan."],
  ["product-manager", "Write a PRD for improving a wallet onboarding problem.", "Problem, users, scope, flows, and acceptance criteria."],
  ["product-operations", "Create a launch and incident-response checklist.", "Ownership matrix, checklist, escalation, and postmortem template."],
  ["ecosystem-bd", "Map and qualify 20 potential ecosystem partners.", "Research sheet, scoring, and three tailored outreach messages."],
  ["defi-analyst", "Compare two protocols with similar TVL.", "Metric table, risk analysis, and written conclusion."],
  ["on-chain-analyst", "Build a dashboard that measures real user retention.", "Query logic, dashboard, caveats, and interpretation."],
  ["tokenomics-analyst", "Model supply and unlock pressure for one token.", "Spreadsheet, chart, assumptions, and risk summary."],
  ["smart-contract-developer", "Build and test a small escrow or multisig-related contract.", "Repository, tests, deployment, and threat notes."],
  ["frontend-web3-developer", "Build a transaction UI with pending, rejection, failure, and success states.", "Working app, responsive UI, and documented states."],
  ["devrel", "Create a quick-start tutorial and sample integration.", "Tutorial, repository, and troubleshooting section."],
  ["ui-ux-designer", "Redesign a risky token approval flow.", "User flow, wireframes, final UI, rationale, and accessibility notes."],
  ["brand-motion-designer", "Create a distinctive mini campaign system without generic crypto cliches.", "Key visual, social templates, and 10-second motion sample."],
  ["technical-writer", "Rewrite a confusing quick-start guide and test every step.", "New information architecture, guide, and verified code examples."],
];

export const portfolioProjects: PortfolioProject[] = projects.map(([slug, task, deliverable]) => ({
  slug,
  targetRole: slug,
  context: "Use a real or realistic Web3 workflow. Name assumptions clearly and avoid inventing company outcomes.",
  task,
  deliverable,
  constraints: ["No private data", "No seed phrases or wallet secrets", "Use public sources", "Document assumptions"],
  rubric: ["Clear problem framing", "Role-relevant output", "Evidence and caveats", "Readable presentation", "Actionable next step"],
  presentation: "Turn the final work into a case study with context, decisions, output, limitations, and links.",
}));

