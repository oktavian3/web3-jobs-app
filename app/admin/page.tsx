import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import RowActions from "@/components/admin/RowActions";
import CompanyMark from "@/components/jobs/CompanyMark";
import { formatLongDate } from "@/components/jobs/format";
import { getAdminUser, getSupabaseServer } from "@/lib/supabase-auth/server";
import { getActiveCuratedJobs } from "@/data/curatedJobs";
import type { JobRecord } from "@/lib/jobs/schema";

export const metadata: Metadata = { title: "Jobs" };
export const dynamic = "force-dynamic";

type Search = { status?: string; q?: string; saved?: string; deleted?: string };

export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  const supabase = (await getSupabaseServer())!;
  const sp = await searchParams;
  const status = sp.status === "published" || sp.status === "draft" ? sp.status : "all";
  const q = (sp.q ?? "").trim().toLowerCase();

  const { data, error } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false }).order("created_at", { ascending: false });
  const all = (data ?? []) as JobRecord[];
  const counts = { all: all.length, published: all.filter((j) => j.is_published).length, draft: all.filter((j) => !j.is_published).length };
  const jobs = all.filter(
    (j) =>
      (status === "all" || (status === "published" ? j.is_published : !j.is_published)) &&
      (!q || `${j.title} ${j.company} ${j.lane}`.toLowerCase().includes(q)),
  );
  const curatedCount = getActiveCuratedJobs().length;

  return (
    <AdminShell email={user.email ?? ""}>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 text-[34px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[40px]">Jobs</h1>
          <p className="mt-2 text-[14.5px] text-muted">
            Jobs you post here appear on <Link href="/jobs" className="text-blue-deep underline underline-offset-4">/jobs</Link> once published, alongside {curatedCount} jobs synced from the KRAFT Job Bot (managed in Notion).
          </p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary shrink-0">
          <Plus className="h-4 w-4" aria-hidden="true" /> Post a job
        </Link>
      </div>

      {sp.saved ? <p role="status" className="mt-6 rounded-[12px] border border-border-strong bg-highlight px-4 py-3 text-[14px] text-blue-deep">Job saved.</p> : null}
      {sp.deleted ? <p role="status" className="mt-6 rounded-[12px] border border-border bg-surface px-4 py-3 text-[14px] text-ink">Job deleted.</p> : null}
      {error ? <p role="alert" className="mt-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">Could not load jobs: {error.message}. Did you run the SQL migration?</p> : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <nav aria-label="Filter by status" className="flex gap-1 rounded-full border border-border bg-surface p-1">
          {(["all", "published", "draft"] as const).map((s) => (
            <Link
              key={s}
              href={s === "all" ? "/admin" : `/admin?status=${s}`}
              aria-current={status === s ? "page" : undefined}
              className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13.5px] capitalize ${status === s ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
            >
              {s === "draft" ? "Drafts" : s}
              <span className={`font-mono text-[11px] ${status === s ? "text-white/70" : "text-muted"}`}>{counts[s]}</span>
            </Link>
          ))}
        </nav>
        <form className="sm:ml-auto" role="search">
          {status !== "all" ? <input type="hidden" name="status" value={status} /> : null}
          <label className="sr-only" htmlFor="admin-q">Search jobs</label>
          <input id="admin-q" name="q" defaultValue={sp.q} placeholder="Search title, company, lane" className="admin-input !h-10 sm:w-[280px]" />
        </form>
      </div>

      <div className="mt-5 overflow-hidden rounded-[20px] border border-border bg-surface shadow-card">
        {jobs.length ? (
          <table className="w-full text-left text-[14px]">
            <caption className="sr-only">Admin-posted jobs</caption>
            <thead className="hidden border-b border-border bg-elevated md:table-header-group">
              <tr className="eyebrow !text-[10.5px]">
                <th scope="col" className="px-5 py-3 font-normal">Job</th>
                <th scope="col" className="px-3 py-3 font-normal">Lane</th>
                <th scope="col" className="px-3 py-3 font-normal">Status</th>
                <th scope="col" className="px-3 py-3 font-normal">Posted</th>
                <th scope="col" className="px-5 py-3 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="job-row grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 border-t border-border px-4 py-4 first:border-t-0 md:table-row md:p-0">
                  <td className="col-span-2 md:px-5 md:py-4">
                    <div className="flex items-center gap-3">
                      <CompanyMark company={j.company} logo={j.company_logo_url || undefined} />
                      <div className="min-w-0">
                        <Link href={`/admin/jobs/${j.id}`} className="block truncate font-medium text-ink hover:underline">{j.title}</Link>
                        <p className="truncate text-[13px] text-muted">{j.company} · {j.work_type}{j.location ? ` · ${j.location}` : ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-[13.5px] text-muted md:table-cell">{j.lane}</td>
                  <td className="mt-3 md:mt-0 md:px-3 md:py-4">
                    <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium ${j.is_published ? "bg-blue-soft text-blue-deep" : "bg-soft text-muted"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${j.is_published ? "bg-blue" : "bg-muted"}`} aria-hidden="true" />
                      {j.is_published ? "Published" : "Draft"}
                    </span>
                    <span className="ml-2 font-mono text-[12px] text-muted md:hidden">{formatLongDate(j.posted_at)}</span>
                  </td>
                  <td className="hidden px-3 py-4 font-mono text-[12.5px] text-muted md:table-cell">{formatLongDate(j.posted_at)}</td>
                  <td className="mt-3 md:mt-0 md:px-5 md:py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/jobs/${j.id}`} className="icon-button" aria-label={`Edit ${j.title}`}>
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <RowActions id={j.id} title={j.title} published={j.is_published} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <h2 className="text-[19px] font-medium tracking-[-0.02em]">{all.length ? "No jobs match this view." : "No jobs posted yet."}</h2>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted">
              {all.length ? "Try another filter or search." : "Post your first job. Save it as a draft until it is ready to go live."}
            </p>
            <Link href="/admin/jobs/new" className="btn-primary mt-6">
              <Plus className="h-4 w-4" aria-hidden="true" /> Post a job
            </Link>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
