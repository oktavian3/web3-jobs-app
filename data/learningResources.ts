export type LearningCategory = {
  slug: string;
  title: string;
  description: string;
  accent: string;
  resources: {
    title: string;
    description: string;
    url: string;
    type: "Guide" | "Docs" | "Course" | "Tool" | "Community";
  }[];
};

export const learningCategories: LearningCategory[] = [
  {
    slug: "basics",
    title: "General Web3 Basics",
    description: "Start with wallets, transactions, safety, and how protocols work before choosing a role.",
    accent: "Basics",
    resources: [
      { title: "Ethereum Learn", description: "Beginner-friendly explanations of wallets, transactions, and Ethereum concepts.", url: "https://ethereum.org/en/learn/", type: "Guide" },
      { title: "Bankless Academy", description: "Interactive Web3 and DeFi lessons with practical safety context.", url: "https://academy.bankless.com/", type: "Course" },
      { title: "KRAFT Glossary", description: "Role-aware definitions for Web3 and career terms.", url: "/glossary", type: "Guide" },
    ],
  },
  {
    slug: "developers",
    title: "Developers",
    description: "Build technical proof with contracts, frontends, integrations, tests, and documentation.",
    accent: "Build",
    resources: [
      { title: "Solidity by Example", description: "Small Solidity examples that are useful before building proof projects.", url: "https://solidity-by-example.org/", type: "Docs" },
      { title: "Foundry Book", description: "Practical tooling for writing, testing, and deploying Solidity contracts.", url: "https://book.getfoundry.sh/", type: "Docs" },
      { title: "Speedrun Ethereum", description: "Project-based Ethereum development challenges.", url: "https://speedrunethereum.com/", type: "Course" },
    ],
  },
  {
    slug: "community",
    title: "Community",
    description: "Learn moderation, community health, contributor programs, reporting, and safety habits.",
    accent: "Trust",
    resources: [
      { title: "Discord Safety Library", description: "Helpful concepts for server safety, permissions, and moderation workflows.", url: "https://discord.com/safety", type: "Guide" },
      { title: "KRAFT Community Roles", description: "Role guides for moderators, community managers, and ambassador managers.", url: "/roles?lane=Community%20%26%20Growth", type: "Guide" },
      { title: "Gitcoin", description: "Contributor, grant, and bounty paths that can build public evidence.", url: "https://www.gitcoin.co/", type: "Community" },
    ],
  },
  {
    slug: "content",
    title: "Content Creation",
    description: "Improve source checking, educational writing, launch copy, and performance reporting.",
    accent: "Explain",
    resources: [
      { title: "Messari Research", description: "Examples of crypto research structure, caveats, and market framing.", url: "https://messari.io/research", type: "Guide" },
      { title: "DefiLlama", description: "Free protocol data that helps writers avoid unsupported claims.", url: "https://defillama.com/", type: "Tool" },
      { title: "KRAFT Portfolio Projects", description: "Content briefs for educational series, research notes, and launch calendars.", url: "/portfolio", type: "Guide" },
    ],
  },
  {
    slug: "creator",
    title: "Creator",
    description: "Build a useful creator path with positioning, source checking, proof-of-work, ethical brand deals, and income paths.",
    accent: "Create",
    resources: [
      { title: "Panduan Jadi Web3 Creator", description: "Internal Bahasa Indonesia guide for positioning, content workflow, portfolio, pricing, ethics, and a 30-day checklist.", url: "/learn/creator", type: "Guide" },
      { title: "Original SatyaXBT creator post", description: "Featured source that inspired this creator learning path.", url: "https://x.com/satyaXBT/status/2070492362623819952?s=20", type: "Community" },
      { title: "KRAFT Creator Roles", description: "Role guides for content creators, crypto journalists, ambassadors, and creator-adjacent community work.", url: "/roles?lane=Content%20%26%20Marketing", type: "Guide" },
    ],
  },
  {
    slug: "research",
    title: "Research",
    description: "Study metrics, primary sources, dashboards, token unlocks, and data caveats.",
    accent: "Analyze",
    resources: [
      { title: "Dune Docs", description: "SQL-based on-chain analytics documentation and examples.", url: "https://docs.dune.com/", type: "Docs" },
      { title: "Token Unlocks", description: "Reference point for studying vesting and unlock schedules.", url: "https://token.unlocks.app/", type: "Tool" },
      { title: "Token Terminal", description: "Protocol metrics for revenue, fees, and fundamentals research.", url: "https://tokenterminal.com/", type: "Tool" },
    ],
  },
  {
    slug: "product-ops",
    title: "Product / Operations",
    description: "Practice user journeys, launch checklists, support feedback, and incident postmortems.",
    accent: "Structure",
    resources: [
      { title: "Nielsen Norman Group", description: "Foundational UX and product research articles.", url: "https://www.nngroup.com/articles/", type: "Guide" },
      { title: "Linear Method", description: "Clear examples of product execution, issue tracking, and team workflows.", url: "https://linear.app/method", type: "Guide" },
      { title: "KRAFT Roadmaps", description: "Practical lane roadmaps with outputs and related concepts.", url: "/roadmaps", type: "Guide" },
    ],
  },
  {
    slug: "design",
    title: "Design",
    description: "Design safer transaction flows, clearer approval screens, and reusable campaign systems.",
    accent: "Clarify",
    resources: [
      { title: "Figma Community", description: "Explore UI systems and patterns, then adapt thoughtfully for Web3 flows.", url: "https://www.figma.com/community", type: "Tool" },
      { title: "Material Design Accessibility", description: "Helpful accessibility guidance for readable, usable interfaces.", url: "https://m3.material.io/foundations/accessible-design/overview", type: "Guide" },
      { title: "KRAFT Creative Roles", description: "Role guides for UX, brand, motion, and case-study expectations.", url: "/roles?lane=Creative%20%26%20Design", type: "Guide" },
    ],
  },
];
