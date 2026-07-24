"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export type TocItem = { id: string; label: string };

export default function RoleTableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={`block rounded-lg border-l-2 px-3 py-1.5 text-sm font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              active === item.id
                ? "border-blue-600 bg-highlight text-blue-700"
                : "border-transparent text-muted hover:bg-soft hover:text-ink"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky vertical navigation. */}
      <nav aria-label="On this page" className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
        <p className="px-3 pb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-muted">On this page</p>
        {list}
      </nav>

      {/* Mobile / tablet: collapsible disclosure that keeps the document body in place. */}
      <details
        className="lg:hidden rounded-2xl border border-border bg-elevated p-2"
        onToggle={(event) => setMobileOpen(event.currentTarget.open)}
      >
        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-extrabold text-ink [&::-webkit-details-marker]:hidden [&::marker]:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          On this page
          <ChevronDown
            className={`h-4 w-4 text-muted transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </summary>
        <div className="pt-2">{list}</div>
      </details>
    </>
  );
}
