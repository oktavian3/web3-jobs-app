"use client";

import { createProjectEntry, type ProjectEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass, textareaClass } from "../formStyles";

export default function ProjectsStep({
  entries,
  onChange,
}: {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Projects"
      description="Optional, but for Web3 roles a real project often carries more signal than a degree - printed right after Experience."
      entries={entries}
      onChange={onChange}
      createEntry={createProjectEntry}
      addLabel="Add project"
      emptyLabel="No projects added - this section won't print unless you add one."
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Project name</span>
              <input value={entry.name} onChange={(event) => update({ name: event.target.value })} className={inputClass} placeholder="DAO onboarding revamp" />
            </label>
            <label className="block">
              <span className={labelClass}>Link (optional)</span>
              <input value={entry.link ?? ""} onChange={(event) => update({ link: event.target.value })} className={inputClass} placeholder="github.com/janedoe/project" />
            </label>
          </div>
          <label className="block">
            <span className={labelClass}>Description</span>
            <textarea
              value={entry.description}
              onChange={(event) => update({ description: event.target.value })}
              className={`${textareaClass} min-h-[5rem]`}
              placeholder="Redesigned the new-member onboarding flow for a 12k-member DAO, cutting drop-off in the first week by a third."
            />
          </label>
        </>
      )}
    />
  );
}
