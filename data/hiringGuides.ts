export type HiringGuide = {
  id: number;
  title: string;
  guidance: string;
  checklist: string[];
  example: string;
  relatedTool: { label: string; href: string };
};

export const hiringGuides: HiringGuide[] = [
  { id: 1, title: "Pick a target role", guidance: "Choose one primary role and one adjacent role. Compare daily work, skills, and proof requirements before applying.", checklist: ["Choose one role", "Choose one adjacent role", "Write why each fits your current evidence"], example: "Target Community Manager, adjacent Social Media Manager, because both need reporting and community communication.", relatedTool: { label: "Compare roles", href: "/roles" } },
  { id: 2, title: "Build proof-of-work", guidance: "Create two to four role-relevant outputs before sending large numbers of applications.", checklist: ["Pick a project brief", "Define the deliverable", "Publish or package the output"], example: "A DeFi analyst publishes a protocol comparison with caveats and a metric table.", relatedTool: { label: "Choose a project", href: "/portfolio" } },
  { id: 3, title: "Package the work", guidance: "Turn raw output into a case study with context, decisions, result, limitations, and links.", checklist: ["Add context", "Explain decisions", "Show the deliverable", "Name limits"], example: "A designer shows the risky approval flow, final screen, and why each warning exists.", relatedTool: { label: "Open portfolio resources", href: "/portfolio" } },
  { id: 4, title: "Fix profile and CV", guidance: "Make the target role, relevant work, and measurable contribution visible within seconds.", checklist: ["Rewrite headline", "Move proof links up", "Remove vague claims"], example: "Replace 'Web3 enthusiast' with 'Community operator: moderation SOP, report template, and crisis flow.'", relatedTool: { label: "Review glossary terms", href: "/glossary" } },
  { id: 5, title: "Apply selectively", guidance: "Prioritize roles where the work, level, timezone, and compensation model are realistic.", checklist: ["Check level", "Check timezone", "Check compensation terms", "Verify company domain"], example: "Skip senior protocol economist roles if your proof is entry-level community work.", relatedTool: { label: "Browse job platforms", href: "/job-boards" } },
  { id: 6, title: "Write useful outreach", guidance: "Mention a real reason for contacting the team and attach relevant proof, not a generic message.", checklist: ["Reference real work", "Attach one proof link", "Ask a specific question"], example: "I saw your wallet onboarding issue in support channels; here is a small UX audit of the flow.", relatedTool: { label: "Find role evidence", href: "/roles" } },
  { id: 7, title: "Handle trial tasks", guidance: "Confirm scope, expected time, ownership, payment, and evaluation criteria before starting.", checklist: ["Confirm scope", "Confirm time", "Confirm ownership", "Confirm evaluation"], example: "A two-hour written analysis is reasonable; a full unpaid campaign plan may not be.", relatedTool: { label: "Read safety notes", href: "/disclaimers" } },
  { id: 8, title: "Prepare interviews", guidance: "Use structured examples: situation, decision, execution, result, and lesson.", checklist: ["Pick three examples", "Name decisions", "Name trade-offs", "Practice aloud"], example: "For crisis handling, describe what you verified before answering the community.", relatedTool: { label: "Practice questions", href: "/interview-prep" } },
  { id: 9, title: "Review compensation", guidance: "Compare cash, token, vesting, contractor terms, timezone, equipment, and payment reliability.", checklist: ["Separate cash and token value", "Ask vesting terms", "Check payment schedule"], example: "A $90k package with locked tokens is not the same as $90k cash.", relatedTool: { label: "Read compensation glossary", href: "/glossary" } },
  { id: 10, title: "Check for scams", guidance: "Verify domains, team identities, contracts, and links. Never share a seed phrase or pay to apply.", checklist: ["Verify domain", "Check official socials", "Never pay to apply", "Never share secrets"], example: "If a recruiter asks you to install unknown software before an offer, stop and verify.", relatedTool: { label: "Open job safety checklist", href: "/job-boards" } },
];

