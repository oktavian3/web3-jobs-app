"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type InterviewCategory = string;

export type ExplorerQuestion = { question: string; category: InterviewCategory };
export type ExplorerSet = {
  slug: string;
  roleTitle: string;
  lane: string;
  whatItTests: string[];
  questions: ExplorerQuestion[];
  weakPatterns: string[];
  questionCount: number;
};
export type ExplorerFramework = {
  strongAnswer: string[];
  weakAnswer: string[];
  selfReview: string[];
  commonFollowUps: string[];
};

const selectClass =
  "w-full rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function InterviewPrepExplorer({
  sets,
  lanes,
  framework,
  initialSlug,
}: {
  sets: ExplorerSet[];
  lanes: string[];
  framework: ExplorerFramework;
  initialSlug?: string;
}) {
  const initialSet = initialSlug ? sets.find((s) => s.slug === initialSlug) : undefined;
  const [lane, setLane] = useState<string>(initialSet?.lane ?? lanes[0] ?? "");
  const rolesInLane = useMemo(() => sets.filter((s) => s.lane === lane), [sets, lane]);
  const [slug, setSlug] = useState<string>(() => initialSet?.slug ?? rolesInLane[0]?.slug ?? sets[0]?.slug ?? "");

  // Keep the selected role valid when the lane changes.
  const activeSet = sets.find((s) => s.slug === slug) ?? rolesInLane[0] ?? sets[0];
  const effectiveSlug = activeSet?.slug ?? "";

  const categories = useMemo(
    () => Array.from(new Set((activeSet?.questions ?? []).map((q) => q.category))),
    [activeSet]
  );
  const [category, setCategory] = useState<string>("All");
  const visibleQuestions = (activeSet?.questions ?? []).filter(
    (q) => category === "All" || q.category === category
  );

  const onLaneChange = (value: string) => {
    setLane(value);
    const first = sets.find((s) => s.lane === value);
    if (first) setSlug(first.slug);
    setCategory("All");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="card-surface p-4 sm:p-5">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Career lane</span>
            <select value={lane} onChange={(e) => onLaneChange(e.target.value)} className={selectClass}>
              {lanes.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Role</span>
            <select value={effectiveSlug} onChange={(e) => { setSlug(e.target.value); setCategory("All"); }} className={selectClass}>
              {rolesInLane.map((s) => (
                <option key={s.slug} value={s.slug}>{s.roleTitle}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="card-surface p-4 sm:p-5">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">How a strong answer works</h2>
          <ul className="mt-3 space-y-2">
            {framework.strongAnswer.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-6 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-muted">A framework to reason with, not a script to memorize. Interview processes differ by company.</p>
        </div>
      </aside>

      {activeSet && (
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{activeSet.roleTitle}</h2>
            <div className="mt-3 space-y-3">
              {activeSet.whatItTests.map((p, i) => (
                <p key={i} className="text-base leading-7 text-muted">{p}</p>
              ))}
            </div>
            <Link
              href={`/roles/${activeSet.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Open the {activeSet.roleTitle} role guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter questions by category">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-2 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  category === c ? "bg-blue-600 text-white" : "bg-soft text-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ol className="space-y-3">
            {visibleQuestions.map((q, i) => (
              <li key={i} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-blue-700">{q.category}</span>
                </div>
                <p className="mt-3 text-base font-bold leading-7 text-ink">{q.question}</p>
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Common follow-ups</p>
                  <ul className="mt-2 space-y-1">
                    {framework.commonFollowUps.map((f, j) => (
                      <li key={j} className="text-sm leading-6 text-muted">{f}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-soft p-4 sm:p-5">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">Weak-answer patterns</h3>
              <ul className="mt-3 space-y-2">
                {[...framework.weakAnswer, ...activeSet.weakPatterns].map((item, i) => (
                  <li key={i} className="text-sm leading-6 text-ink">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">Self-review after practicing</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {framework.selfReview.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
              <Link
                href={`/portfolio/${activeSet.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Build proof for these answers <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
