"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { learningCategories } from "@/data/learningResources";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

export default function LearnWeb3Page() {
  const [activeSlug, setActiveSlug] = useState(learningCategories[0].slug);
  const active = learningCategories.find((category) => category.slug === activeSlug) ?? learningCategories[0];

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Learn Web3" title="Curated learning resources by career direction." copy="Use this hub to build foundations, then move into roles, roadmaps, portfolio projects, and applications." />

        <Card className="overflow-hidden p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[linear-gradient(145deg,#0f6fff,#75caff)] p-5 text-white shadow-blue">
              <BookOpen className="h-8 w-8" />
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight">Choose a learning lane</h2>
              <p className="mt-3 text-sm leading-6 text-white">Tabs keep the resource hub focused instead of turning learning into a long list.</p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-[28px] bg-soft p-3">
              {learningCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveSlug(category.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${activeSlug === category.slug ? "bg-blue-600 text-white shadow-soft" : "bg-white text-slate-700 hover:text-blue-700"}`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="p-6">
            <span className="tag">{active.accent}</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">{active.title}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">{active.description}</p>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <Sparkles className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-sm font-bold leading-6 text-ink">Next step: turn one resource into a small public note, checklist, dashboard, or case study.</p>
            </div>
          </Card>
          <div className="grid gap-4">
            {active.resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target={resource.url.startsWith("/") ? undefined : "_blank"}
                rel={resource.url.startsWith("/") ? undefined : "noreferrer"}
                className="interactive-card group relative overflow-hidden rounded-3xl border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#f4f9ff)] p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-200/45 blur-2xl transition group-hover:bg-blue-300/70" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="tag">{resource.type}</span>
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">{resource.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{resource.description}</p>
                  </div>
                  <span className="icon-button transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:text-blue-700">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <FinalCTA title="Learn, then build proof." copy="Do not stop at reading. Pick one role-aligned output and turn it into a portfolio artifact." primary={{ href: "/portfolio", label: "Choose a Project" }} secondary={{ href: "/roles", label: "Explore Roles" }} />
      </Container>
    </Shell>
  );
}
