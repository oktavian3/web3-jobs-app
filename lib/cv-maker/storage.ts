import type { CVData } from "./types";

// Single-session draft persistence, no auth. Revisit only if users ask to
// reach a draft from a different device.
const DRAFT_KEY = "kraft-cv-maker-draft-v1";

export function loadDraft(): CVData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CVData;
  } catch {
    // Corrupt or pre-schema-change draft — fail quiet and start fresh rather
    // than throwing during render.
    return null;
  }
}

export function saveDraft(data: CVData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // Storage full or disabled (private browsing) — the draft simply won't
    // persist; nothing in the editing flow depends on the write succeeding.
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

/**
 * Debounces calls to `fn`, keeping only the trailing call after `waitMs` of
 * silence. Returns a cancel function so a component can clean up on unmount.
 */
export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, waitMs: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };
  return debounced;
}
