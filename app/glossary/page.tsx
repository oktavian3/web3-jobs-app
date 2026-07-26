"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";
import { Shell, Container, Card } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CareerNext from "@/components/kraft/career/CareerNext";

function initialQuery() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

export default function GlossaryPage() {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(glossaryTerms.map((term) => term.category)))];

  const terms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const text = `${term.term} ${term.simpleMeaning} ${term.whyItMatters} ${term.relatedTerms.join(" ")}`.toLowerCase();
      return (!query || text.includes(query.toLowerCase())) && (category === "All" || term.category === category);
    });
  }, [query, category]);

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Glossary"
          title="Web3 terms, explained for the work."
          copy={`${glossaryTerms.length} practical terms with why they matter, common misconceptions, and the roles that use them.`}
        />

        <Card className="p-5">
          <label className="relative block">
            <span className="sr-only">Search glossary</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search terms, traps, or related concepts"
              className="w-full rounded-2xl border border-border bg-soft py-3 pl-11 pr-4 text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </label>
          <div className="mt-4 border-t border-border pt-4">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-muted">Browse by category</span>
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${category === item ? "bg-blue-600 text-white" : "bg-soft text-muted hover:text-ink"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <p className="text-sm font-bold text-muted" aria-live="polite">
          <span className="text-lg font-extrabold text-ink">{terms.length}</span> of {glossaryTerms.length} terms
        </p>

        {terms.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {terms.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="card-surface card-surface--interactive group flex h-full flex-col p-5"
              >
                <span className="tag w-fit">{term.category}</span>
                <h2 className="mt-3 text-lg font-extrabold text-ink">{term.term}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{term.simpleMeaning}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700">
                  Open term <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center">
            <h2 className="text-2xl font-extrabold text-ink">No search result.</h2>
            <p className="mt-3 text-muted">Check spelling, try an alternative title, or browse a different category.</p>
          </Card>
        )}

        <CareerNext
          heading="Turn terms into career context"
          items={[
            { title: "Explore roles", href: "/roles", why: "Compare roles that rely on the vocabulary you just read." },
            { title: "Build proof-of-work", href: "/portfolio", why: "A portfolio brief turns understanding into a reviewable artifact." },
          ]}
        />
      </Container>
    </Shell>
  );
}
