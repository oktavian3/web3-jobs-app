"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const TOOLS = [
  { href: "/skill-check", label: "Skill Check", description: "A short self-assessment for a starting lane and role." },
  { href: "/cv-maker", label: "CV Maker", description: "Build an ATS-optimised CV with a live preview." },
] as const;

function isToolRoute(pathname: string) {
  return TOOLS.some((tool) => pathname === tool.href || pathname.startsWith(`${tool.href}/`));
}

/** Desktop "Tools" nav dropdown. Opens on click or hover, closes on outside
 *  click, Escape, or route change. */
export default function ToolsDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = isToolRoute(pathname);

  // Close on route change. This adjusts state during render rather than in an
  // effect - the React-recommended way to reset state when a value changes,
  // since setState-in-an-effect causes an extra render pass for no benefit.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={rootRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        // Opens on click, same as hover - never toggles closed here. A mouse
        // click is always preceded by a mouseenter on the wrapper, so a
        // toggle would immediately re-close what hover just opened. Closing
        // happens via outside click, Escape, route change, or mouse-leave.
        onClick={openNow}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition duration-200 lg:px-4 ${
          active ? "bg-ink text-white shadow-[0_6px_16px_rgba(17,19,24,0.22)]" : "text-muted hover:bg-highlight hover:text-ink"
        }`}
      >
        Tools
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Tools"
          className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-border bg-elevated p-2 shadow-[0_20px_45px_rgba(17,19,24,0.14)]"
        >
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 transition hover:bg-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span className="block text-sm font-extrabold text-ink">{tool.label}</span>
              <span className="mt-0.5 block text-xs leading-5 text-muted">{tool.description}</span>
            </Link>
          ))}

          <div role="menuitem" aria-disabled="true" className="flex cursor-not-allowed items-center justify-between gap-3 rounded-xl px-3 py-2.5">
            <span className="text-sm font-extrabold text-ink">Paygate</span>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.08em] text-muted">Coming soon</span>
          </div>
        </div>
      )}
    </div>
  );
}
