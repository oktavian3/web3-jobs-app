import type { CareerLane } from "./roles";

export type SkillSignal =
  | "community"
  | "growth"
  | "content"
  | "research"
  | "product"
  | "operations"
  | "technical"
  | "creative"
  | "foundation"
  | "readiness"
  | "all";

export type SkillQuestion = {
  id: number;
  question: string;
  signal: SkillSignal;
  weight: number;
};

export type LaneResult = {
  lane: CareerLane;
  signals: SkillSignal[];
  fit: string;
  nextTask: string;
};

export const skillQuestions: SkillQuestion[] = [
  { id: 1, question: "I enjoy explaining complex topics in simple language.", signal: "content", weight: 2 },
  { id: 2, question: "I stay calm when users are angry or confused.", signal: "community", weight: 2 },
  { id: 3, question: "I enjoy analyzing numbers, dashboards, or patterns.", signal: "research", weight: 2 },
  { id: 4, question: "I like turning vague problems into structured plans.", signal: "product", weight: 2 },
  { id: 5, question: "I enjoy building or debugging technical systems.", signal: "technical", weight: 2 },
  { id: 6, question: "I care about visual clarity and user experience.", signal: "creative", weight: 2 },
  { id: 7, question: "I prefer public-facing work and regular communication.", signal: "community", weight: 1 },
  { id: 8, question: "I can spend hours reading documentation or primary sources.", signal: "research", weight: 1 },
  { id: 9, question: "I enjoy writing posts, articles, scripts, or campaign copy.", signal: "content", weight: 2 },
  { id: 10, question: "I like coordinating people, timelines, and operational details.", signal: "product", weight: 1 },
  { id: 11, question: "I am comfortable learning code and technical concepts deeply.", signal: "technical", weight: 2 },
  { id: 12, question: "I notice when interfaces are confusing or inconsistent.", signal: "creative", weight: 2 },
  { id: 13, question: "I enjoy networking, outreach, and finding partnership opportunities.", signal: "growth", weight: 2 },
  { id: 14, question: "I can document work and report outcomes clearly.", signal: "operations", weight: 2 },
  { id: 15, question: "I would rather build proof than rely only on a certificate.", signal: "all", weight: 1 },
  { id: 16, question: "I understand basic wallet safety and never share seed phrases.", signal: "foundation", weight: 1 },
  { id: 17, question: "I can distinguish facts, opinions, and speculation.", signal: "research", weight: 2 },
  { id: 18, question: "I am willing to receive feedback and revise my work.", signal: "all", weight: 1 },
  { id: 19, question: "I prefer flexible, async work over heavily supervised work.", signal: "operations", weight: 1 },
  { id: 20, question: "I can show at least one relevant work sample today.", signal: "readiness", weight: 2 },
];

export const laneResults: LaneResult[] = [
  {
    lane: "Community & Growth",
    signals: ["community", "growth", "operations"],
    fit: "You may fit work that combines communication, trust, reporting, and relationship-building.",
    nextTask: "Create a moderation SOP or 30-day community plan.",
  },
  {
    lane: "Content & Marketing",
    signals: ["content", "growth", "research"],
    fit: "You may fit work that turns research into clear public communication and campaigns.",
    nextTask: "Publish a three-post educational series with source notes.",
  },
  {
    lane: "Product & Operations",
    signals: ["product", "operations", "foundation"],
    fit: "You may fit work that structures problems, coordinates delivery, and improves systems.",
    nextTask: "Write a small PRD or launch checklist for a Web3 user flow.",
  },
  {
    lane: "Research & Data",
    signals: ["research", "foundation", "readiness"],
    fit: "You may fit work that separates evidence from narrative and explains metric limits.",
    nextTask: "Compare two protocols and disclose the limitations of each metric.",
  },
  {
    lane: "Technical & Security",
    signals: ["technical", "foundation", "readiness"],
    fit: "You may fit work that builds, tests, debugs, and documents technical systems.",
    nextTask: "Build a small transaction UI or tested smart contract.",
  },
  {
    lane: "Creative & Design",
    signals: ["creative", "product", "content"],
    fit: "You may fit work that makes Web3 products clearer, safer, and more distinctive.",
    nextTask: "Redesign a risky token approval flow and explain your decisions.",
  },
  {
    lane: "Governance, Legal & People",
    signals: ["operations", "research", "foundation"],
    fit: "You may fit work that coordinates policy, proposals, people systems, grants, or education with careful documentation.",
    nextTask: "Write a governance digest, compliance checklist, or hiring scorecard.",
  },
  {
    lane: "Trading & Finance Adjacent",
    signals: ["research", "technical", "readiness"],
    fit: "You may fit work that studies markets, liquidity, wallet behavior, token economics, and risk.",
    nextTask: "Build a responsible dashboard, token model, or market-structure memo.",
  },
];
