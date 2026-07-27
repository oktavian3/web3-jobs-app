import Link from "next/link";
import { ArrowRight, BookOpen, Compass, FileCheck2, Hammer, MessagesSquare, Send } from "lucide-react";

// The macro career journey shown on the homepage. This is a product model,
// not tracked user progress — there is no completion state, checkmark, or
// percentage. Each step links to the real page that covers it.
const steps = [
  { stage: "Discover", detail: "Compare real roles by the actual work, not the title.", href: "/roles", Icon: Compass },
  { stage: "Learn", detail: "Build the foundations one target role actually needs.", href: "/learn-web3", Icon: BookOpen },
  { stage: "Build", detail: "Work a role-specific, clearly simulated proof brief.", href: "/portfolio", Icon: Hammer },
  { stage: "Prove", detail: "Package the result as a case study a reviewer can inspect.", href: "/get-hired", Icon: FileCheck2 },
  { stage: "Prepare", detail: "Practice the interview questions that role actually asks.", href: "/interview-prep", Icon: MessagesSquare },
  { stage: "Apply", detail: "Search safely with sources matched to your target role.", href: "/job-boards", Icon: Send },
] as const;

// Node geometry, shared by the SVG curve and the absolutely-placed nodes so
// they always line up. x is the centre of each of 6 equal columns; y alternates
// low/high to trace the wave. Both are percentages of the 1200x300 viewBox.
const NODE_X = [100, 300, 500, 700, 900, 1100];
const LOW_Y = 195;
const HIGH_Y = 105;
const CURVE_PATH = [
  `M ${NODE_X[0]} ${LOW_Y}`,
  `C 200 ${LOW_Y}, 200 ${HIGH_Y}, ${NODE_X[1]} ${HIGH_Y}`,
  `C 400 ${HIGH_Y}, 400 ${LOW_Y}, ${NODE_X[2]} ${LOW_Y}`,
  `C 600 ${LOW_Y}, 600 ${HIGH_Y}, ${NODE_X[3]} ${HIGH_Y}`,
  `C 800 ${HIGH_Y}, 800 ${LOW_Y}, ${NODE_X[4]} ${LOW_Y}`,
  `C 1000 ${LOW_Y}, 1000 ${HIGH_Y}, ${NODE_X[5]} ${HIGH_Y}`,
].join(" ");

function StepNode({ Icon }: { Icon: (typeof steps)[number]["Icon"] }) {
  return (
    <span
      className="journey-node grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={2.2} />
    </span>
  );
}

function StepText({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <>
      <p className="text-base font-extrabold tracking-tight text-ink">
        <span className="mr-1.5 text-blue-700">{index + 1}.</span>
        {step.stage}
      </p>
      <p className="mt-1.5 text-xs leading-5 text-muted">{step.detail}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">
        Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </>
  );
}

export default function CareerJourney() {
  return (
    <div aria-label="KRAFT career journey">
      {/* ── Desktop: curved process line with alternating labels ─────────
          Gated at xl, not lg: six 172px labels need ~192px of column spacing,
          which the container only provides from ~1280px up. Below that the
          labels collide, so the vertical rail is used instead. */}
      <div className="relative hidden h-[360px] xl:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Soft under-stroke, then the crisp blue line on top. */}
          <path d={CURVE_PATH} fill="none" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
          <path d={CURVE_PATH} fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <ol className="absolute inset-0">
          {steps.map((step, index) => {
            const isLow = index % 2 === 0;
            const y = isLow ? LOW_Y : HIGH_Y;
            const yPct = (y / 300) * 100;
            return (
              <li
                key={step.stage}
                className="absolute top-0 h-full w-[172px] -translate-x-1/2"
                style={{ left: `${(NODE_X[index] / 1200) * 100}%` }}
              >
                <Link href={step.href} className="group block h-full focus-visible:outline-none">
                  {/* Ghost numeral, sitting behind the node. */}
                  <span
                    className="journey-numeral absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] font-normal"
                    style={{ top: `${yPct}%` }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>

                  {/* Node, centred exactly on the curve. */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: `${yPct}%` }}
                  >
                    <StepNode Icon={step.Icon} />
                  </span>

                  {/* Label: above the node on low points, below on high points. */}
                  <span
                    className="absolute inset-x-0 block text-center"
                    style={
                      isLow
                        ? { bottom: `${100 - yPct}%`, paddingBottom: "2.5rem" }
                        : { top: `${yPct}%`, paddingTop: "2.5rem" }
                    }
                  >
                    <StepText step={step} index={index} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Mobile through large: vertical rail ────────────────────────── */}
      <ol className="space-y-6 border-l border-border pl-6 xl:hidden">
        {steps.map((step, index) => (
          <li key={step.stage} className="relative">
            <span className="absolute -left-[2.15rem] top-0" aria-hidden="true">
              <span className="journey-node grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
                <step.Icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
            </span>
            <Link href={step.href} className="group block">
              <StepText step={step} index={index} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
