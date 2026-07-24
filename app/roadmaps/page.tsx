import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roadmapDetails } from "@/data/roadmapDetail";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CareerNext from "@/components/kraft/career/CareerNext";

export const metadata: Metadata = {
  title: "Career Roadmaps",
  description:
    "Lane-level planning guides that connect prerequisites, practice, and proof-of-work. Roadmaps are planning tools, not guaranteed timelines or job paths.",
};

export default function RoadmapsPage() {
  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Roadmaps"
          title="Choose a path based on where you are starting."
          copy="Each roadmap is a lane-level planning guide, not a role-specific curriculum or a promise of a job. Open a lane to see its milestones, review criteria, and related roles."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadmapDetails.map((detail) => (
            <Link
              key={detail.laneSlug}
              href={`/roadmaps/${detail.laneSlug}`}
              className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span className="tag">{detail.difficulty}</span>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">{detail.lane}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{detail.startingAssumptions}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                View roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <CareerNext
          heading="Where roadmaps connect"
          items={[
            { title: "Skill Check", href: "/skill-check", why: "Not sure which lane fits? A quick self-assessment can suggest a starting lane and role." },
            { title: "Portfolio briefs", href: "/portfolio", why: "Each roadmap milestone maps to a proof artifact you can build as a full brief." },
            { title: "Get Hired journey", href: "/get-hired", why: "Roadmaps cover stages 3–4 of the journey: learning foundations and studying expected outputs." },
          ]}
        />
      </Container>
    </Shell>
  );
}
