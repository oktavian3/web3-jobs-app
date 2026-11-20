import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { jobBoards } from "@/data/jobBoards";
import { selectedJobPlatforms } from "@/data/curatedJobs";
import { safety } from "@/lib/jobs/content";

export function SafetyCard() {
  return (
    <div className="rounded-[20px] border border-border-strong bg-highlight p-5">
      <div className="flex items-center gap-2 text-blue-deep">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        <h2 className="eyebrow !text-blue-deep">Job-safety checklist</h2>
      </div>
      <ul className="mt-4 space-y-2.5 text-[13.5px] leading-[1.5] text-ink">
        {safety.map((s) => (
          <li key={s} className="flex gap-2">
            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Picks({ limit }: { limit?: number } = {}) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-5">
      <p className="eyebrow">Selected by KRAFT</p>
      <h2 className="mt-2 text-[17px] font-medium leading-snug tracking-[-0.02em]">Where to start for a specific search.</h2>
      <ul className="mt-3 divide-y divide-border text-[13.5px]">
        {selectedJobPlatforms.slice(0, limit).map((s) => {
          const board = jobBoards.find((b) => b.slug === s.platformSlug);
          if (!board) return null;
          return (
            <li key={s.id}>
              <a href={board.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-3 py-2.5">
                <span>
                  <span className="block font-medium text-ink">{board.name}</span>
                  <span className="block text-[12px] text-muted">{s.recommendationLabel}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-blue" aria-hidden="true" />
                <span className="sr-only">(opens external site)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

