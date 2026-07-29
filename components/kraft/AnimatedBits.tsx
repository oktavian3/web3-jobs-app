"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
      const duration = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [started, value]);

  return <span ref={ref}>{started ? display : 0}</span>;
}

// The proof-building pipeline: Knowledge -> Task -> Deliverable -> Review ->
// Case Study. This illustrates KRAFT's model of evidence, not tracked user
// progress - there is no completion state, count, or percentage.
const pipelineStages = [
  { stage: "Knowledge", detail: "Learn the role's real prerequisites, not generic courses." },
  { stage: "Task", detail: "Work from a role-specific, clearly simulated brief." },
  { stage: "Deliverable", detail: "Produce the actual artifact the role is judged on." },
  { stage: "Review", detail: "Check it against the brief's rubric and name your assumptions." },
  { stage: "Case Study", detail: "Package context, decisions, and limitations for a reviewer." },
] as const;

export function ProofPipeline() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || active) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={ref} className="card-surface p-5 sm:p-6">
      <span className="tag">Evidence, not certificates</span>
      <h3 className="mt-3 text-2xl font-extrabold text-ink">How KRAFT frames proof-of-work</h3>
      <ol className="mt-5 space-y-3">
        {pipelineStages.map((item, index) => (
          <li
            key={item.stage}
            className={`flex gap-3 rounded-2xl border border-border bg-soft p-4 transition duration-500 ${
              active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-extrabold text-ink">{item.stage}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
            </div>
            {index < pipelineStages.length - 1 && (
              <ArrowRight className="ml-auto hidden h-4 w-4 shrink-0 self-center text-muted sm:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
