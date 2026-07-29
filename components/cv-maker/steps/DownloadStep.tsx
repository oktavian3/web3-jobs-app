"use client";

import { Download } from "lucide-react";
import type { CVData } from "@/lib/cv-maker/types";

export default function DownloadStep({ data, onDownload }: { data: CVData; onDownload: () => void }) {
  // Real, derived counts - never a fabricated "resume score."
  const checks = [
    { label: "Contact info", done: Boolean(data.contact.name.trim() && data.contact.email.trim()) },
    { label: "Summary", done: Boolean(data.summary.trim()) },
    { label: "Experience", done: data.experience.length > 0 },
    { label: "Education", done: data.education.length > 0 },
    { label: "Skills", done: Boolean(data.skills.trim()) },
  ];

  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">Download</h2>
      <p className="mt-1 text-sm leading-6 text-muted">A quick check before you export:</p>

      <ul className="mt-5 space-y-2">
        {checks.map((check) => (
          <li key={check.label} className={`flex items-center gap-2.5 text-sm font-bold ${check.done ? "text-ink" : "text-muted"}`}>
            <span className={`h-2 w-2 shrink-0 rounded-full ${check.done ? "bg-emerald-500" : "bg-border-strong"}`} aria-hidden="true" />
            {check.label}
          </li>
        ))}
      </ul>

      <button type="button" onClick={onDownload} className="btn-primary mt-6 group">
        Download PDF
        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
      </button>

      <p className="mt-3 text-xs leading-5 text-muted">
        Opens your browser&apos;s print dialog - choose &quot;Save as PDF&quot; as the destination. The exported file is
        real selectable text, not an image, so it stays readable by ATS software. Checked in Chrome and Safari.
      </p>
    </div>
  );
}
