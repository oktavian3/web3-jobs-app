export type HiringGuide = {
  id: number;
  slug: string;
  title: string;
  guidance: string;
  checklist: string[];
  example: string;
  relatedTool: { label: string; href: string };
  template?: string[];
};

export const hiringGuides: HiringGuide[] = [
  {
    id: 1,
    slug: "cv-ats",
    title: "CV / ATS",
    guidance: "Maintain two CV versions when useful: an ATS-safe version for portals and a more visual version for direct networking or portfolio review.",
    checklist: [
      "Avoid tables, text boxes, and columns for ATS submissions.",
      "Use an ATS-safe version for portals and a separate visual version for networking when useful.",
      "Put target role, proof links, tools, and outcomes near the top.",
      "Use plain section headings such as Experience, Projects, Skills, Education, and Links.",
    ],
    example: "For a Research Writer application, lead with a protocol memo, source appendix, and writing tools before general interests.",
    relatedTool: { label: "Compare roles", href: "/roles" },
    template: ["Headline: Target role + strongest proof", "Proof links: 2-4 role-relevant artifacts", "Experience bullets: action + scope + evidence", "Skills: tools and concepts you can explain"],
  },
  {
    id: 2,
    slug: "profile",
    title: "Profile",
    guidance: "Make your public profile answer three questions quickly: what role you want, what evidence proves it, and how someone can contact you.",
    checklist: ["Rewrite headline around the target role", "Move proof links above generic bio text", "Use role keywords honestly", "Pin or feature one strongest artifact"],
    example: "Replace 'Web3 enthusiast' with 'Community operator: moderation SOP, weekly report template, and crisis-response flow.'",
    relatedTool: { label: "Review glossary terms", href: "/glossary" },
    template: ["I help [team type] with [role output].", "Proof: [artifact 1], [artifact 2], [artifact 3].", "Tools: [tool list].", "Contact: [email or profile link]."],
  },
  {
    id: 3,
    slug: "portfolio",
    title: "Portfolio",
    guidance: "Choose proof-of-work that matches the role, then package it as a short case study with context, decisions, output, limits, and next steps.",
    checklist: ["Pick one role-specific project brief", "Show the final output first", "Explain decisions and trade-offs", "Name assumptions and limitations"],
    example: "A designer shows the risky approval flow, final screens, missing states, and why each warning exists.",
    relatedTool: { label: "Choose a project", href: "/portfolio" },
    template: ["Context", "Task", "Final output", "Decisions", "Limitations", "Next iteration"],
  },
  {
    id: 4,
    slug: "applications",
    title: "Applications",
    guidance: "Apply selectively to roles where level, work type, timezone, compensation model, and proof requirements match your current evidence.",
    checklist: ["Check role level", "Check timezone and employment type", "Verify company domain", "Attach the most relevant proof link"],
    example: "Skip senior protocol economist roles if your current proof is entry-level community work.",
    relatedTool: { label: "Browse job platforms", href: "/job-boards" },
  },
  {
    id: 5,
    slug: "outreach",
    title: "Outreach",
    guidance: "Write targeted outreach that references a real reason for contacting the team and includes one relevant proof link.",
    checklist: ["Reference real work or context", "Attach one proof link", "Ask a specific question", "Keep the message short"],
    example: "I saw your wallet onboarding issue in support channels; here is a small UX audit of the flow.",
    relatedTool: { label: "Find role evidence", href: "/roles" },
    template: ["Hi [name/team],", "I noticed [specific context].", "I built [relevant proof link].", "Could this be useful for [specific role/problem]?"],
  },
  {
    id: 6,
    slug: "trials",
    title: "Trials",
    guidance: "Trial tasks can be useful, but scope, expected time, ownership, payment, and evaluation criteria should be clear before you begin.",
    checklist: ["Confirm scope", "Confirm expected time", "Confirm ownership and usage rights", "Confirm evaluation criteria"],
    example: "A two-hour written analysis is reasonable; a full unpaid campaign plan may not be.",
    relatedTool: { label: "Read safety notes", href: "/disclaimers" },
  },
  {
    id: 7,
    slug: "interviews",
    title: "Interviews",
    guidance: "Prepare examples from real work. Good answers usually explain the situation, decision, execution, result, and lesson.",
    checklist: ["Pick three work examples", "Name decisions and trade-offs", "Prepare follow-up details", "Practice aloud"],
    example: "For crisis handling, describe what you verified before answering the community and what you escalated.",
    relatedTool: { label: "Practice questions", href: "/interview-prep" },
    template: ["Situation", "Decision", "Execution", "Result", "Lesson"],
  },
  {
    id: 8,
    slug: "compensation",
    title: "Compensation",
    guidance: "Separate cash, token grants, vesting, contractor terms, payment schedule, equipment, timezone expectations, and reliability.",
    checklist: ["Separate cash and token value", "Ask vesting and lockup terms", "Check payment schedule", "Clarify contractor versus employee terms"],
    example: "A $90k package with locked tokens is not the same as $90k cash.",
    relatedTool: { label: "Read compensation glossary", href: "/glossary" },
  },
  {
    id: 9,
    slug: "safety",
    title: "Safety",
    guidance: "Verify domains, team identities, contracts, files, and wallet-related requests before sharing information or starting work.",
    checklist: ["Never share a seed phrase or private key", "Never pay to apply", "Verify official domains and socials", "Avoid unknown downloads and wallet approvals"],
    example: "If a recruiter asks you to install unknown software before an offer, stop and verify through official channels.",
    relatedTool: { label: "Open job safety checklist", href: "/job-boards" },
  },
  {
    id: 10,
    slug: "templates",
    title: "Templates",
    guidance: "Keep reusable templates for CV bullets, outreach, trial-scope checks, interview stories, and compensation questions.",
    checklist: ["Save a CV bullet pattern", "Save one outreach pattern", "Save trial-task questions", "Save compensation questions"],
    example: "Trial-scope question: What is the expected time box, who reviews it, and how will the work be used?",
    relatedTool: { label: "Open portfolio resources", href: "/portfolio" },
    template: ["CV bullet: Built [artifact] for [audience/problem] using [tools], resulting in [evidence].", "Trial check: scope, time, ownership, payment, evaluation.", "Compensation check: cash, token, vesting, payment schedule, contract type."],
  },
];
