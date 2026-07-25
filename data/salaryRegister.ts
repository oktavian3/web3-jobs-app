// Structured compensation evidence register.
//
// The approved content package (DOCS/*) contains NO numeric salary ranges, source URLs,
// geographies, or review dates for any role — the referenced salary-and-evidence register
// file is not part of the approved package. Per the salary rules, no figure is invented and
// nothing is filled from the legacy site. Every role therefore uses the no-reliable-range
// state (hasReliableRange: false) and the role guide shows compensation context, confidence,
// and evidence tier only (SB-03 / SB-04).
//
// The numeric and provenance fields below remain in the schema so an approved evidence
// record can be added later without changing the rendering layer.
//
// evidenceTier is derived conservatively from each role's APPROVED "Compensation and role
// risks" copy in DOCS/KRAFT_PUBLIC_ROLE_COPY.md (the only per-role evidence-quality signal in
// the package): a role is "Direct" only where the approved copy states direct/role-specific
// evidence exists without hedging it as limited/sparse; "Adjacent" where it points to
// neighbouring occupations; "Broad market" where it relies on broad category evidence; and
// "Unverified" otherwise.

import type { EvidenceTier } from "./roles";

export type SalaryRange = {
  min: number;
  max: number;
  currency: string;
  period: string;
};

export type SalaryRecord = {
  slug: string;
  evidenceTier: EvidenceTier;
  hasReliableRange: boolean;
  range?: SalaryRange;
  geography?: string;
  employmentModel?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  reviewPeriod?: string;
  lastReviewed?: string;
};

const evidenceTierBySlug: Record<string, EvidenceTier> = {
  "community-moderator": "Unverified",
  "community-manager": "Direct",
  "ambassador-manager": "Adjacent",
  "ecosystem-partnerships-manager": "Unverified",
  "creator-ambassador-partner": "Unverified",
  "partnerships-manager": "Broad market",
  "growth-manager": "Unverified",
  "content-creator": "Unverified",
  "research-writer": "Adjacent",
  "social-media-manager": "Direct",
  "crypto-journalist": "Adjacent",
  "product-marketing-manager": "Unverified",
  "product-manager": "Direct",
  "product-operations": "Adjacent",
  "technical-writer": "Direct",
  "operations-assistant": "Unverified",
  "operations-associate": "Direct",
  "customer-support-specialist": "Direct",
  "defi-analyst": "Adjacent",
  "protocol-researcher": "Unverified",
  "onchain-data-analyst": "Unverified",
  "tokenomics-analyst": "Adjacent",
  "tokenomics-designer": "Unverified",
  "ecosystem-researcher": "Adjacent",
  "smart-contract-developer": "Direct",
  "frontend-web3-developer": "Direct",
  "developer-relations": "Unverified",
  "smart-contract-auditor": "Direct",
  "node-operator-validator": "Unverified",
  "protocol-engineer": "Direct",
  "backend-engineer": "Unverified",
  "zk-engineer-cryptography-researcher": "Unverified",
  "governance-coordinator": "Unverified",
  "web3-legal-compliance": "Direct",
  "web3-hr-talent-acquisition": "Direct",
  "grant-writer": "Unverified",
  "web3-educator-curriculum-builder": "Unverified",
  "web3-product-designer": "Direct",
  "brand-designer": "Unverified",
  "motion-designer": "Unverified",
  "nft-generative-artist": "Unverified",
  "market-maker": "Broad market",
};

export const salaryRegister: Record<string, SalaryRecord> = Object.fromEntries(
  Object.entries(evidenceTierBySlug).map(([slug, evidenceTier]) => [
    slug,
    { slug, evidenceTier, hasReliableRange: false },
  ])
);

export function getSalaryRecord(slug: string): SalaryRecord {
  return salaryRegister[slug] ?? { slug, evidenceTier: "Unverified", hasReliableRange: false };
}
