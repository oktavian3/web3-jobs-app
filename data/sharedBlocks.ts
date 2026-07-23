// Reusable public policy blocks (approved copy from DOCS/KRAFT_SHARED_CONTENT_BLOCKS.md).
// These are shared so policy reads consistently rather than being re-authored per role.

export const compensationEvidenceLegend = {
  id: "SB-02",
  title: "How to read compensation evidence",
  tiers: [
    { tier: "Direct", meaning: "Evidence from the same or a materially equivalent role." },
    { tier: "Adjacent", meaning: "Evidence from a neighbouring occupation, used only for context." },
    { tier: "Broad market", meaning: "Category-level Web3 or labour-market evidence." },
    { tier: "Unverified", meaning: "Estimates without enough source or methodology detail." },
  ],
  note: "Confidence reflects the quality and comparability of the evidence, not the value or legitimacy of the role.",
};

export const noReliableRange = {
  id: "SB-03",
  body:
    "KRAFT did not find a reliable role-specific range that meets the evidence standard. Compensation may still exist through salary, contract fees, retainers, grants, commissions, token or equity packages, creator revenue, or business economics. These models are described separately rather than compressed into an invented number.",
};

export const compensationVariables = {
  id: "SB-04",
  body:
    "Compensation can change materially by geography, seniority, employment model, company stage, market cycle, and the mix of cash, bonus, commission, equity, token, vesting, royalties, or fees. A published range is useful only when those dimensions match the role being considered.",
};
