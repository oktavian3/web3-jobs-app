export type Difficulty = 'technical' | 'hybrid' | 'no-code';
export type WorkType = 'remote' | 'async' | 'on-site';

export const roleMeta: Record<string, { difficulty: Difficulty; work: WorkType[]; demand: 'High' | 'Very high' | 'Steady'; timeline: string; asia: string; freelance: string }> = {
  'blockchain-developer': { difficulty: 'technical', work: ['remote', 'async'], demand: 'Very high', timeline: '6–12 months', asia: '$55k–$140k', freelance: '$60–$160/hr' },
  'smart-contract-developer': { difficulty: 'technical', work: ['remote', 'async'], demand: 'Very high', timeline: '6–10 months', asia: '$60k–$150k', freelance: '$70–$180/hr' },
  'rust-developer': { difficulty: 'technical', work: ['remote', 'async'], demand: 'High', timeline: '8–14 months', asia: '$60k–$155k', freelance: '$70–$170/hr' },
  'fullstack-web3-developer': { difficulty: 'technical', work: ['remote', 'async'], demand: 'High', timeline: '4–8 months', asia: '$45k–$120k', freelance: '$45–$130/hr' },
  'devops-engineer': { difficulty: 'technical', work: ['remote', 'on-site'], demand: 'High', timeline: '5–9 months', asia: '$50k–$130k', freelance: '$55–$140/hr' },
  'smart-contract-auditor': { difficulty: 'technical', work: ['remote', 'async'], demand: 'Very high', timeline: '9–18 months', asia: '$70k–$180k', freelance: '$100–$300/hr' },
  'blockchain-security-engineer': { difficulty: 'technical', work: ['remote', 'on-site'], demand: 'Very high', timeline: '9–18 months', asia: '$75k–$190k', freelance: '$100–$280/hr' },
  'onchain-analyst': { difficulty: 'hybrid', work: ['remote', 'async'], demand: 'High', timeline: '3–6 months', asia: '$35k–$90k', freelance: '$35–$100/hr' },
  'defi-analyst': { difficulty: 'hybrid', work: ['remote', 'async'], demand: 'High', timeline: '3–7 months', asia: '$40k–$100k', freelance: '$40–$110/hr' },
  'community-manager': { difficulty: 'no-code', work: ['remote', 'async'], demand: 'High', timeline: '2–4 months', asia: '$22k–$60k', freelance: '$20–$60/hr' },
  'marketing-specialist': { difficulty: 'hybrid', work: ['remote', 'on-site'], demand: 'High', timeline: '2–5 months', asia: '$28k–$75k', freelance: '$25–$80/hr' },
  'ux-designer': { difficulty: 'hybrid', work: ['remote', 'async'], demand: 'Steady', timeline: '3–7 months', asia: '$35k–$90k', freelance: '$35–$100/hr' },
  'nft-artist': { difficulty: 'no-code', work: ['remote', 'async'], demand: 'Steady', timeline: '2–6 months', asia: '$20k–$65k', freelance: '$25–$90/hr' },
  'product-manager': { difficulty: 'hybrid', work: ['remote', 'on-site'], demand: 'High', timeline: '4–8 months', asia: '$45k–$115k', freelance: '$50–$130/hr' },
  'business-development': { difficulty: 'no-code', work: ['remote', 'on-site'], demand: 'High', timeline: '2–5 months', asia: '$35k–$100k', freelance: '$35–$110/hr' },
  'operations-compliance': { difficulty: 'hybrid', work: ['remote', 'on-site'], demand: 'High', timeline: '3–7 months', asia: '$38k–$105k', freelance: '$40–$120/hr' },
  'economy-designer': { difficulty: 'hybrid', work: ['remote', 'async'], demand: 'Steady', timeline: '5–10 months', asia: '$45k–$120k', freelance: '$50–$140/hr' },
  'content-creator': { difficulty: 'no-code', work: ['remote', 'async'], demand: 'High', timeline: '1–3 months', asia: '$20k–$65k', freelance: '$20–$75/hr' },
  'discord-moderator': { difficulty: 'no-code', work: ['remote'], demand: 'Steady', timeline: '1–2 months', asia: '$12k–$35k', freelance: '$10–$30/hr' },
  ambassador: { difficulty: 'no-code', work: ['remote', 'async'], demand: 'Steady', timeline: '1–2 months', asia: '$10k–$40k', freelance: '$10–$40/hr' },
};

export function salaryNumbers(value: string) {
  const values = [...value.matchAll(/\$([\d.]+)k/gi)].map((match) => Number(match[1]));
  return values.length >= 2 ? [values[0], values[1]] as const : [50, 100] as const;
}
