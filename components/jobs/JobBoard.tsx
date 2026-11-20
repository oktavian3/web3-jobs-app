"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { parseAsArrayOf, parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import JobRow from "./JobRow";
import { useSavedJobs } from "./useSavedJobs";
import type { PublicJob } from "@/lib/jobs/types";

const SORTS = ["newest", "oldest", "company"] as const;

const filterParsers = {
  q: parseAsString.withDefault(""),
  lane: parseAsArrayOf(parseAsString).withDefault([]),
  work: parseAsArrayOf(parseAsString).withDefault([]),
  level: parseAsArrayOf(parseAsString).withDefault([]),
  saved: parseAsBoolean.withDefault(false),
  sort: parseAsStringLiteral(SORTS).withDefault("newest"),
};

function count<T>(items: T[], key: (t: T) => string) {
  const m = new Map<string, number>();
  items.forEach((i) => m.set(key(i), (m.get(key(i)) ?? 0) + 1));
  return m;
}

function CheckRow({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-[10px] px-2 text-[14px] text-ink hover:bg-soft">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <span
        aria-hidden="true"
        className="grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border border-border-strong bg-surface text-white peer-checked:border-blue peer-checked:bg-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue"
      >
        {checked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
      </span>
      <span className="flex-1">{label}</span>
      <span className="font-mono text-[11.5px] text-muted">{count}</span>
    </label>
  );
}

export default function JobBoard({ jobs, roleTitles }: { jobs: PublicJob[]; roleTitles: Record<string, string> }) {
  const [f, setF] = useQueryStates(filterParsers, { history: "replace", shallow: true, throttleMs: 150 });
  const { saved } = useSavedJobs();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = drawerRef.current;
    if (!d) return;
    if (drawerOpen && !d.open) d.showModal();
    if (!drawerOpen && d.open) d.close();
  }, [drawerOpen]);

  const fuse = useMemo(
    () =>
      new Fuse(
        jobs.map((j) => ({ ...j, roleTitle: j.roleSlug ? roleTitles[j.roleSlug] ?? "" : "" })),
        { keys: [{ name: "title", weight: 3 }, { name: "company", weight: 2 }, "lane", "roleTitle", "tags"], threshold: 0.34, ignoreLocation: true },
      ),
    [jobs, roleTitles],
  );

  const searched = useMemo(() => (f.q.trim() ? fuse.search(f.q.trim()).map((r) => r.item as PublicJob) : jobs), [f.q, fuse, jobs]);

  const laneCounts = useMemo(() => count(searched, (j) => j.lane), [searched]);
  const workCounts = useMemo(() => count(searched, (j) => j.workType), [searched]);
  const levelCounts = useMemo(() => count(searched, (j) => j.seniority), [searched]);
  const lanes = useMemo(() => [...new Set(jobs.map((j) => j.lane))], [jobs]);
  const works = useMemo(() => [...new Set(jobs.map((j) => j.workType))], [jobs]);
  const levels = useMemo(() => [...new Set(jobs.map((j) => j.seniority))].sort(), [jobs]);

  const results = useMemo(() => {
    let r = searched.filter(
      (j) =>
        (!f.lane.length || f.lane.includes(j.lane)) &&
        (!f.work.length || f.work.includes(j.workType)) &&
        (!f.level.length || f.level.includes(j.seniority)) &&
        (!f.saved || saved.includes(j.id)),
    );
    if (!f.q.trim() || f.sort !== "newest") {
      r = [...r].sort((a, b) =>
        f.sort === "company" ? a.company.localeCompare(b.company) : f.sort === "oldest" ? a.postedAt.localeCompare(b.postedAt) : b.postedAt.localeCompare(a.postedAt),
      );
    }
    return r;
  }, [searched, f.lane, f.work, f.level, f.saved, f.sort, f.q, saved]);

  const toggle = (key: "lane" | "work" | "level", value: string) =>
    setF({ [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] });

  const activeChips = [
    ...f.lane.map((v) => ({ key: "lane" as const, v })),
    ...f.work.map((v) => ({ key: "work" as const, v })),
    ...f.level.map((v) => ({ key: "level" as const, v })),
  ];
  const activeCount = activeChips.length + (f.saved ? 1 : 0);
  const clearAll = () => setF({ q: "", lane: [], work: [], level: [], saved: false });

  const filters = (
    <div className="space-y-7">
      <fieldset>
        <legend className="eyebrow mb-2 px-2">Career lane</legend>
        {lanes.map((l) => (
          <CheckRow key={l} label={l} count={laneCounts.get(l) ?? 0} checked={f.lane.includes(l)} onChange={() => toggle("lane", l)} />
        ))}
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2 px-2">Work type</legend>
        {works.map((w) => (
          <CheckRow key={w} label={w} count={workCounts.get(w) ?? 0} checked={f.work.includes(w)} onChange={() => toggle("work", w)} />
        ))}
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2 px-2">Seniority</legend>
        {levels.map((l) => (
          <CheckRow key={l} label={l} count={levelCounts.get(l) ?? 0} checked={f.level.includes(l)} onChange={() => toggle("level", l)} />
        ))}
      </fieldset>
      <fieldset className="rounded-[16px] border border-border bg-elevated p-3">
        <legend className="sr-only">Saved</legend>
        <CheckRow label="Saved only" count={saved.length} checked={f.saved} onChange={() => setF({ saved: !f.saved })} />
        <p className="mt-1 px-2 text-[12px] leading-[1.5] text-muted">Saved jobs stay in this browser.</p>
      </fieldset>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-24">{filters}</div>
      </aside>

      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-[14px] border border-border bg-surface px-4 shadow-card focus-within:border-blue focus-within:outline focus-within:outline-2 focus-within:outline-blue/30">
            <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <span className="sr-only">Search opportunities</span>
            <input
              type="search"
              value={f.q}
              onChange={(e) => setF({ q: e.target.value || null })}
              placeholder={`Search ${jobs.length} opportunities by title, company, or role`}
              className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
            />
            {f.q ? (
              <button type="button" onClick={() => setF({ q: null })} className="grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-soft" aria-label="Clear search">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </label>
          <label className="hidden sm:block">
            <span className="sr-only">Sort</span>
            <select
              value={f.sort}
              onChange={(e) => setF({ sort: e.target.value as (typeof SORTS)[number] })}
              className="h-12 rounded-[14px] border border-border bg-surface px-3 text-[13.5px] text-ink"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="company">Company A–Z</option>
            </select>
          </label>
          <button type="button" onClick={() => setDrawerOpen(true)} className="btn-ink !h-12 !rounded-[14px] lg:!hidden" aria-haspopup="dialog">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>

        <div className="mt-4 flex min-h-8 flex-wrap items-center gap-2 text-[13px]">
          {activeChips.map(({ key, v }) => (
            <button
              key={key + v}
              type="button"
              onClick={() => toggle(key, v)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border-strong bg-highlight pl-3 pr-2 text-blue-deep"
              aria-label={`Remove filter ${v}`}
            >
              {v} <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
          {f.saved ? (
            <button type="button" onClick={() => setF({ saved: false })} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border-strong bg-highlight pl-3 pr-2 text-blue-deep" aria-label="Remove filter Saved only">
              Saved only <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
          <p className="text-muted" aria-live="polite">
            Showing <b className="font-medium text-ink">{results.length}</b> of {jobs.length}
          </p>
          {activeCount || f.q ? (
            <button type="button" onClick={clearAll} className="ml-auto rounded-full px-2 py-1 text-muted underline-offset-4 hover:text-ink hover:underline">
              Clear all
            </button>
          ) : null}
        </div>

        <h2 className="sr-only">Opportunities</h2>
        {results.length ? (
          <ul className="mt-4 overflow-hidden rounded-[20px] border border-border bg-surface shadow-card" aria-label="Opportunities">
            {results.map((job) => (
              <JobRow key={job.id} job={job} roleTitle={job.roleSlug ? roleTitles[job.roleSlug] : undefined} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-[20px] border border-dashed border-border-strong bg-soft px-6 py-12 text-center">
            <h3 className="text-[19px] font-medium tracking-[-0.02em] text-ink">{f.saved && !saved.length ? "No saved jobs yet." : "No opportunities match these filters."}</h3>
            <p className="mx-auto mt-2 max-w-md text-[14px] leading-[1.6] text-muted">
              {f.saved && !saved.length ? "Use the bookmark on any job to keep it here." : "Try a broader search, or browse the job boards tab for more sources."}
            </p>
            <button type="button" onClick={clearAll} className="btn-secondary mt-6">
              Clear all
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={drawerRef}
        onClose={() => setDrawerOpen(false)}
        onClick={(e) => {
          if (e.target === drawerRef.current) setDrawerOpen(false);
        }}
        aria-label="Filters"
        className="m-0 mt-auto max-h-[88dvh] w-full max-w-none rounded-t-[24px] bg-transparent p-0 backdrop:bg-ink/40"
      >
        <div className="sheet-panel--bottom flex max-h-[88dvh] flex-col rounded-t-[24px] bg-canvas">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-[17px] font-medium">Filters</span>
            <button type="button" onClick={() => setDrawerOpen(false)} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Close filters">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-y-auto px-3 py-5">{filters}</div>
          <div className="flex gap-2 border-t border-border p-4">
            <button type="button" onClick={clearAll} className="btn-secondary flex-1">
              Clear all
            </button>
            <button type="button" onClick={() => setDrawerOpen(false)} className="btn-primary flex-[2]">
              Show {results.length} results
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
