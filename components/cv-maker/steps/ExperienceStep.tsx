"use client";

import { createExperienceEntry, type ExperienceEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass, textareaClass } from "../formStyles";

export default function ExperienceStep({
  entries,
  onChange,
}: {
  entries: ExperienceEntry[];
  onChange: (entries: ExperienceEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Experience"
      description="Add your most recent role first — the preview and PDF print entries in the order you list them here."
      entries={entries}
      onChange={onChange}
      createEntry={createExperienceEntry}
      addLabel="Add role"
      emptyLabel="No roles added yet."
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Job title</span>
              <input value={entry.title} onChange={(event) => update({ title: event.target.value })} className={inputClass} placeholder="Community Manager" />
            </label>
            <label className="block">
              <span className={labelClass}>Company</span>
              <input value={entry.company} onChange={(event) => update({ company: event.target.value })} className={inputClass} placeholder="Protocol Labs" />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Location</span>
              <input value={entry.location} onChange={(event) => update({ location: event.target.value })} className={inputClass} placeholder="Remote" />
            </label>
            <label className="block">
              <span className={labelClass}>Start</span>
              <input value={entry.start} onChange={(event) => update({ start: event.target.value })} className={inputClass} placeholder="Jan 2023" />
            </label>
            <label className="block">
              <span className={labelClass}>End</span>
              <input value={entry.end} onChange={(event) => update({ end: event.target.value })} className={inputClass} placeholder="Present" />
            </label>
          </div>
          <label className="block">
            <span className={labelClass}>Achievements — one per line</span>
            <textarea
              value={entry.bullets.join("\n")}
              onChange={(event) => update({ bullets: event.target.value.split("\n") })}
              className={`${textareaClass} min-h-[7rem]`}
              placeholder={"Grew active Discord members from 400 to 2,100 in 4 months\nBuilt the moderator onboarding playbook still in use today"}
            />
          </label>
        </>
      )}
    />
  );
}
