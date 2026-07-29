// Interview practice built from APPROVED role content: the role-specific example
// questions and "Interview focus" text (DOCS/KRAFT_PUBLIC_ROLE_COPY.md via roleContent),
// plus the approved general answer framework (KRAFT_PUBLIC_PAGE_COPY §15).
//
// No fabricated "perfect answers". Frameworks and follow-ups are general practice
// scaffolding, clearly labelled - never presented as a memorizable script or as a
// universal interview process. Each role carries only its approved questions; roles
// with thin coverage are reported rather than padded with invented question banks.

import { roles, type CareerLane } from "./roles";
import { getRoleContent } from "./roleContent";

export type InterviewCategory =
  | "Role fundamentals"
  | "Execution"
  | "Judgment"
  | "Portfolio"
  | "Role boundary";

export type RoleInterviewQuestion = {
  question: string;
  category: InterviewCategory;
};

export type RoleInterviewSet = {
  slug: string;
  roleTitle: string;
  lane: CareerLane;
  whatItTests: string[];
  questions: RoleInterviewQuestion[];
  weakPatterns: string[];
  questionCount: number;
};

export const interviewCategories: InterviewCategory[] = [
  "Role fundamentals",
  "Execution",
  "Judgment",
  "Portfolio",
  "Role boundary",
];

// Approved general guidance (KRAFT_PUBLIC_PAGE_COPY §15). Presented as a framework to
// reason with, not an answer to memorize.
export const interviewFramework = {
  strongAnswer: [
    "Use a real example.",
    "Explain the context and what you owned.",
    "Make the trade-offs visible.",
    "State the limitations.",
    "Connect the action to a result.",
  ],
  weakAnswer: [
    "Repeating jargon without specifics.",
    "Avoiding concrete examples.",
    "Claiming team outcomes as personal work.",
    "Presenting tools or follower counts as competence.",
  ],
  selfReview: ["Clarity", "Relevance", "Evidence", "Decision quality", "Boundaries", "Learning"],
  commonFollowUps: ["Can you give a concrete example?", "What would you do differently next time?"],
};

function categorize(question: string): InterviewCategory {
  const q = question.toLowerCase();
  if (/where .*(stop|begin)|boundary|overlap|walk away|proceed or stop|reject|too risky to share/.test(q)) return "Role boundary";
  if (/walk me through|portfolio|case study|show me your/.test(q)) return "Portfolio";
  if (/what do you do|how would you (handle|respond)|what would you do|first .*minutes|a scam|missing|responds? when|when .*(occurs|happens)|should happen|should exist before/.test(q)) return "Execution";
  if (/how do you (decide|choose|evaluate|interpret|measure|verify|separate|prove)|^why|would you|what evidence|what makes|what could|how would you measure/.test(q)) return "Judgment";
  return "Role fundamentals";
}

export const interviewSets: RoleInterviewSet[] = roles.map((role) => {
  const content = getRoleContent(role.slug);
  const questions = (content?.exampleQuestions ?? []).map((question) => ({
    question,
    category: categorize(question),
  }));
  return {
    slug: role.slug,
    roleTitle: role.title,
    lane: role.lane,
    whatItTests: content?.interviewIntro ?? [],
    questions,
    weakPatterns: content?.weakEvidence ?? [],
    questionCount: questions.length,
  };
});

export function getInterviewSet(slug: string) {
  return interviewSets.find((set) => set.slug === slug);
}

// Roles whose approved question set is below this bar are surfaced as "thin coverage".
export const THIN_COVERAGE_THRESHOLD = 3;
export const thinCoverageRoles = interviewSets
  .filter((set) => set.questionCount < THIN_COVERAGE_THRESHOLD)
  .map((set) => set.slug);
