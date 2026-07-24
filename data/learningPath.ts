// Structured learning records for Learn Web3.
// Connects: Web3 foundations -> career lane -> canonical role -> role-specific
// foundations/tools -> proof-of-work -> roadmap milestones -> applications.
//
// External resources are third-party material KRAFT curates, not content KRAFT
// authors or maintains. No completion time, mastery guarantee, or outcome beyond
// what the resource itself supports is claimed.

import { roles, type CareerLane } from "./roles";

export type LearningLane = CareerLane | "Foundations";
export type LearningLevel = "Beginner" | "Intermediate" | "Advanced";
export type LearningType = "Guide" | "Docs" | "Course" | "Tool" | "Community";

export type LearningItem = {
  slug: string;
  title: string;
  type: LearningType;
  level: LearningLevel;
  topic: string;
  lane: LearningLane;
  relatedRoleSlugs: string[];
  whyItMatters: string;
  outcome: string;
  url: string;
  isExternal: boolean;
};

function rolesInLane(lane: CareerLane, count = 3) {
  return roles.filter((role) => role.lane === lane).slice(0, count).map((role) => role.slug);
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type RawItem = Omit<LearningItem, "slug" | "isExternal" | "relatedRoleSlugs"> & { relatedRoleSlugs?: string[] };

const raw: RawItem[] = [
  // Foundations — applies before choosing a lane.
  {
    title: "Ethereum Learn",
    type: "Guide",
    level: "Beginner",
    topic: "Wallets, transactions, and core concepts",
    lane: "Foundations",
    whyItMatters: "Every Web3 role assumes you understand wallets, transactions, and basic chain concepts.",
    outcome: "You can explain what a wallet, transaction, and gas fee are in plain language.",
    url: "https://ethereum.org/en/learn/",
  },
  {
    title: "Bankless Academy",
    type: "Course",
    level: "Beginner",
    topic: "Web3 and DeFi safety basics",
    lane: "Foundations",
    whyItMatters: "Interactive lessons cover the safety habits every Web3 worker needs before touching real funds.",
    outcome: "You can identify common wallet risks and safe transaction habits.",
    url: "https://academy.bankless.com/",
  },
  {
    title: "KRAFT Glossary",
    type: "Guide",
    level: "Beginner",
    topic: "Web3 and career vocabulary",
    lane: "Foundations",
    whyItMatters: "Job descriptions and role guides assume vocabulary this glossary defines in context.",
    outcome: "You can look up an unfamiliar term and see why it matters for real work.",
    url: "/glossary",
  },

  // Community & Growth
  {
    title: "Discord Safety Library",
    type: "Guide",
    level: "Beginner",
    topic: "Server safety and moderation",
    lane: "Community & Growth",
    whyItMatters: "Moderation and community roles are judged on safety and escalation discipline, not just activity.",
    outcome: "You can describe basic server permission and moderation workflows.",
    url: "https://discord.com/safety",
  },
  {
    title: "Gitcoin",
    type: "Community",
    level: "Intermediate",
    topic: "Contributor and grant paths",
    lane: "Community & Growth",
    whyItMatters: "Bounties and grants are a common way to build real, attributable evidence before a full-time role.",
    outcome: "You can identify a bounty or grant scoped to your current evidence level.",
    url: "https://www.gitcoin.co/",
  },

  // Content & Marketing
  {
    title: "Messari Research",
    type: "Guide",
    level: "Intermediate",
    topic: "Research structure and caveats",
    lane: "Content & Marketing",
    whyItMatters: "Shows how credible crypto research frames claims, sources, and limitations.",
    outcome: "You can structure a short piece with sources and an explicit limitations section.",
    url: "https://messari.io/research",
  },
  {
    title: "DefiLlama",
    type: "Tool",
    level: "Beginner",
    topic: "Protocol data for content and research",
    lane: "Content & Marketing",
    whyItMatters: "Free protocol data helps writers avoid unsupported claims about TVL, fees, or activity.",
    outcome: "You can pull one protocol metric and cite it accurately.",
    url: "https://defillama.com/",
  },

  // Product & Operations
  {
    title: "Nielsen Norman Group",
    type: "Guide",
    level: "Beginner",
    topic: "UX and product research foundations",
    lane: "Product & Operations",
    whyItMatters: "Product and operations roles are judged on structured problem framing, not just tools.",
    outcome: "You can apply one usability heuristic to a real product flow.",
    url: "https://www.nngroup.com/articles/",
  },
  {
    title: "Linear Method",
    type: "Guide",
    level: "Beginner",
    topic: "Execution and issue-tracking workflow",
    lane: "Product & Operations",
    whyItMatters: "Shows a concrete example of how product and operations teams turn decisions into tracked work.",
    outcome: "You can describe a simple issue-tracking workflow from intake to shipped.",
    url: "https://linear.app/method",
  },

  // Research & Data
  {
    title: "Dune Docs",
    type: "Docs",
    level: "Intermediate",
    topic: "SQL-based on-chain analytics",
    lane: "Research & Data",
    whyItMatters: "Most on-chain analyst and DeFi analyst proof-of-work is built with SQL queries on public data.",
    outcome: "You can write a basic query against on-chain data and explain its limitations.",
    url: "https://docs.dune.com/",
  },
  {
    title: "Token Unlocks",
    type: "Tool",
    level: "Intermediate",
    topic: "Vesting and unlock schedules",
    lane: "Research & Data",
    whyItMatters: "Tokenomics analysis depends on reading real unlock schedules, not assumptions.",
    outcome: "You can read a token's unlock schedule and identify near-term supply pressure.",
    url: "https://token.unlocks.app/",
  },
  {
    title: "Token Terminal",
    type: "Tool",
    level: "Intermediate",
    topic: "Protocol fundamentals and revenue",
    lane: "Research & Data",
    whyItMatters: "Separates protocol revenue from incentive-driven activity, a common analyst mistake.",
    outcome: "You can compare two protocols using a revenue or fee metric with a stated definition.",
    url: "https://tokenterminal.com/",
  },

  // Technical & Security
  {
    title: "Solidity by Example",
    type: "Docs",
    level: "Beginner",
    topic: "Solidity fundamentals",
    lane: "Technical & Security",
    whyItMatters: "Smart contract roles are judged on working, tested code, not tutorial completion.",
    outcome: "You can read and explain a small Solidity contract.",
    url: "https://solidity-by-example.org/",
  },
  {
    title: "Foundry Book",
    type: "Docs",
    level: "Intermediate",
    topic: "Contract testing and deployment tooling",
    lane: "Technical & Security",
    whyItMatters: "Testing discipline is one of the most common gaps reviewers flag in smart contract proof-of-work.",
    outcome: "You can write and run a test for a small contract using Foundry.",
    url: "https://book.getfoundry.sh/",
  },
  {
    title: "Speedrun Ethereum",
    type: "Course",
    level: "Intermediate",
    topic: "Project-based Ethereum development",
    lane: "Technical & Security",
    whyItMatters: "Building small working projects is more useful proof than reading documentation alone.",
    outcome: "You can complete and explain one small end-to-end Ethereum project.",
    url: "https://speedrunethereum.com/",
  },

  // Governance, Legal & People
  {
    title: "Gitcoin",
    type: "Community",
    level: "Intermediate",
    topic: "Grant and public-goods funding",
    lane: "Governance, Legal & People",
    whyItMatters: "Grant writing and governance work often route through real grant and public-goods programmes.",
    outcome: "You can identify a grant programme's scope and reporting requirements.",
    url: "https://www.gitcoin.co/",
  },

  // Creative
  {
    title: "Figma Community",
    type: "Tool",
    level: "Beginner",
    topic: "UI systems and design patterns",
    lane: "Creative",
    whyItMatters: "Design roles are judged on systems thinking, and existing community files show real patterns to adapt.",
    outcome: "You can identify a reusable component pattern worth adapting for a Web3 flow.",
    url: "https://www.figma.com/community",
  },
  {
    title: "Material Design Accessibility",
    type: "Guide",
    level: "Beginner",
    topic: "Accessible interface design",
    lane: "Creative",
    whyItMatters: "Wallet and transaction flows carry real risk, so accessible, readable design is a hiring signal.",
    outcome: "You can apply one accessibility guideline to a risky confirmation screen.",
    url: "https://m3.material.io/foundations/accessible-design/overview",
  },

  // Trading & Finance Adjacent
  {
    title: "DefiLlama",
    type: "Tool",
    level: "Beginner",
    topic: "Market and liquidity data",
    lane: "Trading & Finance Adjacent",
    whyItMatters: "Market-structure work starts from real liquidity and volume data, not narrative.",
    outcome: "You can pull a liquidity or volume figure and note what it does not prove.",
    url: "https://defillama.com/",
  },
];

export const learningItems: LearningItem[] = raw.map((item) => ({
  ...item,
  slug: slugify(`${item.lane}-${item.title}`),
  isExternal: !item.url.startsWith("/"),
  relatedRoleSlugs: item.lane === "Foundations" ? [] : rolesInLane(item.lane as CareerLane),
}));

export function getLearningItemsForLane(lane: LearningLane) {
  return learningItems.filter((item) => item.lane === lane);
}

export const foundationsItems = getLearningItemsForLane("Foundations");
