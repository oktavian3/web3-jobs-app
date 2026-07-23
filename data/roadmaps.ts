import type { CareerLane } from "./roles";

export type Roadmap = {
  lane: CareerLane;
  slug: string;
  note: string;
  phases: { title: string; output: string; relatedTerms: string[] }[];
};

export const roadmaps: Roadmap[] = [
  { lane: "Community & Growth", slug: "community-growth", note: "Timelines vary by existing writing, community, and operations experience.", phases: [
    { title: "Learn wallet safety, protocol basics, and community operations", output: "Safety notes and FAQ map", relatedTerms: ["Seed Phrase", "Phishing", "Community Health"] },
    { title: "Create a moderation SOP and FAQ", output: "SOP with escalation rules", relatedTerms: ["Escalation", "Scam Check"] },
    { title: "Plan a two-week community activation", output: "Campaign calendar", relatedTerms: ["Campaign", "KPI"] },
    { title: "Write a weekly report and crisis response", output: "Report template and incident flow", relatedTerms: ["Postmortem", "Incident"] },
    { title: "Apply to contributor or junior community roles", output: "Portfolio page and targeted applications", relatedTerms: ["Proof of Work", "Application"] },
  ] },
  { lane: "Content & Marketing", slug: "content-marketing", note: "Publishing cadence matters less than sourced, useful examples.", phases: [
    { title: "Choose a clear topic lane and audience", output: "Audience note", relatedTerms: ["Campaign", "Primary Source"] },
    { title: "Study primary-source research workflow", output: "Source checklist", relatedTerms: ["Methodology", "Data Caveat"] },
    { title: "Publish three educational samples", output: "Three posts with notes", relatedTerms: ["Proof of Work", "Portfolio"] },
    { title: "Build one campaign brief and analytics report", output: "Campaign brief", relatedTerms: ["KPI", "Conversion"] },
    { title: "Create a compact portfolio and start targeted outreach", output: "Portfolio case study", relatedTerms: ["Outreach", "Case Study"] },
  ] },
  { lane: "Product & Operations", slug: "product-operations", note: "You can start with audits and checklists before owning shipped features.", phases: [
    { title: "Learn product, wallet, and transaction fundamentals", output: "Flow notes", relatedTerms: ["Wallet", "Transaction"] },
    { title: "Audit one Web3 user journey", output: "Journey audit", relatedTerms: ["User Journey", "Activation"] },
    { title: "Write a small PRD and prioritization rationale", output: "PRD", relatedTerms: ["Product Requirement", "Acceptance Criteria"] },
    { title: "Build a launch checklist or feedback taxonomy", output: "Ops system", relatedTerms: ["Launch Checklist", "Feedback Taxonomy"] },
    { title: "Apply with a case-study-led portfolio", output: "Case study", relatedTerms: ["Portfolio", "Case Study"] },
  ] },
  { lane: "Research & Data", slug: "research-data", note: "Depth comes from definitions, caveats, and repeatable methods.", phases: [
    { title: "Learn DeFi metrics and on-chain data limitations", output: "Metric glossary", relatedTerms: ["TVL", "Protocol Revenue"] },
    { title: "Analyze one protocol using primary sources", output: "Research notes", relatedTerms: ["Primary Source", "Methodology"] },
    { title: "Build one dashboard or spreadsheet model", output: "Dashboard or model", relatedTerms: ["Dashboard", "Cohort"] },
    { title: "Write a risk-aware research memo", output: "Memo with caveats", relatedTerms: ["Data Caveat", "Token Unlock"] },
    { title: "Publish methodology and apply to analyst roles", output: "Public research page", relatedTerms: ["Portfolio", "Application"] },
  ] },
  { lane: "Technical & Security", slug: "technical-security", note: "Working code, tests, audit notes, uptime evidence, and threat models matter more than tutorial screenshots.", phases: [
    { title: "Choose a chain and development stack", output: "Stack note", relatedTerms: ["Layer 1", "Testnet"] },
    { title: "Build and test a small contract or integration", output: "Repository", relatedTerms: ["Smart Contract", "SDK"] },
    { title: "Document failure states and security assumptions", output: "Threat notes", relatedTerms: ["Audit", "Access Control"] },
    { title: "Deploy a working testnet project", output: "Testnet demo", relatedTerms: ["Deployment", "Faucet"] },
    { title: "Publish the repository and technical write-up", output: "Technical case study", relatedTerms: ["Documentation", "Proof of Work"] },
  ] },
  { lane: "Creative", slug: "creative-design", note: "Creative proof should show decisions, constraints, and reusable systems.", phases: [
    { title: "Study wallet, transaction, and risk UX patterns", output: "UX pattern audit", relatedTerms: ["Token Approval", "Transaction"] },
    { title: "Redesign one real Web3 flow", output: "Wireframes", relatedTerms: ["User Journey", "Wallet"] },
    { title: "Build a small component system", output: "UI kit", relatedTerms: ["Design System", "Deliverable"] },
    { title: "Create a case study with decisions and trade-offs", output: "Case study", relatedTerms: ["Case Study", "Portfolio"] },
    { title: "Publish a focused portfolio and contact product teams", output: "Portfolio page", relatedTerms: ["Outreach", "Application"] },
  ] },
  { lane: "Governance, Legal & People", slug: "governance-legal-people", note: "Credible work in this lane depends on neutral writing, process clarity, source discipline, and careful risk boundaries.", phases: [
    { title: "Learn DAO, grants, compliance, and hiring vocabulary", output: "Vocabulary map and source list", relatedTerms: ["DAO", "Grant", "Contractor"] },
    { title: "Choose one operating surface", output: "Target role worksheet", relatedTerms: ["Governance Proposal", "Compliance", "Onboarding"] },
    { title: "Build a practical artifact", output: "Proposal digest, compliance checklist, or scorecard", relatedTerms: ["Deliverable", "Trial Task"] },
    { title: "Collect feedback from a real operator", output: "Revision notes", relatedTerms: ["Async Work", "Feedback Taxonomy"] },
    { title: "Apply with a source-backed case study", output: "Case study and targeted applications", relatedTerms: ["Portfolio", "Application"] },
  ] },
  { lane: "Trading & Finance Adjacent", slug: "trading-finance-adjacent", note: "This lane needs strong caveats, responsible framing, and clear separation between analysis and financial advice.", phases: [
    { title: "Learn market, liquidity, and wallet-behavior basics", output: "Metric glossary", relatedTerms: ["Liquidity", "Trading Volume", "Wallet"] },
    { title: "Pick a responsible analysis topic", output: "Research question and source list", relatedTerms: ["Primary Source", "Data Caveat"] },
    { title: "Build a dashboard, simulation, or tracker", output: "Working artifact", relatedTerms: ["Dashboard", "Token Unlock"] },
    { title: "Write caveats and risk notes", output: "Risk-aware memo", relatedTerms: ["Sybil", "Scam Check"] },
    { title: "Package the work for relevant roles", output: "Portfolio case study", relatedTerms: ["Proof of Work", "Case Study"] },
  ] },
];
