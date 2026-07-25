"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";

export type DirectoryRole = {
  slug: string;
  title: string;
  lane: string;
  level: string;
  mode: string;
  summary: string;
  altTitles: string[];
  employmentModels: string[];
  tags: string[];
};

const WORK_STYLES = ["All", "No-code", "Hybrid", "Technical"] as const;
const ENTRY_LEVELS = ["All", "Entry-friendly", "Entry to mid", "Mid", "Advanced"] as const;

function normalizeLane(value: string | null) {
  if (!value) return "All";
  if (value === "Technical") return "Technical & Security";
  if (value === "Creative & Design") return "Creative";
  return value;
}

const selectClass =
  "w-full rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function RolesDirectory({ roles }: { roles: DirectoryRole[] }) {
  const lanes = useMemo(() => Array.from(new Set(roles.map((r) => r.lane))), [roles]);
  const employmentModels = useMemo(
    () => Array.from(new Set(roles.flatMap((r) => r.employmentModels))).sort(),
    [roles]
  );

  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<string>(() => {
    if (typeof window === "undefined") return "All";
    return normalizeLane(new URLSearchParams(window.location.search).get("lane"));
  });
  const [workStyle, setWorkStyle] = useState<string>("All");
  const [entryLevel, setEntryLevel] = useState<string>("All");
  const [employment, setEmployment] = useState<string>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roles.filter((role) => {
      const searchText = `${role.title} ${role.altTitles.join(" ")}`.toLowerCase();
      return (
        (!q || searchText.includes(q)) &&
        (lane === "All" || role.lane === lane) &&
        (workStyle === "All" || role.mode === workStyle) &&
        (entryLevel === "All" || role.level === entryLevel) &&
        (employment === "All" || role.employmentModels.includes(employment))
      );
    });
  }, [roles, query, lane, workStyle, entryLevel, employment]);

  const resetFilters = () => {
    setQuery("");
    setLane("All");
    setWorkStyle("All");
    setEntryLevel("All");
    setEmployment("All");
  };

  const activeFilterChips = [
    lane !== "All" && { key: "lane", label: lane, clear: () => setLane("All") },
    workStyle !== "All" && { key: "workStyle", label: workStyle, clear: () => setWorkStyle("All") },
    entryLevel !== "All" && { key: "entryLevel", label: entryLevel, clear: () => setEntryLevel("All") },
    employment !== "All" && { key: "employment", label: employment, clear: () => setEmployment("All") },
  ].filter((chip): chip is { key: string; label: string; clear: () => void } => Boolean(chip));

  const hasActiveFilters = query !== "" || activeFilterChips.length > 0;

  return (
    <div className="space-y-8">
      <div className="card-surface p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search roles by title or alternative title</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles and alternative titles"
            className="w-full rounded-2xl border border-border bg-soft py-3 pl-11 pr-4 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          />
        </label>

        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          className="mt-3 flex w-full items-center justify-between rounded-2xl border border-border bg-elevated px-4 py-2.5 text-sm font-extrabold text-ink sm:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters {activeFilterChips.length > 0 && `(${activeFilterChips.length})`}
          </span>
          <span className="text-muted">{filtersOpen ? "Hide" : "Show"}</span>
        </button>

        <div className={`${filtersOpen ? "grid" : "hidden"} mt-3 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4`}>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Career lane</span>
            <select value={lane} onChange={(event) => setLane(event.target.value)} className={selectClass}>
              <option value="All">All lanes</option>
              {lanes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Work style</span>
            <select value={workStyle} onChange={(event) => setWorkStyle(event.target.value)} className={selectClass}>
              {WORK_STYLES.map((item) => (
                <option key={item} value={item}>{item === "All" ? "All work styles" : item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Entry level</span>
            <select value={entryLevel} onChange={(event) => setEntryLevel(event.target.value)} className={selectClass}>
              {ENTRY_LEVELS.map((item) => (
                <option key={item} value={item}>{item === "All" ? "All entry levels" : item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Employment model</span>
            <select value={employment} onChange={(event) => setEmployment(event.target.value)} className={selectClass}>
              <option value="All">All models</option>
              {employmentModels.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        {activeFilterChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Active:</span>
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                className="inline-flex items-center gap-1.5 rounded-full bg-highlight px-3 py-1 text-xs font-extrabold text-blue-700 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {chip.label}
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-bold text-muted" aria-live="polite">
          <span className="text-lg font-extrabold text-ink">{filtered.length}</span> of {roles.length} roles
        </p>
        <button
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className="rounded-full border border-border-strong bg-elevated px-4 py-2 text-sm font-extrabold text-ink transition hover:border-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset filters
        </button>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((role) => (
            <Link
              key={role.slug}
              href={`/roles/${role.slug}`}
              className="card-surface card-surface--interactive group flex h-full flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-blue-100 bg-highlight px-3 py-1 text-xs font-extrabold text-blue-700">{role.lane}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{role.title}</h3>
              {role.altTitles.length > 0 && (
                <p className="mt-0.5 text-xs leading-5 text-muted">Also: {role.altTitles.slice(0, 2).join(", ")}</p>
              )}
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{role.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="tag">{role.level}</span>
                <span className="tag">{role.mode}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card-surface p-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink">Nothing matches these filters yet.</h2>
          <p className="mt-3 text-muted">Try removing one filter, browse the full directory, or open a related role.</p>
          <button type="button" onClick={resetFilters} className="btn-primary mt-6">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
