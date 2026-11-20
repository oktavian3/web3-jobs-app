export type NavItem = { href: string; label: string; description?: string; soon?: boolean };

export const LEARN: NavItem[] = [
  { href: "/learn-web3", label: "Learn Web3", description: "Build the foundations one target role actually needs." },
  { href: "/glossary", label: "Glossary", description: "Learn terms in the context of work." },
  { href: "/roadmaps", label: "Roadmaps", description: "Follow a practical, lane-level path from where you are today." },
  { href: "/interview-prep", label: "Interview Prep", description: "Practice the interview questions that role actually asks." },
  { href: "/portfolio", label: "Portfolio", description: "Package the result as a case study a reviewer can inspect." },
];

export const TOOLS: NavItem[] = [
  { href: "/skill-check", label: "Skill Check", description: "A short self-assessment for a starting lane and role." },
  { href: "/cv-maker", label: "CV Maker", description: "Build an ATS-optimised CV with a live preview." },
  { href: "#", label: "Paygate", description: "Coming soon", soon: true },
];

export const PRIMARY: NavItem[] = [
  { href: "/jobs", label: "Jobs" },
  { href: "/roles", label: "Roles" },
];

export const SECONDARY: NavItem[] = [{ href: "/get-hired", label: "Get Hired" }];

export function isActive(pathname: string, href: string) {
  if (href === "#") return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
