import type { CompensationConfidence, EvidenceTier } from "@/data/roles";

// Evidence and confidence are always conveyed with text (and shape), never color alone.

const confidenceStyles: Record<CompensationConfidence, { ring: string; dot: string }> = {
  High: { ring: "border-emerald-300 bg-emerald-50 text-emerald-900", dot: "bg-emerald-500" },
  Medium: { ring: "border-blue-300 bg-blue-50 text-blue-900", dot: "bg-blue-500" },
  Low: { ring: "border-amber-300 bg-amber-50 text-amber-900", dot: "bg-amber-500" },
  "Very low": { ring: "border-slate-300 bg-slate-100 text-slate-800", dot: "bg-slate-400" },
};

export function ConfidenceBadge({ level }: { level: CompensationConfidence }) {
  const style = confidenceStyles[level];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${style.ring}`}
      aria-label={`Compensation confidence: ${level}`}
    >
      <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
      Confidence: {level}
    </span>
  );
}

const tierStyles: Record<EvidenceTier, string> = {
  Direct: "border-emerald-300 bg-emerald-50 text-emerald-900",
  Adjacent: "border-blue-300 bg-blue-50 text-blue-900",
  "Broad market": "border-amber-300 bg-amber-50 text-amber-900",
  Unverified: "border-slate-300 bg-slate-100 text-slate-800",
};

export function EvidenceBadge({ tier }: { tier: EvidenceTier }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${tierStyles[tier]}`}
      aria-label={`Evidence tier: ${tier}`}
    >
      <span className="h-1.5 w-1.5 rounded-sm bg-current opacity-70" aria-hidden="true" />
      {tier} evidence
    </span>
  );
}
