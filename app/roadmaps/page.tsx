"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { roadmaps } from "@/data/roadmaps";
import { careerLanes } from "@/data/roles";
import { Shell, Container, SectionHeading, FinalCTA } from "@/components/kraft/Primitives";

export default function RoadmapsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = roadmaps.find((roadmap) => roadmap.slug === activeSlug);

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Roadmaps" title="Browse the path before opening the detail." copy="Roadmaps are optional practical guides, not course modules. Choose a lane first, then inspect phases, outputs, and related terms." />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadmaps.map((roadmap) => {
            const lane = careerLanes.find((item) => item.slug === roadmap.slug);
            return (
              <button
                key={roadmap.slug}
                type="button"
                onClick={() => setActiveSlug(roadmap.slug)}
                className="interactive-card group relative overflow-hidden rounded-3xl border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#f4f9ff)] p-6 text-left shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-blue"
              >
                <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-blue-200/45 blur-2xl transition group-hover:bg-blue-300/70" />
                <span className="relative tag">{lane?.difficulty ?? "Practical"}</span>
                <h2 className="relative mt-5 text-2xl font-extrabold tracking-tight text-ink">{roadmap.lane}</h2>
                <p className="relative mt-3 text-sm leading-6 text-slate-700">{lane?.description ?? roadmap.note}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  View Roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="roadmap-title">
            <div className="mx-auto my-8 max-w-4xl rounded-[28px] border border-blue-100 bg-white p-5 shadow-blue sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="tag">Roadmap detail</span>
                  <h2 id="roadmap-title" className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{active.lane}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">{active.note}</p>
                </div>
                <button type="button" onClick={() => setActiveSlug(null)} className="icon-button" aria-label="Close roadmap">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 grid gap-4">
                {active.phases.map((phase, index) => (
                  <div key={phase.title} className="rounded-3xl border border-blue-100 bg-[linear-gradient(145deg,#f9fcff,#edf5ff)] p-5">
                    <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Phase {index + 1}</span>
                    <h3 className="mt-2 text-lg font-extrabold text-ink">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Output: {phase.output}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{phase.relatedTerms.map((term) => <span key={term} className="tag">{term}</span>)}</div>
                  </div>
                ))}
              </div>
              <Link href={`/roles?lane=${encodeURIComponent(active.lane)}`} className="btn-primary group mt-8">
                Open related roles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ) : null}

        <FinalCTA title="Roadmaps work best with proof." copy="Pick a lane, choose one output, and package it as a portfolio case study." primary={{ href: "/portfolio", label: "Choose a Project" }} secondary={{ href: "/skill-check", label: "Start Skill Check" }} />
      </Container>
    </Shell>
  );
}
