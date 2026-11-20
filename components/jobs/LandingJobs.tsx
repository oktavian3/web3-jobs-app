"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobRow from "./JobRow";
import type { PublicJob } from "@/lib/jobs/types";

const VISIBLE = 8;

/** Landing-page job list with lane tabs (a real tablist: arrow keys move
 *  between lanes). Full search + filters live on /jobs. */
export default function LandingJobs({ jobs, roleTitles }: { jobs: PublicJob[]; roleTitles: Record<string, string> }) {
  const lanes = useMemo(() => {
    const m = new Map<string, number>();
    jobs.forEach((j) => m.set(j.lane, (m.get(j.lane) ?? 0) + 1));
    return [["All", jobs.length] as const, ...[...m.entries()].sort((a, b) => b[1] - a[1])];
  }, [jobs]);
  const [lane, setLane] = useState("All");
  const shown = (lane === "All" ? jobs : jobs.filter((j) => j.lane === lane)).slice(0, VISIBLE);
  const viewAllHref = lane === "All" ? "/jobs" : `/jobs?lane=${encodeURIComponent(lane)}`;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = lanes[(i + dir + lanes.length) % lanes.length][0];
    setLane(next);
    document.getElementById(`lane-tab-${(i + dir + lanes.length) % lanes.length}`)?.focus();
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-card">
      <div role="tablist" aria-label="Filter by career lane" className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-b border-border bg-elevated px-3 py-3 sm:px-4">
        {lanes.map(([l, c], i) => {
          const active = l === lane;
          return (
            <button
              key={l}
              id={`lane-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="landing-jobs-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setLane(l)}
              onKeyDown={(e) => onKey(e, i)}
              className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] transition-colors ${
                active ? "bg-ink text-white" : "text-muted hover:bg-soft hover:text-ink"
              }`}
            >
              {l}
              <span className={`font-mono text-[11px] ${active ? "text-white/70" : "text-muted"}`}>{c}</span>
            </button>
          );
        })}
      </div>
      <div id="landing-jobs-panel" role="tabpanel" aria-label={`${lane} opportunities`}>
        {shown.length ? (
          <ul>
            {shown.map((job) => (
              <JobRow key={job.id} job={job} roleTitle={job.roleSlug ? roleTitles[job.roleSlug] : undefined} />
            ))}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-[17px] font-medium text-ink">No curated opportunities published yet.</p>
          </div>
        )}
      </div>
      <Link
        href={viewAllHref}
        className="flex items-center justify-center gap-2 border-t border-border bg-elevated py-4 text-[14px] font-medium text-blue-deep hover:bg-highlight"
      >
        View all {lane === "All" ? jobs.length : lanes.find(([l]) => l === lane)?.[1]} opportunities <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
