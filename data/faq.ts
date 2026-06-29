export type FaqItem = {
  id: string;
  category: "Getting Started" | "Roles" | "Portfolio" | "Applications" | "Compensation" | "Safety" | "Learning";
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "start-with-role",
    category: "Getting Started",
    question: "What is the best way to start using KRAFT?",
    answer: "Start with one target role, compare the daily work, then choose a portfolio brief that produces evidence for that role. KRAFT is a career learning centre, not a course platform.",
  },
  {
    id: "need-coding",
    category: "Roles",
    question: "Do I need to code to work in Web3?",
    answer: "No. KRAFT includes no-code, hybrid, and technical roles. Community, content, operations, governance, education, grants, BD, and design paths can be realistic without smart-contract development.",
  },
  {
    id: "role-fit",
    category: "Roles",
    question: "How do I choose between similar roles?",
    answer: "Compare the actual outputs. A Community Manager owns programming and reporting; a Social Media Manager owns publishing systems; an Ambassador Manager owns contributor quality and rewards.",
  },
  {
    id: "portfolio-count",
    category: "Portfolio",
    question: "How many portfolio projects do I need?",
    answer: "Two or three strong role-relevant artifacts are usually better than many generic samples. Each should show context, final output, decisions, limitations, and links.",
  },
  {
    id: "portfolio-private",
    category: "Portfolio",
    question: "Can I build proof-of-work without private company data?",
    answer: "Yes. Use public sources, realistic assumptions, protocol docs, governance forums, public dashboards, and clearly labeled mock scenarios. Do not include private data or wallet secrets.",
  },
  {
    id: "ats-cv",
    category: "Applications",
    question: "Should I use an ATS-safe CV or a creative CV?",
    answer: "Use an ATS-safe version for portals and a separate visual version for networking when useful. Avoid tables, text boxes, and columns for ATS submissions.",
  },
  {
    id: "cold-apply",
    category: "Applications",
    question: "Should I apply cold or do outreach first?",
    answer: "Use both, but make each application specific. A concise message with one relevant proof link usually beats generic outreach or high-volume applications.",
  },
  {
    id: "salary-ranges",
    category: "Compensation",
    question: "Why does KRAFT avoid universal salary ranges?",
    answer: "Web3 compensation depends on role, seniority, market, employment type, funding, tokens, and region. KRAFT only shows structured evidence with source, date, market, employment type, and confidence when available.",
  },
  {
    id: "tokens",
    category: "Compensation",
    question: "Are token grants the same as salary?",
    answer: "No. Separate cash, token grants, vesting, lockups, liquidity, taxes, and payment timing. Do not treat speculative token value as guaranteed salary.",
  },
  {
    id: "trial-task",
    category: "Safety",
    question: "How do I judge a trial task?",
    answer: "Confirm scope, expected time, ownership, payment, and evaluation criteria before starting. A short paid or time-boxed task is different from a full unpaid campaign or product plan.",
  },
  {
    id: "scam-check",
    category: "Safety",
    question: "What are common hiring red flags?",
    answer: "Do not pay to apply, share a seed phrase, approve wallet transactions, install unknown files, or continue with recruiters who cannot verify company domains and official channels.",
  },
  {
    id: "stay-current",
    category: "Learning",
    question: "How should I stay current without doom-scrolling?",
    answer: "Follow role-specific sources. Researchers need primary sources and data; community operators need governance and channel context; builders need docs, repos, and issue trackers.",
  },
];

export const faqCategories = Array.from(new Set(faqItems.map((item) => item.category)));
