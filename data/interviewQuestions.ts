import type { CareerLane } from "./roles";

export type InterviewQuestion = {
  lane: CareerLane;
  question: string;
  tests: string;
  weakPattern: string;
  strongStructure: string;
  selfReview: string[];
};

const bank: Record<CareerLane, string[]> = {
  "Community & Growth": [
    "How do you measure community health beyond total members and message count?",
    "How would you handle misinformation during a token or product incident?",
    "What should be included in a weekly community report?",
    "How would you redesign an ambassador program producing low-quality spam?",
    "When should community feedback become a product escalation?",
  ],
  "Content & Marketing": [
    "How do you verify technical or market claims before publishing?",
    "How would you explain a complex protocol to an audience that already knows basic crypto?",
    "How do you judge whether content performed well beyond impressions?",
    "How would you approach sponsored content without losing audience trust?",
    "What would you do when a campaign brief asks for claims you cannot verify?",
  ],
  "Product & Operations": [
    "How would you prioritize three urgent feature requests from different teams?",
    "What information belongs in a product requirement document?",
    "How would you improve a confusing wallet onboarding flow?",
    "How do you turn support tickets into structured product feedback?",
    "What should happen after a failed launch or major incident?",
  ],
  "Research & Data": [
    "Why can TVL growth be misleading?",
    "How would you separate organic activity from incentive farming?",
    "What limitations should be disclosed in an on-chain dashboard?",
    "How would you evaluate a token unlock schedule?",
    "Which primary sources would you use to research a protocol?",
  ],
  "Technical & Security": [
    "How would you test a contract before production deployment?",
    "What transaction states should a frontend communicate to users?",
    "How do you approach access control and upgradeability?",
    "How would you debug a developer integration problem?",
    "What makes documentation examples production-useful?",
  ],
  "Creative & Design": [
    "How would you design a safer transaction confirmation screen?",
    "How do you create a distinctive Web3 identity without generic crypto visuals?",
    "What belongs in a useful product design case study?",
    "How would you handle a design request that reduces clarity for visual impact?",
    "How do you maintain consistency when campaigns move quickly?",
  ],
  "Governance, Legal & People": [
    "How would you summarize a controversial governance proposal neutrally?",
    "What should be included in a contractor onboarding checklist?",
    "How do you communicate legal uncertainty without pretending to give final legal advice?",
    "What makes a grant proposal credible?",
    "How do you screen Web3 candidates using proof-of-work?",
  ],
  "Trading & Finance Adjacent": [
    "How do you separate organic activity from incentive farming?",
    "What caveats belong in a wallet-behavior investigation?",
    "How would you evaluate token unlock pressure?",
    "How do spreads change when liquidity thins out?",
    "How do you discuss airdrop opportunities without encouraging Sybil abuse?",
  ],
};

export const interviewQuestions: InterviewQuestion[] = Object.entries(bank).flatMap(([lane, questions]) =>
  questions.map((question) => ({
    lane: lane as CareerLane,
    question,
    tests: "Judgment, evidence quality, trade-off thinking, and role-specific communication.",
    weakPattern: "A vague answer that repeats Web3 buzzwords without naming a decision, constraint, or result.",
    strongStructure: "State the situation, name the risk, explain the decision, show the output, and close with what you learned.",
    selfReview: ["Did I name the actual constraint?", "Did I separate facts from assumptions?", "Did I include a concrete output or result?"],
  }))
);
