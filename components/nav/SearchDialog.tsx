"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type Fuse from "fuse.js";
import { Command } from "cmdk";
import { CornerDownLeft, Search } from "lucide-react";

type Item = { type: "Job" | "Role" | "Term"; title: string; sub: string; href: string };

const QUICK: Item[] = [
  { type: "Job", title: "Browse all jobs", sub: "Curated opportunities and job boards", href: "/jobs" },
  { type: "Role", title: "Explore Roles", sub: "42 canonical role guides", href: "/roles" },
  { type: "Term", title: "Open Glossary", sub: "Learn terms in the context of work.", href: "/glossary" },
];

const GROUPS: { type: Item["type"]; label: string }[] = [
  { type: "Job", label: "Jobs" },
  { type: "Role", label: "Roles" },
  { type: "Term", label: "Glossary" },
];

/** ⌘K command palette (cmdk on a Radix dialog: focus trap, Esc, aria wiring).
 *  Ranking comes from Fuse; cmdk only handles the list + keyboard. */
export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[] | null>(null);
  const [fuse, setFuse] = useState<Fuse<Item> | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");

  // Lazy-load the index + Fuse the first time search opens.
  useEffect(() => {
    if (!open || items) return;
    let cancelled = false;
    Promise.all([fetch("/api/search-index").then((r) => r.json() as Promise<Item[]>), import("fuse.js")])
      .then(([data, mod]) => {
        if (cancelled) return;
        setItems(data);
        setFuse(new mod.default(data, { keys: [{ name: "title", weight: 3 }, "sub"], threshold: 0.32, ignoreLocation: true }));
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [open, items]);

  const results = useMemo<Item[]>(() => {
    if (!q.trim()) return QUICK;
    if (!fuse) return [];
    return fuse.search(q.trim(), { limit: 15 }).map((r) => r.item);
  }, [q, fuse]);

  const go = (href: string) => {
    onClose();
    setQ("");
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(o) => !o && onClose()}
      shouldFilter={false}
      label="Search KRAFT"
      overlayClassName="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] cmdk-overlay"
      contentClassName="fixed left-1/2 top-[10vh] z-[61] w-[min(92vw,620px)] -translate-x-1/2 overflow-hidden rounded-[20px] border border-border bg-surface shadow-lift cmdk-content"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <Command.Input
          value={q}
          onValueChange={setQ}
          placeholder="Search roles, terms, jobs"
          aria-label="Search roles, terms, and jobs"
          className="h-14 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <kbd className="kbd hidden sm:inline">Esc</kbd>
      </div>
      <Command.List className="max-h-[56vh] overflow-y-auto p-2" aria-label="Results">
        {q.trim() && !fuse && !failed ? <Command.Loading><p className="px-3 py-6 text-center text-[14px] text-muted">Loading…</p></Command.Loading> : null}
        {failed ? <p className="px-3 py-6 text-center text-[14px] text-muted">Search is unavailable right now.</p> : null}
        {q.trim() && fuse ? <Command.Empty className="px-3 py-6 text-center text-[14px] text-muted">No results for “{q}”.</Command.Empty> : null}
        {GROUPS.map(({ type, label }) => {
          const group = results.filter((r) => r.type === type);
          if (!group.length) return null;
          return (
            <Command.Group key={type} heading={label} className="cmdk-group">
              {group.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.href}
                  onSelect={() => go(item.href)}
                  className="group flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2.5 data-[selected=true]:bg-highlight"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14.5px] font-medium text-ink">{item.title}</span>
                    <span className="block truncate text-[12.5px] text-muted">{item.sub}</span>
                  </span>
                  <CornerDownLeft className="h-4 w-4 text-muted opacity-0 group-data-[selected=true]:opacity-100" aria-hidden="true" />
                </Command.Item>
              ))}
            </Command.Group>
          );
        })}
      </Command.List>
    </Command.Dialog>
  );
}
