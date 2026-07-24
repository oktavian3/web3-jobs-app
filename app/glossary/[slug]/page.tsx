import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { glossaryTerms, getGlossaryTermBySlug, getRelatedRolesForTerm, findTermByLabel } from "@/data/glossary";
import { Shell, Container } from "@/components/kraft/Primitives";
import CareerNext from "@/components/kraft/career/CareerNext";

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  return {
    title: term ? term.term : "Glossary Term",
    description: term?.simpleMeaning,
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  if (!term) notFound();

  const relatedRoles = getRelatedRolesForTerm(term);
  const currentIndex = glossaryTerms.findIndex((t) => t.slug === term.slug);
  const nextTerm = glossaryTerms[(currentIndex + 1) % glossaryTerms.length];

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <Link href="/glossary" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to glossary
        </Link>

        <header className="max-w-3xl">
          <span className="tag">{term.category}</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{term.term}</h1>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">What it means</h2>
            <p className="mt-3 text-lg leading-8 text-ink">{term.simpleMeaning}</p>
          </section>
          <section>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-muted">Why it matters for work</h2>
            <p className="mt-3 text-base leading-7 text-muted">{term.whyItMatters}</p>
          </section>
        </div>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="flex gap-3">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.1em] text-amber-900">Common misconception</h2>
              <p className="mt-2 text-base leading-7 text-amber-900">{term.commonTrap}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Where you will encounter it</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Roles whose work regularly depends on this term.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="card-surface card-surface--interactive group flex items-center justify-between p-4"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">{role.lane}</span>
                  <span className="mt-1 block font-extrabold text-ink">{role.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Related terms</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {term.relatedTerms.map((label) => {
              const resolved = findTermByLabel(label);
              return resolved ? (
                <Link key={label} href={`/glossary/${resolved.slug}`} className="tag transition hover:bg-blue-100">{label}</Link>
              ) : (
                <span key={label} className="tag opacity-70">{label}</span>
              );
            })}
          </div>
        </section>

        <CareerNext
          heading="Keep going"
          items={[
            { title: "See related roles", href: `/roles?lane=${encodeURIComponent(term.usedInRoles[0])}`, why: "Compare roles in the lane where this term matters most." },
            { title: `Next term: ${nextTerm.term}`, href: `/glossary/${nextTerm.slug}`, why: "Keep building vocabulary before you read role guides or job descriptions." },
          ]}
        />
      </Container>
    </Shell>
  );
}
