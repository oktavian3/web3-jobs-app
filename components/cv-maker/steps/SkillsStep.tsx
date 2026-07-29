"use client";

import { labelClass, textareaClass } from "../formStyles";

export default function SkillsStep({ skills, onChange }: { skills: string; onChange: (value: string) => void }) {
  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">Skills</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        Comma-separated. Match the exact wording job listings use for the tools and skills you actually have — this list is also what the JD match step compares against.
      </p>
      <label className="mt-5 block">
        <span className={labelClass}>Skills</span>
        <textarea
          value={skills}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Community strategy, Discord moderation, crisis communication, Notion, Dune Analytics"
          className={`${textareaClass} min-h-[7rem]`}
        />
      </label>
    </div>
  );
}
