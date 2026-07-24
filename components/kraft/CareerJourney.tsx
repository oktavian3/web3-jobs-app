import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The macro career journey shown on the homepage. This is a product model,
// not tracked user progress — there is no completion state, checkmark, or
// percentage. Each step links to the real page that covers it.
const steps = [
  { stage: "Discover", detail: "Compare real roles by the actual work, not the title.", href: "/roles" },
  { stage: "Learn", detail: "Build the foundations one target role actually needs.", href: "/learn-web3" },
  { stage: "Build", detail: "Work a role-specific, clearly simulated proof brief.", href: "/portfolio" },
  { stage: "Prove", detail: "Package the result as a case study a reviewer can inspect.", href: "/get-hired" },
  { stage: "Prepare", detail: "Practice the interview questions that role actually asks.", href: "/interview-prep" },
  { stage: "Apply", detail: "Search safely with sources matched to your target role.", href: "/job-boards" },
] as const;

export default function CareerJourney() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0" aria-label="KRAFT career journey">
      {steps.map((step, index) => (
        <li key={step.stage} className="relative">
          {/* Connecting line: desktop horizontal, mobile vertical (drawn on the card border instead). */}
          {index < steps.length - 1 && (
            <span
              className="absolute top-1/2 right-0 z-0 hidden h-px w-full -translate-y-1/2 translate-x-1/2 bg-border-strong lg:block"
              aria-hidden="true"
            />
          )}
          <Link
            href={step.href}
            className="card-surface card-surface--interactive group relative z-10 flex h-full flex-col gap-2 p-4 lg:mx-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white" aria-hidden="true">
              {index + 1}
            </span>
            <p className="text-sm font-extrabold text-ink">{step.stage}</p>
            <p className="flex-1 text-xs leading-5 text-muted">{step.detail}</p>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">
              Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
