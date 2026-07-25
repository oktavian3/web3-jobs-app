import type { Metadata } from "next";
import TrustPage from "@/components/kraft/TrustPage";

export const metadata: Metadata = {
  title: "Salary Methodology",
  description:
    "KRAFT shows a compensation number only when the evidence can support it, and explains the evidence tiers and confidence levels it uses.",
};

export default function SalaryMethodologyPage() {
  return (
    <TrustPage
      eyebrow="Salary methodology"
      headline="Salary context without fake precision."
      supporting="Web3 compensation changes by geography, level, employment model, company stage, token or equity, and market cycle. KRAFT shows a number only when the evidence can support it."
      sections={[
        {
          title: "Evidence tiers",
          paragraphs: [
            "Direct role-specific evidence; adjacent-role evidence; broad Web3 market evidence; unverified estimate.",
          ],
        },
        {
          title: "Confidence",
          paragraphs: [
            "High: several matching current listings. Medium: limited direct evidence plus strong adjacent context. Low: mostly adjacent or mixed markets. Very low: no reliable role-specific evidence.",
          ],
        },
        {
          title: "Display rules",
          paragraphs: [
            "High and medium may show numeric ranges with caveats. Low usually shows evidence context. Very low states that a reliable range is unavailable.",
          ],
        },
        {
          title: "Compensation components",
          paragraphs: [
            "Separate base cash, bonus, commission, equity, token, vesting, contractor rate, retainer, bounty, royalty, grant, and creator revenue.",
          ],
        },
        {
          title: "What never happens",
          paragraphs: [
            "No fabricated range for layout consistency. No conversion of US remote pay into a local promise. No use of validator rewards, creator sales, or trading bonuses as standard salary.",
          ],
        },
      ]}
      ctas={[
        { label: "Back to roles", href: "/roles" },
        { label: "Read the methodology", href: "/methodology" },
      ]}
    />
  );
}
