import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, GitBranch } from "lucide-react";
import { roadmapDetails, getRoadmapDetail } from "@/data/roadmapDetail";
import { Shell, Container } from "@/components/kraft/Primitives";
import CareerNext from "@/components/kraft/career/CareerNext";

export function generateStaticParams() {
  return roadmapDetails.map((detail) => ({ slug: detail.laneSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = getRoadmapDetail(slug);
  return {
    title: detail ? `${detail.lane} Roadmap` : "Roadmap",
    description: detail ? `A planning guide for ${detail.lane.toLowerCase()} — not a guaranteed job path.` : undefined,
  };
}

export default async function RoadmapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getRoadmapDetail(slug);
  if (!detail) notFound();

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <Link href="/roadmaps" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to roadmaps
        </Link>

        <header className="max-w-3xl">
          <span className="tag">{detail.difficulty}</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{detail.lane} roadmap</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{detail.audience}</p>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-amber-900">
              This is a lane-level planning guide, not a role-specific curriculum or a guaranteed path to a job. Starting point: {detail.startingAssumptions}
            </p>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Milestones</h2>
          <ol className="mt-6 space-y-9 border-l border-border pl-6 sm:pl-8">
            {detail.milestones.map((milestone, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[1.62rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-blue-500 sm:-left-[2.12rem]"
                  aria-hidden="true"
                />
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
                  Stage {i + 1} of {detail.milestones.length}
                </p>
                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink">{milestone.title}</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Learning focus</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.learningFocus.map((term) => (
                        <Link key={term} href={`/glossary?q=${encodeURIComponent(term)}`} className="tag">{term}</Link>
                      ))}
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Proof artifact</p>
                    <p className="text-sm leading-6 text-ink">{milestone.proofArtifact}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="card-surface card-surface--informational p-3">
                      <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Review criteria</p>
                      <p className="mt-1 text-sm leading-6 text-ink">{milestone.reviewCriteria}</p>
                    </div>
                    <div className="flex gap-2 text-sm leading-6 text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span><span className="font-bold">Done when: </span>{milestone.completionSignal}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border pt-8">
          <div className="card-surface card-surface--evidence flex gap-3 p-5 sm:p-6">
            <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-extrabold text-ink">Decision point after each milestone</h2>
              <p className="mt-2 text-sm leading-6 text-ink">{detail.decisionPoint}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Related roles in this lane</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {detail.relatedRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="card-surface card-surface--interactive group flex items-center justify-between p-4"
              >
                <span className="font-extrabold text-ink">{role.title}</span>
                <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <CareerNext
          heading="Turn milestones into evidence"
          items={[
            ...detail.portfolioLinks.slice(0, 2).map((p) => ({
              title: `${p.roleTitle} portfolio brief`,
              href: `/portfolio/${p.slug}`,
              why: "Matches this roadmap's proof artifacts to a full simulated project brief.",
            })),
            { title: detail.nextCareerStep.label, href: detail.nextCareerStep.href, why: "Once your milestones produce real proof, the Get Hired journey covers packaging and applying." },
          ]}
        />
      </Container>
    </Shell>
  );
}
