"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("term");
  });
  const categories = ["All", ...Array.from(new Set(glossaryTerms.map((term) => term.category)))];

  const terms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const text = `${term.term} ${term.simpleMeaning} ${term.whyItMatters} ${term.relatedTerms.join(" ")}`.toLowerCase();
      return (!query || text.includes(query.toLowerCase())) && (category === "All" || term.category === category);
    });
  }, [query, category]);

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Glossary" title="Web3 terms in the context of work." copy={`${glossaryTerms.length} practical terms with traps, related roles, and next concepts.`} />
        <Card className="p-5">
          <label className="relative block">
            <span className="sr-only">Search glossary</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search terms, traps, or related concepts" className="w-full rounded-2xl border border-border bg-soft py-3 pl-11 pr-4 text-sm font-bold text-ink" />
          </label>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold ${category === item ? "bg-blue-600 text-white" : "bg-soft text-muted hover:text-ink"}`}>
                {item}
              </button>
            ))}
          </div>
        </Card>
        <div className="grid gap-3">
          {terms.map((term) => {
            const isOpen = open === term.slug;
            return (
              <Card key={term.slug} className="overflow-hidden">
                <button type="button" onClick={() => setOpen(isOpen ? null : term.slug)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span>
                    <span className="text-lg font-extrabold text-ink">{term.term}</span>
                    <span className="ml-3 hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:inline-flex">{term.category}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-muted transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? (
                  <div className="grid gap-4 border-t border-border bg-soft p-5 md:grid-cols-2">
                    <div><h3 className="text-sm font-extrabold text-ink">Simple meaning</h3><p className="mt-2 text-sm leading-6 text-muted">{term.simpleMeaning}</p></div>
                    <div><h3 className="text-sm font-extrabold text-ink">Why it matters</h3><p className="mt-2 text-sm leading-6 text-muted">{term.whyItMatters}</p></div>
                    <div><h3 className="text-sm font-extrabold text-ink">Common trap</h3><p className="mt-2 text-sm leading-6 text-muted">{term.commonTrap}</p></div>
                    <div>
                      <h3 className="text-sm font-extrabold text-ink">Used in roles</h3>
                      <div className="mt-2 flex flex-wrap gap-2">{term.usedInRoles.map((lane) => <Link key={lane} href={`/roles?lane=${encodeURIComponent(lane)}`} className="tag">{lane}</Link>)}</div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-extrabold text-ink">Related terms</h3>
                      <div className="mt-2 flex flex-wrap gap-2">{term.relatedTerms.map((item) => <span key={item} className="tag">{item}</span>)}</div>
                    </div>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
        <FinalCTA title="Turn terms into career context." copy="After you learn the language, compare roles that use those concepts and choose a practical proof project." primary={{ href: "/roles", label: "Explore Related Roles" }} secondary={{ href: "/portfolio", label: "Choose a Project" }} />
      </Container>
    </Shell>
  );
}
