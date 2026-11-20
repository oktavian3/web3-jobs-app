"use client";

import { useState } from "react";

const previews = [
  {
    label: "Role Guide",
    title: "Community Manager",
    body: "Daily work: reports, programming, feedback loops, crisis handling.",
    meta: ["Daily Work", "Skills", "Proof"],
  },
  {
    label: "Skill Check",
    title: "Possible fit result",
    body: "Possible fit: Community & Growth. Confidence is shown as Low, Medium, or High - never a percentage.",
    meta: ["Community & Growth", "Confidence: Medium", "Next role"],
  },
  {
    label: "Glossary",
    title: "TVL",
    body: "Useful, but not proof of real users. Check retention and revenue too.",
    meta: ["Common trap", "Related roles", "Next term"],
  },
  {
    label: "Hiring Prep",
    title: "Portfolio brief",
    body: "A simulated, role-specific project brief with a rubric, not a completion tracker.",
    meta: ["Simulated project", "Case study", "Next action"],
  },
];

export default function LearningPreview() {
  const [active, setActive] = useState(0);
  const preview = previews[active];

  return (
    <div className="card-surface overflow-hidden">
      <div role="tablist" aria-label="KRAFT preview" className="flex gap-1 overflow-x-auto border-b border-border bg-elevated p-2">
        {previews.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.label}
            id={`lp-tab-${index}`}
            aria-selected={active === index}
            aria-controls="lp-panel"
            onClick={() => setActive(index)}
            className={`h-9 whitespace-nowrap rounded-full px-4 text-[13.5px] transition-colors ${
              active === index ? "bg-ink text-white" : "text-muted hover:bg-soft hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div id="lp-panel" role="tabpanel" aria-labelledby={`lp-tab-${active}`} className="p-6 sm:p-8">
        <p className="eyebrow">{preview.label}</p>
        <h3 className="mt-3 text-[26px] font-medium tracking-[-0.03em] text-ink">{preview.title}</h3>
        <p className="mt-2 max-w-xl text-[15px] leading-[1.6] text-muted">{preview.body}</p>
        <ul className="mt-7 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-3">
          {preview.meta.map((item) => (
            <li key={item} className="bg-surface p-4">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">KRAFT</span>
              <p className="mt-1.5 text-[14px] font-medium text-ink">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
