"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { faqCategories } from "@/data/faq";
import { Card } from "@/components/kraft/Primitives";

export default function FaqExplorer({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !normalizedQuery || `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search FAQ</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-700" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search FAQ"
              className="w-full rounded-2xl border border-blue-100 bg-soft py-3 pl-12 pr-4 text-sm font-bold text-ink outline-none transition focus:border-blue-400 focus:bg-white"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", ...faqCategories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  category === item ? "bg-blue-600 text-white shadow-blue" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {filtered.map((item, index) => (
          <details key={item.id} className="group rounded-[28px] border border-blue-100 bg-white p-5 shadow-soft" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <span className="tag">{item.category}</span>
                <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink">{item.question}</h2>
              </div>
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-lg font-extrabold text-blue-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
        {!filtered.length ? (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-extrabold text-ink">No matching questions.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Try a broader term, role name, or category.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
