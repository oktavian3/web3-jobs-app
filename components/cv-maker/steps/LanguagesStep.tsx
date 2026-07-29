"use client";

import { createLanguageEntry, type LanguageEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass } from "../formStyles";

const PROFICIENCY_OPTIONS = ["Native", "Professional", "Conversational", "Basic"];

export default function LanguagesStep({
  entries,
  onChange,
}: {
  entries: LanguageEntry[];
  onChange: (entries: LanguageEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Languages"
      description="Optional. Worth including for regional or community-facing roles."
      entries={entries}
      onChange={onChange}
      createEntry={createLanguageEntry}
      addLabel="Add language"
      emptyLabel="No languages added - this section won't print unless you add one."
      renderFields={(entry, update) => (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Language</span>
            <input value={entry.language} onChange={(event) => update({ language: event.target.value })} className={inputClass} placeholder="Indonesian" />
          </label>
          <label className="block">
            <span className={labelClass}>Proficiency</span>
            <select value={entry.proficiency} onChange={(event) => update({ proficiency: event.target.value })} className={inputClass}>
              {PROFICIENCY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    />
  );
}
