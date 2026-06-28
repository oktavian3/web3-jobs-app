import { ShieldAlert } from "lucide-react";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

const warnings = [
  {
    title: "KRAFT does not guarantee employment",
    copy: "The site helps you understand roles, build evidence, and apply with more context. Hiring decisions remain with external teams.",
  },
  {
    title: "Salary information is context, not a promise",
    copy: "Compensation changes by region, seniority, employment type, market cycle, token exposure, and company funding.",
  },
  {
    title: "External job platforms require verification",
    copy: "KRAFT links to external platforms and company pages. Verify domains, people, and listing freshness before applying.",
  },
  {
    title: "Never share wallet secrets",
    copy: "No legitimate job requires your seed phrase, private key, wallet approval, or payment to apply.",
  },
  {
    title: "Trial tasks need scope",
    copy: "Confirm expected time, ownership, evaluation criteria, and payment if the work is substantial.",
  },
];

export default function DisclaimersPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Disclaimers" title="Career guidance needs clear boundaries." copy="KRAFT is a learning centre. Use it to prepare and verify, not as a guarantee of outcomes." />
        <div className="grid gap-4 md:grid-cols-2">
          {warnings.map((warning) => (
            <Card key={warning.title} className="p-6">
              <ShieldAlert className="h-7 w-7 text-blue-700" />
              <h2 className="mt-4 text-xl font-extrabold text-ink">{warning.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{warning.copy}</p>
            </Card>
          ))}
        </div>
        <FinalCTA title="Apply with safety checks." copy="Use the job-board safety checklist before following external links or accepting trial tasks." primary={{ href: "/job-boards", label: "Open Job Boards" }} secondary={{ href: "/get-hired", label: "Get Hired Guide" }} />
      </Container>
    </Shell>
  );
}
