// Structured compensation evidence register.
//
// ── Provenance ────────────────────────────────────────────────────────────
// The approved content package (DOCS/*) does NOT contain the referenced
// KRAFT_SALARY_AND_EVIDENCE_REGISTER.md, so no numeric ranges shipped with it.
// The ranges below were researched in July 2026 from public, citable sources and
// are attached as evidence records - the rendering layer still derives every
// number from this register, never from role copy (per KRAFT_IMPLEMENTATION_SPEC
// §"Salary evidence fields").
//
// ── What is and is not filled ─────────────────────────────────────────────
// 11 roles carry a PUBLISHED range, attached only where (a) a published source
// category genuinely matches the canonical role's actual work AND (b) the role
// carries at least Medium compensation confidence, which is the threshold
// /salary-methodology publishes for showing a number.
//
// 1 role (community-moderator) carries an OPERATOR-SUPPLIED figure instead: a
// monthly contributor stipend reported by KRAFT. It is a deliberate exception to
// (a) and (b) - the role is Low confidence and has no published source - so it
// is labelled "Reported stipend", attributed to an unverified operator
// observation with no source URL, and left monthly rather than annualised. The
// "Unverified" evidence badge beside it is therefore accurate, not contradictory.
//
// The remaining 30 roles (Ambassador Manager, Ecosystem Researcher, Grant
// Writer, NFT Generative Artist, and so on) have no role-specific figure at all,
// so they keep hasReliableRange: false and render the SB-03 no-range state. No
// figure is borrowed from an unrelated role and no figure is estimated.
//
// Every published range is advertised-posting data, not verified paid
// compensation, and is global/remote-inclusive rather than region-specific.
// Roles carry marketSalaryContext in addition, so a reader always gets a sense
// of scale even where no role-specific range exists.
//
// ── evidenceTier ──────────────────────────────────────────────────────────
// Derived conservatively from each role's APPROVED "Compensation and role risks"
// copy in DOCS/KRAFT_PUBLIC_ROLE_COPY.md: "Direct" where the approved copy states
// direct/role-specific evidence exists without hedging; "Adjacent" where it points
// to neighbouring occupations; "Broad market" where it relies on broad category
// evidence; "Unverified" otherwise. Two roles (backend-engineer,
// zk-engineer-cryptography-researcher) were raised from "Unverified" to
// "Broad market" because a broad-category source now exists for them - showing a
// number beside an "Unverified" badge would contradict itself.

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
  /** Replaces the default "advertised pay" sentence when the figure is not
   *  drawn from advertised postings (e.g. an operator observation). */
  note?: string;
  /** Heading above the figure. Defaults to the advertised-postings wording. */
  rangeLabel?: string;
};

/**
 * Whole-market scale, shown on every role page including the ones with no
 * role-specific range. Figures are the spread of advertised averages across the
 * 47 role categories tracked by the source, plus the widest individual postings.
 */
export const marketSalaryContext = {
  currency: "$",
  period: "year",
  categoriesTracked: 47,
  averagesMin: 65000,
  averagesMax: 200000,
  postingsMin: 40000,
  postingsMax: 350000,
  window: "December 2021 – July 2026",
  sourceLabel: "web3.career salary index",
  sourceUrl: "https://web3.career/web3-salaries",
  lastReviewed: "July 2026",
  body:
    "Across the role categories this index tracks, advertised averages sit between roughly $65,000 and $200,000 per year, with individual postings from about $40,000 to $350,000. This is whole-market scale from advertised roles - not a figure for this specific role, and not verified paid compensation.",
};

const GLOBAL_POSTINGS = "Global, remote-inclusive job postings";
const FULL_TIME = "Advertised full-time roles";
const REVIEWED = "July 2026";
const WINDOW = "Postings tracked December 2021 – July 2026";

type SourcedRange = {
  min: number;
  max: number;
  sourceLabel: string;
  sourceUrl?: string;
  /** Defaults to yearly advertised full-time postings; override per role. */
  period?: string;
  geography?: string;
  employmentModel?: string;
  reviewPeriod?: string;
  note?: string;
  rangeLabel?: string;
};

// Role-specific ranges. Each key maps a canonical KRAFT role to a published
// source category whose scope genuinely matches that role's work.
const sourcedRanges: Record<string, SourcedRange> = {
  // Contributor-tier stipend supplied by the KRAFT operator, not a published
  // index - labelled as an unverified observation and kept monthly, because
  // annualising a part-time stipend would imply a full-time salary.
  "community-moderator": {
    min: 300, max: 400,
    period: "month",
    sourceLabel: "KRAFT operator observation (unverified)",
    geography: "Not region-specific",
    employmentModel: "Part-time / contributor stipend, typically not full-time salaried",
    reviewPeriod: "Observed July 2026",
    rangeLabel: "Reported stipend (context, not a guarantee)",
    note:
      "This is a part-time contributor stipend reported by KRAFT, not a published index and not a full-time salary. It is shown monthly on purpose - moderator work is usually paid per shift, per rota, or as a flat monthly stipend, and rates move sharply with hours, timezone coverage, and region.",
  },
  "community-manager": {
    min: 50000, max: 180000,
    sourceLabel: "web3.career - Community Manager",
    sourceUrl: "https://web3.career/web3-salaries/community-manager",
  },
  "social-media-manager": {
    min: 46000, max: 200000,
    sourceLabel: "web3.career - Social Media",
    sourceUrl: "https://web3.career/web3-salaries/social-media",
  },
  "product-manager": {
    min: 115000, max: 260000,
    sourceLabel: "web3.career - Product Manager",
    sourceUrl: "https://web3.career/web3-salaries/product-manager",
  },
  "smart-contract-developer": {
    min: 60000, max: 250000,
    sourceLabel: "web3.career - Smart Contract Developer",
    sourceUrl: "https://web3.career/web3-salaries/smart-contract-developer",
  },
  "frontend-web3-developer": {
    min: 70000, max: 240000,
    sourceLabel: "web3.career - Front-end Developer",
    sourceUrl: "https://web3.career/web3-salaries/front-end-developer",
  },
  "backend-engineer": {
    min: 70000, max: 260000,
    sourceLabel: "web3.career - Backend Developer",
    sourceUrl: "https://web3.career/web3-salaries/backend-developer",
  },
  // NOTE: zk-engineer-cryptography-researcher is deliberately NOT given a range.
  // A source exists (web3.career "Cryptography", $80k–$300k) but the role carries
  // Low compensation confidence, and /salary-methodology states that Low shows
  // evidence context rather than a number. The broad "Cryptography" category is
  // also a weak match for this specific role.
  "web3-legal-compliance": {
    min: 95000, max: 280000,
    sourceLabel: "web3.career - Legal",
    sourceUrl: "https://web3.career/web3-salaries/legal",
  },
  "web3-hr-talent-acquisition": {
    min: 75000, max: 231000,
    sourceLabel: "web3.career - HR",
    sourceUrl: "https://web3.career/web3-salaries/hr",
  },
  "web3-product-designer": {
    min: 80000, max: 254000,
    sourceLabel: "web3.career - Design",
    sourceUrl: "https://web3.career/web3-salaries/design",
  },
  // Not tracked as its own category on the posting index; these two use a
  // recruiter salary guide cross-checked against a second published guide.
  "smart-contract-auditor": {
    min: 150000, max: 300000,
    sourceLabel: "CryptoRecruit 2026 guide, cross-checked with web3vacancy",
    sourceUrl: "https://www.cryptorecruit.com/news/crypto-salaries-in-2026-what-people-are-actually-making-and-why-its-complicated/",
  },
  "protocol-engineer": {
    min: 130000, max: 270000,
    sourceLabel: "CryptoRecruit 2026 guide, cross-checked with web3vacancy",
    sourceUrl: "https://www.cryptorecruit.com/news/crypto-salaries-in-2026-what-people-are-actually-making-and-why-its-complicated/",
  },
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
  // Raised from "Unverified": a broad-category posting source now exists.
  "backend-engineer": "Broad market",
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
  Object.entries(evidenceTierBySlug).map(([slug, evidenceTier]) => {
    const sourced = sourcedRanges[slug];
    if (!sourced) {
      return [slug, { slug, evidenceTier, hasReliableRange: false }];
    }
    return [
      slug,
      {
        slug,
        evidenceTier,
        hasReliableRange: true,
        range: { min: sourced.min, max: sourced.max, currency: "$", period: sourced.period ?? "year" },
        geography: sourced.geography ?? GLOBAL_POSTINGS,
        employmentModel: sourced.employmentModel ?? FULL_TIME,
        sourceLabel: sourced.sourceLabel,
        sourceUrl: sourced.sourceUrl,
        reviewPeriod: sourced.reviewPeriod ?? WINDOW,
        lastReviewed: REVIEWED,
        note: sourced.note,
        rangeLabel: sourced.rangeLabel,
      },
    ];
  })
);

export function getSalaryRecord(slug: string): SalaryRecord {
  return salaryRegister[slug] ?? { slug, evidenceTier: "Unverified", hasReliableRange: false };
}
