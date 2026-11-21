"use client";

import type { ReactNode } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

const TABS = ["opportunities", "ecosystem", "boards"] as const;
type Tab = (typeof TABS)[number];

export default function JobsTabs({ labels, panels }: { labels: Record<Tab, { label: string; count: number }>; panels: Record<Tab, ReactNode> }) {
  const [tab, setTab] = useQueryState("tab", parseAsStringLiteral(TABS).withDefault("opportunities").withOptions({ history: "replace" }));

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <>
      <div className="border-b border-border">
      <div role="tablist" aria-label="Job sources" className="mx-auto -mb-px flex w-full max-w-[1280px] items-center gap-1 overflow-x-auto whitespace-nowrap px-5 sm:px-6 lg:px-10">
        {TABS.map((t, i) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            type="button"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={(e) => onKey(e, i)}
            className={`inline-flex h-11 items-center gap-2 border-b-2 px-4 text-[14px] transition-colors ${
              tab === t ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {labels[t].label}
            <span className={`rounded-full px-1.5 font-mono text-[11px] ${tab === t ? "bg-ink text-white" : "bg-soft text-muted"}`}>{labels[t].count}</span>
          </button>
        ))}
      </div>
      </div>
      {TABS.map((t) => (
        <div key={t} id={`panel-${t}`} role="tabpanel" aria-labelledby={`tab-${t}`} hidden={tab !== t} className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-6 lg:px-10">
          {panels[t]}
        </div>
      ))}
    </>
  );
}
