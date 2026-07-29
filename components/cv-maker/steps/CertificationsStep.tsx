"use client";

import { createCertificationEntry, type CertificationEntry } from "@/lib/cv-maker/types";
import RepeatableSection from "../RepeatableSection";
import { inputClass, labelClass } from "../formStyles";

export default function CertificationsStep({
  entries,
  onChange,
}: {
  entries: CertificationEntry[];
  onChange: (entries: CertificationEntry[]) => void;
}) {
  return (
    <RepeatableSection
      title="Certifications"
      description="Optional. Only add ones that are directly relevant to the role you're targeting."
      entries={entries}
      onChange={onChange}
      createEntry={createCertificationEntry}
      addLabel="Add certification"
      emptyLabel="No certifications added - this section won't print unless you add one."
      renderFields={(entry, update) => (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Certification name</span>
              <input value={entry.name} onChange={(event) => update({ name: event.target.value })} className={inputClass} placeholder="Certified Community Manager" />
            </label>
            <label className="block">
              <span className={labelClass}>Issuer</span>
              <input value={entry.issuer} onChange={(event) => update({ issuer: event.target.value })} className={inputClass} placeholder="CMX" />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Date</span>
              <input value={entry.date} onChange={(event) => update({ date: event.target.value })} className={inputClass} placeholder="2024" />
            </label>
            <label className="block">
              <span className={labelClass}>Credential URL (optional)</span>
              <input value={entry.credentialUrl ?? ""} onChange={(event) => update({ credentialUrl: event.target.value })} className={inputClass} placeholder="credential.net/abc123" />
            </label>
          </div>
        </>
      )}
    />
  );
}
