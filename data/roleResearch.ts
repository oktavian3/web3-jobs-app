import { roles, type Role } from "./roles";

export type EvidenceTier = "direct-web3" | "adjacent-occupation" | "listing-example" | "no-direct-benchmark";
export type SalaryConfidence = "high" | "medium" | "low";

export type SourceRef = {
  id: string;
  label: string;
  url: string;
  date: string;
  market: string;
  employmentType: string;
  confidence: SalaryConfidence;
  note: string;
};

export type SalaryEvidence = {
  tier: EvidenceTier;
  sourceId: string;
  summary: string;
  displayAmount?: string;
};

export type RoleResearch = {
  slug: string;
  title: string;
  lane: Role["lane"];
  level: Role["level"];
  mode: Role["mode"];
  summary: string;
  responsibilities: string[];
  deliverables: string[];
  mustHave: string[];
  tools: string[];
  proofOfWork: string[];
  interviewTopics: string[];
  salaryEvidence: SalaryEvidence[];
  salarySummary: string;
  salaryConfidence: SalaryConfidence;
  sources: SourceRef[];
  lastReviewed: string;
};

export const sourceRefs: Record<string, SourceRef> = {
  "W3-AGG": { id: "W3-AGG", label: "Web3.career salary aggregate", url: "https://web3.career/web3-salaries", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Listing-derived global Web3 benchmark; not a local guarantee." },
  "W3-SC": { id: "W3-SC", label: "Web3.career Smart Contract Developer Salary", url: "https://web3.career/web3-salaries/smart-contract-developer", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Direct smart-contract developer category benchmark." },
  "W3-CM": { id: "W3-CM", label: "Web3.career Community Manager Salary", url: "https://web3.career/web3-non-tech-salaries/community-manager", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Direct community-manager category benchmark; moderator and contributor variants can be lower." },
  "W3-MKT": { id: "W3-MKT", label: "Web3.career Marketing Salary", url: "https://web3.career/web3-non-tech-salaries/marketing", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Marketing category benchmark, not a guarantee for freelance creator income." },
  "W3-DES": { id: "W3-DES", label: "Web3.career Designer Salary", url: "https://web3.career/web3-non-tech-salaries/design", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Design category benchmark; freelance project pricing is separate." },
  "W3-LEGAL": { id: "W3-LEGAL", label: "Web3.career Legal Salary", url: "https://web3.career/web3-non-tech-salaries/legal", date: "2026-06", market: "Global Web3 listings", employmentType: "Full-time listings aggregate", confidence: "medium", note: "Legal category benchmark; licensing and jurisdiction are decisive." },
  "W3-SEC1": { id: "W3-SEC1", label: "ConsenSys Diligence Security Auditor listing", url: "https://web3.career/security-auditor-diligence-consensys/68031", date: "Historical listing", market: "US-linked Web3 listing", employmentType: "Individual listing example", confidence: "low", note: "Old or closed listing; use only as an example." },
  "W3-SEC2": { id: "W3-SEC2", label: "ConsenSys Security Auditor listing", url: "https://web3.career/security-auditor-consensys/53472", date: "Historical listing", market: "Web3 listing", employmentType: "Individual listing example", confidence: "low", note: "Old or closed listing; use only as an example." },
  "W3-ZK1": { id: "W3-ZK1", label: "ConsenSys / Linea Core ZK Engineer listing index", url: "https://web3.career/web3-companies/consensys%2Bsolidity", date: "Listing index", market: "Role-specific Web3 listing", employmentType: "Individual listing example", confidence: "low", note: "Role- and geography-specific listing example." },
  "W3-ZK2": { id: "W3-ZK2", label: "Nomos ZK Research Engineer listing index", url: "https://web3.career/web3-companies/nomos", date: "Listing index", market: "Role-specific Web3 listing", employmentType: "Individual listing example", confidence: "low", note: "Role- and geography-specific listing example." },
  "BLS-SW": { id: "BLS-SW", label: "U.S. BLS Software Developers", url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-SEC": { id: "BLS-SEC", label: "U.S. BLS Information Security Analysts", url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-WEB": { id: "BLS-WEB", label: "U.S. BLS Web Developers and Digital Designers", url: "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-WR": { id: "BLS-WR", label: "U.S. BLS Media and Communication Occupations", url: "https://www.bls.gov/ooh/media-and-communication/", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-PR": { id: "BLS-PR", label: "U.S. BLS Public Relations Specialists", url: "https://www.bls.gov/ooh/media-and-communication/public-relations-specialists.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-MRA": { id: "BLS-MRA", label: "U.S. BLS Market Research Analysts", url: "https://www.bls.gov/ooh/business-and-financial/market-research-analysts.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-FIN": { id: "BLS-FIN", label: "U.S. BLS Financial and Investment Analysts", url: "https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-OR": { id: "BLS-OR", label: "U.S. BLS Operations Research Analysts", url: "https://www.bls.gov/ooh/math/operations-research-analysts.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-HR": { id: "BLS-HR", label: "U.S. BLS Human Resources Specialists", url: "https://www.bls.gov/ooh/business-and-financial/human-resources-specialists.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-LAW": { id: "BLS-LAW", label: "U.S. BLS Lawyers", url: "https://www.bls.gov/ooh/legal/lawyers.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only; licensing varies by jurisdiction." },
  "BLS-TD": { id: "BLS-TD", label: "U.S. BLS Training and Development Specialists", url: "https://www.bls.gov/ooh/business-and-financial/training-and-development-specialists.htm", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
  "BLS-DES": { id: "BLS-DES", label: "U.S. BLS Arts and Design Occupations", url: "https://www.bls.gov/ooh/arts-and-design/", date: "2024", market: "United States", employmentType: "Occupational median", confidence: "medium", note: "Adjacent occupation only." },
};

const salaryGroups: Record<string, { summary: string; confidence: SalaryConfidence; evidence: SalaryEvidence[] }> = {
  community: {
    summary: "Direct Web3 community-manager benchmark exists, but moderator, ambassador, DAO contributor, and KOL work may be part-time, contractor, or campaign-based.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-CM", summary: "Community Manager category benchmark.", displayAmount: "Average about $80k; observed $40k-$180k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-PR", summary: "Public-relations occupation used as adjacent context only." },
    ],
  },
  content: {
    summary: "No verified direct benchmark for every content title. Use adjacent writing and marketing evidence as context, not a guaranteed salary for creator, journalist, grant, or research-writing work.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-MKT", summary: "Marketing category benchmark for salaried marketing roles.", displayAmount: "Average about $121k; observed $60k-$225k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-WR", summary: "Writing and media occupations used as adjacent context only." },
    ],
  },
  product: {
    summary: "Direct product-management evidence exists for PM roles. Product operations, technical writing, virtual assistant, and support-heavy roles should use adjacent context rather than inheriting PM pay.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-AGG", summary: "Product Manager category benchmark from Web3 listings.", displayAmount: "Product Manager average about $172k; observed $110k-$264k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-TD", summary: "Training, development, and project-adjacent occupation context only." },
    ],
  },
  research: {
    summary: "No verified direct benchmark for this exact title. Adjacent finance, investment, and operations-research evidence can provide context only.",
    confidence: "low",
    evidence: [
      { tier: "no-direct-benchmark", sourceId: "W3-AGG", summary: "No clean direct Web3 benchmark for this exact role title." },
      { tier: "adjacent-occupation", sourceId: "BLS-FIN", summary: "Financial and investment analyst occupation context only." },
      { tier: "adjacent-occupation", sourceId: "BLS-OR", summary: "Operations research analyst occupation context only." },
    ],
  },
  smartContract: {
    summary: "Direct smart-contract developer benchmark exists, but region, security responsibility, and protocol depth materially change compensation.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-SC", summary: "Smart Contract Developer category benchmark.", displayAmount: "Average $125k; observed $60k-$250k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-SW", summary: "Software developer occupation context only." },
    ],
  },
  technicalAdjacent: {
    summary: "No verified direct benchmark for this exact title. Use broader software, web, and training evidence as context only.",
    confidence: "low",
    evidence: [
      { tier: "no-direct-benchmark", sourceId: "W3-AGG", summary: "No clean direct Web3 benchmark for this exact role title." },
      { tier: "adjacent-occupation", sourceId: "BLS-SW", summary: "Software developer occupation context only." },
      { tier: "adjacent-occupation", sourceId: "BLS-WEB", summary: "Web developer and interface designer occupation context only." },
    ],
  },
  security: {
    summary: "No single reliable auditor benchmark. Historical Web3 listings are examples, while security occupation data is adjacent context.",
    confidence: "low",
    evidence: [
      { tier: "listing-example", sourceId: "W3-SEC1", summary: "Historical security-auditor listing example.", displayAmount: "Observed listing example around $85k-$150k." },
      { tier: "listing-example", sourceId: "W3-SEC2", summary: "Historical security-auditor listing example.", displayAmount: "Observed listing example around $80k-$200k." },
      { tier: "adjacent-occupation", sourceId: "BLS-SEC", summary: "Information-security analyst occupation context only." },
    ],
  },
  zk: {
    summary: "No robust aggregate benchmark. Treat ZK listings as small-sample examples, not a market range.",
    confidence: "low",
    evidence: [
      { tier: "listing-example", sourceId: "W3-ZK1", summary: "Core ZK Engineer listing example.", displayAmount: "Observed listing example around $168k-$187k." },
      { tier: "listing-example", sourceId: "W3-ZK2", summary: "ZK Research Engineer listing example.", displayAmount: "Observed listing example around $81k-$95k." },
      { tier: "adjacent-occupation", sourceId: "BLS-SW", summary: "Software developer occupation context only." },
    ],
  },
  design: {
    summary: "Design category evidence exists for full-time Web3 design listings. Freelance creative, NFT, and motion work should be priced separately by project or retainer.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-DES", summary: "Designer category benchmark.", displayAmount: "Average about $140k; observed $72k-$250k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-DES", summary: "Arts and design occupation context only." },
      { tier: "adjacent-occupation", sourceId: "BLS-WEB", summary: "Web and digital interface design context only." },
    ],
  },
  legal: {
    summary: "Legal category evidence exists for licensed counsel, but compliance and contractor roles need separate benchmarks and jurisdiction checks.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-LEGAL", summary: "Legal category benchmark.", displayAmount: "Average about $170k; observed about $118k-$280k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-LAW", summary: "Lawyer occupation context only; licensing varies by jurisdiction." },
    ],
  },
  hr: {
    summary: "Web3 HR aggregate data exists, but listing data may skew toward senior remote roles and should be compared with local HR scope.",
    confidence: "medium",
    evidence: [
      { tier: "direct-web3", sourceId: "W3-AGG", summary: "Web3 HR aggregate benchmark.", displayAmount: "Average around $132k; observed roughly $80k-$242k globally." },
      { tier: "adjacent-occupation", sourceId: "BLS-HR", summary: "Human-resources occupation context only." },
    ],
  },
  education: {
    summary: "No reliable Web3-specific benchmark. Education and DevRel-adjacent roles may price closer to training, technical writing, or software depending on scope.",
    confidence: "low",
    evidence: [
      { tier: "no-direct-benchmark", sourceId: "BLS-TD", summary: "Training and development occupation context only." },
      { tier: "adjacent-occupation", sourceId: "BLS-WR", summary: "Technical writing and media occupation context only." },
      { tier: "adjacent-occupation", sourceId: "BLS-SW", summary: "Software developer context only when the role is deeply technical." },
    ],
  },
};

function groupKey(role: Role) {
  if (["community-moderator", "community-manager", "ambassador-manager", "dao-governance-coordinator", "ambassador-kol"].includes(role.slug)) return "community";
  if (["content-creator", "research-writer", "social-media-manager", "technical-writer", "grant-writer", "crypto-journalist-writer"].includes(role.slug)) return "content";
  if (["product-manager", "product-operations", "web3-virtual-assistant"].includes(role.slug)) return "product";
  if (["defi-analyst", "on-chain-analyst", "tokenomics-analyst", "protocol-researcher", "blockchain-data-analyst", "tokenomics-designer", "airdrop-researcher-alpha-hunter", "market-maker"].includes(role.slug)) return "research";
  if (role.slug === "smart-contract-developer") return "smartContract";
  if (["frontend-web3-developer", "devrel", "node-operator-validator"].includes(role.slug)) return "technicalAdjacent";
  if (role.slug === "smart-contract-auditor") return "security";
  if (role.slug === "zk-engineer-cryptographer") return "zk";
  if (["ui-ux-designer", "brand-motion-designer", "nft-generative-artist", "web3-ui-ux-designer", "motion-designer"].includes(role.slug)) return "design";
  if (role.slug === "web3-legal-compliance") return "legal";
  if (role.slug === "web3-hr-talent-acquisition") return "hr";
  if (role.slug === "web3-educator-curriculum-builder") return "education";
  return "research";
}

export const roleResearch: RoleResearch[] = roles.map((role) => {
  const salary = salaryGroups[groupKey(role)];
  const sources = salary.evidence.map((item) => sourceRefs[item.sourceId]).filter(Boolean);
  return {
    slug: role.slug,
    title: role.title,
    lane: role.lane,
    level: role.level,
    mode: role.mode,
    summary: role.summary,
    responsibilities: role.dailyWork,
    deliverables: role.expectedOutputs,
    mustHave: role.mustHave,
    tools: role.tools,
    proofOfWork: role.proofOfWork,
    interviewTopics: role.interviewQuestions,
    salaryEvidence: salary.evidence,
    salarySummary: salary.summary,
    salaryConfidence: salary.confidence,
    sources,
    lastReviewed: "2026-06-29",
  };
});

export function getRoleResearch(slug: string) {
  return roleResearch.find((item) => item.slug === slug);
}
