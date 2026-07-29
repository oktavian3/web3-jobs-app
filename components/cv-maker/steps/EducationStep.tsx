"use client";

import { createEducationEntry, type EducationEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass } from "../formStyles";

export default function EducationStep({
  entries,
  onChange,
}: {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Education"
      description="Most recent first."
      entries={entries}
      onChange={onChange}
      createEntry={createEducationEntry}
      addLabel="Add education"
      emptyLabel="No education added yet."
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Degree / programme</span>
              <input value={entry.degree} onChange={(event) => update({ degree: event.target.value })} className={inputClass} placeholder="B.A. Communications" />
            </label>
            <label className="block">
              <span className={labelClass}>School</span>
              <input value={entry.school} onChange={(event) => update({ school: event.target.value })} className={inputClass} placeholder="Universitas Indonesia" />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Location</span>
              <input value={entry.location} onChange={(event) => update({ location: event.target.value })} className={inputClass} placeholder="Jakarta" />
            </label>
            <label className="block">
              <span className={labelClass}>Start</span>
              <input value={entry.start} onChange={(event) => update({ start: event.target.value })} className={inputClass} placeholder="2018" />
            </label>
            <label className="block">
              <span className={labelClass}>End</span>
              <input value={entry.end} onChange={(event) => update({ end: event.target.value })} className={inputClass} placeholder="2022" />
            </label>
          </div>
        </>
      )}
    />
  );
}
