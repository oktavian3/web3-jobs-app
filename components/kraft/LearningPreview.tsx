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
    <div className="card-surface p-3">
      <div className="flex gap-2 overflow-x-auto rounded-2xl bg-soft p-2">
        {previews.map((item, index) => (
          <button
            type="button"
            key={item.label}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              active === index ? "bg-blue-600 text-white shadow-soft" : "text-muted hover:bg-elevated hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-3xl bg-highlight p-6 sm:p-8">
        <span className="rounded-full bg-elevated px-3 py-1 text-xs font-extrabold text-blue-700 shadow-soft">{preview.label}</span>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">{preview.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">{preview.body}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {preview.meta.map((item) => (
            <div key={item} className="rounded-2xl border border-border-strong bg-elevated/80 p-4 shadow-soft">
              <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted">KRAFT</span>
              <p className="mt-2 text-sm font-extrabold text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
