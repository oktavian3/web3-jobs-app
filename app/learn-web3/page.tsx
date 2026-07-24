import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { careerLanes } from "@/data/roles";
import { roadmapDetails } from "@/data/roadmapDetail";
import { foundationsItems, getLearningItemsForLane } from "@/data/learningPath";
import { Shell, Container } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";
import CareerNext from "@/components/kraft/career/CareerNext";
import LearnWeb3Explorer, { type LaneOption } from "@/components/kraft/LearnWeb3Explorer";

export const metadata: Metadata = {
  title: "Learn Web3",
  description:
    "Start with Web3 foundations, then choose a career lane and role to see curated resources, tools, and the roadmap and proof-of-work that come next.",
};

const lanes: LaneOption[] = careerLanes.map((lane) => {
  const detail = roadmapDetails.find((d) => d.lane === lane.lane);
  return {
    lane: lane.lane,
    laneSlug: lane.slug,
    description: lane.description,
    roles: (detail?.relatedRoles ?? []).map((r) => ({ slug: r.slug, title: r.title })),
    items: getLearningItemsForLane(lane.lane).map((item) => ({
      slug: item.slug,
      title: item.title,
      type: item.type,
      level: item.level,
      topic: item.topic,
      whyItMatters: item.whyItMatters,
      outcome: item.outcome,
      url: item.url,
      isExternal: item.isExternal,
    })),
  };
});

export default function LearnWeb3Page() {
  return (
    <Shell>
      <Container className="space-y-14 py-12 sm:py-16">
        <PageHeader
          eyebrow="Learn Web3"
          title="Learn what the role actually needs."
          copy="Start with the foundations everyone needs, then move into one career lane and one target role. External resources are curated, not authored or maintained by KRAFT — they are clearly marked."
        />

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Step 1 — Web3 foundations</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">Wallets, safety, and vocabulary that every lane assumes you already know.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {foundationsItems.map((item) => (
              <div key={item.slug} className="flex h-full flex-col rounded-3xl border border-border bg-white p-5">
                <span className="tag">{item.level}</span>
                <h3 className="mt-3 text-lg font-extrabold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{item.whyItMatters}</p>
                <a
                  href={item.url}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {item.isExternal ? "Open external resource" : "Open"}
                  {item.isExternal ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Step 2 — Choose a lane and a role</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted">
            Learning without a target role tends to stay abstract. Pick a lane, then a role, to see resources matched to it.
          </p>
          <div className="mt-6">
            <LearnWeb3Explorer lanes={lanes} />
          </div>
        </section>

        <CareerNext
          heading="After you learn the foundations"
          items={[
            { title: "Open a roadmap", href: "/roadmaps", why: "See the milestones and proof artifacts that turn this learning into evidence for your chosen lane." },
            { title: "Build a portfolio brief", href: "/portfolio", why: "Each canonical role has a simulated proof-of-work brief matched to its real deliverables." },
            { title: "Not sure which lane fits?", href: "/skill-check", why: "A short self-assessment can suggest a starting lane and role based on your answers." },
          ]}
        />
      </Container>
    </Shell>
  );
}
