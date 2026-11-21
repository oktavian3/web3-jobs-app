import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getActiveCuratedJobs } from "@/data/curatedJobs";
import { supabaseUrl } from "@/lib/supabase-auth/url";
import { curatedJobRoleMap } from "@/data/curatedJobRoleMap";
import type { PublicJob } from "./types";
import type { JobRecord } from "./schema";

function anonClient() {
  const url = supabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function fromCurated(): PublicJob[] {
  return getActiveCuratedJobs().map((job) => ({
    id: job.id,
    source: "curated",
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    lane: job.category,
    remote: job.remote,
    workType: job.remote ? "Remote-friendly" : "On-site / hybrid",
    employmentType: job.employmentType,
    location: job.location,
    seniority: job.seniority,
    salary: job.salary,
    applyUrl: job.applyUrl,
    note: job.kraftNote,
    roleSlug: job.roleSlug ?? curatedJobRoleMap[job.title],
    tags: [],
    postedAt: job.publishedAt ?? job.addedAt,
  }));
}

export function fromRecord(row: JobRecord): PublicJob {
  return {
    id: row.id,
    source: "admin",
    title: row.title,
    company: row.company,
    companyLogo: row.company_logo_url || undefined,
    lane: row.lane,
    remote: row.work_type === "Remote",
    workType: row.work_type === "Remote" ? "Remote-friendly" : row.work_type,
    employmentType: row.employment_type ?? undefined,
    location: row.location || "Not specified — check the listing",
    seniority: row.seniority,
    salary: row.salary || undefined,
    applyUrl: row.apply_url,
    description: row.description || undefined,
    note: "Selected by KRAFT.",
    roleSlug: row.role_slug || undefined,
    tags: row.tags ?? [],
    postedAt: row.posted_at,
  };
}

/** Published admin jobs (RLS only returns is_published = true to anon). */
async function fromSupabase(): Promise<PublicJob[]> {
  const supabase = anonClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_published", true)
    .order("posted_at", { ascending: false })
    .limit(500);
  if (error || !data) {
    if (error) console.error("[jobs] supabase read failed:", error.message);
    return [];
  }
  return (data as JobRecord[]).map(fromRecord);
}

/** All public jobs: admin-posted (Supabase) merged with the curated JSON so
 *  nothing that exists today disappears. Newest first. */
export async function getPublicJobs(): Promise<PublicJob[]> {
  const [admin, curated] = await Promise.all([fromSupabase(), Promise.resolve(fromCurated())]);
  return [...admin, ...curated].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

export async function getPublicJob(id: string): Promise<PublicJob | null> {
  const curated = fromCurated().find((j) => j.id === id);
  if (curated) return curated;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = anonClient();
  if (!supabase) return null;
  const { data } = await supabase.from("jobs").select("*").eq("id", id).eq("is_published", true).maybeSingle();
  return data ? fromRecord(data as JobRecord) : null;
}
