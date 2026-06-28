"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

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

export function ProofChecklistAnimation({ items }: { items: string[] }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const completeCount = 3;

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
    <div ref={ref} className="rounded-[28px] border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#edf6ff)] p-5 shadow-blue">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="tag">Portfolio progress</span>
          <h3 className="mt-3 text-2xl font-extrabold text-ink">{completeCount} of {items.length} complete</h3>
        </div>
        <div className="grid h-20 w-20 place-items-center rounded-full border-[10px] border-blue-600 bg-blue-50 text-xl font-extrabold text-blue-700">
          60%
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(20,107,255,0.12)]">
        <div className={`h-full rounded-full bg-[linear-gradient(90deg,#146bff,#76c9ff)] transition-all duration-1000 ${active ? "w-[60%]" : "w-0"}`} />
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => {
          const complete = index < completeCount;
          return (
            <div
              key={item}
              className={`flex gap-3 rounded-2xl border p-4 transition duration-700 ${
                active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } ${complete ? "border-blue-100 bg-white text-ink" : "border-slate-200 bg-slate-50 text-slate-500"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <CheckCircle2 className={`mt-0.5 h-5 w-5 ${complete && active ? "text-blue-600" : "text-slate-300"}`} />
              <span className="text-sm font-bold leading-6">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
