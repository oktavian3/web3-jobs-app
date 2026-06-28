import { ArrowUpRight, Search, ShieldAlert, SlidersHorizontal, Sparkles } from "lucide-react";
import { jobBoards } from "@/data/jobBoards";
import { curatedJobsLastUpdated, getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";
import { JobBoardCard } from "@/components/kraft/Cards";

const safety = ["Verify the company domain before applying", "Never pay to apply or unlock an interview", "Never share a seed phrase or private key", "Confirm trial task scope and ownership", "Compare listings with official company channels"];

export default function JobBoardsPage() {
  const activeCuratedJobs = getActiveCuratedJobs();

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Job Boards" title="Curated Web3 Job Platforms." copy="KRAFT compares external platforms. It does not host every listed job, and platform listings should be verified before you apply." />
        <Card className="overflow-hidden p-5 sm:p-6">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink">Job-safety checklist</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {safety.map((item) => <div key={item} className="rounded-2xl border border-blue-100 bg-[linear-gradient(180deg,#ffffff,#eef6ff)] px-4 py-3 text-sm font-bold leading-5 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">{item}</div>)}
              </div>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <Search className="h-6 w-6 text-blue-700" />
            <h2 className="mt-4 text-xl font-extrabold text-ink">Scan by fit, not volume.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">KRAFT does not publish unverified live job counts. Compare platform style, role coverage, remote support, and salary visibility before leaving the site.</p>
          </Card>
          <Card className="p-5">
            <SlidersHorizontal className="h-6 w-6 text-blue-700" />
            <h2 className="mt-4 text-xl font-extrabold text-ink">Check the application path.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">Prefer official domains, clear scope, realistic compensation terms, and listings that match your current proof-of-work evidence.</p>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobBoards.map((board) => <JobBoardCard key={board.slug} board={board} />)}
        </div>

        <section>
          <SectionHeading eyebrow="Selected by KRAFT" title="Selected by KRAFT platforms for specific search needs." copy="These are still external platforms. KRAFT highlights when each one is useful, but you should verify every listing before applying." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {selectedJobPlatforms.map((selection) => {
              const board = jobBoards.find((item) => item.slug === selection.platformSlug);
              if (!board) return null;
              return (
                <Card key={selection.id} className="interactive-card group p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="tag">{selection.recommendationLabel}</span>
                      <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{board.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{selection.whySelected}</p>
                    </div>
                    <Sparkles className="h-6 w-6 shrink-0 text-blue-700 transition group-hover:rotate-6" />
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="mini-stat"><dt>Remote</dt><dd>{board.remoteSupport}</dd></div>
                    <div className="mini-stat"><dt>Salary</dt><dd>{board.salaryVisibility}</dd></div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selection.bestRoleCategories.map((category) => <span key={category} className="tag">{category}</span>)}
                  </div>
                  <a href={board.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                    Visit platform <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="New Jobs Curated by KRAFT" title="New Jobs Curated by KRAFT." copy="This section is manually maintained from a data file. It only shows jobs marked active and does not use fake listings or a live API." />
          <Card className="mt-8 p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="tag">Added by KRAFT</span>
              <p className="text-sm font-bold text-muted">Last updated {curatedJobsLastUpdated}</p>
            </div>
            {activeCuratedJobs.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {activeCuratedJobs.map((job) => (
                  <a key={job.id} href={job.applyUrl} target="_blank" rel="noreferrer" className="interactive-card group rounded-3xl border border-blue-100 bg-soft p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-blue">
                    <div className="flex flex-wrap gap-2">
                      <span className="tag">{job.category}</span>
                      <span className="tag">{job.remote ? "Remote" : "On-site / hybrid"}</span>
                      <span className="tag">{job.seniority}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{job.title}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-700">{job.company}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{job.kraftNote}</p>
                    <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">{job.location} - added {job.addedAt}</p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-soft p-8 text-center">
                <h3 className="text-2xl font-extrabold tracking-tight text-ink">No active curated jobs right now.</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
                  KRAFT will show manually reviewed individual opportunities here after they are added to `data/curatedJobs.ts` with active status.
                </p>
              </div>
            )}
          </Card>
        </section>
        <FinalCTA title="Search with context." copy="Use job platforms after you know the role, the evidence you need, and the safety checks to run." primary={{ href: "/roles", label: "Find My Role" }} secondary={{ href: "/get-hired", label: "Open Hiring Guide" }} />
      </Container>
    </Shell>
  );
}
