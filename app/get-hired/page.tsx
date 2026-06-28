import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { hiringGuides } from "@/data/hiringGuides";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export default function GetHiredPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Get Hired" title="Build proof before you send applications." copy="A practical guide for positioning, proof-of-work, portfolio packaging, outreach, trial tasks, interviews, compensation review, and scam checks." />
        <div className="grid gap-4">
          {hiringGuides.map((guide) => (
            <Card key={guide.id} className="p-5 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr_0.7fr]">
                <div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">Step {guide.id}</span>
                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{guide.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{guide.guidance}</p>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-ink">Checklist</h3>
                  <ul className="mt-3 grid gap-2">
                    {guide.checklist.map((item) => <li key={item} className="rounded-xl bg-soft px-4 py-3 text-sm font-bold text-ink">{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-soft p-4">
                  <h3 className="text-sm font-extrabold text-ink">Example</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{guide.example}</p>
                  <Link href={guide.relatedTool.href} className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                    {guide.relatedTool.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="bg-blue-50 p-6">
          <div className="flex gap-4">
            <ShieldCheck className="h-7 w-7 text-blue-700" />
            <div>
              <h2 className="text-xl font-extrabold text-ink">Job safety baseline</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Never share a seed phrase, private key, wallet approval, payment, or unknown download to apply for a role. Verify domains and people through official channels.</p>
            </div>
          </div>
        </Card>
        <FinalCTA title="Package your evidence." copy="Pick one role, build proof, then apply through platforms that match your lane and level." primary={{ href: "/portfolio", label: "Build My Application Plan" }} secondary={{ href: "/job-boards", label: "Browse Job Boards" }} />
      </Container>
    </Shell>
  );
}
