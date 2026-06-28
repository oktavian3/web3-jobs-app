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
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { careerLanes, roles, type CareerLane } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { jobBoards } from "@/data/jobBoards";
import { getActiveCuratedJobs, selectedJobPlatforms } from "@/data/curatedJobs";
import { Shell, Container, BluePanel, Eyebrow, SectionHeading, PrimaryLink, SecondaryLink, FinalCTA, Card } from "@/components/kraft/Primitives";
import { RoleCard } from "@/components/kraft/Cards";
import { CountUp, ProofChecklistAnimation } from "@/components/kraft/AnimatedBits";
import LearningPreview from "@/components/kraft/LearningPreview";
import HeroProductPreview from "@/components/kraft/HeroProductPreview";

const startCards = [
  { title: "New to Web3", copy: "Understand the industry, basic terms, and which roles do not require coding.", cta: "Learn the Basics", href: "/learn-web3" },
  { title: "Exploring a Career", copy: "Compare roles, test your fit, and see what the work looks like day to day.", cta: "Find My Role", href: "/skill-check", featured: true },
  { title: "Ready to Apply", copy: "Build proof-of-work, practice interviews, and use better job sources.", cta: "Get Hired", href: "/get-hired" },
];

const productMetrics = [
  { value: roles.length, label: "detailed role guides" },
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
  "Creative & Design": Palette,
  "Governance, Legal & People": Scale,
  "Trading & Finance Adjacent": CandlestickChart,
};

const selectedPlatforms = selectedJobPlatforms
  .slice(0, 4)
  .map((selection) => ({ selection, board: jobBoards.find((board) => board.slug === selection.platformSlug) }))
  .filter((item): item is { selection: (typeof selectedJobPlatforms)[number]; board: (typeof jobBoards)[number] } => Boolean(item.board));
const proofChecklistItems = ["Role-specific project", "Documented result", "Portfolio case study", "Tailored application", "Interview preparation"];
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
              Explore real Web3 roles, test your fit, learn the language, build proof-of-work, and apply with context.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/skill-check" className="btn-white">Find My Role <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/roles" className="btn-ghost-white">Explore Roles</Link>
            </div>
          </div>

          <HeroProductPreview />
        </BluePanel>

        <section className="reveal-card overflow-hidden rounded-[32px] border border-blue-100 bg-[radial-gradient(circle_at_20%_0%,rgba(20,107,255,0.18),transparent_32%),linear-gradient(145deg,#ffffff_0%,#f2f8ff_52%,#e5f2ff_100%)] p-5 text-center shadow-blue sm:p-8 lg:p-10">
          <span className="tag">KRAFT overview</span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">One place to understand Web3 work.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            The role library, glossary, job sources, and proof tasks all point to the same outcome: clearer applications with visible evidence.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {productMetrics.map((metric) => (
              <Card key={metric.label} className="reveal-card bg-white/88 p-5">
                <strong className="text-3xl font-extrabold text-blue-700"><CountUp value={metric.value} /></strong>
                <p className="mt-1 text-sm font-bold text-muted">{metric.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading eyebrow="Built for different starting points" title="Start with the question you actually have." />
          <div className="mt-10 grid items-center gap-5 lg:grid-cols-3">
            {startCards.map((card) => (
              <Card key={card.title} className={`reveal-card group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-blue focus-within:border-blue-400 ${card.featured ? "border-blue-200 bg-[linear-gradient(145deg,#eaf4ff,#ffffff)] shadow-blue lg:scale-105" : ""}`}>
                <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-200/40 blur-2xl transition group-hover:bg-blue-300/70" />
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-700 shadow-soft">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 text-2xl font-extrabold tracking-tight text-ink">{card.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-700">{card.copy}</p>
                <Link href={card.href} className="relative mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  {card.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="reveal-card">
          <SectionHeading eyebrow="Everything connects" title="Learn one thing, then know what to do next." copy="KRAFT connects role guides, terminology, practical tasks, interview preparation, and job platforms instead of leaving each resource as an isolated page." />
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
                <Card key={lane.lane} className="reveal-card group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-blue">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-200/45 blur-2xl transition group-hover:bg-blue-300/70" />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="tag">{count} roles</span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-extrabold tracking-tight text-ink">{lane.lane}</h3>
                  <p className="relative mt-3 text-sm leading-6 text-muted">{lane.description}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {lane.exampleRoles.slice(0, 3).map((role) => <span key={role} className="tag">{role}</span>)}
                  </div>
                  <div className="relative mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">{lane.difficulty}</span>
                    <Link href={`/roles?lane=${encodeURIComponent(lane.lane)}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>Ten minutes, practical result</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">Get a role match, not a personality label.</h2>
            <p className="mt-4 text-base leading-7 text-muted">Answer focused questions about how you work. KRAFT returns your strongest career lanes, current readiness, missing skills, and the next proof-of-work task to build.</p>
            <div className="mt-7"><PrimaryLink href="/skill-check">Start Skill Check</PrimaryLink></div>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Readiness</p>
                <h3 className="mt-1 text-2xl font-extrabold text-ink">58% ready</h3>
              </div>
              <div className="grid h-24 w-24 place-items-center rounded-full border-[12px] border-blue-600 bg-blue-50 text-xl font-extrabold text-blue-700">58</div>
            </div>
            <div className="mt-6 space-y-3">
              {["Community & Growth", "Product & Operations", "Content & Marketing"].map((lane, index) => (
                <div key={lane} className="rounded-2xl border border-border bg-soft p-4">
                  <div className="flex items-center justify-between text-sm font-extrabold"><span>{lane}</span><span>{82 - index * 11}%</span></div>
                  <div className="mt-3 h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${82 - index * 11}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading align="left" title="See what the role actually expects." copy="Role pages explain daily work, expected outputs, tools, portfolio evidence, interview prompts, and salary context without vague job-description language." />
            <div className="mt-6 flex flex-wrap gap-2">
              {["Daily Work", "Skills", "Tools", "Portfolio", "Interview", "Salary Context"].map((chip) => <span key={chip} className="tag">{chip}</span>)}
            </div>
            <div className="mt-7"><PrimaryLink href="/roles">Explore Role Guides</PrimaryLink></div>
          </div>
          <RoleCard role={roles.find((role) => role.slug === "community-manager") ?? roles[0]} />
        </section>

        <section className="reveal-card">
          <SectionHeading title="Learn terms in the context of work." copy="Definitions include why the term matters, common misunderstandings, related roles, and the next useful concept." />
          <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-border bg-white p-5 shadow-blue">
            <div className="flex items-center gap-3 rounded-full border border-border bg-soft px-4 py-3 text-sm font-bold text-muted">
              <Search className="h-4 w-4" /> Search TVL, Token Unlock, Multisig
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {["TVL", "Token Unlock", "Multisig"].map((term) => {
                const item = glossaryTerms.find((entry) => entry.term === term);
                return item ? (
                  <Card key={term} className="p-4">
                    <h3 className="font-extrabold text-ink">{item.term}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.commonTrap}</p>
                  </Card>
                ) : null;
              })}
            </div>
          </div>
          <div className="mt-7 text-center"><SecondaryLink href="/glossary">Open Glossary</SecondaryLink></div>
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title="Build proof before you send applications." />
            <p className="mt-4 text-base leading-7 text-muted">KRAFT turns role expectations into concrete proof-of-work tasks, portfolio packaging, interview preparation, and safer application habits.</p>
            <div className="mt-7"><PrimaryLink href="/get-hired">Open Hiring Guide</PrimaryLink></div>
          </div>
          <ProofChecklistAnimation items={proofChecklistItems} />
        </section>

        <section className="reveal-card grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading align="left" title="Find the right place to search, not another endless feed." copy="Compare curated Web3 job platforms by role type, remote coverage, seniority, and application style." />
            <div className="mt-7"><PrimaryLink href="/job-boards">Browse Job Platforms</PrimaryLink></div>
          </div>
          <div className="grid gap-4">
            <Card className="reveal-card overflow-hidden p-0">
              <div className="border-b border-blue-100 bg-[linear-gradient(135deg,#146bff,#68c4ff)] p-5 text-white">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/18">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-50">Selected by KRAFT</p>
                    <h3 className="mt-1 text-2xl font-extrabold">Platforms worth checking first</h3>
                  </div>
                </div>
              </div>
              <div className="grid gap-0 divide-y divide-blue-100">
                {selectedPlatforms.map(({ selection, board }) => (
                  <a key={selection.id} href={board.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 p-4 transition hover:bg-blue-50/70">
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
                  <a key={pick.id} href={pick.applyUrl} target="_blank" rel="noreferrer" className="group rounded-2xl border border-blue-100 bg-soft p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white">
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
