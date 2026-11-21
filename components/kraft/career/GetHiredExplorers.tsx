"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, CircleCheck, Copy, FileText, Lightbulb, Target, TriangleAlert } from "lucide-react";
import type { HiringPath, JourneyStage } from "@/data/hiringJourney";
import type { HiringGuide } from "@/data/hiringGuides";

/* ── helpers ──────────────────────────────────────────────────────────── */

const HASH_EVENT = "kraft:hash-change";

function useHash() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      window.addEventListener(HASH_EVENT, cb);
      return () => {
        window.removeEventListener("hashchange", cb);
        window.removeEventListener(HASH_EVENT, cb);
      };
    },
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );
}

function replaceHash(h: string) {
  try {
    window.history.replaceState(null, "", `#${h}`);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(HASH_EVENT));
}

/** Roving tablist keyboard handling (Left/Right/Home/End). */
function onTabKey(e: React.KeyboardEvent, i: number, n: number, go: (i: number) => void, idPrefix: string, vertical = false) {
  const next = { ArrowRight: 1, ArrowDown: vertical ? 1 : 0, ArrowLeft: -1, ArrowUp: vertical ? -1 : 0 }[e.key];
  let to: number | null = null;
  if (next) to = (i + next + n) % n;
  if (e.key === "Home") to = 0;
  if (e.key === "End") to = n - 1;
  if (to === null) return;
  e.preventDefault();
  go(to);
  document.getElementById(`${idPrefix}-${to}`)?.focus();
}

/* ── progress (localStorage, per browser) ─────────────────────────────── */

const DONE_KEY = "kraft:get-hired-done";
const DONE_EVENT = "kraft:get-hired-done-change";
const EMPTY: number[] = [];
let doneCache: { raw: string | null; ids: number[] } = { raw: null, ids: EMPTY };

function readDone(): number[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(DONE_KEY);
  } catch {
    return doneCache.ids;
  }
  if (raw === doneCache.raw) return doneCache.ids;
  let ids: number[] = EMPTY;
  try {
    const p = raw ? JSON.parse(raw) : [];
    ids = Array.isArray(p) ? p.filter((x) => typeof x === "number") : EMPTY;
  } catch {
    ids = EMPTY;
  }
  doneCache = { raw, ids };
  return ids;
}

function useDone() {
  const done = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      window.addEventListener(DONE_EVENT, cb);
      return () => {
        window.removeEventListener("storage", cb);
        window.removeEventListener(DONE_EVENT, cb);
      };
    },
    readDone,
    () => EMPTY,
  );
  const toggle = useCallback((id: number) => {
    const cur = readDone();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try {
      window.localStorage.setItem(DONE_KEY, JSON.stringify(next));
    } catch {
      toast.error("Couldn't save progress - browser storage is blocked.");
      return;
    }
    window.dispatchEvent(new Event(DONE_EVENT));
  }, []);
  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(DONE_KEY);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(DONE_EVENT));
  }, []);
  return { done, toggle, reset };
}

/* ── 1. Starting paths ────────────────────────────────────────────────── */

export function PathPicker({ paths }: { paths: HiringPath[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-card">
      <div role="tablist" aria-label="Starting path" className="grid border-b border-border sm:grid-cols-3">
        {paths.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.id}
              id={`path-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`path-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i, paths.length, setActive, "path-tab")}
              className={`relative flex items-start gap-3 px-5 py-4 text-left transition-colors sm:py-5 ${i ? "border-t border-border sm:border-l sm:border-t-0" : ""} ${
                on ? "bg-highlight" : "hover:bg-elevated"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[13px] ${on ? "bg-blue text-white" : "border border-border bg-soft text-muted"}`}
                aria-hidden="true"
              >
                {p.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[15.5px] font-medium tracking-[-0.01em] text-ink">{p.title}</span>
                <span className={`mt-0.5 block text-[13px] leading-[1.45] ${on ? "text-ink/75" : "text-muted"}`}>{p.whoItIsFor}</span>
              </span>
              {on ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
      {paths.map((p, i) => (
        <div key={p.id} id={`path-panel-${i}`} role="tabpanel" aria-labelledby={`path-tab-${i}`} hidden={i !== active} className="p-5 sm:p-7">
          <ol className={`grid gap-3 ${p.steps.length > 3 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {p.steps.map((step, k) => (
              <li key={k} className="relative rounded-[16px] border border-border bg-elevated p-4">
                <span className="font-mono text-[11.5px] text-blue-deep">0{k + 1}</span>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-ink">{step}</p>
                {k < p.steps.length - 1 ? (
                  <ArrowRight className="absolute -right-[13px] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-surface text-border-strong md:block" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 flex gap-2.5 rounded-[14px] border border-border-strong bg-highlight px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-deep" aria-hidden="true" />
            {p.note}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── 2. 13-stage journey ──────────────────────────────────────────────── */

const PHASES: { label: string; from: number; to: number }[] = [
  { label: "Discover & learn", from: 1, to: 4 },
  { label: "Build & prove", from: 5, to: 7 },
  { label: "Position & apply", from: 8, to: 10 },
  { label: "Interview & onboard", from: 11, to: 13 },
];

export function JourneyExplorer({ stages }: { stages: JourneyStage[] }) {
  const hash = useHash();
  const [last, setLast] = useState(0);
  const { done, toggle, reset } = useDone();

  // Deep links (#stage-5) select a stage; otherwise keep the last one picked.
  const m = /^stage-(\d+)$/.exec(hash);
  const fromHash = m ? stages.findIndex((s) => s.id === Number(m[1])) : -1;
  const active = fromHash >= 0 ? fromHash : last;

  const go = useCallback(
    (i: number, scroll = false) => {
      setLast(i);
      replaceHash(`stage-${stages[i].id}`);
      if (scroll) document.getElementById("journey-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [stages],
  );

  const pct = Math.round((done.length / stages.length) * 100);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
      {/* Stage navigator */}
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[20px] border border-border bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Your progress</p>
            <p className="font-mono text-[12px] text-ink" aria-live="polite">
              {done.length}/{stages.length}
            </p>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-soft" role="progressbar" aria-label="Stages done" aria-valuenow={done.length} aria-valuemin={0} aria-valuemax={stages.length}>
            <div className="h-full rounded-full bg-blue transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-[12px] text-muted">
            Saved in this browser.{" "}
            {done.length ? (
              <button type="button" onClick={reset} className="underline underline-offset-2 hover:text-ink">
                Reset
              </button>
            ) : null}
          </p>
        </div>

        {/* Mobile: horizontal stage chips */}
        <div role="tablist" aria-label="Journey stages" className="no-scrollbar -mx-5 mt-4 flex gap-1.5 overflow-x-auto px-5 lg:hidden">
          {stages.map((s, i) => {
            const on = i === active;
            const isDone = done.includes(s.id);
            return (
              <button
                key={s.id}
                id={`stage-tab-m-${i}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="journey-panel"
                aria-label={`Stage ${s.id}: ${s.title}${isDone ? " (done)" : ""}`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => onTabKey(e, i, stages.length, go, "stage-tab-m")}
                className={`grid h-10 min-w-10 shrink-0 place-items-center rounded-full px-3 font-mono text-[13px] transition-colors ${
                  on ? "bg-ink text-white" : isDone ? "bg-blue-soft text-blue-deep" : "border border-border bg-surface text-muted"
                }`}
              >
                {isDone && !on ? <Check className="h-4 w-4" aria-hidden="true" /> : String(s.id).padStart(2, "0")}
              </button>
            );
          })}
        </div>

        {/* Desktop: grouped vertical list */}
        <div role="tablist" aria-orientation="vertical" aria-label="Journey stages" className="mt-4 hidden space-y-4 lg:block">
          {PHASES.map((ph) => (
            <div key={ph.label}>
              <p className="eyebrow mb-1.5 px-3 !text-[10.5px]">{ph.label}</p>
              <div className="space-y-0.5">
                {stages
                  .map((s, i) => ({ s, i }))
                  .filter(({ s }) => s.id >= ph.from && s.id <= ph.to)
                  .map(({ s, i }) => {
                    const on = i === active;
                    const isDone = done.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        id={`stage-tab-${i}`}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        aria-controls="journey-panel"
                        tabIndex={on ? 0 : -1}
                        onClick={() => go(i)}
                        onKeyDown={(e) => onTabKey(e, i, stages.length, go, "stage-tab", true)}
                        className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-[13.5px] leading-[1.35] transition-colors ${
                          on ? "bg-surface text-ink shadow-card ring-1 ring-border" : "text-muted hover:bg-surface hover:text-ink"
                        }`}
                      >
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10.5px] ${
                            isDone ? "bg-blue text-white" : on ? "bg-ink text-white" : "border border-border bg-surface"
                          }`}
                          aria-hidden="true"
                        >
                          {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.id}
                        </span>
                        <span className="min-w-0 flex-1">{s.title}</span>
                        {isDone ? <span className="sr-only">(done)</span> : null}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage detail */}
      <div id="journey-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className="min-w-0 scroll-mt-24">
        {stages.map((s, i) => (
          <article key={s.id} id={`stage-${s.id}`} hidden={i !== active} className="scroll-mt-24 overflow-hidden rounded-[22px] border border-border bg-surface shadow-card">
            <header className="border-b border-border bg-elevated p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[12px] text-blue-deep">
                  Stage {s.id} of {stages.length} · {PHASES.find((p) => s.id >= p.from && s.id <= p.to)?.label}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const wasDone = done.includes(s.id);
                    toggle(s.id);
                    if (!wasDone && i < stages.length - 1) toast.success(`Stage ${s.id} done`, { action: { label: "Next stage", onClick: () => go(i + 1, true) } });
                  }}
                  aria-pressed={done.includes(s.id)}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors ${
                    done.includes(s.id) ? "bg-blue text-white" : "border border-border bg-surface text-ink hover:border-border-strong"
                  }`}
                >
                  <CircleCheck className="h-4 w-4" aria-hidden="true" />
                  {done.includes(s.id) ? "Done" : "Mark as done"}
                </button>
              </div>
              <h3 className="mt-3 text-[26px] font-medium leading-[1.1] tracking-[-0.035em] text-ink sm:text-[32px]">{s.title}</h3>
              <p className="mt-3 max-w-[640px] text-[15.5px] leading-[1.6] text-muted">{s.objective}</p>
            </header>

            <div className="grid gap-px bg-border md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <section className="bg-surface p-6 sm:p-8">
                <h4 className="eyebrow">What to do</h4>
                <ol className="mt-4 space-y-3">
                  {s.whatToDo.map((item, k) => (
                    <li key={k} className="flex gap-3 text-[14.5px] leading-[1.55] text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-soft font-mono text-[10.5px] text-blue-deep" aria-hidden="true">
                        {k + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
              <div className="grid gap-px bg-border">
                <section className="bg-surface p-5 sm:p-6">
                  <h4 className="flex items-center gap-2 text-[13px] font-medium text-blue-deep">
                    <Target className="h-4 w-4" aria-hidden="true" /> Expected output
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-ink">{s.expectedOutput}</p>
                </section>
                <section className="bg-surface p-5 sm:p-6">
                  <h4 className="flex items-center gap-2 text-[13px] font-medium text-amber-700">
                    <TriangleAlert className="h-4 w-4" aria-hidden="true" /> Common mistake
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-ink">{s.commonMistake}</p>
                </section>
                <section className="bg-surface p-5 sm:p-6">
                  <h4 className="flex items-center gap-2 text-[13px] font-medium text-emerald-700">
                    <Check className="h-4 w-4" aria-hidden="true" /> Done when
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-ink">{s.completionSignal}</p>
                </section>
              </div>
            </div>

            <footer className="flex flex-wrap items-center gap-3 border-t border-border bg-elevated p-4 sm:px-8">
              <Link href={s.link.href} className="btn-ink !h-10 !text-[14px]">
                {s.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div className="ml-auto flex gap-2">
                <button type="button" onClick={() => go(i - 1, true)} disabled={i === 0} className="btn-secondary !h-10 !w-10 !px-0" aria-label="Previous stage">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(i + 1, true)} disabled={i === stages.length - 1} className="btn-secondary !h-10 !text-[14px]">
                  Next stage <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── 3. Application playbook ──────────────────────────────────────────── */

export function PlaybookExplorer({ guides }: { guides: HiringGuide[] }) {
  const hash = useHash();
  const [last, setLast] = useState(0);
  const slugs = useMemo(() => guides.map((g) => g.slug), [guides]);
  const fromHash = slugs.indexOf(hash);
  const active = fromHash >= 0 ? fromHash : last;

  // Deep links from other pages (#profile, #applications, ...) scroll to the playbook.
  useEffect(() => {
    if (slugs.includes(window.location.hash.slice(1))) document.getElementById("playbook")?.scrollIntoView({ block: "start" });
  }, [slugs]);

  const go = (i: number) => {
    setLast(i);
    replaceHash(guides[i].slug);
  };

  const copy = async (lines: string[]) => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success("Template copied");
    } catch {
      toast.error("Couldn't copy - select the text instead.");
    }
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-card">
      <div role="tablist" aria-label="Playbook topics" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border bg-elevated p-2.5">
        {guides.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.slug}
              id={`guide-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={g.slug}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => onTabKey(e, i, guides.length, go, "guide-tab")}
              className={`h-9 shrink-0 rounded-full px-3.5 text-[13.5px] transition-colors ${on ? "bg-ink text-white" : "text-muted hover:bg-soft hover:text-ink"}`}
            >
              {g.title}
            </button>
          );
        })}
      </div>

      {guides.map((g, i) => (
        <section
          key={g.slug}
          id={g.slug}
          role="tabpanel"
          aria-labelledby={`guide-tab-${i}`}
          hidden={i !== active}
          className="grid scroll-mt-28 gap-px bg-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="bg-surface p-6 sm:p-8">
            <h3 className="text-[24px] font-medium tracking-[-0.03em] text-ink">{g.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-ink/85">{g.guidance}</p>
            <figure className="mt-5 rounded-[14px] border-l-2 border-blue bg-highlight px-4 py-3">
              <figcaption className="eyebrow !text-[10.5px] !text-blue-deep">Example</figcaption>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-ink">{g.example}</p>
            </figure>
            <Link href={g.relatedTool.href} className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-deep underline-offset-4 hover:underline">
              {g.relatedTool.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-px bg-border">
            <div className="bg-surface p-6 sm:p-8">
              <h4 className="eyebrow">Checklist</h4>
              <ul className="mt-4 space-y-2">
                {g.checklist.map((item) => (
                  <li key={item} className="flex gap-3 rounded-[12px] border border-border bg-elevated px-3.5 py-2.5 text-[14px] leading-[1.5] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {g.template ? (
              <div className="bg-surface p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="eyebrow flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Template
                  </h4>
                  <button type="button" onClick={() => copy(g.template!)} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-[12.5px] text-ink hover:border-border-strong">
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" /> Copy
                  </button>
                </div>
                <pre className="mt-3 whitespace-pre-wrap rounded-[12px] bg-navy p-4 font-mono text-[12.5px] leading-[1.7] text-on-navy">{g.template.join("\n")}</pre>
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
