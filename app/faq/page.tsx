import { faqItems } from "@/data/faq";
import FaqExplorer from "@/components/kraft/FaqExplorer";
import { Shell, Container, SectionHeading, FinalCTA } from "@/components/kraft/Primitives";

export default function FAQPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="FAQ" title="Common Web3 career questions." copy="Short answers for readers deciding where to start." />
        <FaqExplorer items={faqItems} />
        <FinalCTA title="Start with a real role." copy="The fastest way to make Web3 less vague is to inspect the work behind a title." primary={{ href: "/roles", label: "Explore Roles" }} secondary={{ href: "/skill-check", label: "Start Skill Check" }} />
      </Container>
    </Shell>
  );
}
