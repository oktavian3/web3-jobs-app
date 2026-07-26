import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CandlestickChart,
  Code2,
  Gauge,
  Megaphone,
  Palette,
  PenLine,
  Scale,
  Search,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { careerLanes, roles, getRoleBySlug, type CareerLane } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { jobBoards } from "@/data/jobBoards";
import { getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { laneResults } from "@/data/skillCheck";
import { getPortfolioProjectBySlug } from "@/data/portfolioProjects";
import { Shell, Container, BluePanel, Eyebrow, SectionHeading, PrimaryLink, SecondaryLink, FinalCTA, Card } from "@/components/kraft/Primitives";
import { RoleCard } from "@/components/kraft/Cards";
import { ConfidenceBadge } from "@/components/kraft/role/badges";
import { CountUp, ProofPipeline } from "@/components/kraft/AnimatedBits";
import LearningPreview from "@/components/kraft/LearningPreview";
import HeroProductPreview from "@/components/kraft/HeroProductPreview";
import CareerJourney from "@/components/kraft/CareerJourney";

const startCards = [
  { title: "Explore Roles", copy: "New to Web3, or unsure of the title? See the real work behind 42 canonical roles before you commit to one.", cta: "Browse Roles", href: "/roles" },
  { title: "Take the Skill Check", copy: "Several paths look plausible? A short self-assessment suggests a starting lane and role.", cta: "Start Skill Check", href: "/skill-check", featured: true },
  { title: "Open Roadmaps", copy: "Already know your target? Follow a practical, lane-level path from where you are today.", cta: "View Roadmaps", href: "/roadmaps" },
];

const productMetrics = [
  { value: roles.length, label: "canonical role guides" },
  { value: glossaryTerms.length, label: "practical glossary terms" },
  { value: careerLanes.length, label: "career lanes" },
  { value: jobBoards.length, label: "curated job platforms" },
];

const laneIcons: Record<CareerLane, LucideIcon> = {
  "Community & Growth": Megaphone,
  "Content & Marketing": PenLine,
  "Product & Operations": Settings2,
  "Research & Data": BarChart3,
  "Technical & Security": Code2,
  "Creative": Palette,
  "Governance, Legal & People": Scale,
  "Trading & Finance Adjacent": CandlestickChart,
};

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
      <Container className="space-y-24 py-6 sm:space-y-28 sm:py-8">
        <BluePanel className="px-5 pb-8 pt-14 text-center sm:px-10 sm:pb-12 sm:pt-16 lg:px-16">
          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
              Web3 Career Learning Centre
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Know the work before you chase the title.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Discover a real role, learn what it needs, build proof, and prepare to apply — with context instead of guesswork.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/skill-check" className="btn-white">Find My Role <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/roles" className="btn-ghost-white">Explore Roles</Link>
            </div>
          </div>

          <HeroProductPreview />
        </BluePanel>

        <section className="reveal-card overflow-hidden rounded-[32px] border border-blue-100 bg-highlight p-5 text-center sm:p-8 lg:p-10">
          <span className="tag">KRAFT overview</span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">One place to understand Web3 work.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            The role library, glossary, job sources, and proof tasks all point to the same outcome: clearer applications with visible evidence.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {productMetrics.map((metric) => (
              <Card key={metric.label} className="reveal-card p-5">
                <strong className="text-3xl font-extrabold text-blue-700"><CountUp value={metric.value} /></strong>
                <p className="mt-1 text-sm font-bold text-muted">{metric.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading eyebrow="Built for different starting points" title="Start with the question you actually have." />
          <div className="mt-10 grid items-center justify-items-center gap-5 text-center lg:grid-cols-3">
            {startCards.map((card) => (
              <Card
                key={card.title}
                className={`card-surface--interactive reveal-card group relative flex flex-col items-center p-6 focus-within:border-blue-400 ${card.featured ? "card-surface--featured lg:scale-105" : ""}`}
              >
                <h3 className="relative text-2xl font-extrabold tracking-tight text-ink">{card.title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-6 text-muted">{card.copy}</p>
                <Link href={card.href} className="relative mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  {card.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Card>
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
          <div className="mt-10 grid gap-4 justify-items-center text-center md:grid-cols-2 lg:grid-cols-4">
            {careerLanes.map((lane) => {
              const Icon = laneIcons[lane.lane];
              const count = roles.filter((role) => role.lane === lane.lane).length;
              return (
                <Card key={lane.lane} className="card-surface--interactive reveal-card group relative flex flex-col items-center p-5">
                  <div className="relative flex items-center justify-between gap-3 w-full">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="tag">{count} roles</span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-extrabold tracking-tight text-ink">{lane.lane}</h3>
                  <p className="relative mt-3 flex-1 text-sm leading-6 text-muted">{lane.description}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {lane.exampleRoles.slice(0, 3).map((role) => <span key={role} className="tag">{role}</span>)}
                  </div>
                  <div className="relative mt-5 flex items-center justify-center gap-3">
                    <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">{lane.difficulty}</span>
                    <Link href={`/roles?lane=${encodeURIComponent(lane.lane)}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      View roles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Guidance, not a score</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">A possible fit, not a personality label.</h2>
            <p className="mt-4 text-base leading-7 text-muted">Answer focused questions about how you work. Results are self-reported guidance — a possible lane, a confidence label, and one next proof-of-work task, never a percentage score.</p>
            <div className="mt-7"><PrimaryLink href="/skill-check">Start Skill Check</PrimaryLink></div>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Possible fit</p>
                <h3 className="mt-1 text-2xl font-extrabold text-ink">{laneResults[0].lane}</h3>
              </div>
              <ConfidenceBadge level="Medium" />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{laneResults[0].fit}</p>
            <div className="mt-6 space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Compare nearby lanes</p>
              {laneResults.slice(1, 3).map((result) => (
                <div key={result.lane} className="rounded-2xl border border-border bg-soft p-3 text-sm font-bold text-ink">
                  {result.lane}
                </div>
              ))}
            </div>
          </Card>
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
          <div className="mx-auto mt-10 max-w-4xl card-surface p-5">
            <div className="flex items-center gap-3 rounded-full border border-border bg-soft px-4 py-3 text-sm font-bold text-muted">
              <Search className="h-4 w-4" /> Search TVL, Token Unlock, Multisig
            </div>
            <div className="mt-5 grid gap-4 justify-items-center text-center md:grid-cols-3">
              {["TVL", "Token Unlock", "Multisig"].map((term) => {
                const item = glossaryTerms.find((entry) => entry.term === term);
                return item ? (
                  <Link key={term} href={`/glossary/${item.slug}`} className="card-surface card-surface--interactive block p-4">
                    <h3 className="font-extrabold text-ink">{item.term}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.commonTrap}</p>
                    <span className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-extrabold text-blue-700 w-full">
                      Open term <ArrowRight className="h-3.5 w-3.5" />
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
            <p className="mt-4 text-base leading-7 text-muted">KRAFT turns role expectations into concrete proof-of-work tasks, portfolio packaging, interview preparation, and safer application habits. The goal is evidence, not certificates.</p>
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
            <Card className="reveal-card overflow-hidden p-0">
              <div className="border-b border-border bg-highlight p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-elevated">
                    <BriefcaseBusiness className="h-5 w-5 text-blue-700" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Selected by KRAFT</p>
                    <h3 className="mt-1 text-2xl font-extrabold text-ink">Platforms worth checking first</h3>
                  </div>
                </div>
              </div>
              <div className="grid gap-0 divide-y divide-blue-100">
                {selectedPlatforms.map(({ selection, board }) => (
                  <a key={selection.id} href={board.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 p-4 transition hover:bg-highlight">
                    <div>
                      <h4 className="font-extrabold text-ink">{selection.recommendationLabel}: {board.name}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted">{selection.whySelected}</p>
                    </div>
                    <span className="tag shrink-0">{board.remoteSupport}</span>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="reveal-card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="tag">Fresh picks from KRAFT</span>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Curated searches to inspect this week</h3>
                </div>
                <Gauge className="hidden h-10 w-10 text-blue-600 sm:block" />
              </div>
              <div className="mt-5 grid gap-3">
                {latestCuratedJobs.length ? latestCuratedJobs.map((pick) => (
                  <a key={pick.id} href={pick.applyUrl} target="_blank" rel="noreferrer" className="group rounded-2xl border border-blue-100 bg-soft p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-elevated">
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
                  <div className="rounded-2xl border border-dashed border-blue-200 bg-soft p-4 text-sm font-bold leading-6 text-muted">
                    No active manually curated jobs are published yet. KRAFT will show the latest three here after they are added to the data file.
                  </div>
                )}
              </div>
            </Card>
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
