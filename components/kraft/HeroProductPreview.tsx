import Link from "next/link";
import { ArrowUpRight, BookOpen, FileCheck2, GitBranch, Target, type LucideIcon } from "lucide-react";
import { getRoleBySlug } from "@/data/roles";
import { getGlossaryTermBySlug } from "@/data/glossary";
import { getRoadmapDetail } from "@/data/roadmapDetail";
import { getPortfolioProjectBySlug } from "@/data/portfolioProjects";

// Static preview of real product content - no auto-cycling, no invented
// percentages or progress. Every card links to a real route, and every value in
// the two-column footer is a real field or a real derived count.
const featuredRoleSlug = "community-manager";
const featuredGlossarySlug = "tvl";
const featuredRoadmapLaneSlug = "community-growth";

type PreviewCard = {
  href: string;
  eyebrow: string;
  Icon: LucideIcon;
  blurb: string;
  title: string;
  meta: { value: string; label: string }[];
  cta: string;
  accent?: boolean;
};

function Card({ card }: { card: PreviewCard }) {
  const { Icon } = card;
  return (
    <Link
      href={card.href}
      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-[var(--navy)] p-3 text-left shadow-[0_24px_60px_rgba(6,16,38,0.34)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(6,16,38,0.45)] focus-visible:-translate-y-1.5"
    >
      {/* Decorative corner grid. Must be a child element: .pixel-accent is
          absolutely positioned and 44x44, so as a class on the card itself it
          would collapse the card. */}
      {card.accent && <span className="pixel-accent" aria-hidden="true" />}

      {/* Header row: label sits on the dark card, the icon tile is the raised
          top-right step of the blue panel below it. */}
      <div className="relative flex items-end justify-between gap-3 pl-2">
        <span className="pb-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/65">
          {card.eyebrow}
        </span>
        <span className="flex items-center gap-2 rounded-t-[18px] bg-[var(--blue)] px-4 py-2.5">
          <Icon className="h-4 w-4 text-white" strokeWidth={2.2} aria-hidden="true" />
          <ArrowUpRight
            className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Blue panel - square top-right corner so it reads as one stepped shape
          with the icon tile above. */}
      <div className="rounded-[18px] rounded-tr-none bg-[var(--blue)] p-4">
        <p className="text-sm leading-6 text-white">{card.blurb}</p>
      </div>

      <h3 className="mt-5 px-2 text-center text-base font-extrabold leading-snug tracking-tight text-white">
        {card.title}
      </h3>

      <div className="mt-4 grid grid-cols-2 divide-x divide-white/15 border-t border-white/12 pt-4">
        {card.meta.map((item) => (
          <div key={item.label} className="px-2 text-center">
            <p className="text-sm font-extrabold leading-tight text-white">{item.value}</p>
            <p className="mt-1 text-[11px] leading-tight text-white/55">{item.label}</p>
          </div>
        ))}
      </div>

      <span className="mt-4 inline-flex items-center justify-center gap-1 px-2 pb-1 text-xs font-extrabold text-white/80 transition group-hover:text-white">
        {card.cta}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function HeroProductPreview() {
  const role = getRoleBySlug(featuredRoleSlug);
  const term = getGlossaryTermBySlug(featuredGlossarySlug);
  const roadmap = getRoadmapDetail(featuredRoadmapLaneSlug);
  const portfolio = getPortfolioProjectBySlug(featuredRoleSlug);

  const cards: PreviewCard[] = [];

  if (role) {
    cards.push({
      href: `/roles/${role.slug}`,
      eyebrow: "Role Guide",
      Icon: Target,
      blurb: role.summary,
      title: role.title,
      meta: [
        { value: role.level, label: "Entry level" },
        { value: role.mode, label: "Work style" },
      ],
      cta: "Open role guide",
      accent: true,
    });
  }

  if (roadmap) {
    cards.push({
      href: `/roadmaps/${roadmap.laneSlug}`,
      eyebrow: "Roadmap",
      Icon: GitBranch,
      blurb: "A planning guide, not a guaranteed job path.",
      title: roadmap.lane,
      meta: [
        { value: roadmap.difficulty, label: "Starting point" },
        { value: `${roadmap.milestones.length}`, label: "Milestones" },
      ],
      cta: "Explore this lane",
    });
  }

  if (term) {
    cards.push({
      href: `/glossary/${term.slug}`,
      eyebrow: "Glossary",
      Icon: BookOpen,
      blurb: term.commonTrap,
      title: term.term,
      meta: [
        { value: term.category, label: "Category" },
        { value: `${term.relatedTerms.length}`, label: "Related terms" },
      ],
      cta: "Open term",
    });
  }

  if (portfolio) {
    cards.push({
      href: `/portfolio/${portfolio.slug}`,
      eyebrow: "Portfolio",
      Icon: FileCheck2,
      blurb: `Matched to ${portfolio.roleTitle}.`,
      title: "Simulated proof-of-work brief",
      meta: [
        { value: portfolio.lane, label: "Career lane" },
        { value: `${portfolio.deliverables.length}`, label: "Deliverables" },
      ],
      cta: "Build one proof project",
    });
  }

  return (
    <div className="relative z-10 mx-auto mt-12 w-full max-w-[1500px]" aria-label="Product preview cards">
      <p className="relative z-20 mx-auto mb-8 w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
        What KRAFT actually contains
      </p>
      {/* 4-across only from xl: at lg the four columns fall to ~185px, which is
          too narrow for the title and the two-column footer. */}
      <div className="relative z-10 grid justify-center gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.eyebrow} card={card} />
        ))}
      </div>
    </div>
  );
}
