export type JobBoard = {
  slug: string;
  name: string;
  url: string;
  bestFor: string;
  commonRoleTypes: string[];
  remoteSupport: "Strong" | "Mixed" | "Varies";
  salaryVisibility: "Often shown" | "Sometimes shown" | "Rarely shown" | "Varies";
  applicationStyle: string;
  lastReviewed: string;
  note: string;
};

export type EcosystemJobBoard = {
  slug: string;
  name: string;
  url: string;
  ecosystem: "TON" | "Arbitrum" | "Optimism" | "Base";
  sourceType: "Official ecosystem job board" | "Official core-team careers" | "Official ecosystem directory";
  bestFor: string;
  lastReviewed: string;
  note: string;
};

export const ecosystemJobBoards: EcosystemJobBoard[] = [
  {
    slug: "ton-jobs",
    name: "TON Jobs",
    url: "https://jobs.ton.org/jobs",
    ecosystem: "TON",
    sourceType: "Official ecosystem job board",
    bestFor: "Roles across companies building in the TON ecosystem.",
    lastReviewed: "2026-06",
    note: "Use the official board as a discovery source, then verify the hiring company and application domain.",
  },
  {
    slug: "arbitrum-jobs",
    name: "Arbitrum Jobs",
    url: "https://jobs.arbitrum.io/jobs",
    ecosystem: "Arbitrum",
    sourceType: "Official ecosystem job board",
    bestFor: "Openings from teams in the Arbitrum ecosystem.",
    lastReviewed: "2026-06",
    note: "Good for ecosystem-focused roles; still verify each company and listing freshness before applying.",
  },
  {
    slug: "optimism-jobs",
    name: "Optimism Jobs",
    url: "https://jobs.optimism.io/jobs",
    ecosystem: "Optimism",
    sourceType: "Official ecosystem job board",
    bestFor: "Optimism Collective and ecosystem opportunities.",
    lastReviewed: "2026-06",
    note: "Treat this as an ecosystem board, not a guarantee that every role is current or suitable.",
  },
  {
    slug: "base-jobs",
    name: "Base Jobs",
    url: "https://www.base.org/jobs",
    ecosystem: "Base",
    sourceType: "Official core-team careers",
    bestFor: "Base core-team roles published through the official Base site.",
    lastReviewed: "2026-06",
    note: "This is not a complete ecosystem aggregator. Use the Base ecosystem directory for broader company discovery.",
  },
  {
    slug: "base-ecosystem",
    name: "Base Ecosystem",
    url: "https://www.base.org/ecosystem",
    ecosystem: "Base",
    sourceType: "Official ecosystem directory",
    bestFor: "Finding Base ecosystem companies before checking their official career pages.",
    lastReviewed: "2026-06",
    note: "Use it to discover companies, then verify openings on each company's official careers page.",
  },
];

export const jobBoards: JobBoard[] = [
  { slug: "web3-career", name: "Web3.career", url: "https://web3.career/", bestFor: "Broad Web3 roles across technical and non-technical categories.", commonRoleTypes: ["Engineering", "Marketing", "Community", "Product"], remoteSupport: "Strong", salaryVisibility: "Often shown", applicationStyle: "External job links and direct listings", lastReviewed: "2026-06", note: "Useful filters and a large category range. Verify job freshness and company legitimacy." },
  { slug: "cryptojobslist", name: "CryptoJobsList", url: "https://cryptojobslist.com/", bestFor: "Remote crypto and Web3 roles, including entry and mid-level listings.", commonRoleTypes: ["Community", "Content", "Engineering", "BD"], remoteSupport: "Strong", salaryVisibility: "Sometimes shown", applicationStyle: "Listing pages with apply links", lastReviewed: "2026-06", note: "Good for broad browsing; compare listings with company channels before applying." },
  { slug: "cryptocurrency-jobs", name: "Cryptocurrency Jobs", url: "https://cryptocurrencyjobs.co/", bestFor: "Curated crypto-company openings across functions.", commonRoleTypes: ["Engineering", "Operations", "Marketing"], remoteSupport: "Mixed", salaryVisibility: "Sometimes shown", applicationStyle: "Curated listing feed", lastReviewed: "2026-06", note: "Useful for focused browsing; verify the current availability of each listing." },
  { slug: "remote3", name: "Remote3", url: "https://remote3.co/", bestFor: "Remote-first Web3 jobs and company listings.", commonRoleTypes: ["Remote", "Design", "Community", "Engineering"], remoteSupport: "Strong", salaryVisibility: "Varies", applicationStyle: "Remote listing directory", lastReviewed: "2026-06", note: "Good for remote search; review location and timezone requirements." },
  { slug: "useweb3", name: "UseWeb3 Jobs", url: "https://www.useweb3.xyz/jobs", bestFor: "Developer and ecosystem-oriented opportunities.", commonRoleTypes: ["Engineering", "DevRel", "Technical Writing"], remoteSupport: "Mixed", salaryVisibility: "Varies", applicationStyle: "Developer-focused listings", lastReviewed: "2026-06", note: "Best for technical candidates and builders." },
  { slug: "wellfound", name: "Wellfound", url: "https://wellfound.com/", bestFor: "Startup roles, including crypto and blockchain companies.", commonRoleTypes: ["Startup", "Product", "Growth", "Engineering"], remoteSupport: "Mixed", salaryVisibility: "Often shown", applicationStyle: "Profile-based startup applications", lastReviewed: "2026-06", note: "Useful for startup context, funding stage, and company profiles." },
  { slug: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/jobs/", bestFor: "General professional network with many Web3 companies and recruiters.", commonRoleTypes: ["All functions", "Recruiter outreach", "Company verification"], remoteSupport: "Varies", salaryVisibility: "Rarely shown", applicationStyle: "Network and ATS applications", lastReviewed: "2026-06", note: "Strong for company verification and outreach, but scam impersonation still exists." },
  { slug: "gitcoin", name: "Gitcoin", url: "https://www.gitcoin.co/", bestFor: "Grants, bounties, and ecosystem contribution opportunities.", commonRoleTypes: ["Contributor", "Open source", "Research", "Community"], remoteSupport: "Strong", salaryVisibility: "Varies", applicationStyle: "Bounties and grants", lastReviewed: "2026-06", note: "Better for proof-of-work and contributor paths than traditional employment only." },
  { slug: "laborx", name: "LaborX", url: "https://laborx.com/", bestFor: "Freelance and contract roles with crypto payment options.", commonRoleTypes: ["Freelance", "Design", "Development", "Writing"], remoteSupport: "Strong", salaryVisibility: "Sometimes shown", applicationStyle: "Freelance marketplace", lastReviewed: "2026-06", note: "Review scope, escrow, payment terms, and counterparty reputation carefully." },
  { slug: "defi-jobs", name: "DeFi Jobs", url: "https://defijobs.com/", bestFor: "Roles focused on decentralized finance teams and protocols.", commonRoleTypes: ["Research", "Engineering", "Product", "Growth"], remoteSupport: "Mixed", salaryVisibility: "Varies", applicationStyle: "Specialist listings", lastReviewed: "2026-06", note: "Useful for specialist research, growth, product, and engineering roles." },
  { slug: "crypto-careers", name: "Crypto Careers", url: "https://crypto-careers.com/", bestFor: "Crypto-focused job discovery and company browsing.", commonRoleTypes: ["Engineering", "Marketing", "Operations"], remoteSupport: "Varies", salaryVisibility: "Varies", applicationStyle: "Job and company browsing", lastReviewed: "2026-06", note: "Use as an additional source, not the only application channel." },
  { slug: "company-career-pages", name: "Company Career Pages", url: "https://www.linkedin.com/company/", bestFor: "Openings published directly by protocols, exchanges, infrastructure companies, and foundations.", commonRoleTypes: ["All functions", "Verified company roles"], remoteSupport: "Varies", salaryVisibility: "Varies", applicationStyle: "Direct applications through official domains", lastReviewed: "2026-06", note: "Often the most reliable source; verify through official domains and social channels." },
];

