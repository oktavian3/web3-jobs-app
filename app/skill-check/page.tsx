"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skillQuestions } from "@/data/skillCheck";
import { computeSkillCheckResult, SKILL_CHECK_RESULT_KEY, type SkillCheckAnswers } from "@/data/skillCheckResult";
import { Shell, Container, Card } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";

const labels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export default function SkillCheckPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<SkillCheckAnswers>({});
  const [current, setCurrent] = useState(0);
  const question = skillQuestions[current];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / skillQuestions.length) * 100);

  const finish = (finalAnswers: SkillCheckAnswers) => {
    const result = computeSkillCheckResult(finalAnswers);
    window.sessionStorage.setItem(SKILL_CHECK_RESULT_KEY, JSON.stringify(result));
    router.push("/skill-check/results");
  };

  const answerQuestion = (value: number) => {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (current === skillQuestions.length - 1) {
      finish(nextAnswers);
      return;
    }
    window.setTimeout(() => setCurrent((index) => Math.min(index + 1, skillQuestions.length - 1)), 120);
  };

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Skill Check"
          title="Narrow the field with evidence, not personality labels."
          copy="The Skill Check looks at the work you enjoy, the evidence you already have, and the environments you can handle. It does not measure intelligence, personality, aptitude, employability, or definitive career fit. This version is stateless: your answers are used only to produce the current result and are not saved after this session."
        />

        <div className="mx-auto max-w-3xl">
          <Card className="relative overflow-hidden p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4 text-sm font-extrabold text-muted">
              <span>Question {current + 1} of {skillQuestions.length}</span>
              <span aria-live="polite">{progress}% complete</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-soft">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-10 rounded-3xl border border-blue-100 bg-soft p-6 text-center sm:p-8">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{question.question}</h2>
              <div className="mt-8 grid gap-3" role="group" aria-label={`Answer: ${question.question}`}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => answerQuestion(value)}
                    aria-pressed={answers[question.id] === value}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      answers[question.id] === value ? "border-blue-500 bg-blue-600 text-white" : "border-blue-100 bg-white text-ink hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span>{labels[value - 1]}</span>
                    <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-extrabold ${answers[question.id] === value ? "bg-white text-blue-700" : "bg-blue-50 text-blue-700"}`}>{value}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrent((index) => Math.max(0, index - 1))}
                disabled={current === 0}
                className="btn-secondary disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </button>
              <Link href="/roles" className="inline-flex items-center gap-1 text-sm font-extrabold text-muted hover:text-ink">
                Browse roles instead <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </Shell>
  );
}
