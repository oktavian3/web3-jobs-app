import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Info, TriangleAlert, X } from "lucide-react";
import type { CareerLane, CompensationConfidence, EvidenceTier } from "@/data/roles";
import type { RoleCadence, RoleLevels, RoleTool } from "@/data/roleContent";
import { ConfidenceBadge, EvidenceBadge } from "./badges";

// ── shared primitives ─────────────────────────────────────────────────────

export function Section({
  id,
  title,
  children,
  first = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${first ? "" : "mt-12 border-t border-border pt-12"}`}>
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-7 text-muted">{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-7 text-ink">
          <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-muted">{children}</h3>;
}

// ── role snapshot ───────────────────────────────────────────────────────────

export function RoleSnapshot({
  lane,
  level,
  mode,
  altTitles,
  confidence,
  proofHref,
  interviewHref,
}: {
  lane: CareerLane;
  level: string;
  mode: string;
  altTitles: string[];
  confidence: CompensationConfidence;
  proofHref: string;
  interviewHref: string;
}) {
  return (
    <div className="card-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">{lane}</span>
        <span className="tag">{level}</span>
        <span className="tag">{mode}</span>
        <ConfidenceBadge level={confidence} />
      </div>
      <div className="mt-5 border-t border-border pt-5">
        <SubHeading>Also listed as</SubHeading>
        <p className="mt-2 text-sm leading-6 text-muted">{altTitles.join(" · ")}</p>
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <Link href={proofHref} className="btn-primary group">
          Build proof-of-work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href={interviewHref} className="btn-secondary">Practice interview questions</Link>
      </div>
    </div>
  );
}

// ── organizational context ────────────────────────────────────────────────

export function OrganizationalContext({ paragraphs }: { paragraphs: string[] }) {
  return <Prose paragraphs={paragraphs} />;
}

// ── responsibilities ──────────────────────────────────────────────────────

export function ResponsibilityList({ items }: { items: string[] }) {
  return <Bullets items={items} />;
}

// ── work cadence ──────────────────────────────────────────────────────────

export function WorkCadenceTimeline({ cadence }: { cadence: RoleCadence }) {
  const rows = [
    { label: "A typical day", text: cadence.typicalDay },
    { label: "Weekly or monthly", text: cadence.weekly },
    { label: "When conditions change", text: cadence.reactive },
  ];
  return (
    <ol className="space-y-4 border-l border-border pl-5">
      {rows.map((row) => (
        <li key={row.label} className="relative">
          <span className="absolute -left-[1.42rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500" aria-hidden="true" />
          <p className="text-sm font-extrabold text-ink">{row.label}</p>
          <p className="mt-1 text-base leading-7 text-muted">{row.text}</p>
        </li>
      ))}
    </ol>
  );
}

// ── deliverables ──────────────────────────────────────────────────────────

export function OutputAndDeliverables({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="rounded-xl border border-border bg-soft px-3 py-2 text-sm font-bold text-ink">
          {item}
        </span>
      ))}
    </div>
  );
}

// ── success signals + KPI caveat ──────────────────────────────────────────

export function SuccessSignals({ signals, caveat }: { signals: string[]; caveat: string }) {
  return (
    <div className="space-y-5">
      <Bullets items={signals} />
      <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm leading-6 text-amber-900"><span className="font-extrabold">Read signals in context. </span>{caveat}</p>
      </div>
    </div>
  );
}

// ── tools in practice ─────────────────────────────────────────────────────

export function ToolWorkflowTable({ tools }: { tools: RoleTool[] }) {
  return (
    <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {tools.map((tool) => (
        <div key={tool.name} className="grid gap-1 p-4 sm:grid-cols-[minmax(9rem,12rem)_1fr] sm:gap-4">
          <dt className="text-sm font-extrabold text-ink">{tool.name}</dt>
          <dd className="text-sm leading-6 text-muted">{tool.useCase}.</dd>
        </div>
      ))}
    </dl>
  );
}

// ── skills ────────────────────────────────────────────────────────────────

export function SkillRequirements({
  hardSkills,
  workingSkills,
  prerequisite,
}: {
  hardSkills: string[];
  workingSkills: string[];
  prerequisite: string;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <SubHeading>Hard skills</SubHeading>
          <div className="mt-3"><Bullets items={hardSkills} /></div>
        </div>
        <div>
          <SubHeading>Working skills</SubHeading>
          <div className="mt-3"><Bullets items={workingSkills} /></div>
        </div>
      </div>
      <div className="border-l-2 border-blue-200 pl-4">
        <SubHeading>Prerequisite knowledge</SubHeading>
        <p className="mt-2 text-base leading-7 text-ink">{prerequisite}</p>
      </div>
    </div>
  );
}

// ── level expectations ────────────────────────────────────────────────────

export function LevelExpectationsTable({ levels }: { levels: RoleLevels }) {
  const rows = [
    { label: "Entry level", text: levels.entry },
    { label: "Mid level", text: levels.mid },
    { label: "Senior", text: levels.senior },
  ];
  return (
    <div className="divide-y divide-border border-y border-border">
      {rows.map((row) => (
        <div key={row.label} className="py-4 sm:py-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-blue-700">{row.label}</p>
          <p className="mt-2 text-base leading-7 text-muted">{row.text}</p>
        </div>
      ))}
    </div>
  );
}

// ── proof of work + rubric ────────────────────────────────────────────────

export function ProofOfWorkBlock({
  intro,
  strongExamples,
  weakEvidence,
}: {
  intro: string[];
  strongExamples: string[];
  weakEvidence: string[];
}) {
  return (
    <div className="space-y-6">
      <Prose paragraphs={intro} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
          <SubHeading>Strong proof</SubHeading>
          <ul className="mt-3 space-y-2.5">
            {strongExamples.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-surface card-surface--informational p-4 sm:p-5">
          <SubHeading>Weak evidence</SubHeading>
          <ul className="mt-3 space-y-2.5">
            {weakEvidence.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── common mistakes ───────────────────────────────────────────────────────

export function CommonMistakes({ mistakes, misconception }: { mistakes: string[]; misconception: string[] }) {
  return (
    <div className="space-y-5">
      <Bullets items={mistakes} />
      {misconception.length > 0 && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <div className="space-y-2">
            <SubHeading>Common misconception</SubHeading>
            {misconception.map((p, i) => (
              <p key={i} className="text-sm leading-6 text-amber-900">{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── scope boundaries ──────────────────────────────────────────────────────

export function BoundaryComparison({ owns, doesNotOwn }: { owns: string[]; doesNotOwn: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
        <SubHeading>Usually owns</SubHeading>
        <ul className="mt-3 space-y-2.5">
          {owns.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-surface card-surface--informational p-4 sm:p-5">
        <SubHeading>Usually does not own</SubHeading>
        <ul className="mt-3 space-y-2.5">
          {doesNotOwn.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── interview preparation ─────────────────────────────────────────────────

export function InterviewPreparation({ intro, questions }: { intro: string[]; questions: string[] }) {
  return (
    <div className="space-y-5">
      <Prose paragraphs={intro} />
      <ol className="divide-y divide-border border-y border-border">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-3 py-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white" aria-hidden="true">
              {i + 1}
            </span>
            <p className="text-base leading-7 text-ink">{q}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── salary + evidence ─────────────────────────────────────────────────────
// Context-first: confidence, evidence tier, approved role-specific compensation
// context, and role risks. A numeric range is shown ONLY when an approved evidence
// record supplies one (register `hasReliableRange`). The approved package supplies
// none today, so every role renders the no-reliable-range state (SB-03). No figure
// is inferred from an unrelated role and no internal source ID is exposed.

export type SalaryRangeView = {
  min: number;
  max: number;
  currency: string;
  period: string;
};

export function SalaryEvidenceBlock({
  confidence,
  tier,
  intro,
  roleRisks,
  hasReliableRange,
  range,
  geography,
  employmentModel,
  sourceLabel,
  sourceUrl,
  noRangeText,
  variablesText,
  legend,
  methodologyHref,
}: {
  confidence: CompensationConfidence;
  tier: EvidenceTier;
  intro: string[];
  roleRisks: string[];
  hasReliableRange: boolean;
  range?: SalaryRangeView;
  geography?: string;
  employmentModel?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  noRangeText: string;
  variablesText: string;
  legend: { title: string; tiers: { tier: string; meaning: string }[]; note: string };
  methodologyHref: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <ConfidenceBadge level={confidence} />
        <EvidenceBadge tier={tier} />
      </div>

      <Prose paragraphs={intro} />

      {hasReliableRange && range ? (
        <div className="card-surface card-surface--informational p-4 sm:p-5">
          <SubHeading>Reported range (context, not a guarantee)</SubHeading>
          <p className="mt-2 text-lg font-extrabold text-ink">
            {range.currency}{range.min.toLocaleString()}–{range.currency}{range.max.toLocaleString()}{" "}
            <span className="text-sm font-bold text-muted">/ {range.period}</span>
          </p>
          {(geography || employmentModel) && (
            <p className="mt-1 text-sm leading-6 text-muted">
              {[geography, employmentModel].filter(Boolean).join(" · ")}
            </p>
          )}
          {sourceLabel && sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Source: {sourceLabel}
            </a>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <SubHeading>No reliable role-specific range</SubHeading>
          <p className="mt-2 text-sm leading-6 text-amber-900">{noRangeText}</p>
        </div>
      )}

      <div>
        <SubHeading>Role risks</SubHeading>
        <div className="mt-3"><Bullets items={roleRisks} /></div>
      </div>

      <p className="text-xs leading-5 text-muted">{variablesText}</p>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={methodologyHref}
          className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Read the salary methodology
        </Link>
      </div>

      <details className="rounded-2xl border border-border bg-elevated p-4">
        <summary className="cursor-pointer text-sm font-extrabold text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          {legend.title}
        </summary>
        <dl className="mt-3 space-y-2">
          {legend.tiers.map((row) => (
            <div key={row.tier} className="grid gap-1 sm:grid-cols-[8rem_1fr]">
              <dt className="text-sm font-bold text-ink">{row.tier}</dt>
              <dd className="text-sm leading-6 text-muted">{row.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-5 text-muted">{legend.note}</p>
      </details>
    </div>
  );
}

// ── career path ───────────────────────────────────────────────────────────

export function CareerProgression({
  progression,
  fit,
  nonFit,
}: {
  progression: string[];
  fit: string[];
  nonFit: string[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <SubHeading>Common progression</SubHeading>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {progression.map((step, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="rounded-xl border border-border bg-elevated px-3 py-2 text-sm font-bold text-ink">{step}</span>
              {i < progression.length - 1 && <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 sm:divide-x sm:divide-border">
        <div>
          <SubHeading>May fit people who</SubHeading>
          <div className="mt-2 space-y-2">
            {fit.map((p, i) => <p key={i} className="text-sm leading-6 text-ink">{p}</p>)}
          </div>
        </div>
        <div className="border-t border-border pt-6 sm:border-t-0 sm:pl-6 sm:pt-0">
          <SubHeading>May not fit people who</SubHeading>
          <div className="mt-2 space-y-2">
            {nonFit.map((p, i) => <p key={i} className="text-sm leading-6 text-ink">{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── practical next steps ──────────────────────────────────────────────────

export function NextSteps({ items }: { items: string[] }) {
  return (
    <div className="card-surface card-surface--next-step p-5 sm:p-6">
      <Bullets items={items} />
    </div>
  );
}

// ── related roles ─────────────────────────────────────────────────────────

export type RelatedRole = { slug: string; title: string; lane: CareerLane };

export function RelatedRoles({ roles }: { roles: RelatedRole[] }) {
  if (!roles.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {roles.map((role) => (
        <Link
          key={role.slug}
          href={`/roles/${role.slug}`}
          className="card-surface card-surface--interactive group flex items-center justify-between p-4"
        >
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">{role.lane}</span>
            <span className="mt-1 block font-extrabold text-ink">{role.title}</span>
          </span>
          <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

// ── source + review status ────────────────────────────────────────────────

export function SourceAndReviewStatus() {
  return (
    <div className="mt-12 border-t border-border pt-12">
      <div className="card-surface card-surface--informational p-4 text-sm leading-6 text-muted">
      <p>
        <span className="font-bold text-ink">How this guide is built.</span> Role content is drawn from current
        first-party hiring material and reputable industry evidence, with compensation labelled by confidence and
        evidence tier rather than a single number.
      </p>
      <div className="mt-2 flex flex-wrap gap-4">
        <Link
          href="/methodology"
          className="inline-flex items-center gap-1 font-bold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Read the methodology
        </Link>
        <Link
          href="/disclaimers"
          className="inline-flex items-center gap-1 font-bold text-blue-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Read the disclaimers
        </Link>
      </div>
      </div>
    </div>
  );
}
