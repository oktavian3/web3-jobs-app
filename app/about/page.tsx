import type { Metadata } from "next";
import TrustPage from "@/components/kraft/TrustPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "KRAFT connects role education, practical proof, interview preparation, and safer job discovery in one non-linear learning centre.",
};

export default function AboutPage() {
  return (
    <TrustPage
      eyebrow="About"
      headline="KRAFT explains the work behind Web3 job titles."
      supporting="The site connects role education, practical proof, interview preparation, and safer job discovery in one non-linear learning centre."
      sections={[
        {
          title: "Why KRAFT exists",
          paragraphs: [
            "Web3 titles are inconsistent, job descriptions are often vague, and career content frequently replaces real scope with hype. KRAFT is built to show the work, evidence, boundaries, and uncertainty.",
          ],
        },
        {
          title: "Who it is for",
          paragraphs: [
            "Beginners, contributors, creators, operators, analysts, designers, and developers who want a more realistic route into or across Web3 work.",
          ],
        },
        {
          title: "Editorial approach",
          paragraphs: [
            "KRAFT prioritises current first-party material, labels patterns and recommendations, preserves source links, separates salary evidence, and updates material when the underlying market changes.",
          ],
        },
        {
          title: "What the site refuses to promise",
          paragraphs: [
            "No employment guarantee, definitive assessment, universal salary, or shortcut around role prerequisites.",
          ],
        },
      ]}
      ctas={[
        { label: "Explore roles", href: "/roles" },
        { label: "Read Methodology", href: "/methodology" },
      ]}
    />
  );
}
