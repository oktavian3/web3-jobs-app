import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolioProjects";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CareerNext from "@/components/kraft/career/CareerNext";

export const metadata: Metadata = {
  title: "Portfolio Briefs",
  description:
    "Simulated proof-of-work briefs for each of the 42 canonical Web3 roles. Pick one, build the role's real deliverables, and package it as a case study.",
};

export default function PortfolioPage() {
  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <PageHeader
          eyebrow="Portfolio briefs"
          title="Build evidence that resembles the work."
          copy="Each brief is a simulated exercise tied to one canonical role. It uses the role's real deliverables, proof standards, and rubric — clearly labelled as practice, not real client or protocol work."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article key={project.slug} className="flex h-full flex-col rounded-3xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">{project.lane}</span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-amber-900">Simulated</span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{project.roleTitle}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{project.objective}</p>
              <div className="mt-4 rounded-2xl bg-soft p-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Key deliverables</p>
                <p className="mt-1 text-sm leading-6 text-ink">{project.deliverables.slice(0, 3).join(", ")}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Open brief <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={`/roles/${project.targetRole}`} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Related role <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <CareerNext
          heading="Where a portfolio brief fits"
          items={[
            { title: "Start from a role", href: "/roles", why: "Each brief mirrors one role's deliverables and proof standards — pick your target role first." },
            { title: "Practice interviews", href: "/interview-prep", why: "Every brief lists the interview questions the project helps you answer." },
            { title: "Get Hired journey", href: "/get-hired", why: "The brief is stage 5 of the journey: your first simulated proof-of-work project." },
          ]}
        />
      </Container>
    </Shell>
  );
}
