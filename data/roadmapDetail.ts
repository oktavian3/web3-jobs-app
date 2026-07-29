// Roadmap detail records. KRAFT's roadmaps are lane-level planning guides, not
// role-level or guaranteed job paths - this file preserves that model explicitly
// and enriches each lane's existing phases with review/decision structure derived
// from the phase's own task and output, plus canonical role and portfolio links.
// No arbitrary duration is invented; the source roadmap carries no day/week counts
// and none are added here.

import { roadmaps, type Roadmap } from "./roadmaps";
import { roles, careerLanes, type CareerLane } from "./roles";
import { portfolioProjects } from "./portfolioProjects";

export type RoadmapMilestone = {
  title: string;
  learningFocus: string[];
  practicalTask: string;
  proofArtifact: string;
  reviewCriteria: string;
  completionSignal: string;
};

export type RoadmapDetail = {
  laneSlug: string;
  lane: CareerLane;
  difficulty: string;
  audience: string;
  startingAssumptions: string;
  milestones: RoadmapMilestone[];
  decisionPoint: string;
  relatedRoles: { slug: string; title: string }[];
  portfolioLinks: { slug: string; roleTitle: string }[];
  nextCareerStep: { label: string; href: string };
};

function buildMilestone(phase: Roadmap["phases"][number]): RoadmapMilestone {
  return {
    title: phase.title,
    learningFocus: phase.relatedTerms,
    practicalTask: phase.title,
    proofArtifact: phase.output,
    reviewCriteria: `The ${phase.output.toLowerCase()} should be reviewable by someone else: it names its assumptions, matches the stated task, and could stand as a small piece of evidence on its own.`,
    completionSignal: `You can produce the ${phase.output.toLowerCase()} without step-by-step guidance and could explain the decisions behind it.`,
  };
}

export const roadmapDetails: RoadmapDetail[] = careerLanes
  .map((laneInfo) => {
    const roadmap = roadmaps.find((r) => r.lane === laneInfo.lane);
    if (!roadmap) return null;
    const laneRoles = roles.filter((role) => role.lane === laneInfo.lane).slice(0, 4);
    const portfolioLinks = laneRoles
      .map((role) => portfolioProjects.find((p) => p.targetRole === role.slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ slug: p.slug, roleTitle: p.roleTitle }));

    const detail: RoadmapDetail = {
      laneSlug: laneInfo.slug,
      lane: laneInfo.lane,
      difficulty: laneInfo.difficulty,
      audience: `People targeting ${laneInfo.lane.toLowerCase()} roles such as ${laneRoles.slice(0, 3).map((r) => r.title).join(", ")}.`,
      startingAssumptions: roadmap.note,
      milestones: roadmap.phases.map(buildMilestone),
      decisionPoint: "After each milestone, check whether the output matches a role's proof standards on its role guide. If it does not, revisit the milestone before moving on; if a nearby role fits your evidence better, compare it before continuing.",
      relatedRoles: laneRoles.map((role) => ({ slug: role.slug, title: role.title })),
      portfolioLinks,
      nextCareerStep: { label: "Open the Get Hired journey", href: "/get-hired" },
    };
    return detail;
  })
  .filter((d): d is RoadmapDetail => Boolean(d));

export function getRoadmapDetail(laneSlug: string) {
  return roadmapDetails.find((d) => d.laneSlug === laneSlug);
}
