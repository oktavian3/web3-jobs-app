// JD-match checker: literal keyword overlap between the CV and a pasted job
// description. Known limitation (surfaced in the UI, not hidden): this is
// literal token overlap, not semantic — it will not catch "CM" vs "Community
// Manager" as equivalent. Fine for v1; revisit with embeddings only if this
// becomes a core feature people rely on.

const STOPWORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "have", "has", "are", "was", "were", "will", "you", "your",
  "our", "their", "a", "an", "to", "of", "in", "on", "at", "as", "is", "it", "be", "by", "or", "we", "can", "all", "if",
  "not", "but", "so", "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "ini", "itu", "atau", "pada", "akan",
  "sebagai", "adalah", "dalam", "para", "juga", "harus", "bisa", "saat",
]);

export function tokenize(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

export type MatchResult = {
  score: number | null;
  matched: string[];
  missing: string[];
};

export function matchScore(cvText: string, jobDescription: string): MatchResult {
  const cvTokens = new Set(tokenize(cvText));
  const jdUnique = [...new Set(tokenize(jobDescription))];
  const matched = jdUnique.filter((t) => cvTokens.has(t));
  const missing = jdUnique.filter((t) => !cvTokens.has(t));
  const score = jdUnique.length ? Math.round((matched.length / jdUnique.length) * 100) : null;
  return { score, matched, missing };
}
