"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SKILL_CHECK_RESULT_KEY, type SkillCheckResult, type ConfidenceLabel } from "@/data/skillCheckResult";
import { Shell, Container, Card } from "@/components/kraft/Primitives";
import PageHeader from "@/components/kraft/PageHeader";

function ConfidencePill({ label, level }: { label: string; level: ConfidenceLabel }) {
  const styles: Record<ConfidenceLabel, string> = {
    High: "border-emerald-300 bg-emerald-50 text-emerald-900",
    Medium: "border-blue-300 bg-blue-50 text-blue-900",
    Low: "border-amber-300 bg-amber-50 text-amber-900",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${styles[level]}`}>
      {label}: {level} confidence
    </span>
  );
}

// sessionStorage never fires an event for writes made in the same tab, so this
// store only needs a snapshot, not live updates - subscribe is a no-op.
const subscribeNoop = () => () => {};

export default function SkillCheckResultsPage() {
  const router = useRouter();
  const getSnapshot = useCallback(() => window.sessionStorage.getItem(SKILL_CHECK_RESULT_KEY), []);
  const getServerSnapshot = useCallback(() => null, []);
  const raw = useSyncExternalStore(subscribeNoop, getSnapshot, getServerSnapshot);
  const result = raw ? (JSON.parse(raw) as SkillCheckResult) : null;

  const retake = () => {
    window.sessionStorage.removeItem(SKILL_CHECK_RESULT_KEY);
    router.push("/skill-check");
  };

  if (result === null) {
    return (
      <Shell>
        <Container className="space-y-8 py-12 sm:py-16">
          <PageHeader eyebrow="Skill Check results" title="No result yet." copy="This version is stateless, so results only exist for the current session. Take the Skill Check to see roles worth investigating next." />
          <div className="mx-auto max-w-md text-center">
            <Link href="/skill-check" className="btn-primary group mx-auto w-fit">
              Start the Skill Check <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Shell>
    );
  }

  return (
    <Shell>
      <Container className="space-y-10 py-12 sm:py-16">
        <PageHeader
          eyebrow="Skill Check results"
          title="Roles worth investigating next."
          copy="These results are a starting point based on your answers. They do not determine career fit or hiring readiness, and they are not a scientifically validated assessment."
        />

        <section className="card-surface card-surface--featured p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <ConfidencePill label="Match" level={result.confidence} />
            <ConfidencePill label="Evidence readiness" level={result.readiness} />
          </div>

          <span className="mt-5 tag w-fit">Possible fit</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{result.possibleMatch.lane}</h2>
          <p className="mt-2 text-base leading-7 text-muted">{result.possibleMatch.fit}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {result.possibleMatch.roles.map((role) => (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="card-surface card-surface--interactive group flex items-center justify-between p-4"
              >
                <span className="font-extrabold text-ink">{role.title}</span>
                <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">Why this appeared</h3>
              <p className="mt-2 text-sm leading-6 text-ink">Your answers signalled strength in: {result.strengths.join(" and ")}.</p>
            </div>
            <div className="card-surface card-surface--informational p-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">What could make it wrong</h3>
              <ul className="mt-2 space-y-1.5">
                {result.missingEvidence.map((item, i) => (
                  <li key={i} className="text-sm leading-6 text-ink">• {item}</li>
                ))}
                {result.gaps.map((gap, i) => (
                  <li key={`gap-${i}`} className="text-sm leading-6 text-ink">• Lower signal for {gap} - worth exploring before committing.</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Compare nearby lanes</h2>
          <p className="mt-2 text-sm leading-6 text-muted">These may share some signals with your top match while differing in technical depth or day-to-day work.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.alternativeMatches.map((match) => (
              <Card key={match.lane} className="p-5">
                <h3 className="text-lg font-extrabold text-ink">{match.lane}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{match.fit}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {match.roles.map((role) => (
                    <Link key={role.slug} href={`/roles/${role.slug}`} className="tag transition hover:bg-blue-100">{role.title}</Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="card-surface card-surface--next-step p-5 sm:p-6">
          <h2 className="text-lg font-extrabold text-ink">Next evidence to build</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href={result.nextEvidence.roleHref} className="card-surface card-surface--interactive p-4 text-sm font-bold text-ink">
              Open the {result.nextEvidence.roleTitle} role guide
            </Link>
            {result.nextEvidence.portfolioHref && (
              <Link href={result.nextEvidence.portfolioHref} className="card-surface card-surface--interactive p-4 text-sm font-bold text-ink">
                Build the matching portfolio brief
              </Link>
            )}
            <Link href={result.nextEvidence.interviewHref} className="card-surface card-surface--interactive p-4 text-sm font-bold text-ink">
              Practice this role&apos;s interview set
            </Link>
            {result.nextEvidence.prerequisite && (
              <div className="card-surface card-surface--informational p-4 text-sm leading-6 text-ink">
                <span className="font-extrabold">One prerequisite: </span>{result.nextEvidence.prerequisite}
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={retake} className="btn-secondary">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Retake the Skill Check
          </button>
          <Link href="/get-hired" className="btn-primary group">
            Continue to Get Hired <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/learn-web3" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
            Not ready yet? Learn the foundations first <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Shell>
  );
}
