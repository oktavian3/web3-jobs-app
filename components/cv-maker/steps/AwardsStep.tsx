"use client";

import { createAwardEntry, type AwardEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass } from "../formStyles";

export default function AwardsStep({
  entries,
  onChange,
}: {
  entries: AwardEntry[];
  onChange: (entries: AwardEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Awards"
      description="Optional. Keep this to recognitions that would mean something to the person reading your CV."
      entries={entries}
      onChange={onChange}
      createEntry={createAwardEntry}
      addLabel="Add award"
      emptyLabel="No awards added - this section won't print unless you add one."
      renderFields={(entry, update) => (
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Award title</span>
            <input value={entry.title} onChange={(event) => update({ title: event.target.value })} className={inputClass} placeholder="Top Community Contributor" />
          </label>
          <label className="block">
            <span className={labelClass}>Date</span>
            <input value={entry.date} onChange={(event) => update({ date: event.target.value })} className={inputClass} placeholder="2023" />
          </label>
          <label className="block sm:col-span-3">
            <span className={labelClass}>Issuer</span>
            <input value={entry.issuer} onChange={(event) => update({ issuer: event.target.value })} className={inputClass} placeholder="ETHDenver" />
          </label>
        </div>
      )}
    />
  );
}
