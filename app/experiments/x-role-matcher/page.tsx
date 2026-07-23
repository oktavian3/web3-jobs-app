import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell, Container, SectionHeading } from "@/components/kraft/Primitives";
import XProfileRoleMatcher from "@/components/kraft/XProfileRoleMatcher";

// Experimental, secondary, stateless X Profile Role Matcher.
// Disabled by default via a simple environment flag and kept out of primary navigation.
// It must NOT be exposed publicly until privacy, methodology, limitations, consent,
// and failure states are implemented (Phase 2). Until then, public access is a 404.
const matcherEnabled = process.env.NEXT_PUBLIC_ENABLE_X_MATCHER === "true";

export const metadata: Metadata = {
  title: "X Profile Role Matcher (Experimental) | KRAFT",
  robots: { index: false, follow: false },
};

export default function XRoleMatcherExperimentPage() {
  if (!matcherEnabled) {
    notFound();
  }

  return (
    <Shell>
      <Container className="space-y-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Experimental"
          title="X Profile Role Matcher"
          copy="This is a secondary experimental feature based on visible public profile evidence. It is not an assessment of employability, aptitude, intelligence, personality, hiring suitability, or compensation value."
        />
        <XProfileRoleMatcher />
      </Container>
    </Shell>
  );
}
