import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Compass, Gauge, Map, Search } from "lucide-react";
import { careerLanes, roles, getRoleBySlug } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { jobBoards } from "@/data/jobBoards";
import { getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { laneResults } from "@/data/skillCheck";
import { getPortfolioProjectBySlug } from "@/data/portfolioProjects";
import { Shell, Container, BluePanel, Eyebrow, SectionHeading, PrimaryLink, SecondaryLink, FinalCTA } from "@/components/kraft/Primitives";
import { RoleCard } from "@/components/kraft/Cards";
import { ConfidenceBadge } from "@/components/kraft/role/badges";
import { CountUp, ProofPipeline } from "@/components/kraft/AnimatedBits";
import LearningPreview from "@/components/kraft/LearningPreview";
import HeroProductPreview from "@/components/kraft/HeroProductPreview";
import CareerJourney from "@/components/kraft/CareerJourney";
import HeroRotator from "@/components/kraft/HeroRotator";
import { laneIcons } from "@/components/kraft/laneIcons";

const startCards = [
  { title: "Explore Roles", copy: "New to Web3, or unsure of the title? See the real work behind 42 canonical roles before you commit to one.", cta: "Browse Roles", href: "/roles", Icon: Compass },
  { title: "Take the Skill Check", copy: "Several paths look plausible? A short self-assessment suggests a starting lane and role.", cta: "Start Skill Check", href: "/skill-check", featured: true, Icon: Gauge },
  { title: "Open Roadmaps", copy: "Already know your target? Follow a practical, lane-level path from where you are today.", cta: "View Roadmaps", href: "/roadmaps", Icon: Map },
];

const productMetrics = [
  { value: roles.length, label: "canonical role guides" },
  { value: glossaryTerms.length, label: "practical glossary terms" },
  { value: careerLanes.length, label: "career lanes" },
  { value: jobBoards.length, label: "curated job platforms" },
];

// Hero word rotator source: the real canonical career lanes. Only the names are
// passed to the client component; it resolves icons from the shared map.
const laneRotatorItems = careerLanes.map((lane) => lane.lane);

const featuredRoleSlug = "community-manager";
const featuredRole = getRoleBySlug(featuredRoleSlug) ?? roles[0];
const featuredRelatedRole = featuredRole.relatedRoleSlugs[0] ? getRoleBySlug(featuredRole.relatedRoleSlugs[0]) : undefined;
const featuredPortfolio = getPortfolioProjectBySlug(featuredRole.slug);

const selectedPlatforms = selectedJobPlatforms
  .slice(0, 4)
  .map((selection) => ({ selection, board: jobBoards.find((board) => board.slug === selection.platformSlug) }))
  .filter((item): item is { selection: (typeof selectedJobPlatforms)[number]; board: (typeof jobBoards)[number] } => Boolean(item.board));
const latestCuratedJobs = getActiveCuratedJobs().slice(0, 3);

export default function Home() {
  return (
    <Shell>
      <Container width="wide" className="space-y-24 py-6 sm:space-y-28 sm:py-8">
        <BluePanel className="blue-panel--hero px-5 pb-8 pt-16 text-center sm:px-10 sm:pb-12 sm:pt-20 lg:px-16">
          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur">
              Web3 Career Learning Centre
            </span>
            <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.4rem]">
              Know the <span className="font-display font-normal tracking-normal">work</span>
              <br className="hidden sm:block" />{" "}
              before you chase the <span className="font-display font-normal tracking-normal">title.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Discover a real role, learn what it needs, build proof, and prepare to apply — with context instead of guesswork.
            </p>

            {/* Rotating lane accent — real canonical lanes, presentation only. */}
            <div className="mt-8 flex justify-center text-xl font-extrabold tracking-tight sm:text-2xl">
              <HeroRotator items={laneRotatorItems} />
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/skill-check" className="btn-white">Find My Role <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/roles" className="btn-ghost-white">Explore Roles</Link>
            </div>
          </div>

          <HeroProductPreview />
        </BluePanel>

        <section className="card-premium card-premium--featured reveal-card p-6 text-center sm:p-10">
          <span className="tag">KRAFT overview</span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
            One place to understand <span className="font-display font-normal">Web3 work.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            The role library, glossary, job sources, and proof tasks all point to the same outcome: clearer applications with visible evidence.
          </p>
          <dl className="mt-9 grid gap-px overflow-hidden rounded-3xl border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-4">
            {productMetrics.map((metric) => (
              <div key={metric.label} className="bg-elevated px-5 py-7">
                <dd className="text-4xl font-extrabold leading-none tracking-tight text-blue-700">
                  <CountUp value={metric.value} />
                </dd>
                <dt className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        <section className="reveal-card">
          <SectionHeading eyebrow="Built for different starting points" title="Start with the question you actually have." />
          <div className="mx-auto mt-10 grid max-w-[1500px] gap-5 lg:grid-cols-3">
            {startCards.map((card) => (
              <div
                key={card.title}
                className={`card-premium card-premium--interactive reveal-card group flex flex-col p-2.5 ${card.featured ? "card-premium--featured" : ""}`}
              >
                <div className={`card-premium__media grid h-28 place-items-center ${card.featured ? "card-premium__media--solid" : ""}`}>
                  <card.Icon
                    className={`h-9 w-9 transition-transform duration-300 group-hover:scale-110 ${card.featured ? "text-white" : "text-blue-700"}`}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 pt-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-ink">{card.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-6 text-muted">{card.copy}</p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(180deg,var(--blue),var(--blue-deep))] px-4 py-3 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading
            eyebrow="The career journey"
            title="Discover, learn, build, prove, prepare, apply."
            copy="KRAFT connects six practical stages into one system instead of leaving each resource as an isolated page."
          />
          <div className="mt-10">
            <CareerJourney />
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading eyebrow="Everything connects" title="Learn one thing, then know what to do next." copy="Role guides, terminology, practical tasks, interview preparation, and job platforms — connected, not isolated." />
          <div className="mt-10">
            <LearningPreview />
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading title="Explore Web3 work by career lane." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {careerLanes.map((lane) => {
              const Icon = laneIcons[lane.lane];
              const count = roles.filter((role) => role.lane === lane.lane).length;
              return (
                <div key={lane.lane} className="card-premium card-premium--interactive reveal-card group flex flex-col p-2.5">
                  <div className="card-premium__media flex items-center justify-between gap-3 px-4 py-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(158deg,var(--blue),var(--blue-deep))] text-white shadow-blue transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">{count} roles</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 pt-5">
                    <h3 className="text-lg font-extrabold leading-snug tracking-tight text-ink">{lane.lane}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-6 text-muted">{lane.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {lane.exampleRoles.slice(0, 3).map((role) => <span key={role} className="tag">{role}</span>)}
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted">{lane.difficulty}</span>
                      <Link href={`/roles?lane=${encodeURIComponent(lane.lane)}`} className="inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        View roles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Guidance, not a score</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">A possible fit, not a personality label.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">Answer focused questions about how you work. Results are self-reported guidance — a possible lane, a confidence label, and one next proof-of-work task, never a percentage score.</p>
            <div className="mt-7"><PrimaryLink href="/skill-check">Start Skill Check</PrimaryLink></div>
          </div>
          <div className="card-premium p-2.5">
            <div className="card-premium__media px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Possible fit</p>
                  <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">{laneResults[0].lane}</h3>
                </div>
                <ConfidenceBadge level="Medium" />
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-muted">{laneResults[0].fit}</p>
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Compare nearby lanes</p>
                <div className="mt-3 divide-y divide-border border-y border-border">
                  {laneResults.slice(1, 3).map((result) => (
                    <p key={result.lane} className="py-3 text-sm font-bold text-ink">{result.lane}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading align="left" title="See what the role actually expects." copy="Role pages explain daily work, expected outputs, tools, portfolio evidence, interview prompts, and salary evidence — without vague job-description language." />
            <div className="mt-6 flex flex-wrap gap-2">
              {["Daily Work", "Skills", "Tools", "Portfolio", "Interview", "Salary Evidence"].map((chip) => <span key={chip} className="tag">{chip}</span>)}
            </div>
            <div className="mt-7"><PrimaryLink href="/roles">Explore Role Guides</PrimaryLink></div>
          </div>
          <div className="space-y-3">
            <RoleCard role={featuredRole} />
            <div className="card-surface card-surface--informational flex flex-wrap items-center gap-3 p-4 text-sm">
              <ConfidenceBadge level={featuredRole.compensationConfidence} />
              {featuredPortfolio && (
                <Link href={`/portfolio/${featuredPortfolio.slug}`} className="font-extrabold text-blue-700">Build proof-of-work</Link>
              )}
              <Link href={`/interview-prep?role=${featuredRole.slug}`} className="font-extrabold text-blue-700">Practice interview</Link>
              {featuredRelatedRole && (
                <Link href={`/roles/${featuredRelatedRole.slug}`} className="font-extrabold text-muted">Related: {featuredRelatedRole.title}</Link>
              )}
            </div>
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading title="Learn terms in the context of work." copy="Definitions include why the term matters, common misunderstandings, related roles, and the next useful concept." />
          <div className="card-premium mx-auto mt-10 max-w-4xl p-2.5">
            {/* A real link into the glossary — not a decorative input mock-up. */}
            <Link
              href="/glossary"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-soft px-4 py-3.5 text-sm font-bold text-muted transition hover:border-border-strong hover:bg-highlight hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Search className="h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              Search TVL, Token Unlock, Multisig
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-blue-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <div className="mt-2.5 grid gap-2.5 md:grid-cols-3">
              {["TVL", "Token Unlock", "Multisig"].map((term) => {
                const item = glossaryTerms.find((entry) => entry.term === term);
                return item ? (
                  <Link
                    key={term}
                    href={`/glossary/${item.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-elevated p-4 transition hover:-translate-y-1 hover:border-border-strong hover:shadow-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <h3 className="font-extrabold tracking-tight text-ink">{item.term}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">{item.commonTrap}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">
                      Open term <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
          <div className="mt-7 text-center"><SecondaryLink href="/glossary">Open Glossary</SecondaryLink></div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title="Build proof before you send applications." />
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">KRAFT turns role expectations into concrete proof-of-work tasks, portfolio packaging, interview preparation, and safer application habits. The goal is evidence, not certificates.</p>
            <div className="mt-7"><PrimaryLink href="/get-hired">Open Hiring Guide</PrimaryLink></div>
          </div>
          <ProofPipeline />
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading align="left" title="Find the right place to search, not another endless feed." copy="Compare curated Web3 job platforms by role type, remote coverage, seniority, and application style." />
            <div className="mt-7"><PrimaryLink href="/job-boards">Browse Job Platforms</PrimaryLink></div>
          </div>
          <div className="grid gap-4">
            <div className="card-premium reveal-card p-2.5">
              <div className="card-premium__media px-5 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(158deg,var(--blue),var(--blue-deep))] text-white shadow-blue">
                    <BriefcaseBusiness className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Selected by KRAFT</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Platforms worth checking first</h3>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {selectedPlatforms.map(({ selection, board }) => (
                  <a
                    key={selection.id}
                    href={board.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl p-4 transition hover:bg-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <div>
                      <h4 className="font-extrabold text-ink">{selection.recommendationLabel}: {board.name}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted">{selection.whySelected}</p>
                    </div>
                    <span className="tag shrink-0">{board.remoteSupport}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="card-premium reveal-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="tag">Fresh picks from KRAFT</span>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Curated searches to inspect this week</h3>
                </div>
                <Gauge className="hidden h-10 w-10 shrink-0 text-blue-600 sm:block" aria-hidden="true" />
              </div>
              <div className="mt-5 grid gap-3">
                {latestCuratedJobs.length ? latestCuratedJobs.map((pick) => (
                  <a
                    key={pick.id}
                    href={pick.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-border bg-soft p-4 transition hover:-translate-y-0.5 hover:border-border-strong hover:bg-elevated hover:shadow-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tag">{pick.category}</span>
                      <span className="tag">{pick.seniority}</span>
                      <span className="tag">Added by KRAFT</span>
                    </div>
                    <h4 className="mt-3 font-extrabold text-ink">{pick.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">{pick.kraftNote}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">{pick.location} - added {pick.addedAt}</p>
                  </a>
                )) : (
                  <div className="rounded-2xl border border-dashed border-border-strong bg-soft p-4 text-sm font-bold leading-6 text-muted">
                    No active manually curated jobs are published yet. KRAFT will show the latest three here after they are added to the data file.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <FinalCTA
          title="Stop applying blind."
          copy="Find your role, build proof-of-work, and prepare with context before sending another application."
          primary={{ href: "/skill-check", label: "Find My Role" }}
          secondary={{ href: "/job-boards", label: "Browse Job Boards" }}
        />
      </Container>
    </Shell>
  );
}
