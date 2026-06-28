export type ToolInfo = {
  name: string;
  category: string;
  purpose: string;
  roleUsage: string;
  practicalExample: string;
  officialUrl?: string;
  learnResourceUrl?: string;
};

const toolSeed: ToolInfo[] = [
  {
    name: "Dune",
    category: "On-chain analytics",
    purpose: "Query and visualize on-chain data.",
    roleUsage: "Build dashboards for protocol activity, cohorts, wallet behavior, and campaign results.",
    practicalExample: "Create a dashboard that compares active wallets before and after a product launch.",
    officialUrl: "https://dune.com/",
    learnResourceUrl: "/learn-web3",
  },
  {
    name: "Discord",
    category: "Community operations",
    purpose: "Coordinate community conversations, moderation, events, and support workflows.",
    roleUsage: "Moderation, feedback collection, incident response, event hosting, and ambassador coordination.",
    practicalExample: "Document a scam escalation flow and pin a verified support FAQ.",
    officialUrl: "https://discord.com/",
  },
  {
    name: "Foundry",
    category: "Smart-contract development",
    purpose: "Develop, test, fuzz, and deploy Solidity smart contracts.",
    roleUsage: "Write unit tests, fuzz tests, deployment scripts, and reproducible security checks.",
    practicalExample: "Add fuzz tests for a withdrawal function and document assumptions.",
    officialUrl: "https://book.getfoundry.sh/",
    learnResourceUrl: "/learn-web3",
  },
  {
    name: "DefiLlama",
    category: "DeFi data",
    purpose: "Compare DeFi protocol metrics, TVL, fees, chains, and categories.",
    roleUsage: "Ground research, content, and market notes in public protocol data.",
    practicalExample: "Compare two protocols with similar TVL and explain why the headline number may mislead.",
    officialUrl: "https://defillama.com/",
  },
  {
    name: "Messari",
    category: "Research",
    purpose: "Research crypto protocols, sectors, markets, and narratives.",
    roleUsage: "Study report structure, sourcing, caveats, and market framing.",
    practicalExample: "Use a research memo structure to summarize one protocol thesis and risks.",
    officialUrl: "https://messari.io/",
  },
  {
    name: "Google Sheets",
    category: "Operations",
    purpose: "Model, track, and summarize structured information.",
    roleUsage: "Track applicants, campaigns, unlock schedules, partner lists, and weekly reports.",
    practicalExample: "Build a content calendar with status, source, owner, and performance fields.",
    officialUrl: "https://www.google.com/sheets/about/",
  },
  {
    name: "Notion",
    category: "Documentation",
    purpose: "Create shared docs, SOPs, calendars, and lightweight databases.",
    roleUsage: "Write role docs, project plans, content calendars, moderation SOPs, and research notes.",
    practicalExample: "Create a one-page SOP for recurring community incidents.",
    officialUrl: "https://www.notion.so/",
  },
  {
    name: "Telegram",
    category: "Community operations",
    purpose: "Run lightweight group communication and support channels.",
    roleUsage: "Community updates, moderation, local language support, and fast escalation.",
    practicalExample: "Prepare verified announcement templates and scam warning responses.",
    officialUrl: "https://telegram.org/",
  },
  {
    name: "Figma",
    category: "Design",
    purpose: "Design interfaces, flows, prototypes, and visual systems.",
    roleUsage: "Document wallet states, campaign assets, visual explainers, and product UX decisions.",
    practicalExample: "Prototype a transaction flow with pending, failed, rejected, and success states.",
    officialUrl: "https://www.figma.com/",
  },
  {
    name: "GitHub",
    category: "Development",
    purpose: "Host code, issues, documentation, and collaboration history.",
    roleUsage: "Review implementation, publish examples, inspect protocol code, and document technical proof.",
    practicalExample: "Publish a sample integration with a README and troubleshooting notes.",
    officialUrl: "https://github.com/",
  },
  {
    name: "X",
    category: "Distribution",
    purpose: "Publish short-form updates, threads, research notes, and creator content.",
    roleUsage: "Content distribution, source discovery, community listening, and creator portfolio visibility.",
    practicalExample: "Publish a sourced thread and save performance notes for a media kit.",
    officialUrl: "https://x.com/",
    learnResourceUrl: "/learn/creator",
  },
  {
    name: "Substack",
    category: "Publishing",
    purpose: "Publish newsletters, long-form essays, and audience updates.",
    roleUsage: "Package research, creator updates, and recurring educational content.",
    practicalExample: "Turn a protocol breakdown into a sourced article with caveats.",
    officialUrl: "https://substack.com/",
    learnResourceUrl: "/learn/creator",
  },
  {
    name: "Linear",
    category: "Product operations",
    purpose: "Track product issues, roadmaps, projects, and execution workflows.",
    roleUsage: "Manage product requirements, launch tasks, bugs, and follow-up ownership.",
    practicalExample: "Turn support themes into prioritized product issues with acceptance criteria.",
    officialUrl: "https://linear.app/",
  },
  {
    name: "Airtable",
    category: "Operations",
    purpose: "Create structured databases for programs, pipelines, and review workflows.",
    roleUsage: "Track ambassadors, partners, grants, content pipelines, or hiring stages.",
    practicalExample: "Build a partner scoring table with next action and owner fields.",
    officialUrl: "https://www.airtable.com/",
  },
  {
    name: "Snapshot",
    category: "Governance",
    purpose: "Run off-chain governance proposals and voting.",
    roleUsage: "Track proposals, summarize votes, and coordinate DAO governance updates.",
    practicalExample: "Prepare a neutral digest of active proposals and voting deadlines.",
    officialUrl: "https://snapshot.org/",
  },
];

export const tools = toolSeed;

export function getToolInfo(name: string) {
  const normalized = name.toLowerCase();
  return tools.find((tool) => tool.name.toLowerCase() === normalized);
}
