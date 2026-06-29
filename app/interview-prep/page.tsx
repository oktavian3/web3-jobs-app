"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, MessageSquareText } from "lucide-react";
import { interviewCategories, interviewQuestions, type InterviewCategory } from "@/data/interviewQuestions";
import { careerLanes, roles, type CareerLane } from "@/data/roles";
import { Shell, Container, SectionHeading, Card, FinalCTA } from "@/components/kraft/Primitives";

const prepByLane: Record<CareerLane, { evaluate: string; prepare: string[]; mistakes: string[] }> = {
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

function PillButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition ${
        active ? "bg-blue-600 text-white shadow-blue" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function InterviewPrepPage() {
  const [activeLane, setActiveLane] = useState<CareerLane>(careerLanes[0].lane);
  const laneRoles = useMemo(() => roles.filter((role) => role.lane === activeLane), [activeLane]);
  const [activeRoleSlug, setActiveRoleSlug] = useState(laneRoles[0]?.slug ?? roles[0].slug);
  const [activeCategory, setActiveCategory] = useState<InterviewCategory>(interviewCategories[0]);

  const activeRole = laneRoles.find((role) => role.slug === activeRoleSlug) ?? laneRoles[0] ?? roles[0];
  const prep = prepByLane[activeLane];
  const roleQuestionSet = useMemo(() => interviewQuestions.filter((item) => item.roleSlug === activeRole.slug), [activeRole.slug]);
  const selectedQuestion = roleQuestionSet.find((item) => item.category === activeCategory) ?? roleQuestionSet[0];

  function selectLane(lane: CareerLane) {
    setActiveLane(lane);
    const nextRole = roles.find((role) => role.lane === lane);
    if (nextRole) setActiveRoleSlug(nextRole.slug);
    setActiveCategory(interviewCategories[0]);
  }

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Interview Prep" title="Choose lane, role, then question category." copy="Each role has eight structured prompts with tests, weak patterns, answer frameworks, sample outlines, follow-ups, and self-score rubrics." />

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {careerLanes.map((item) => (
            <button
              key={item.lane}
              type="button"
              onClick={() => selectLane(item.lane)}
              className={`interactive-card group rounded-3xl border p-5 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue ${
                activeLane === item.lane ? "border-blue-300 bg-[linear-gradient(145deg,#0f6fff,#68c2ff)] text-white" : "border-blue-100 bg-[linear-gradient(145deg,#ffffff,#f4f9ff)] text-ink"
              }`}
            >
              <BriefcaseBusiness className={`h-6 w-6 ${activeLane === item.lane ? "text-white" : "text-blue-700"}`} />
              <h2 className="mt-4 text-xl font-extrabold tracking-tight">{item.lane}</h2>
              <p className={`mt-2 text-sm leading-6 ${activeLane === item.lane ? "text-white" : "text-slate-700"}`}>{item.description}</p>
              <span className={`mt-4 inline-flex items-center gap-2 text-sm font-extrabold ${activeLane === item.lane ? "text-white" : "text-blue-700"}`}>
                Select lane <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </section>

        <Card className="p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[linear-gradient(145deg,#0f6fff,#74caff)] p-6 text-white shadow-blue">
              <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em]">Selected lane</span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight">{activeLane}</h2>
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

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Role</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {laneRoles.map((role) => (
              <PillButton key={role.slug} active={role.slug === activeRole.slug} onClick={() => setActiveRoleSlug(role.slug)}>
                {role.title}
              </PillButton>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Question Category</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {interviewCategories.map((category) => (
              <PillButton key={category} active={category === activeCategory} onClick={() => setActiveCategory(category)}>
                {category}
              </PillButton>
            ))}
          </div>
        </section>

        {selectedQuestion ? (
          <Card className="p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-blue">
                <MessageSquareText className="h-6 w-6" />
              </span>
              <div>
                <span className="tag">{selectedQuestion.roleTitle} / {selectedQuestion.category}</span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{selectedQuestion.question}</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="font-extrabold text-ink">What It Tests</h3>
                <p className="mt-3 text-sm leading-6 text-slate-800">{selectedQuestion.tests}</p>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-white p-5">
                <h3 className="font-extrabold text-ink">Weak Pattern</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{selectedQuestion.weakPattern}</p>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-white p-5">
                <h3 className="font-extrabold text-ink">Answer Framework</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{selectedQuestion.answerFramework}</p>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-white p-5">
                <h3 className="font-extrabold text-ink">Sample Outline</h3>
                <ul className="mt-3 grid gap-2">
                  {selectedQuestion.sampleOutline.map((item) => <li key={item} className="rounded-xl bg-soft px-3 py-2 text-sm font-bold text-ink">{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <h3 className="font-extrabold text-ink">Follow-ups</h3>
                <div className="mt-3 grid gap-2">
                  {selectedQuestion.followUps.map((item) => <p key={item} className="rounded-2xl border border-blue-100 bg-soft p-4 text-sm font-bold leading-6 text-ink">{item}</p>)}
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-ink">Self-score Rubric</h3>
                <div className="mt-3 grid gap-2">
                  {selectedQuestion.selfReview.map((item) => <p key={item} className="rounded-2xl border border-blue-100 bg-soft p-4 text-sm font-bold leading-6 text-ink">{item}</p>)}
                </div>
              </div>
            </div>
          </Card>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roleQuestionSet.map((item) => (
            <button
              key={item.category}
              type="button"
              onClick={() => setActiveCategory(item.category)}
              className="interactive-card rounded-3xl border border-blue-100 bg-white p-4 text-left shadow-soft transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue"
            >
              <span className="tag">{item.category}</span>
              <p className="mt-3 text-sm font-extrabold leading-6 text-ink">{item.question}</p>
            </button>
          ))}
        </section>

        <FinalCTA title="Use answers from real work." copy="Interview prep is stronger when every answer points to a concrete project, report, dashboard, or case study." primary={{ href: `/portfolio/${activeRole.slug}`, label: "Choose a Project" }} secondary={{ href: "/get-hired", label: "Open Hiring Guide" }} />
      </Container>
    </Shell>
  );
}
