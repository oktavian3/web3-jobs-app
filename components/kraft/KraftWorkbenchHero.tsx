import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { careerLanes, getRolesByLane } from "@/data/roles";
import KraftWorkbenchMotion, { type LaneFrame } from "@/components/kraft/KraftWorkbenchMotion";

/**
 * Homepage hero: a dark, pixel-art-inspired late-night career workbench, with
 * the KRAFT product surface rendered on the laptop screen.
 *
 * Server component on purpose. The role dataset is ~90KB; it is reduced to the
 * small payload below so only that payload crosses into the client bundle.
 *
 * Every number and label here is derived from canonical data - no invented user
 * statistics, fit percentages, completion ratios, salaries or learner activity
 * (DOCS/KRAFT_IMPLEMENTATION_SPEC.md §14).
 *
 * Artwork boundary: all scenery lives in the single .kraft-workbench-art block
 * below, is pointer-events:none, and is hidden from assistive tech. Nothing
 * outside it depends on its internals, so it can later be replaced wholesale by
 * one transparent WebP without touching the layout, the screen overlay or the
 * lane chips - neither of which is baked into the artwork.
 */

const laneFrames: LaneFrame[] = careerLanes.map((lane) => {
  const laneRoles = getRolesByLane(lane.lane);
  return {
    lane: lane.lane,
    roleCount: laneRoles.length,
    // A real canonical role in this lane - the screen names an actual guide
    // rather than implying a computed "match".
    sampleRole: laneRoles[0]?.title ?? lane.exampleRoles[0],
  };
});

// The four KRAFT stages, shown on the laptop screen. Labels only - the coverage
// counts for these deliberately live in the KRAFT overview section below the
// hero, and are not repeated here.
const flowLabels = ["Role", "Skills", "Proof of Work", "Jobs"];

export default function KraftWorkbenchHero() {
  return (
    <section className="kraft-hero">
      <div className="kraft-hero__inner">
        <div className="kraft-hero__grid">
          <div className="kraft-hero__copy">
            <h1 className="kraft-hero__title">
              Know the <span className="font-display">work</span>
              <br />
              before you chase
              <br />
              the <span className="font-display">title.</span>
            </h1>

            <p className="kraft-hero__lede">
              Discover a real role, learn what it needs, build proof, and prepare to apply - with
              context instead of guesswork.
            </p>

            <div className="kraft-hero__actions">
              <Link href="/skill-check" className="btn-white group">
                Find My Role
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/roles" className="btn-ghost-white">
                Explore Roles
              </Link>
            </div>
          </div>

          {/* Owns the stage and everything animated inside it. The scenery
              below stays server-rendered, passed in as children. */}
          <KraftWorkbenchMotion lanes={laneFrames} flow={flowLabels}>
            {/* ── Scenery ──────────────────────────────────────────────────
                Static, decorative, and self-contained. Swap this one block for
                an <img> later; nothing outside it depends on its internals. */}
            <div className="kraft-workbench-art" aria-hidden="true">
              <span className="wb-window" />
              <span className="wb-poster" />
              <span className="wb-shelf" />
              <span className="wb-lamp-arm" />
              <span className="wb-lamp-pole" />
              <span className="wb-lamp-head" />
              <span className="wb-lamp-glow" />
              <span className="wb-screen-spill" />
              <span className="wb-desk" />
              <span className="wb-laptop" />
              <span className="wb-laptop-base" />
              <span className="wb-keyboard" />
              <span className="wb-mug" />
              <span className="wb-steam" />
              <span className="wb-notebook" />
            </div>
          </KraftWorkbenchMotion>
        </div>
      </div>

      {/* Lighting fade that resolves the dark hero into the light page canvas
          below, so no decorative divider is needed between sections. */}
      <span className="kraft-hero__horizon" aria-hidden="true" />
    </section>
  );
}
