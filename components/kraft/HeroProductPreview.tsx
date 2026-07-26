import Link from "next/link";
import { ArrowUpRight, BookOpen, FileCheck2, GitBranch, Target } from "lucide-react";
import { getRoleBySlug } from "@/data/roles";
import { getGlossaryTermBySlug } from "@/data/glossary";
import { getRoadmapDetail } from "@/data/roadmapDetail";
import { getPortfolioProjectBySlug } from "@/data/portfolioProjects";

// Static preview of real product content — no auto-cycling, no invented
// percentages or progress. Every card links to a real route.
const featuredRoleSlug = "community-manager";
const featuredGlossarySlug = "tvl";
const featuredRoadmapLaneSlug = "community-growth";

export default function HeroProductPreview() {
  const role = getRoleBySlug(featuredRoleSlug);
  const term = getGlossaryTermBySlug(featuredGlossarySlug);
  const roadmap = getRoadmapDetail(featuredRoadmapLaneSlug);
  const portfolio = getPortfolioProjectBySlug(featuredRoleSlug);

  const cardClass =
    "group relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/45 bg-white/92 p-4 text-center shadow-blue backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-white hover:shadow-[0_24px_70px_rgba(20,107,255,0.24)] focus-visible:-translate-y-1.5";

  return (
    <div className="relative z-10 mx-auto mt-12 max-w-5xl" aria-label="Product preview cards">
      <p className="relative z-20 mx-auto mb-8 w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
        What KRAFT actually contains
      </p>
      <div className="relative z-10 grid gap-4 justify-items-center text-center lg:grid-cols-4">
        {role && (
          <Link href={`/roles/${role.slug}`} className={`${cardClass} pixel-accent`}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <Target className="h-4 w-4" />
            </span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Role Guide</p>
            <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{role.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{role.lane}</p>
            <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-extrabold text-blue-700">
              Open role guide <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}

        {roadmap && (
          <Link href={`/roadmaps/${roadmap.laneSlug}`} className={`${cardClass} lg:-mt-3`}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <GitBranch className="h-4 w-4" />
            </span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Roadmap</p>
            <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{roadmap.lane}</p>
            <p className="mt-1 text-xs leading-5 text-muted">A planning guide, not a guaranteed job path.</p>
            <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-extrabold text-blue-700">
              Explore this lane <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}

        {term && (
          <Link href={`/glossary/${term.slug}`} className={cardClass}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Glossary</p>
            <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{term.term}</p>
            <p className="mt-1 text-xs leading-5 text-muted line-clamp-2">{term.commonTrap}</p>
            <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-extrabold text-blue-700">
              Open term <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}

        {portfolio && (
          <Link href={`/portfolio/${portfolio.slug}`} className={cardClass}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
              <FileCheck2 className="h-4 w-4" />
            </span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Portfolio</p>
            <p className="mt-2 text-sm font-extrabold leading-6 text-ink">Simulated proof-of-work brief</p>
            <p className="mt-1 text-xs leading-5 text-muted">Matched to {portfolio.roleTitle}.</p>
            <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-extrabold text-blue-700">
              Build one proof project <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
