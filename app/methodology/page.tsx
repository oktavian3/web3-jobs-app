import type { Metadata } from "next";
import TrustPage from "@/components/kraft/TrustPage";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How KRAFT researches roles, labels claims by strength, handles inconsistent titles, and records its limitations.",
};

export default function MethodologyPage() {
  return (
    <TrustPage
      eyebrow="Methodology"
      headline="How KRAFT turns messy job titles into usable role guides."
      supporting="Role pages combine current first-party hiring material, protocol documentation, official team material, and reputable industry evidence. Claims are labelled by strength."
      sections={[
        {
          title: "Source hierarchy",
          paragraphs: [
            "Current official job listings and company career pages; protocol or product documentation; first-party team material; reputable industry reports; job-board aggregates as secondary context.",
          ],
        },
        {
          title: "Claim labels",
          paragraphs: [
            "Verified fact, common industry pattern, recommendation, exception, and needs human verification.",
          ],
        },
        {
          title: "Taxonomy decisions",
          paragraphs: [
            "KRAFT uses stable role titles for navigation. Alternative market titles remain searchable. Merges and splits are based on ownership, deliverables, and hiring evidence.",
          ],
        },
        {
          title: "Review process",
          paragraphs: [
            "Record source, date, geography, role scope, reviewer, and confidence. Correct material errors visibly.",
          ],
        },
        {
          title: "Limitations",
          paragraphs: [
            "Public job listings skew toward funded companies, some work is recruited privately, and titles vary by team.",
          ],
        },
      ]}
      ctas={[
        { label: "Read the salary methodology", href: "/salary-methodology" },
        { label: "Explore roles", href: "/roles" },
      ]}
    />
  );
}
