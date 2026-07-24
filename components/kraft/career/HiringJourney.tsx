import Link from "next/link";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import type { JourneyStage, HiringPath } from "@/data/hiringJourney";

export function HiringPaths({ paths }: { paths: HiringPath[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {paths.map((path) => (
        <div key={path.id} className="card-surface flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-sm font-extrabold text-white" aria-hidden="true">{path.id}</span>
            <h3 className="text-lg font-extrabold tracking-tight text-ink">{path.title}</h3>
          </div>
          <p className="mt-3 text-sm font-bold text-muted">{path.whoItIsFor}</p>
          <ol className="mt-4 flex-1 space-y-2">
            {path.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl border border-border-strong bg-highlight p-3 text-xs leading-5 text-ink">{path.note}</p>
        </div>
      ))}
    </div>
  );
}

export function HiringTimeline({ stages }: { stages: JourneyStage[] }) {
  return (
    <ol className="space-y-9 border-l border-border pl-6 sm:pl-8">
      {stages.map((stage) => (
        <li key={stage.id} id={`stage-${stage.id}`} className="relative scroll-mt-28">
          <span
            className="absolute -left-[1.62rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-blue-500 sm:-left-[2.12rem]"
            aria-hidden="true"
          />
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
            Stage {stage.id} of {stages.length}
          </p>
          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink sm:text-xl">{stage.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{stage.objective}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">What to do</p>
              <ul className="mt-2 space-y-1.5">
                {stage.whatToDo.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-6 text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="card-surface card-surface--informational p-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Expected output</p>
                <p className="mt-1 text-sm leading-6 text-ink">{stage.expectedOutput}</p>
              </div>
              <div className="flex gap-2 text-sm leading-6 text-ink">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                <span><span className="font-bold">Common mistake: </span>{stage.commonMistake}</span>
              </div>
              <div className="flex gap-2 text-sm leading-6 text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span><span className="font-bold">Done when: </span>{stage.completionSignal}</span>
              </div>
            </div>
          </div>

          <Link
            href={stage.link.href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {stage.link.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
