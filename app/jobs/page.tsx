import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ecosystemJobBoards, jobBoards, generalJobBoards, remoteAdjacentJobBoards } from "@/data/jobBoards";
import { selectedJobPlatforms } from "@/data/curatedJobs";
import { roles } from "@/data/roles";
import { Card, SectionHeading } from "@/components/kraft/Primitives";
import { JobBoardCard } from "@/components/kraft/Cards";
import CareerNext from "@/components/kraft/career/CareerNext";
import JobBoard from "@/components/jobs/JobBoard";
import JobsTabs from "@/components/jobs/JobsTabs";
import { getPublicJobs } from "@/lib/jobs/repository";
import { safety, trackingAdvice } from "@/lib/jobs/content";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Curated Web3 job sources with honest limitations. Job boards are directories that aggregate listings - verify every opening on the employer's official domain.",
  alternates: { canonical: "/jobs" },
};

// Reads published admin jobs from Supabase on each request (cheap, small table).
export const dynamic = "force-dynamic";

const roleTitles = Object.fromEntries(roles.map((r) => [r.slug, r.title]));

function SafetyCard() {
  return (
    <div className="rounded-[20px] border border-border-strong bg-highlight p-5">
      <div className="flex items-center gap-2 text-blue-deep">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        <h2 className="eyebrow !text-blue-deep">Job-safety checklist</h2>
      </div>
      <ul className="mt-4 space-y-2.5 text-[13.5px] leading-[1.5] text-ink">
        {safety.map((s) => (
          <li key={s} className="flex gap-2">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Picks() {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-5">
      <p className="eyebrow">Selected by KRAFT</p>
      <h2 className="mt-2 text-[17px] font-medium leading-snug tracking-[-0.02em]">Where to start for a specific search.</h2>
      <ul className="mt-3 divide-y divide-border text-[13.5px]">
        {selectedJobPlatforms.map((s) => {
          const board = jobBoards.find((b) => b.slug === s.platformSlug);
          if (!board) return null;
          return (
            <li key={s.id}>
              <a href={board.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 py-2.5">
                <span>
                  <span className="block font-medium text-ink">{board.name}</span>
                  <span className="block text-[12px] text-muted">{s.recommendationLabel}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-blue" aria-hidden="true" />
                <span className="sr-only">(opens external site)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function JobsPage() {
  const jobs = await getPublicJobs();
  const generalCount = generalJobBoards.length + remoteAdjacentJobBoards.length;

  const opportunities = (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
      <JobBoard jobs={jobs} roleTitles={roleTitles} />
      <aside className="space-y-5" aria-label="Before you apply">
        <div className="space-y-5 xl:sticky xl:top-24">
          <SafetyCard />
          <Picks />
        </div>
      </aside>
    </div>
  );

  const ecosystem = (
    <section>
      <SectionHeading eyebrow="Ecosystem boards" title="Official ecosystem job boards and directories." copy="Official sources for specific ecosystems. Use them to discover teams, then verify each employer and application path." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ecosystemJobBoards.map((board) => (
          <Card key={board.slug} className="flex flex-col p-5 sm:p-6">
            <span className="tag w-fit">{board.ecosystem}</span>
            <h3 className="mt-4 text-[19px] font-medium tracking-[-0.02em] text-ink">{board.name}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-muted">{board.bestFor}</p>
            <dl className="mini-stat mt-4">
              <dt>Source type</dt>
              <dd>{board.sourceType}</dd>
            </dl>
            <p className="mt-4 flex-1 text-[13.5px] leading-[1.6] text-muted">{board.note}</p>
            <a href={board.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-blue-deep">
              Visit official source <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens external site)</span>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );

  const boards = (
    <div className="space-y-16">
      <section>
        <SectionHeading eyebrow="General boards" title="Broad Web3 job-board directory." copy="General boards that cover many companies and functions. Compare focus, role coverage, remote support, and salary visibility before leaving the site." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {generalJobBoards.map((board) => (
            <JobBoardCard key={board.slug} board={board} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeading eyebrow="Remote & adjacent" title="Remote, freelance, and contributor sources." copy="Remote-first, freelance, and contributor or bounty platforms. These often include freelance, contributor, and internship work rather than only full-time roles - review scope and payment terms carefully." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {remoteAdjacentJobBoards.map((board) => (
            <JobBoardCard key={board.slug} board={board} />
          ))}
        </div>
      </section>
      <Card className="p-6 sm:p-8">
        <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink">Track your applications</h2>
        <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.6] text-muted">KRAFT does not publish unverified live job counts or “verified today” labels. Keep your own simple tracker instead.</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {trackingAdvice.map((item) => (
            <li key={item} className="rounded-[14px] bg-soft px-4 py-3 text-[14px] leading-[1.5] text-ink">
              {item}
            </li>
          ))}
        </ul>
        <Link href="/disclaimers" className="mt-5 inline-flex text-[14px] font-medium text-blue-deep underline underline-offset-4">
          Read the full safety and disclaimer notes
        </Link>
      </Card>
      <CareerNext
        heading="Before you apply"
        items={[
          { title: "Know the role", href: "/roles", why: "Match boards to a specific target role, level, and evidence - not a broad search." },
          { title: "Build proof first", href: "/portfolio", why: "A role-matched portfolio brief gives you something to attach to applications." },
          { title: "Get Hired journey", href: "/get-hired", why: "Boards are stages 6 and 9: finding contributor work and building a verified target list." },
        ]}
      />
    </div>
  );

  return (
    <div className="bg-canvas">
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <p className="eyebrow">Job boards</p>
          <h1 className="mt-4 max-w-[900px] text-[40px] font-medium leading-[1] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[64px]">
            Find better places to look. <span className="accent text-blue">Verify every listing.</span>
          </h1>
          <p className="mt-6 max-w-[720px] text-[16.5px] leading-[1.6] text-muted">
            Job boards are directories that aggregate listings from many companies. A listing on a board is not a verified or guaranteed role, and KRAFT does not host third-party jobs. Always verify each opening on the employer&apos;s official domain.
          </p>
        </div>
      </section>
      <JobsTabs
        labels={{
          opportunities: { label: "Curated opportunities", count: jobs.length },
          ecosystem: { label: "Ecosystem boards", count: ecosystemJobBoards.length },
          boards: { label: "General boards", count: generalCount },
        }}
        panels={{ opportunities, ecosystem, boards }}
      />
    </div>
  );
}
