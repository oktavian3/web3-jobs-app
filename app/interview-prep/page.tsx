"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { interviewQuestions } from "@/data/interviewQuestions";
import { careerLanes } from "@/data/roles";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

const prepByLane: Record<string, { evaluate: string; prepare: string[]; mistakes: string[] }> = {
  "Community & Growth": {
    evaluate: "Calm judgment, reporting quality, escalation discipline, and whether you can protect trust under pressure.",
    prepare: ["Community health report", "Incident response example", "Ambassador or activation plan"],
    mistakes: ["Only talking about member count", "Answering before verifying facts", "No escalation criteria"],
  },
  "Content & Marketing": {
    evaluate: "Source checking, audience judgment, campaign thinking, and how you handle claims you cannot verify.",
    prepare: ["Research notes", "Educational content sample", "Campaign performance readout"],
    mistakes: ["Repeating hype", "Optimizing only for impressions", "No source trail"],
  },
  "Product & Operations": {
    evaluate: "Problem framing, prioritization, process clarity, and ability to turn ambiguity into decisions.",
    prepare: ["PRD sample", "User journey audit", "Launch or incident checklist"],
    mistakes: ["Jumping to features", "No acceptance criteria", "Ignoring failure states"],
  },
  "Research & Data": {
    evaluate: "Metric literacy, caveats, primary-source research, and ability to separate activity from durable value.",
    prepare: ["Protocol comparison", "Dashboard or spreadsheet", "Methodology note"],
    mistakes: ["TVL-only analysis", "No caveats", "Confusing wallets with users"],
  },
  "Technical & Security": {
    evaluate: "Testing discipline, security assumptions, debugging process, and how clearly you explain technical trade-offs.",
    prepare: ["Tested repo", "Threat notes", "Transaction-state demo"],
    mistakes: ["Happy-path only", "No tests", "Unclear access control"],
  },
  "Creative & Design": {
    evaluate: "Clarity, visual systems, risk communication, accessibility, and ability to explain design decisions.",
    prepare: ["Approval-flow redesign", "Case study", "Reusable mini system"],
    mistakes: ["Visual novelty over clarity", "No rationale", "Missing failure states"],
  },
  "Governance, Legal & People": {
    evaluate: "Source discipline, neutral coordination, compliance judgment, people-process clarity, and careful risk language.",
    prepare: ["Governance digest", "Compliance checklist", "Hiring scorecard or grant proposal"],
    mistakes: ["Overclaiming certainty", "No source trail", "No decision owner"],
  },
  "Trading & Finance Adjacent": {
    evaluate: "Metric caveats, risk framing, market structure, ethical boundaries, and evidence quality.",
    prepare: ["Wallet or flow analysis", "Token model", "Market-structure memo"],
    mistakes: ["Financial hype", "No caveats", "Encouraging abusive farming"],
  },
};

export default function InterviewPrepPage() {
  const [activeLane, setActiveLane] = useState(careerLanes[0].lane);
  const lane = careerLanes.find((item) => item.lane === activeLane) ?? careerLanes[0];
  const prep = prepByLane[activeLane];
  const questions = useMemo(() => interviewQuestions.filter((item) => item.lane === activeLane), [activeLane]);

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Interview Prep" title="Choose a lane, then practice the judgment." copy="Prep changes by role. Start with the lane, then review what companies evaluate, what to prepare, likely questions, and weak answer patterns." />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {careerLanes.map((item) => (
            <button
              key={item.lane}
              type="button"
              onClick={() => setActiveLane(item.lane)}
              className={`interactive-card group rounded-3xl border p-5 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue ${
                activeLane === item.lane ? "border-blue-300 bg-[linear-gradient(145deg,#0f6fff,#68c2ff)] text-white" : "border-blue-100 bg-[linear-gradient(145deg,#ffffff,#f4f9ff)] text-ink"
              }`}
            >
              <BriefcaseBusiness className={`h-6 w-6 ${activeLane === item.lane ? "text-white" : "text-blue-700"}`} />
              <h2 className="mt-4 text-xl font-extrabold tracking-tight">{item.lane}</h2>
              <p className={`mt-2 text-sm leading-6 ${activeLane === item.lane ? "text-white" : "text-slate-700"}`}>{item.description}</p>
              <span className={`mt-4 inline-flex items-center gap-2 text-sm font-extrabold ${activeLane === item.lane ? "text-white" : "text-blue-700"}`}>
                Prepare this lane <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>

        <Card className="overflow-hidden p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[linear-gradient(145deg,#0f6fff,#74caff)] p-6 text-white shadow-blue">
              <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em]">Selected lane</span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight">{lane.lane}</h2>
              <p className="mt-4 text-sm leading-6 text-white">{prep.evaluate}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="font-extrabold text-ink">What to prepare</h3>
                <div className="mt-4 space-y-3">
                  {prep.prepare.map((item) => (
                    <div key={item} className="flex gap-3 text-sm font-bold text-ink">
                      <CheckCircle2 className="h-5 w-5 text-blue-700" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-white p-5">
                <h3 className="font-extrabold text-ink">Common mistakes</h3>
                <div className="mt-4 space-y-3">
                  {prep.mistakes.map((item) => (
                    <p key={item} className="rounded-xl bg-soft px-3 py-2 text-sm font-bold text-slate-700">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          {questions.map((item) => (
            <Card key={item.question} className="group p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue">
              <h3 className="text-lg font-extrabold leading-7 text-ink">{item.question}</h3>
              <div className="mt-4 grid gap-3">
                <p className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-800"><strong>What they test:</strong> {item.tests}</p>
                <p className="rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-700"><strong>Weak pattern:</strong> {item.weakPattern}</p>
                <p className="rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-700"><strong>Strong structure:</strong> {item.strongStructure}</p>
              </div>
            </Card>
          ))}
        </div>

        <FinalCTA title="Use answers from real work." copy="Interview prep is stronger when every answer points to a concrete project, report, dashboard, or case study." primary={{ href: "/portfolio", label: "Choose a Project" }} secondary={{ href: "/get-hired", label: "Open Hiring Guide" }} />
      </Container>
    </Shell>
  );
}
