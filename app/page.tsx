import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { careerLanes, roles, getRoleBySlug } from "@/data/roles";
import { glossaryTerms } from "@/data/glossary";
import { jobBoards } from "@/data/jobBoards";
import { laneResults } from "@/data/skillCheck";
import { getPortfolioProjectBySlug } from "@/data/portfolioProjects";
import { Container, SectionHeading, PrimaryLink, SecondaryLink, FinalCTA } from "@/components/kraft/Primitives";
import { RoleCard } from "@/components/kraft/Cards";
import LearningPreview from "@/components/kraft/LearningPreview";
import { formatShortDate } from "@/components/jobs/format";
import { getPublicJobs } from "@/lib/jobs/repository";
import HeroLaptop from "@/components/landing/HeroLaptop";

// Static page, refreshed every 5 minutes so newly published jobs show up in the hero card.
export const revalidate = 300;

const startCards = [
  { title: "Explore Roles", copy: "New to Web3, or unsure of the title? See the real work behind 42 canonical roles before you commit to one.", cta: "Browse Roles", href: "/roles" },
  { title: "Take the Skill Check", copy: "Several paths look plausible? A short self-assessment suggests a starting lane and role.", cta: "Start Skill Check", href: "/skill-check", featured: true },
  { title: "Open Roadmaps", copy: "Already know your target? Follow a practical, lane-level path from where you are today.", cta: "View Roadmaps", href: "/roadmaps" },
];

const journey = [
  { stage: "Discover", detail: "Compare real roles by the actual work, not the title.", href: "/roles" },
  { stage: "Learn", detail: "Build the foundations one target role actually needs.", href: "/learn-web3" },
  { stage: "Build", detail: "Work a role-specific, clearly simulated proof brief.", href: "/portfolio" },
  { stage: "Prove", detail: "Package the result as a case study a reviewer can inspect.", href: "/get-hired" },
  { stage: "Prepare", detail: "Practice the interview questions that role actually asks.", href: "/interview-prep" },
  { stage: "Apply", detail: "Search safely with sources matched to your target role.", href: "/jobs" },
];

const productMetrics = [
  { value: roles.length, label: "canonical role guides" },
  { value: glossaryTerms.length, label: "practical glossary terms" },
  { value: careerLanes.length, label: "career lanes" },
  { value: jobBoards.length, label: "curated job platforms" },
];

const featuredLaneNames = new Set<string>(["Community & Growth", "Content & Marketing", "Product & Operations", "Research & Data"]);
const featuredLanes = careerLanes.filter((lane) => featuredLaneNames.has(lane.lane));

const featuredRole = getRoleBySlug("community-manager") ?? roles[0];
const featuredRelatedRole = featuredRole.relatedRoleSlugs[0] ? getRoleBySlug(featuredRole.relatedRoleSlugs[0]) : undefined;
const featuredPortfolio = getPortfolioProjectBySlug(featuredRole.slug);
const roleTitles = Object.fromEntries(roles.map((r) => [r.slug, r.title]));

export default async function Home() {
  const allJobs = await getPublicJobs();
  // Lead with a job that has a role guide, so the "role guide" scene has content.
  const lead = allJobs.find((j) => j.roleSlug === "growth-manager") ?? allJobs.find((j) => j.roleSlug) ?? allJobs[0];
  const laptopJobs = [lead, ...allJobs.filter((j) => j !== lead)].filter(Boolean).slice(0, 3).map((j) => ({
    id: j.id,
    title: j.title,
    company: j.company,
    workType: j.workType,
    date: formatShortDate(j.postedAt),
    roleTitle: j.roleSlug ? roleTitles[j.roleSlug] : undefined,
  }));
  const laptopQuery = lead?.roleSlug ? roleTitles[lead.roleSlug] ?? "Growth" : "Community";

  return (
    <div className="bg-canvas">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-blue/10 blur-[120px]" aria-hidden="true" />
        <Container width="wide" className="relative grid items-center gap-14 pb-16 pt-12 sm:pt-20 md:pb-24 lg:grid-cols-[1.12fr_.88fr] lg:gap-12 lg:pt-24">
          <div className="min-w-0">
            <h1 className="text-[46px] font-medium leading-[1] tracking-[-0.05em] text-ink sm:text-[68px] lg:text-[84px] lg:leading-[0.96]">
              Know the <span className="accent text-blue">work</span>
              <br className="hidden sm:block" /> before you chase
              <br className="hidden sm:block" /> the <span className="accent">title.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.55] text-muted sm:text-[19px]">
              Discover a real role, learn what it needs, build proof, and prepare to apply - with context instead of guesswork.
            </p>

            <form action="/jobs" method="get" role="search" className="mt-9 flex max-w-[560px] flex-col gap-1.5 rounded-[18px] border border-border bg-surface p-1.5 shadow-card focus-within:border-border-strong sm:flex-row sm:items-center sm:gap-2">
              <label className="flex h-11 min-w-0 flex-1 items-center gap-2 pl-3">
                <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <span className="sr-only">Search Web3 jobs</span>
                <input name="q" type="search" placeholder="Search Web3 jobs by title or company" className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" />
              </label>
              <button type="submit" className="btn-primary !h-11 !rounded-[13px]">
                Search jobs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/skill-check" className="btn-ink !h-10 !text-[14px]">
                Find My Role
              </Link>
              <Link href="/roles" className="btn-secondary !h-10 !text-[14px]">
                Explore Roles
              </Link>
            </div>
          </div>

          {/* Product visual: 3D laptop looping the KRAFT apply flow on real jobs */}
          <div className="relative hidden min-w-0 sm:block">
            <HeroLaptop jobs={laptopJobs} query={laptopQuery} />
            <p className="sr-only">Illustration: searching KRAFT jobs, opening a role guide, checking the employer domain, then applying.</p>
          </div>
        </Container>
      </section>

      {/* ── Overview + real metrics (rendered as numbers in HTML) ─────────── */}
      <section className="border-y border-border bg-elevated" aria-labelledby="overview-h">
        <Container width="wide" className="grid gap-10 py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-16">
          <div>
            <p className="eyebrow">KRAFT overview</p>
            <h2 id="overview-h" className="mt-4 text-[30px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[38px]">
              One place to understand <span className="accent">Web3 work.</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.6] text-muted">
              The role library, glossary, job sources, and proof tasks all point to the same outcome: clearer applications with visible evidence.
            </p>
          </div>
          <dl className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-border bg-surface sm:grid-cols-4">
            {productMetrics.map((m, i) => (
              <div key={m.label} className={`flex flex-col-reverse p-5 sm:p-6 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-border`}>
                <dt className="eyebrow mt-2 !text-[10.5px]">{m.label}</dt>
                <dd className="text-[36px] font-medium leading-none tracking-[-0.04em] text-ink sm:text-[40px]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Start cards ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container width="wide">
          <SectionHeading eyebrow="Built for different starting points" title={<>Start with the question you <span className="accent">actually have.</span></>} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-border bg-border md:grid-cols-3">
            {startCards.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative flex flex-col gap-2 overflow-hidden p-7 sm:p-8 md:min-h-[290px] md:gap-0 ${card.featured ? "bg-navy text-on-navy" : "bg-surface hover:bg-elevated"}`}
              >
                {card.featured ? <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue/40 blur-3xl" aria-hidden="true" /> : null}
                <span className={`relative font-mono text-[12px] ${card.featured ? "text-on-navy/60" : "text-muted"}`}>0{i + 1}</span>
                <h3 className="relative mt-4 text-[22px] font-medium tracking-[-0.03em] md:mt-auto">{card.title}</h3>
                <p className={`relative mt-3 text-[14.5px] leading-[1.6] ${card.featured ? "text-on-navy/75" : "text-muted"}`}>{card.copy}</p>
                <span
                  className={`relative mt-6 inline-flex w-fit items-center gap-1.5 text-[14px] font-medium ${
                    card.featured ? "h-10 rounded-full bg-blue px-4 text-white" : "text-ink"
                  }`}
                >
                  {card.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Career journey ───────────────────────────────────────────────── */}
      <section className="border-t border-border bg-elevated py-20 md:py-28">
        <Container width="wide">
          <SectionHeading
            eyebrow="The career journey"
            title={<>Discover, learn, build, prove, prepare, <span className="accent text-blue">apply.</span></>}
            copy="KRAFT connects six practical stages into one system instead of leaving each resource as an isolated page."
          />
          <ol className="mt-14 grid grid-cols-2 gap-x-4 border-t border-border lg:grid-cols-6 lg:gap-x-0">
            {journey.map((step, i) => (
              <li key={step.stage} className={`border-b border-border pb-8 pr-4 pt-6 lg:border-b-0 ${i ? "lg:border-l lg:pl-6" : ""}`}>
                <Link href={step.href} className="group block">
                  <span className="flex items-center gap-2">
                    <span className={`font-mono text-[12px] ${i === 5 ? "text-blue-deep" : "text-muted"}`}>0{i + 1}</span>
                    <span className={`h-px flex-1 ${i === 5 ? "bg-blue" : "bg-border"}`} aria-hidden="true" />
                  </span>
                  <span className="mt-5 block text-[19px] font-medium tracking-[-0.025em] text-ink">{step.stage}</span>
                  <span className="mt-2 block text-[14px] leading-[1.55] text-muted">{step.detail}</span>
                  <span className={`mt-4 inline-flex items-center gap-1 text-[13px] font-medium ${i === 5 ? "text-blue-deep" : "text-ink"}`}>
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Everything connects ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container width="wide" className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <SectionHeading
            eyebrow="Everything connects"
            title={<>Learn one thing, then know <span className="accent">what to do next.</span></>}
            copy="Role guides, terminology, practical tasks, interview preparation, and job platforms - connected, not isolated."
          />
          <LearningPreview />
        </Container>
      </section>

      {/* ── Career lanes ─────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-elevated py-20 md:py-28">
        <Container width="wide">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              title={<>Explore Web3 work by <span className="accent">career lane.</span></>}
              copy={`${careerLanes.length} lanes group all ${roles.length} canonical roles by the kind of work they involve.`}
            />
            <SecondaryLink href="/roles">View all {careerLanes.length} career lanes</SecondaryLink>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredLanes.map((lane) => {
              const laneRoles = roles.filter((role) => role.lane === lane.lane);
              return (
                <Link
                  key={lane.lane}
                  href={`/roles?lane=${encodeURIComponent(lane.lane)}`}
                  className="card-surface card-surface--interactive group flex flex-col gap-3 p-6 sm:min-h-[260px] sm:gap-0"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[11.5px] uppercase text-muted">{laneRoles.length} roles</span>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-blue" aria-hidden="true" />
                  </span>
                  <h3 className="text-[21px] font-medium tracking-[-0.025em] text-ink sm:mt-auto">{lane.lane}</h3>
                  <p className="text-[14px] leading-[1.55] text-muted sm:mt-2">{lane.description}</p>
                  <span className="border-t border-border pt-4 text-[13px] text-ink/85 sm:mt-5">{lane.exampleRoles.slice(0, 2).join(" · ")}</span>
                  <span className="sr-only">View roles</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Skill check ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container width="wide" className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Guidance, not a score"
              title={<>A possible fit, not a <span className="accent">personality label.</span></>}
              copy="Answer focused questions about how you work. Results are self-reported guidance - a possible lane, a confidence label, and one next proof-of-work task, never a percentage score."
            />
            <div className="mt-8">
              <Link href="/skill-check" className="btn-ink">
                Start Skill Check <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="card-surface p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Possible fit</p>
              <span className="rounded-full bg-blue-soft px-2 py-0.5 font-mono text-[11px] text-blue-deep">Confidence: Medium</span>
            </div>
            <h3 className="mt-3 text-[30px] font-medium tracking-[-0.03em]">{laneResults[0].lane}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted">{laneResults[0].fit}</p>
            <p className="eyebrow mt-6">Compare nearby lanes</p>
            <ul className="mt-3 divide-y divide-border border-y border-border text-[15px]">
              {laneResults.slice(1, 3).map((r) => (
                <li key={r.lane} className="py-3">{r.lane}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Role guides ──────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-elevated py-20 md:py-28">
        <Container width="wide" className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading
              title={<>See what the role <span className="accent">actually expects.</span></>}
              copy="Role pages explain daily work, expected outputs, tools, portfolio evidence, interview prompts, and salary evidence - without vague job-description language."
            />
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {["Daily Work", "Skills", "Tools", "Portfolio", "Interview", "Salary Evidence"].map((chip) => (
                <li key={chip} className="tag">{chip}</li>
              ))}
            </ul>
            <div className="mt-8">
              <PrimaryLink href="/roles">Explore Role Guides</PrimaryLink>
            </div>
          </div>
          <div className="space-y-3">
            <RoleCard role={featuredRole} />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[16px] border border-border bg-surface px-5 py-4 text-[14px]">
              <span className="font-mono text-[11.5px] text-muted">Confidence: {featuredRole.compensationConfidence}</span>
              {featuredPortfolio ? (
                <Link href={`/portfolio/${featuredPortfolio.slug}`} className="font-medium text-blue-deep hover:underline">
                  Build proof-of-work
                </Link>
              ) : null}
              <Link href={`/interview-prep?role=${featuredRole.slug}`} className="font-medium text-blue-deep hover:underline">
                Practice interview
              </Link>
              {featuredRelatedRole ? (
                <Link href={`/roles/${featuredRelatedRole.slug}`} className="text-muted hover:text-ink">
                  Related: {featuredRelatedRole.title}
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Glossary ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container width="wide" className="grid items-start gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading
              title={<>Learn terms in the <span className="accent">context of work.</span></>}
              copy="Definitions include why the term matters, common misunderstandings, related roles, and the next useful concept."
            />
            <Link href="/glossary" className="mt-8 flex max-w-[420px] items-center gap-3 rounded-[14px] border border-border bg-surface px-4 py-3.5 text-[14px] text-muted transition-colors hover:border-border-strong hover:text-ink">
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              Search TVL, Token Unlock, Multisig
              <ArrowRight className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-[22px] border border-border bg-surface">
            {["TVL", "Token Unlock", "Multisig"].map((term) => {
              const item = glossaryTerms.find((entry) => entry.term === term);
              return item ? (
                <li key={term}>
                  <Link href={`/glossary/${item.slug}`} className="group grid gap-1.5 p-5 hover:bg-elevated sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6 sm:p-6">
                    <span className="text-[19px] font-medium tracking-[-0.025em] text-ink">{item.term}</span>
                    <span className="text-[14.5px] leading-[1.55] text-muted">{item.commonTrap}</span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-blue-deep">
                      Open term <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </Container>
      </section>

      <Container width="wide" className="pb-6">
        <FinalCTA
          title="Stop applying blind."
          copy="Find your role, build proof-of-work, and prepare with context before sending another application."
          primary={{ href: "/skill-check", label: "Find My Role" }}
          secondary={{ href: "/jobs", label: "Browse Job Boards" }}
        />
      </Container>
    </div>
  );
}
