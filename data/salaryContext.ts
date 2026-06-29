import type { Role } from "./roles";
import { getRoleResearch, type SalaryEvidence, type SourceRef } from "./roleResearch";

export type SalaryContext = {
  summary: string;
  seniorityNotes: {
    entry: string;
    mid: string;
    senior: string;
  };
  employmentTypes: string[];
  payFactors: string[];
  tokenCompensationRisks: string[];
  salaryEvidence: SalaryEvidence[];
  sources: SourceRef[];
  salaryConfidence: "high" | "medium" | "low";
  lastReviewed: string;
  verifiedRange?: {
    min: number;
    max: number;
    currency: string;
    period: string;
    region: string;
    sourceName: string;
    sourceUrl: string;
    lastReviewed: string;
  };
};

export function getSalaryContext(role: Role): SalaryContext {
  const research = getRoleResearch(role.slug);
  return {
    summary:
      research?.salarySummary ??
      "No verified benchmark is currently available for this role. Compensation varies by location, seniority, company stage, employment structure, and token exposure.",
    seniorityNotes: {
      entry: "Entry roles are usually evaluated through reliability, clear communication, safety basics, and small proof-of-work samples.",
      mid: "Mid-level candidates are expected to own deliverables, explain trade-offs, and show repeatable systems or portfolio evidence.",
      senior: "Senior compensation depends on scope, leadership, risk ownership, domain depth, and measurable business or ecosystem impact.",
    },
    employmentTypes: role.mode === "No-code"
      ? ["Full-time", "Contractor", "Contributor", "Freelance", "Retainer"]
      : ["Full-time", "Contractor", "Contributor", "Grant-funded", "Freelance"],
    payFactors: [
      `Role lane: ${role.lane}`,
      `Seniority signal: ${role.level}`,
      "Local, regional, or global remote market",
      "Company stage, treasury health, and funding source",
      "Portfolio quality and evidence of past deliverables",
      "Timezone coverage, urgency, and responsibility for user or fund risk",
    ],
    tokenCompensationRisks: [
      "Token price can change sharply before vesting or payment.",
      "Locked or illiquid tokens should not be treated as guaranteed salary.",
      "Tax, legal, and reporting obligations can differ by country.",
      "High token-heavy offers may hide weak cash compensation or unclear runway.",
    ],
    salaryEvidence: research?.salaryEvidence ?? [],
    sources: research?.sources ?? [],
    salaryConfidence: research?.salaryConfidence ?? "low",
    lastReviewed: research?.lastReviewed ?? "2026-06-29",
  };
}
