import { ArrowUpRight, Search, ShieldAlert, SlidersHorizontal } from "lucide-react";
import { ecosystemJobBoards, jobBoards } from "@/data/jobBoards";
import { curatedJobsLastUpdated, getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";
import { JobBoardCard } from "@/components/kraft/Cards";

const safety = ["Verify the company domain before applying", "Never pay to apply or unlock an interview", "Never share a seed phrase or private key", "Confirm trial task scope and ownership", "Compare listings with official company channels"];

export default function JobBoardsPage() {
  const activeCuratedJobs = getActiveCuratedJobs();

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Job Boards" title="Find jobs in two different ways." copy="KRAFT separates its own curated job updates from platform recommendations so you can browse by signal instead of mixing everything together." />

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="tag">KRAFT updates</span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Job updates curated by KRAFT</h2>
              </div>
              <p className="text-sm font-bold text-muted">Last updated {curatedJobsLastUpdated}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">These are the updates, announcements, or opportunities we publish ourselves. They live in the same content system as the admin studio and the homepage feed.</p>
            {activeCuratedJobs.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
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
                <h3 className="text-2xl font-extrabold tracking-tight text-ink">No KRAFT updates published yet.</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">When KRAFT publishes a new update, it will appear here and on the posts archive.</p>
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <span className="tag">Specific search needs</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Selected platforms by use case</h2>
            <p className="mt-3 text-sm leading-6 text-muted">These are the platform picks KRAFT recommends for different search styles, like remote-first, developer-focused, or non-technical roles.</p>
            <div className="mt-5 space-y-3">
              {selectedJobPlatforms.slice(0, 4).map((selection) => {
                const board = jobBoards.find((item) => item.slug === selection.platformSlug);
                if (!board) return null;
                return (
                  <a key={selection.id} href={board.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f2f8ff)] p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-blue">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{selection.recommendationLabel}</p>
                        <h3 className="mt-1 font-extrabold text-ink">{board.name}</h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-blue-700" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{selection.whySelected}</p>
                  </a>
                );
              })}
            </div>
          </Card>
        </section>

        <section>
          <SectionHeading eyebrow="Platform directory" title="Browse the broader directory after the curated picks." copy="The directory stays below the split so the two content types are clearly separated but still on one page." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {jobBoards.map((board) => <JobBoardCard key={board.slug} board={board} />)}
          </div>
        </section>
        <section>
          <SectionHeading eyebrow="Ecosystem Job Boards" title="Official ecosystem job boards and directories." copy="Use these official ecosystem sources to find focused opportunities, then verify the employer and application path before applying." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ecosystemJobBoards.map((board) => (
              <Card key={board.slug} className="interactive-card group flex flex-col p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue">
                <span className="tag">{board.ecosystem}</span>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{board.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{board.bestFor}</p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="mini-stat">
                    <dt>Source type</dt>
                    <dd>{board.sourceType}</dd>
                  </div>
                  <div className="mini-stat">
                    <dt>Reviewed</dt>
                    <dd>{board.lastReviewed}</dd>
                  </div>
                </dl>
                <p className="mt-5 flex-1 text-sm leading-6 text-muted">{board.note}</p>
                <a href={board.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  Visit official source <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading eyebrow="Directory" title="General Web3 job-board directory." copy="Use this broader directory after you have checked the curated, selected, and ecosystem-specific sources above." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {jobBoards.map((board) => <JobBoardCard key={board.slug} board={board} />)}
          </div>
        </section>
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
        <FinalCTA title="Search with context." copy="Use job platforms after you know the role, the evidence you need, and the safety checks to run." primary={{ href: "/roles", label: "Find My Role" }} secondary={{ href: "/get-hired", label: "Open Hiring Guide" }} />
      </Container>
    </Shell>
  );
}
