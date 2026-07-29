import type { Metadata } from "next";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CVMakerWizard from "@/components/cv-maker/CVMakerWizard";

export const metadata: Metadata = {
  title: "CV Maker",
  description:
    "Build an ATS-optimised CV: fill in your details, watch the preview update live, check it against a job description, and export a clean PDF.",
};

export default function CVMakerPage() {
  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Tools"
          title="Build a CV that clears the ATS filter, not just the eye test."
          copy="Single-column, plain-text-parseable formatting, section headings that pattern-match against applicant tracking systems, and a live preview so you always see what actually gets exported. Your draft stays in this browser only - there's no account and nothing is uploaded anywhere."
        />
        <CVMakerWizard />
      </Container>
    </Shell>
  );
}
