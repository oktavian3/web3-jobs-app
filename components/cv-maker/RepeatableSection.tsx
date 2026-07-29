"use client";

import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

/**
 * Generic add/remove/update list editor, shared by Education, Certifications,
 * Projects, Languages, and Awards - the five sections that are structurally
 * identical (a repeatable card of fields) and differ only in which fields they
 * collect. Experience uses it too, with a custom bullets textarea passed via
 * renderFields.
 */
export default function RepeatableSection<T extends { id: string }>({
  title,
  description,
  entries,
  onChange,
  createEntry,
  addLabel,
  emptyLabel,
  renderFields,
}: {
  title: string;
  description?: string;
  entries: T[];
  onChange: (entries: T[]) => void;
  createEntry: () => T;
  addLabel: string;
  emptyLabel: string;
  renderFields: (entry: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  const addEntry = () => onChange([...entries, createEntry()]);
  const removeEntry = (id: string) => onChange(entries.filter((entry) => entry.id !== id));
  const updateEntry = (id: string, patch: Partial<T>) =>
    onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <div>
      <h2 className="text-lg font-extrabold tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}

      <div className="mt-5 space-y-4">
        {entries.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border-strong bg-soft p-4 text-sm text-muted">{emptyLabel}</p>
        )}
        {entries.map((entry, index) => (
          <div key={entry.id} className="card-surface p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Entry {index + 1}</span>
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-elevated text-muted transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                aria-label={`Remove entry ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-3 grid gap-3">{renderFields(entry, (patch) => updateEntry(entry.id, patch))}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEntry}
        className="btn-secondary mt-4 group"
      >
        <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" aria-hidden="true" />
        {addLabel}
      </button>
    </div>
  );
}
