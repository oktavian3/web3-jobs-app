"use client";

import { labelClass, textareaClass } from "../formStyles";

export default function SummaryStep({ summary, onChange }: { summary: string; onChange: (value: string) => void }) {
  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">Summary</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        Two to three sentences: the role you&apos;re targeting, your strongest evidence, and what you actually do well.
      </p>
      <label className="mt-5 block">
        <span className={labelClass}>Professional summary</span>
        <textarea
          value={summary}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Community lead with 3 years running Discord and Telegram programming for two mid-size DeFi protocols. Built the moderator playbook, cut response time in half, and know the difference between useful participation and noise."
          className={`${textareaClass} min-h-[9rem]`}
        />
      </label>
    </div>
  );
}
