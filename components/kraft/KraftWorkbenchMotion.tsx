"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { CareerLane } from "@/data/roles";
import { laneIcons } from "@/components/kraft/laneIcons";

/**
 * The living part of the workbench hero: the KRAFT surface on the laptop
 * screen and the lane chips floating around it.
 *
 * Content note: every label rendered here is real. Lane names, role counts and
 * role titles are canonical data resolved on the server and passed down as a
 * small payload; the four flow labels are the actual KRAFT stages. The sequence
 * dramatises the product model - find a lane, read the role, build proof, then
 * apply - and deliberately shows no fit score, readiness percentage or
 * completion ratio, because KRAFT measures none of those
 * (DOCS/KRAFT_IMPLEMENTATION_SPEC.md §14).
 *
 * Motion note: the scene is decorative, so the whole animated composition is
 * hidden from assistive tech and a static equivalent is exposed instead.
 * Nothing here is readable only while animating.
 *
 * Only lane *names* cross the server/client boundary - icons are resolved here
 * from the shared laneIcons map, since components are not serialisable props.
 * The scenery arrives as `children` so it stays server-rendered and out of this
 * client bundle, while still sitting inside the stage's coordinate space.
 */

export type LaneFrame = {
  lane: CareerLane;
  roleCount: number;
  sampleRole: string;
};

// Phase lengths of the looping sequence, in ms. Long enough to read, slow
// enough that the hero never competes with the headline.
const SEQUENCE = [
  { key: "idle", ms: 1700 },
  { key: "scan", ms: 2100 },
  { key: "focus", ms: 2000 },
  { key: "flow", ms: 3100 },
  { key: "rest", ms: 1000 },
] as const;

/**
 * Resting frame under prefers-reduced-motion: chips out, one lane focused, and
 * the complete Role -> Skills -> Proof of Work -> Jobs model on screen. The
 * single most informative frame, so the hero still explains itself with motion
 * fully disabled.
 */
const STATIC_PHASE = 3;

export default function KraftWorkbenchMotion({
  lanes,
  flow,
  children,
}: {
  lanes: LaneFrame[];
  /** The four KRAFT stage labels, shown on the laptop screen. */
  flow: string[];
  /** Server-rendered scenery, placed inside the stage. */
  children: ReactNode;
}) {
  const [reduced, setReduced] = useState(false);
  // One monotonic counter drives both the phase and the lane, so a phase change
  // can never race the lane change (and no state updater triggers another).
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || lanes.length === 0) return;
    const timer = window.setTimeout(
      () => setTick((current) => current + 1),
      SEQUENCE[tick % SEQUENCE.length].ms
    );
    return () => window.clearTimeout(timer);
  }, [tick, reduced, lanes.length]);

  if (lanes.length === 0) return null;

  const phase = reduced ? STATIC_PHASE : tick % SEQUENCE.length;
  // Each completed loop advances to the next canonical lane.
  const laneIndex = Math.floor(tick / SEQUENCE.length) % lanes.length;
  const lane = lanes[laneIndex];

  const chipsOut = phase >= 1 && phase <= 3;
  const focused = phase >= 2 && phase <= 3;

  // Three lanes orbit the laptop at a time: the focused one plus its two
  // neighbours in canonical order.
  const orbit = [0, 1, 2].map((offset) => lanes[(laneIndex + offset) % lanes.length]);

  return (
    <div className="kraft-hero__stage-wrap">
      <div className="kraft-stage">
        {children}

        <div className="kraft-screen" aria-hidden="true">
          <div className="kraft-screen__bar">
            <span className="kraft-screen__dots" />
            <span className="kraft-screen__title">KRAFT</span>
          </div>

          <div className="kraft-screen__body" data-phase={SEQUENCE[phase].key}>
            {(phase === 0 || phase === 4) && (
              <div className="kraft-screen__view">
                <p className="kraft-screen__wordmark">KRAFT</p>
                <p className="kraft-screen__prompt">
                  Know the work
                  <span className="kraft-screen__caret" />
                </p>
              </div>
            )}

            {phase === 1 && (
              <div className="kraft-screen__view">
                <p className="kraft-screen__label">Career lanes</p>
                <ul className="kraft-screen__list">
                  {orbit.map((item, index) => (
                    <li key={item.lane} style={{ animationDelay: `${index * 170}ms` }}>
                      {item.lane}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {phase === 2 && (
              <div className="kraft-screen__view">
                <p className="kraft-screen__label">Career lane</p>
                <p className="kraft-screen__lane">{lane.lane}</p>
                <p className="kraft-screen__meta">
                  {lane.roleCount} role {lane.roleCount === 1 ? "guide" : "guides"}
                </p>
                <p className="kraft-screen__role">{lane.sampleRole}</p>
              </div>
            )}

            {phase === 3 && (
              <div className="kraft-screen__view">
                <p className="kraft-screen__label">{lane.lane}</p>
                <ol className="kraft-screen__flow">
                  {flow.map((step, index) => (
                    <li key={step} style={{ animationDelay: `${index * 380}ms` }}>
                      <span className="kraft-screen__flowIndex">{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="kraft-orbit" aria-hidden="true">
          {orbit.map((item, index) => {
            const Icon = laneIcons[item.lane];
            const isActive = focused && index === 0;
            return (
              <span
                key={item.lane}
                className={`kraft-chip kraft-chip--${index}${chipsOut ? " is-out" : ""}${
                  isActive ? " is-active" : ""
                }`}
              >
                <span className="kraft-chip__icon">
                  <Icon className="h-3 w-3" strokeWidth={2.4} />
                </span>
                <span className="kraft-chip__label">{item.lane}</span>
              </span>
            );
          })}
        </div>

        {/* Static, complete equivalent of the animated scene above. */}
        <p className="sr-only">
          KRAFT covers {lanes.length} career lanes: {lanes.map((item) => item.lane).join(", ")}. Each
          lane leads to a role guide, the skills that role needs, a proof-of-work brief, and curated
          job platforms.
        </p>
      </div>
    </div>
  );
}
