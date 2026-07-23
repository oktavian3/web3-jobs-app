import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { journeyStages, hiringPaths } from "@/data/hiringJourney";
import { hiringGuides } from "@/data/hiringGuides";
import { Shell, Container, Card } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import { HiringPaths, HiringTimeline } from "@/components/kraft/career/HiringJourney";
import CareerNext from "@/components/kraft/career/CareerNext";

export const metadata: Metadata = {
  title: "Get Hired",
  description:
    "A practical, thirteen-stage career journey from understanding Web3 teams to onboarding into a first role — with three starting paths. Educational guidance, not an employment guarantee.",
};

// Playbook sections whose ids the timeline links to (#profile, #applications, ...).
const playbook = hiringGuides;

export default function GetHiredPage() {
  return (
    <Shell>
      <Container className="space-y-14 py-12 sm:py-16">
        <PageHeader
          eyebrow="Get Hired"
          title="From understanding Web3 to your first role."
          copy="A practical journey you can follow at your own pace. KRAFT provides educational guidance and structure. It does not guarantee employment, and finishing the journey is not a promise of a job."
        />

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Choose your starting path</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            Everyone runs the same journey, but the emphasis differs by where you start. Pick the path closest to you.
          </p>
          <div className="mt-6"><HiringPaths paths={hiringPaths} /></div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">The 13-stage journey</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            Each stage has an objective, what to do, the output to produce, a common mistake to avoid, and a clear signal that you are ready for the next stage.
          </p>
          <div className="mt-6"><HiringTimeline stages={journeyStages} /></div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Application playbook</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            Reference guidance for the application stages — profile, CV, outreach, trials, interviews, compensation, and safety.
          </p>
          <div className="mt-6 grid gap-4">
            {playbook.map((guide) => (
              <section key={guide.slug} id={guide.slug} className="scroll-mt-28">
                <Card className="p-5 sm:p-6">
                  <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight text-ink">{guide.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{guide.guidance}</p>
                      <p className="mt-3 text-sm leading-6 text-muted"><span className="font-bold text-ink">Example: </span>{guide.example}</p>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Checklist</p>
                      <ul className="mt-2 space-y-2">
                        {guide.checklist.map((item) => (
                          <li key={item} className="rounded-xl bg-soft px-4 py-2.5 text-sm font-bold text-ink">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </section>
            ))}
          </div>
        </section>

        <Card className="bg-blue-50 p-6">
          <div className="flex gap-4">
            <ShieldCheck className="h-7 w-7 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-extrabold text-ink">Job safety baseline</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Never share a seed phrase, private key, wallet approval, payment, or unknown download to apply for a role. Verify domains and people through official channels.
              </p>
              <Link href="/disclaimers" className="mt-3 inline-flex text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Read the full safety and disclaimer notes
              </Link>
            </div>
          </div>
        </Card>

        <CareerNext
          heading="Where this journey connects"
          items={[
            { title: "Role directory", href: "/roles", why: "Stages 2–4 start here: choose a target role and study its work, outputs, and boundaries." },
            { title: "Portfolio briefs", href: "/portfolio", why: "Stage 5 builds a simulated proof-of-work project matched to your target role." },
            { title: "Interview Prep", href: "/interview-prep", why: "Stage 11 practices role-specific questions with real examples before interviews." },
            { title: "Job Boards", href: "/job-boards", why: "Stages 6 and 9 use boards to find contributor work and build a verified target list." },
          ]}
        />
      </Container>
    </Shell>
  );
}
