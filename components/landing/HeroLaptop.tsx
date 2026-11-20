"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Bookmark, Check, Search, ShieldCheck } from "lucide-react";

export type HeroJob = { id: string; title: string; company: string; workType: string; date: string; roleTitle?: string };

const STEPS = ["search", "detail", "verify", "sent"] as const;
type Step = (typeof STEPS)[number];
const STEP_MS = [3200, 2800, 3400, 2600];

const checks = [
  "Verify the company domain before applying.",
  "Never pay to apply or unlock an interview.",
  "Never share a seed phrase or private key.",
];

/** Decorative hero: a CSS-3D laptop whose screen loops through the KRAFT apply
 *  flow (search → job → safety check → applied) using real curated jobs.
 *  Pauses off-screen / in background tabs; static under reduced motion. */
export default function HeroLaptop({ jobs, query }: { jobs: HeroJob[]; query: string }) {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const step: Step = STEPS[i];
  const job = jobs[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);

    let t: number;
    let idx = 0;
    const tick = () => {
      if (visible && !document.hidden) {
        idx = (idx + 1) % STEPS.length;
        setI(idx);
        if (idx === 0) setTyped(0);
      }
      t = window.setTimeout(tick, STEP_MS[idx]);
    };
    t = window.setTimeout(tick, STEP_MS[0]);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  // typewriter for the search query at the start of each loop
  useEffect(() => {
    if (step !== "search" || typed >= query.length) return;
    const t = window.setTimeout(() => setTyped((n) => n + 1), 70);
    return () => window.clearTimeout(t);
  }, [step, typed, query.length]);

  if (!job) return null;

  return (
    <div ref={rootRef} className="laptop-stage" aria-hidden="true">
      <div className="laptop">
        {/* Lid */}
        <div className="laptop-lid">
          <div className="laptop-screen">
            {/* app chrome */}
            <div className="flex h-7 items-center gap-1.5 border-b border-border bg-elevated px-3">
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="h-2 w-2 rounded-full bg-border-strong" />
              <span className="mx-auto rounded-md bg-soft px-3 py-0.5 font-mono text-[9px] text-muted">
                usekraft.xyz/jobs{step === "search" ? "" : `/${job.id.slice(-6)}`}
              </span>
            </div>

            <div className="relative h-[calc(100%-1.75rem)] overflow-hidden">
              {/* Scene 1: search + results */}
              <div className={`laptop-scene ${step === "search" ? "is-on" : ""}`}>
                <div className="flex h-8 items-center gap-2 rounded-[9px] border border-border-strong bg-surface px-2.5 shadow-card">
                  <Search className="h-3 w-3 text-muted" />
                  <span className="text-[10.5px] text-ink">
                    {query.slice(0, typed)}
                    <span className="laptop-caret" />
                  </span>
                </div>
                <div className="mt-2.5 flex gap-1">
                  {["All", "Community & Growth", "Remote-friendly"].map((c, k) => (
                    <span key={c} className={`rounded-full px-2 py-0.5 text-[8.5px] ${k === 0 ? "bg-ink text-white" : "border border-border bg-surface text-muted"}`}>
                      {c}
                    </span>
                  ))}
                </div>
                <ul className="mt-2.5 overflow-hidden rounded-[10px] border border-border bg-surface">
                  {jobs.slice(0, 3).map((j, k) => (
                    <li
                      key={j.id}
                      className={`laptop-row flex items-center gap-2 border-t border-border px-2.5 py-2 first:border-t-0 ${k === 0 && typed >= query.length ? "is-hover" : ""}`}
                      style={{ animationDelay: `${k * 90}ms` }}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] border border-border bg-soft text-[9px] font-semibold">{j.company[0]}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[10px] font-medium text-ink">{j.title}</span>
                        <span className="block truncate text-[8.5px] text-muted">
                          {j.company} · {j.workType}
                        </span>
                      </span>
                      <span className="font-mono text-[8px] text-muted">{j.date}</span>
                      <Bookmark className="h-2.5 w-2.5 text-muted" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scene 2: job detail */}
              <div className={`laptop-scene ${step === "detail" ? "is-on" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] border border-border bg-surface text-[12px] font-semibold shadow-card">{job.company[0]}</span>
                  <div className="min-w-0">
                    <p className="text-[9px] text-muted">{job.company}</p>
                    <p className="text-[14px] font-medium leading-tight tracking-[-0.02em] text-ink">{job.title}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {[job.workType, "Not specified"].map((c) => (
                    <span key={c} className="rounded-full border border-border bg-surface px-2 py-0.5 text-[8.5px] text-ink">
                      {c}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-soft px-2 py-0.5 text-[8.5px] text-blue-deep">
                    <Check className="h-2 w-2" /> Selected by KRAFT.
                  </span>
                </div>
                <div className="mt-2.5 grid grid-cols-[1fr_92px] gap-2">
                  <div className="rounded-[10px] bg-navy p-2.5 text-on-navy">
                    <p className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-on-navy/60">Role guide</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium">
                      <BookOpen className="h-2.5 w-2.5" /> {job.roleTitle ?? "Role guide"}
                    </p>
                    <div className="mt-2 space-y-1">
                      {[78, 64, 70].map((w) => (
                        <span key={w} className="block h-1 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[10px] border border-border bg-surface p-2">
                    <span className="laptop-apply flex h-6 items-center justify-center gap-0.5 rounded-[7px] bg-blue text-[8.5px] font-medium text-white">
                      Apply <ArrowUpRight className="h-2 w-2" />
                    </span>
                    <span className="mt-1.5 flex h-5 items-center justify-center gap-1 rounded-[6px] border border-border bg-elevated text-[8px] text-ink">
                      <Bookmark className="h-2 w-2" /> Save
                    </span>
                  </div>
                </div>
                <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border">
                  {[
                    ["Location", "Not specified"],
                    ["Seniority", "Not specified"],
                    ["Source", "KRAFT Job Bot"],
                    ["Added", job.date],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-surface px-2.5 py-1.5">
                      <dt className="text-[7.5px] text-muted">{k}</dt>
                      <dd className="text-[9px] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Scene 3: safety sheet */}
              <div className={`laptop-scene laptop-scene--dim ${step === "verify" ? "is-on" : ""}`}>
                <div className="laptop-sheet absolute inset-x-6 bottom-0 rounded-t-[12px] border border-border bg-surface p-3 shadow-lift">
                  <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-border-strong" />
                  <p className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em] text-blue-deep">
                    <ShieldCheck className="h-2.5 w-2.5" /> Before you apply
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {checks.map((c, k) => (
                      <li key={c} className="laptop-check flex items-center gap-1.5 text-[9px] text-ink" style={{ animationDelay: `${350 + k * 450}ms` }}>
                        <span className="grid h-3 w-3 place-items-center rounded-full bg-blue text-white">
                          <Check className="h-2 w-2" strokeWidth={3} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-2.5 flex h-6 items-center justify-center gap-1 rounded-[7px] bg-blue text-[9px] font-medium text-white">
                    Apply on official site <ArrowUpRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>

              {/* Scene 4: tracked */}
              <div className={`laptop-scene grid place-items-center ${step === "sent" ? "is-on" : ""}`}>
                <div className="text-center">
                  <span className="laptop-pop mx-auto grid h-11 w-11 place-items-center rounded-full bg-blue text-white shadow-blue">
                    <Check className="h-5 w-5" strokeWidth={2.6} />
                  </span>
                  <p className="mt-2.5 text-[13px] font-medium tracking-[-0.02em] text-ink">Application tracked</p>
                  <p className="mt-0.5 text-[9.5px] text-muted">
                    {job.company} · {job.title}
                  </p>
                </div>
              </div>

              {/* cursor */}
              <span className={`laptop-cursor laptop-cursor--${step}`} />
            </div>
          </div>
        </div>
        {/* Base */}
        <div className="laptop-base">
          <div className="laptop-keys" />
          <div className="laptop-pad" />
        </div>
        <div className="laptop-shadow" />
      </div>

      {/* step indicator under the laptop */}
      <ol className="relative z-10 mx-auto mt-6 flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface/90 p-1 shadow-card backdrop-blur">
        {["Search", "Role guide", "Verify", "Apply"].map((s, k) => (
          <li key={s} className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] transition-colors duration-300 ${k === i ? "bg-ink text-white" : "text-muted"}`}>
            0{k + 1} {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
