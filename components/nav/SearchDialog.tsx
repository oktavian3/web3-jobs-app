"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type Fuse from "fuse.js";
import { CornerDownLeft, Search } from "lucide-react";

type Item = { type: "Job" | "Role" | "Term"; title: string; sub: string; href: string };

const QUICK: Item[] = [
  { type: "Job", title: "Browse all jobs", sub: "Curated opportunities and job boards", href: "/jobs" },
  { type: "Role", title: "Explore Roles", sub: "42 canonical role guides", href: "/roles" },
  { type: "Term", title: "Open Glossary", sub: "Learn terms in the context of work.", href: "/glossary" },
];

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [items, setItems] = useState<Item[] | null>(null);
  const [fuse, setFuse] = useState<Fuse<Item> | null>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    if (!open && d.open) d.close();
  }, [open]);

  // Lazy-load the index + Fuse the first time search opens.
  useEffect(() => {
    if (!open || items) return;
    let cancelled = false;
    Promise.all([fetch("/api/search-index").then((r) => r.json() as Promise<Item[]>), import("fuse.js")]).then(([data, mod]) => {
      if (cancelled) return;
      setItems(data);
      setFuse(new mod.default(data, { keys: [{ name: "title", weight: 3 }, "sub"], threshold: 0.32, ignoreLocation: true }));
    });
    return () => {
      cancelled = true;
    };
  }, [open, items]);

  const results = useMemo<Item[]>(() => {
    if (!q.trim()) return QUICK;
    if (!fuse) return [];
    return fuse.search(q.trim(), { limit: 12 }).map((r) => r.item);
  }, [q, fuse]);

  const go = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    setQ("");
    router.push(item.href);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label="Search KRAFT"
      className="mx-auto mt-[10vh] w-[min(92vw,620px)] max-w-none rounded-[20px] border border-border bg-surface p-0 shadow-lift backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              go(results[active]);
            }
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls="site-search-results"
          aria-activedescendant={results[active] ? `ssr-${active}` : undefined}
          aria-label="Search roles, terms, and jobs"
          placeholder="Search roles, terms, jobs"
          className="h-14 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-muted"
        />
        <kbd className="kbd hidden sm:inline">Esc</kbd>
      </div>
      <ul id="site-search-results" role="listbox" aria-label="Results" className="max-h-[56vh] overflow-y-auto p-2">
        {q.trim() && !fuse ? <li className="px-3 py-6 text-center text-[14px] text-muted">Loading…</li> : null}
        {q.trim() && fuse && !results.length ? <li className="px-3 py-6 text-center text-[14px] text-muted">No results for “{q}”.</li> : null}
        {results.map((item, i) => (
          <li
            key={item.href + i}
            id={`ssr-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(item)}
            className={`flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2.5 ${i === active ? "bg-highlight" : ""}`}
          >
            <span className="w-11 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted">{item.type}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-medium text-ink">{item.title}</span>
              <span className="block truncate text-[12.5px] text-muted">{item.sub}</span>
            </span>
            {i === active ? <CornerDownLeft className="h-4 w-4 text-muted" aria-hidden="true" /> : null}
          </li>
        ))}
      </ul>
    </dialog>
  );
}
