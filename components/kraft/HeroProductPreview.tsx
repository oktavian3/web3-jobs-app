"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, FileCheck2, Target, Trophy } from "lucide-react";

const roleMatches = [
  { lane: "Community & Growth", percent: 82, href: "/skill-check" },
  { lane: "Content & Marketing", percent: 76, href: "/skill-check" },
  { lane: "Research & Data", percent: 69, href: "/skill-check" },
];

const glossaryTerms = [
  { term: "TVL", copy: "Useful context, but not proof of real users.", href: "/glossary?term=tvl" },
  { term: "FDV", copy: "A valuation shortcut that needs unlock context.", href: "/glossary?term=fdv" },
  { term: "Multisig", copy: "Shared approval for safer treasury actions.", href: "/glossary?term=multisig" },
  { term: "Proof of Work", copy: "A public sample showing how you think.", href: "/glossary?term=proof-of-work" },
];

export default function HeroProductPreview() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((value) => value + 1), 2600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const match = roleMatches[step % roleMatches.length];
  const term = glossaryTerms[step % glossaryTerms.length];
  const portfolioCount = useMemo(() => (step % 3) + 1, [step]);
  const readiness = 52 + ((step % 3) * 8);

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  const cardClass = "group relative overflow-hidden rounded-3xl border border-white/45 bg-white/92 p-4 text-left shadow-blue backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-white hover:shadow-[0_24px_70px_rgba(20,107,255,0.24)] focus-visible:-translate-y-1.5";

  return (
    <div className="relative z-10 mx-auto mt-12 max-w-5xl" aria-label="Product preview cards">
      <p className="mx-auto mb-4 w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
        Product preview
      </p>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={match.href} className={cardClass} {...pauseProps}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:rotate-6">
            <Target className="h-4 w-4" />
          </span>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Role Match</p>
          <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{match.lane}: {match.percent}% fit</p>
          <div className="mt-4 h-2 rounded-full bg-blue-50">
            <div className="h-full rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${match.percent}%` }} />
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Open Skill Check <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </Link>

        <Link href="/roadmaps" className={cardClass} {...pauseProps}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:scale-110">
            <Trophy className="h-4 w-4" />
          </span>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Readiness</p>
          <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{readiness}% ready. Improve proof packaging next.</p>
          <div className="mt-4 h-2 rounded-full bg-blue-50">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#146bff,#75caff)] transition-all duration-700" style={{ width: `${readiness}%` }} />
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Open Roadmaps <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </Link>

        <Link href={term.href} className={cardClass} {...pauseProps}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:-translate-y-0.5">
            <BookOpen className="h-4 w-4" />
          </span>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Glossary</p>
          <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{term.term}: {term.copy}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Open Term <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </Link>

        <Link href="/portfolio" className={cardClass} {...pauseProps}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:rotate-6">
            <FileCheck2 className="h-4 w-4" />
          </span>
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-muted">Portfolio</p>
          <p className="mt-2 text-sm font-extrabold leading-6 text-ink">{portfolioCount}/5 proof tasks drafted.</p>
          <div className="mt-4 grid gap-1.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <span key={item} className={`h-1.5 rounded-full transition-colors ${item <= portfolioCount ? "bg-blue-600" : "bg-blue-100"}`} />
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Open Portfolio <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </Link>
      </div>
    </div>
  );
}
