// Skill Check result computation.
//
// Non-deterministic, guidance-only, self-reported. Raw scores exist only to rank
// lanes/roles internally and are never exposed publicly — results render as
// qualitative labels (Low/Medium/High confidence), per SB-18's approved phrases.
// No aptitude, personality, employability, or hiring-suitability claim is made.

import { skillQuestions, laneResults, type SkillSignal } from "./skillCheck";
import { roles, type CareerLane } from "./roles";
import { getRoleContent } from "./roleContent";
import { getPortfolioProjectBySlug } from "./portfolioProjects";
import { getInterviewSet } from "./interviewPrep";

export type ConfidenceLabel = "Low" | "Medium" | "High";
export type SkillCheckAnswers = Record<number, number>;

// Session-only storage key. Answers and results are never persisted beyond the
// current browser session (sessionStorage clears on tab/window close), matching
// the approved stateless-session claim (SB-12).
export const SKILL_CHECK_RESULT_KEY = "kraft-skill-check-result";

export type RoleSummary = { slug: string; title: string };
export type LaneMatch = { lane: CareerLane; fit: string; roles: RoleSummary[] };

export type NextEvidence = {
  roleTitle: string;
  roleHref: string;
  portfolioHref?: string;
  prerequisite?: string;
  interviewHref: string;
};

export type SkillCheckResult = {
  confidence: ConfidenceLabel;
  readiness: ConfidenceLabel;
  possibleMatch: LaneMatch;
  alternativeMatches: LaneMatch[];
  strengths: string[];
  gaps: string[];
  missingEvidence: string[];
  nextEvidence: NextEvidence;
};

// Plain-language description of what each signal reflects, grounded in the
// question text — used for "why this appeared," never as a trait label about the person.
const signalDescriptions: Record<SkillSignal, string> = {
  community: "public communication and calm judgment under pressure",
  growth: "outreach, networking, and finding partnership opportunities",
  content: "explaining complex topics clearly in writing",
  research: "reading primary sources and separating fact from speculation",
  product: "structuring vague problems and coordinating delivery",
  operations: "documenting work and reporting outcomes clearly",
  technical: "building or debugging technical systems",
  creative: "visual clarity and consistent user experience",
  foundation: "basic wallet-safety knowledge",
  readiness: "having a work sample to show today",
  all: "general work habits such as feedback and proof-first thinking",
};

function emptyScores(): Record<SkillSignal, number> {
  return { community: 0, growth: 0, content: 0, research: 0, product: 0, operations: 0, technical: 0, creative: 0, foundation: 0, readiness: 0, all: 0 };
}

function computeSignalScores(answers: SkillCheckAnswers) {
  const values = emptyScores();
  skillQuestions.forEach((item) => {
    const answer = answers[item.id] ?? 0;
    values[item.signal] += answer * item.weight;
  });
  return values;
}

function computeLaneScores(signalScores: Record<SkillSignal, number>) {
  return laneResults.map((result) => ({
    result,
    score: result.signals.reduce((sum, signal) => sum + signalScores[signal], 0),
  }));
}

function confidenceFromGap(top: number, second: number): ConfidenceLabel {
  if (top <= 0) return "Low";
  const gapRatio = (top - second) / top;
  if (gapRatio > 0.25) return "High";
  if (gapRatio > 0.1) return "Medium";
  return "Low";
}

function readinessLabelFrom(signalScores: Record<SkillSignal, number>): ConfidenceLabel {
  // Foundation (max 5) + readiness (max 10, weight 2) + "all" signal questions (max 10).
  const raw = signalScores.foundation + signalScores.readiness + signalScores.all;
  const ratio = raw / 25;
  if (ratio >= 0.7) return "High";
  if (ratio >= 0.4) return "Medium";
  return "Low";
}

function pickRolesForLane(lane: CareerLane, readiness: ConfidenceLabel, count = 3): RoleSummary[] {
  const laneRoles = roles.filter((role) => role.lane === lane);
  const levelOrder =
    readiness === "High"
      ? ["Advanced", "Mid", "Entry to mid", "Entry-friendly"]
      : readiness === "Low"
        ? ["Entry-friendly", "Entry to mid", "Mid", "Advanced"]
        : ["Entry to mid", "Mid", "Entry-friendly", "Advanced"];
  return [...laneRoles]
    .sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level))
    .slice(0, count)
    .map((role) => ({ slug: role.slug, title: role.title }));
}

function topSignalsForLane(lane: CareerLane, signalScores: Record<SkillSignal, number>, laneSignals: SkillSignal[]) {
  return [...laneSignals].sort((a, b) => signalScores[b] - signalScores[a]);
}

export function computeSkillCheckResult(answers: SkillCheckAnswers): SkillCheckResult {
  const signalScores = computeSignalScores(answers);
  const ranked = computeLaneScores(signalScores).sort((a, b) => b.score - a.score);
  const readiness = readinessLabelFrom(signalScores);

  const [top, second] = ranked;
  const confidence = confidenceFromGap(top.score, second?.score ?? 0);

  const topSignals = topSignalsForLane(top.result.lane, signalScores, top.result.signals);
  const strengths = topSignals.slice(0, 2).map((s) => signalDescriptions[s]);
  const gaps = topSignals.slice(-1).map((s) => signalDescriptions[s]);

  const missingEvidence: string[] = [
    "This result is based only on the answers you gave and may miss real experience the assessment did not ask about.",
  ];
  if (signalScores.readiness < 6) {
    missingEvidence.push("No current work sample was confirmed — treat this as a starting point, not proof of fit.");
  }
  if (signalScores.foundation < 3) {
    missingEvidence.push("Basic wallet-safety knowledge was not confirmed — review Web3 foundations before assuming lane fit.");
  }

  const possibleMatch: LaneMatch = {
    lane: top.result.lane,
    fit: top.result.fit,
    roles: pickRolesForLane(top.result.lane, readiness),
  };
  const alternativeMatches: LaneMatch[] = ranked
    .slice(1, 3)
    .map(({ result }) => ({ lane: result.lane, fit: result.fit, roles: pickRolesForLane(result.lane, readiness, 2) }));

  const topRole = possibleMatch.roles[0];
  const roleContent = topRole ? getRoleContent(topRole.slug) : undefined;
  const portfolio = topRole ? getPortfolioProjectBySlug(topRole.slug) : undefined;
  const interviewSet = topRole ? getInterviewSet(topRole.slug) : undefined;

  const nextEvidence: NextEvidence = {
    roleTitle: topRole?.title ?? possibleMatch.lane,
    roleHref: topRole ? `/roles/${topRole.slug}` : `/roles?lane=${encodeURIComponent(possibleMatch.lane)}`,
    portfolioHref: portfolio ? `/portfolio/${portfolio.slug}` : undefined,
    prerequisite: roleContent?.prerequisiteKnowledge,
    interviewHref: interviewSet ? `/interview-prep?role=${interviewSet.slug}` : "/interview-prep",
  };

  return { confidence, readiness, possibleMatch, alternativeMatches, strengths, gaps, missingEvidence, nextEvidence };
}
