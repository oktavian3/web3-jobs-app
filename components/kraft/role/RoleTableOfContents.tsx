"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export default function RoleTableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

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
            className={`block rounded-lg px-3 py-1.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              active === item.id
                ? "bg-blue-50 text-blue-700"
                : "text-muted hover:bg-soft hover:text-ink"
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
      <details className="lg:hidden rounded-2xl border border-border bg-white p-2">
        <summary className="cursor-pointer rounded-lg px-3 py-2 text-sm font-extrabold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          On this page
        </summary>
        <div className="pt-2">{list}</div>
      </details>
    </>
  );
}
