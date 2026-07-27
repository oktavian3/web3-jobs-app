"use client";

import { useEffect, useState } from "react";
import type { CareerLane } from "@/data/roles";
import { laneIcons } from "@/components/kraft/laneIcons";

/**
 * The highlighted, rotating word slot in the homepage headline.
 *
 * Content note: the rotating labels are the real canonical career lanes passed
 * in from the page — no invented marketing words. The animation is presentation
 * only, so the full list is always exposed to assistive tech as static text and
 * the visual chip is hidden from it. Nothing here is readable *only* while
 * animating.
 *
 * Layout note: an invisible sizer holds the width of the longest label, so
 * swapping words never reflows the headline.
 *
 * Only the lane names cross the server/client boundary — the icon components
 * are resolved here from the shared laneIcons map, since functions are not
 * serializable as props.
 */
export default function HeroRotator({
  items,
  intervalMs = 2400,
}: {
  items: CareerLane[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (items.length < 2) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const sync = () => {
      window.clearInterval(timer);
      setAnimate(!query.matches);
      // Reduced motion: hold the first lane instead of cycling.
      if (query.matches) {
        setIndex(0);
        return;
      }
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % items.length);
      }, intervalMs);
    };

    sync();
    query.addEventListener("change", sync);
    return () => {
      window.clearInterval(timer);
      query.removeEventListener("change", sync);
    };
  }, [items.length, intervalMs]);

  if (!items.length) return null;

  const active = items[index];
  const ActiveIcon = laneIcons[active];
  const longest = items.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <>
      <span className="hero-chip" aria-hidden="true">
        <span className="hero-chip__icon">
          <ActiveIcon className="h-[0.62em] w-[0.62em]" strokeWidth={2.4} />
        </span>
        <span className="hero-chip__label">
          <span className="grid">
            {/* Invisible width reservation — prevents headline reflow on swap. */}
            <span className="invisible col-start-1 row-start-1">{longest}</span>
            <span
              key={animate ? index : "static"}
              className={`col-start-1 row-start-1 ${animate ? "hero-chip__swap" : ""}`}
            >
              {active}
            </span>
          </span>
        </span>
      </span>

      {/* Static, complete equivalent for assistive tech and no-JS. */}
      <span className="sr-only">{items.join(", ")}</span>
    </>
  );
}
