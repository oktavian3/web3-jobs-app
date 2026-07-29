"use client";

import { useMemo } from "react";
import { matchScore } from "@/lib/cv-maker/ats-match";
import { buildCvText, type CVData } from "@/lib/cv-maker/types";
import { labelClass, textareaClass } from "../formStyles";

export default function JDMatchStep({
  data,
  jobDescription,
  onJobDescriptionChange,
}: {
  data: CVData;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
}) {
  const cvText = useMemo(() => buildCvText(data), [data]);
  const result = useMemo(() => matchScore(cvText, jobDescription), [cvText, jobDescription]);
  const hasJobDescription = jobDescription.trim().length > 0;

  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">JD match check</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        Paste a job description to see which of its keywords already show up in your CV.
      </p>

      <label className="mt-5 block">
        <span className={labelClass}>Job description</span>
        <textarea
          value={jobDescription}
          onChange={(event) => onJobDescriptionChange(event.target.value)}
          className={`${textareaClass} min-h-[10rem]`}
          placeholder="Paste the full job listing here..."
        />
      </label>

      {hasJobDescription && (
        <div className="card-surface mt-5 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-extrabold text-ink">Keyword overlap</p>
            <p className="text-2xl font-extrabold text-blue-700">
              {result.score === null ? "–" : `${result.score}%`}
            </p>
          </div>
          <p className="mt-1 text-xs leading-5 text-muted">
            Literal keyword overlap, not semantic — it won&apos;t catch &quot;CM&quot; and &quot;Community Manager&quot; as
            the same thing. Use it as a rough check, not a verdict.
          </p>

          {result.missing.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">
                In the listing, not in your CV ({result.missing.length})
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.missing.slice(0, 30).map((word) => (
                  <span key={word} className="tag">{word}</span>
                ))}
              </div>
            </div>
          )}

          {result.matched.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">
                Already covered ({result.matched.length})
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.matched.slice(0, 30).map((word) => (
                  <span key={word} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
