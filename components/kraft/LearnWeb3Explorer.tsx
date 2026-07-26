"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type ExplorerLearningItem = {
  slug: string;
  title: string;
  type: string;
  level: string;
  topic: string;
  whyItMatters: string;
  outcome: string;
  url: string;
  isExternal: boolean;
};

export type ExplorerRole = { slug: string; title: string };

export type LaneOption = {
  lane: string;
  laneSlug: string;
  description: string;
  roles: ExplorerRole[];
  items: ExplorerLearningItem[];
};

const selectClass =
  "w-full rounded-2xl border border-border bg-soft px-4 py-3 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function LearnWeb3Explorer({ lanes }: { lanes: LaneOption[] }) {
  const [laneSlug, setLaneSlug] = useState(lanes[0]?.laneSlug ?? "");
  const activeLane = lanes.find((l) => l.laneSlug === laneSlug) ?? lanes[0];
  const [roleSlug, setRoleSlug] = useState(activeLane?.roles[0]?.slug ?? "");

  const onLaneChange = (value: string) => {
    setLaneSlug(value);
    const next = lanes.find((l) => l.laneSlug === value);
    setRoleSlug(next?.roles[0]?.slug ?? "");
  };

  const activeRole = useMemo(
    () => activeLane?.roles.find((r) => r.slug === roleSlug) ?? activeLane?.roles[0],
    [activeLane, roleSlug]
  );

  if (!activeLane) return null;

  return (
    <div className="space-y-8">
      <div className="card-surface grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Career lane</span>
          <select value={laneSlug} onChange={(e) => onLaneChange(e.target.value)} className={selectClass}>
            {lanes.map((l) => (
              <option key={l.laneSlug} value={l.laneSlug}>{l.lane}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Role to learn toward</span>
          <select value={activeRole?.slug ?? ""} onChange={(e) => setRoleSlug(e.target.value)} className={selectClass}>
            {activeLane.roles.map((r) => (
              <option key={r.slug} value={r.slug}>{r.title}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">Now viewing</span>
        <span className="rounded-full bg-highlight px-3 py-1 font-extrabold text-blue-700">{activeLane.lane}</span>
        {activeRole && <span className="rounded-full bg-highlight px-3 py-1 font-extrabold text-blue-700">{activeRole.title}</span>}
      </div>

      <p className="max-w-3xl text-base leading-7 text-muted">{activeLane.description}</p>

      {activeRole && (
        <div className="card-surface card-surface--evidence p-4 sm:p-5">
          <p className="text-sm leading-6 text-ink">
            Studying toward <span className="font-extrabold">{activeRole.title}</span>? Its role guide lists the exact
            prerequisite knowledge, tools, and proof standards these resources should feed into.
          </p>
          <Link
            href={`/roles/${activeRole.slug}`}
            className="mt-2 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Open the {activeRole.title} role guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {activeLane.items.map((item) => (
          <div key={item.slug} className="card-surface flex h-full flex-col p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">{item.type}</span>
              <span className="tag">{item.level}</span>
              {item.isExternal && (
                <span className="rounded-full border border-border bg-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted">External resource</span>
              )}
            </div>
            <h3 className="mt-3 text-lg font-extrabold tracking-tight text-ink">{item.title}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-blue-700">{item.topic}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{item.whyItMatters}</p>
            <div className="mt-3 rounded-xl bg-soft p-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Expected outcome</p>
              <p className="mt-1 text-sm leading-6 text-ink">{item.outcome}</p>
            </div>
            <a
              href={item.url}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noreferrer" : undefined}
              className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {item.isExternal ? "Open external resource" : "Open"}
              {item.isExternal ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
