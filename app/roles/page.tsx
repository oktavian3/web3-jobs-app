"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { careerLanes, roles } from "@/data/roles";
import { RoleCard } from "@/components/kraft/Cards";
import { Shell, Container, SectionHeading, Card } from "@/components/kraft/Primitives";

const modes = ["All", "No-code", "Hybrid", "Technical"] as const;
const levels = ["All", "Entry-friendly", "Entry to mid", "Mid", "Advanced"] as const;
const skillTags = ["All", "Writing", "Community", "Data", "Product", "Design", "Engineering"] as const;

function normalizeLane(value: string | null) {
  if (value === "Technical") return "Technical & Security";
  // "Creative" is now the canonical lane label; legacy "Creative & Design" links normalize to it.
  if (value === "Creative & Design") return "Creative";
  return value ?? "All";
}

export default function RolesPage() {
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<string>(() => {
    if (typeof window === "undefined") return "All";
    return normalizeLane(new URLSearchParams(window.location.search).get("lane"));
  });
  const [mode, setMode] = useState<(typeof modes)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [tag, setTag] = useState<(typeof skillTags)[number]>("All");

  const filtered = useMemo(() => {
    return roles.filter((role) => {
      const text = `${role.title} ${role.summary} ${role.tags.join(" ")} ${role.mustHave.join(" ")}`.toLowerCase();
      return (
        (!query || text.includes(query.toLowerCase())) &&
        (lane === "All" || role.lane === lane) &&
        (mode === "All" || role.mode === mode) &&
        (level === "All" || role.level === level) &&
        (tag === "All" || text.includes(tag.toLowerCase()))
      );
    });
  }, [query, lane, mode, level, tag]);

  const clearFilters = () => {
    setQuery("");
    setLane("All");
    setMode("All");
    setLevel("All");
    setTag("All");
  };

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Role directory"
          title="Web3 roles, without the vague job-description language."
          copy="Filter by lane, technical depth, level, and work style. Each guide explains daily work, outputs, proof, interview prompts, and salary context."
        />

        <Card className="p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <label className="relative">
              <span className="sr-only">Search roles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, skills, or outputs" className="w-full rounded-2xl border border-border bg-soft py-3 pl-11 pr-4 text-sm font-bold text-ink" />
            </label>
            <select value={lane} onChange={(event) => setLane(event.target.value)} className="rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink">
              <option>All</option>
              {careerLanes.map((item) => <option key={item.lane}>{item.lane}</option>)}
            </select>
            <select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)} className="rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink">
              {modes.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={level} onChange={(event) => setLevel(event.target.value as typeof level)} className="rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink">
              {levels.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {skillTags.map((item) => (
              <button key={item} type="button" onClick={() => setTag(item)} className={`rounded-full px-4 py-2 text-sm font-extrabold ${tag === item ? "bg-blue-600 text-white" : "bg-soft text-muted hover:text-ink"}`}>
                {item}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-muted">{filtered.length} of {roles.length} roles shown</p>
          <button type="button" onClick={clearFilters} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-extrabold text-ink">
            Clear Filters
          </button>
        </div>

        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((role) => <RoleCard key={role.slug} role={role} />)}
          </div>
        ) : (
          <Card className="p-10 text-center">
            <h2 className="text-2xl font-extrabold text-ink">No roles match those filters.</h2>
            <p className="mt-3 text-muted">Clear filters or view all roles to reset the directory.</p>
            <button type="button" onClick={clearFilters} className="btn-primary mt-6">View All Roles</button>
          </Card>
        )}
      </Container>
    </Shell>
  );
}
