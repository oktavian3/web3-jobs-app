/** Unified public job shape used by /jobs and /jobs/[id]. Built from both the
 *  Notion-synced curated JSON and admin-posted Supabase rows. */
export type PublicJob = {
  id: string;
  source: "curated" | "admin";
  title: string;
  company: string;
  companyLogo?: string;
  lane: string;
  remote: boolean;
  workType: string;
  employmentType?: string;
  location: string;
  seniority: string;
  salary?: string;
  applyUrl: string;
  description?: string;
  note?: string;
  roleSlug?: string;
  tags: string[];
  postedAt: string; // ISO date
};
