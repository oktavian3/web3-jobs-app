import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, ShieldAlert } from "lucide-react";
import { ecosystemJobBoards, jobBoards, generalJobBoards, remoteAdjacentJobBoards } from "@/data/jobBoards";
import { getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { Shell, Container, SectionHeading, Card } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import { JobBoardCard } from "@/components/kraft/Cards";
import CareerNext from "@/components/kraft/career/CareerNext";

export const metadata: Metadata = {
  title: "Job Boards",
  description:
    "Curated Web3 job sources with honest limitations. Job boards are directories that aggregate listings - verify every opening on the employer's official domain.",
};

const safety = [
  "Verify the company domain before applying.",
  "Never pay to apply or unlock an interview.",
  "Never share a seed phrase or private key.",
  "Confirm trial-task scope and ownership before starting.",
  "Compare listings with official company channels.",
];

const trackingAdvice = [
  "Track company, role, source, and application date for each application.",
  "Save the official domain and the specific person you contacted.",
  "Note the employment type: full-time, contract, freelance, contributor, or internship.",
  "Record follow-up dates and any trial-task scope you agreed to.",
];

export default function JobBoardsPage() {
  const activeCuratedJobs = getActiveCuratedJobs();

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        {/* 1. Hero and safety warning */}
        <PageHeader
          eyebrow="Job boards"
          title="Find better places to look. Verify every listing."
          copy="Job boards are directories that aggregate listings from many companies. A listing on a board is not a verified or guaranteed role, and KRAFT does not host third-party jobs. Always verify each opening on the employer's official domain."
        />

        {/* 2. New or curated opportunities */}
        <section aria-label="Curated opportunities">
          <Card className="p-5 sm:p-6">
            <span className="tag">New opportunities curated by KRAFT</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Individual opportunities we publish</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              These are individual updates or opportunities KRAFT publishes directly, separate from the external boards below. Each still requires you to verify the employer and application path.
            </p>
            {activeCuratedJobs.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {activeCuratedJobs.map((job) => (
                  <a key={job.id} href={job.applyUrl} target="_blank" rel="noreferrer" className="card-surface card-surface--interactive group p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="tag">{job.category}</span>
                      <span className="tag">{job.remote ? "Remote" : "On-site / hybrid"}</span>
                      <span className="tag">{job.seniority}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{job.title}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-700">{job.company}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{job.kraftNote}</p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-border-strong bg-soft p-8 text-center">
                <h3 className="text-xl font-extrabold tracking-tight text-ink">No curated opportunities published yet.</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
                  There are no verified KRAFT listings to show right now. Use the selected sources and boards below, and verify each role on the employer&apos;s official domain.
                </p>
              </div>
            )}
          </Card>
        </section>

        {/* 3. Selected by KRAFT */}
        <section aria-label="Selected by KRAFT">
          <SectionHeading
            eyebrow="Selected by KRAFT"
            title="Where to start for a specific search."
            copy="Platform picks for common search styles - remote-first, developer-focused, non-technical, and early-stage."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedJobPlatforms.map((selection) => {
              const board = jobBoards.find((item) => item.slug === selection.platformSlug);
              if (!board) return null;
              return (
                <a key={selection.id} href={board.url} target="_blank" rel="noreferrer" className="card-surface card-surface--interactive group flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{selection.recommendationLabel}</p>
                    <ArrowUpRight className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  </div>
                  <h3 className="mt-1 text-lg font-extrabold text-ink">{board.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">{selection.whySelected}</p>
                  <span className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-muted">Opens external site</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* 4. Ecosystem-specific boards */}
        <section aria-label="Ecosystem job boards">
          <SectionHeading
            eyebrow="Ecosystem boards"
            title="Official ecosystem job boards and directories."
            copy="Official sources for specific ecosystems. Use them to discover teams, then verify each employer and application path."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ecosystemJobBoards.map((board) => (
              <Card key={board.slug} className="flex flex-col p-5">
                <span className="tag">{board.ecosystem}</span>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{board.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{board.bestFor}</p>
                <div className="mt-4 rounded-2xl bg-soft p-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Source type</p>
                  <p className="mt-1 text-sm font-bold text-ink">{board.sourceType}</p>
                </div>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted">{board.note}</p>
                <a href={board.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Visit official source <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. General Web3 boards */}
        <section aria-label="General Web3 job boards">
          <SectionHeading
            eyebrow="General boards"
            title="Broad Web3 job-board directory."
            copy="General boards that cover many companies and functions. Compare focus, role coverage, remote support, and salary visibility before leaving the site."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {generalJobBoards.map((board) => <JobBoardCard key={board.slug} board={board} />)}
          </div>
        </section>

        {/* 6. Remote and adjacent boards */}
        <section aria-label="Remote and adjacent boards">
          <SectionHeading
            eyebrow="Remote & adjacent"
            title="Remote, freelance, and contributor sources."
            copy="Remote-first, freelance, and contributor or bounty platforms. These often include freelance, contributor, and internship work rather than only full-time roles - review scope and payment terms carefully."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {remoteAdjacentJobBoards.map((board) => <JobBoardCard key={board.slug} board={board} />)}
          </div>
        </section>

        {/* 7. Safety checklist */}
        <Card className="p-5 sm:p-6">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500 text-white" aria-hidden="true">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink">Job-safety checklist</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {safety.map((item) => (
                  <li key={item} className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-5 text-amber-900">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* 8. Application tracking advice */}
        <Card className="p-5 sm:p-6">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white" aria-hidden="true">
              <ClipboardList className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink">Track your applications</h2>
              <p className="mt-2 text-sm leading-6 text-muted">KRAFT does not publish unverified live job counts or “verified today” labels. Keep your own simple tracker instead.</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {trackingAdvice.map((item) => (
                  <li key={item} className="rounded-2xl bg-soft px-4 py-3 text-sm font-bold leading-5 text-ink">{item}</li>
                ))}
              </ul>
              <Link href="/disclaimers" className="mt-4 inline-flex text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Read the full safety and disclaimer notes
              </Link>
            </div>
          </div>
        </Card>

        <CareerNext
          heading="Before you apply"
          items={[
            { title: "Know the role", href: "/roles", why: "Match boards to a specific target role, level, and evidence - not a broad search." },
            { title: "Build proof first", href: "/portfolio", why: "A role-matched portfolio brief gives you something to attach to applications." },
            { title: "Get Hired journey", href: "/get-hired", why: "Boards are stages 6 and 9: finding contributor work and building a verified target list." },
          ]}
        />
      </Container>
    </Shell>
  );
}
