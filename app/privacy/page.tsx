import type { Metadata } from "next";
import TrustPage from "@/components/kraft/TrustPage";

export const metadata: Metadata = {
  title: "Privacy / Data Use",
  description:
    "What KRAFT processes and stores. The first Skill Check and X Profile Role Matcher implementations are stateless unless a future storage feature is explicitly introduced.",
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Privacy / Data use"
      headline="What KRAFT processes, stores, and does not infer."
      supporting="The first Skill Check and X Profile Role Matcher implementations are stateless unless a future storage feature is explicitly introduced."
      sections={[
        {
          title: "Skill Check",
          paragraphs: [
            "Answers are used only to produce the current result. They are not treated as a psychometric profile. In the stateless version, they are not retained after the session.",
          ],
        },
        {
          title: "X Profile Role Matcher",
          paragraphs: [
            "The matcher analyses only public profile information supplied or fetched for the current session. KRAFT does not infer private traits, protected characteristics, intelligence, personality, employability, hiring suitability, or compensation value.",
          ],
        },
        {
          title: "Storage",
          paragraphs: [
            "In the current stateless version, results disappear when the session ends. There is no saved profile or result history.",
          ],
        },
        {
          title: "External services",
          paragraphs: [
            "The live Privacy page lists the analytics, hosting, API, AI model, and error-monitoring providers used by the deployed product.",
          ],
        },
        {
          title: "User controls",
          paragraphs: ["Users can reset the current session, leave the feature, or report a problem."],
        },
      ]}
      ctas={[
        { label: "Read methodology", href: "/methodology" },
        { label: "Return to Skill Check", href: "/skill-check" },
      ]}
    />
  );
}
