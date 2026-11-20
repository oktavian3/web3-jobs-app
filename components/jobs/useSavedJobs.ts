"use client";

import { useCallback, useSyncExternalStore } from "react";
import { toast } from "sonner";

const KEY = "kraft:saved-jobs";
const EVENT = "kraft:saved-jobs-change";
const EMPTY: string[] = [];
let cache: { raw: string | null; ids: string[] } = { raw: null, ids: EMPTY };

function read(): string[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.ids;
  }
  if (raw === cache.raw) return cache.ids;
  let ids: string[] = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    ids = Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : EMPTY;
  } catch {
    ids = EMPTY;
  }
  cache = { raw, ids };
  return ids;
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** Saved jobs live in this browser only (localStorage) - no account needed. */
export function useSavedJobs() {
  const saved = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      toast.error("Couldn't save - browser storage is blocked.");
      return;
    }
    window.dispatchEvent(new Event(EVENT));
    if (next.includes(id)) toast.success("Saved to this browser", { description: "Find it under Saved only on /jobs." });
    else toast("Removed from saved");
  }, []);
  return { saved, isSaved: (id: string) => saved.includes(id), toggle };
}
