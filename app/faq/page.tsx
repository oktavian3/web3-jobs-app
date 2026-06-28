import faq from "@/public/data/faq.json";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export default function FAQPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="FAQ" title="Common Web3 career questions." copy="Short answers for readers deciding where to start." />
        <div className="grid gap-4">
          {(faq as Array<{ question: string; answer: string }>).map((item) => (
            <Card key={item.question} className="p-6">
              <h2 className="text-xl font-extrabold text-ink">{item.question}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </Card>
          ))}
        </div>
        <FinalCTA title="Start with a real role." copy="The fastest way to make Web3 less vague is to inspect the work behind a title." primary={{ href: "/roles", label: "Explore Roles" }} secondary={{ href: "/skill-check", label: "Start Skill Check" }} />
      </Container>
    </Shell>
  );
}
