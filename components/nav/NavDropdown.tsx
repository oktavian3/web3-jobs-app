"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { isActive, type NavItem } from "./links";

/** Accessible disclosure dropdown: click / Enter / Space toggles, Escape and
 *  outside click close, closes on route change. */
export default function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const active = items.some((i) => isActive(pathname, i.href));

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-9 items-center gap-1 rounded-full px-3 text-[14px] transition-colors ${
          active || open ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? (
        <div
          id={menuId}
          className="sheet-panel absolute left-1/2 top-[calc(100%+10px)] z-50 w-[340px] -translate-x-1/2 rounded-[18px] border border-border bg-surface p-2 shadow-lift"
        >
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.label}>
                {item.soon ? (
                  <div aria-disabled="true" className="flex cursor-not-allowed items-start justify-between gap-3 rounded-[12px] px-3 py-2.5">
                    <span>
                      <span className="block text-[14px] font-medium text-muted">{item.label}</span>
                    </span>
                    <span className="eyebrow !text-[10px]">{item.description}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`block rounded-[12px] px-3 py-2.5 transition-colors hover:bg-soft ${isActive(pathname, item.href) ? "bg-highlight" : ""}`}
                  >
                    <span className="block text-[14px] font-medium text-ink">{item.label}</span>
                    {item.description ? <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{item.description}</span> : null}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
