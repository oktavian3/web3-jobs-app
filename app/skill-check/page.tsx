"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { laneResults, skillQuestions, type SkillSignal } from "@/data/skillCheck";
import { Shell, Container, SectionHeading, Card } from "@/components/kraft/Primitives";

type Answers = Record<number, number>;
const storageKey = "kraft-skill-check-result";
const labels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

function readSavedAnswers() {
  if (typeof window === "undefined") return {};
  const saved = window.localStorage.getItem(storageKey);
  return saved ? (JSON.parse(saved) as Answers) : {};
}

export default function SkillCheckPage() {
  const [answers, setAnswers] = useState<Answers>(readSavedAnswers);
  const [current, setCurrent] = useState(0);
  const [showResults, setShowResults] = useState(() => Object.keys(readSavedAnswers()).length === skillQuestions.length);
  const question = skillQuestions[current];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / skillQuestions.length) * 100);

  const scores = useMemo(() => {
    const values: Record<SkillSignal, number> = { community: 0, growth: 0, content: 0, research: 0, product: 0, operations: 0, technical: 0, creative: 0, foundation: 0, readiness: 0, all: 0 };
    skillQuestions.forEach((item) => {
      const answer = answers[item.id] ?? 0;
      values[item.signal] += answer * item.weight;
      if (item.signal === "all") {
        ["community", "growth", "content", "research", "product", "operations", "technical", "creative"].forEach((key) => {
          values[key as SkillSignal] += answer;
        });
      }
    });
    return values;
  }, [answers]);

  const ranked = useMemo(() => laneResults
    .map((result) => ({ ...result, score: result.signals.reduce((sum, signal) => sum + scores[signal], 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3), [scores]);

  const maxScore = Math.max(...ranked.map((item) => item.score), 1);
  const readiness = Math.min(100, Math.round(((scores.foundation + scores.readiness + scores.all) / 35) * 100));

  const answerQuestion = (value: number) => {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (current === skillQuestions.length - 1) {
      window.localStorage.setItem(storageKey, JSON.stringify(nextAnswers));
      setShowResults(true);
      return;
    }
    window.setTimeout(() => setCurrent((index) => Math.min(index + 1, skillQuestions.length - 1)), 120);
  };

  const retake = () => {
    window.localStorage.removeItem(storageKey);
    setAnswers({});
    setCurrent(0);
    setShowResults(false);
  };

  return (
    <Shell>
      <Container className="space-y-12 py-12 sm:py-16">
        <SectionHeading eyebrow="Skill Check" title="Get a role match, not a personality label." copy="Answer one practical question at a time. Results describe current preferences and evidence, not permanent limits." />

        {!showResults ? (
          <div className="mx-auto max-w-3xl">
            <Card className="relative overflow-hidden p-5 shadow-blue sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-200/50 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 text-sm font-extrabold text-slate-700">
                  <span>Question {current + 1} of {skillQuestions.length}</span>
                  <span>{progress}% complete</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(20,107,255,0.12)]">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#146bff,#69c4ff)] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-10 rounded-[28px] border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#eff7ff)] p-6 text-center sm:p-8">
                  <span className="tag">Signal: {question.signal}</span>
                  <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">{question.question}</h2>
                  <div className="mt-8 grid gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => answerQuestion(value)}
                        className={`group flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-extrabold transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-soft ${
                          answers[question.id] === value ? "border-blue-500 bg-blue-600 text-white" : "border-blue-100 bg-white text-ink"
                        }`}
                      >
                        <span>{labels[value - 1]}</span>
                        <span className={`grid h-8 w-8 place-items-center rounded-full ${answers[question.id] === value ? "bg-white text-blue-700" : "bg-blue-50 text-blue-700"}`}>{value}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={() => setCurrent((index) => Math.max(0, index - 1))} disabled={current === 0} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45">
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </button>
                  <button type="button" onClick={() => setShowResults(answeredCount === skillQuestions.length)} disabled={answeredCount < skillQuestions.length} className="rounded-full px-4 py-2 text-sm font-extrabold text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400">
                    Skip to results
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <Card className="p-6 shadow-blue">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-blue-700">Current readiness</p>
              <div className="mt-5 grid h-40 w-40 place-items-center rounded-full border-[16px] border-blue-600 bg-blue-50 text-4xl font-extrabold text-blue-700 shadow-soft">{readiness}%</div>
              <p className="mt-5 text-sm leading-6 text-slate-700">Readiness reflects safety basics, willingness to build proof, and whether you can show a relevant work sample today.</p>
              <button type="button" onClick={retake} className="btn-secondary mt-6">
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
            </Card>
            <div className="space-y-4">
              {ranked.map((result, index) => (
                <Card key={result.lane} className="group p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-blue">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="tag">Match {index + 1}</span>
                      <h2 className="mt-3 text-2xl font-extrabold text-ink">{result.lane}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{result.fit}</p>
                    </div>
                    <strong className="text-2xl text-blue-700">{Math.round((result.score / maxScore) * 100)}%</strong>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(20,107,255,0.12)]">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.round((result.score / maxScore) * 100)}%` }} />
                  </div>
                  <p className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-6 text-ink">Next best action: {result.nextTask}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/roles?lane=${encodeURIComponent(result.lane)}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      Explore role guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href="/roadmaps" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      Open roadmap <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Shell>
  );
}
