"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { saveJobAction, type ActionState } from "@/app/admin/actions";
import { EMPLOYMENT_TYPES, LANES, SENIORITIES, WORK_TYPES, jobInputSchema, type JobRecord } from "@/lib/jobs/schema";
import CompanyMark from "@/components/jobs/CompanyMark";
import { formatShortDate } from "@/components/jobs/format";

type RoleOption = { slug: string; title: string; lane: string };

const today = () => new Date().toISOString().slice(0, 10);

function Field({ id, label, hint, error, children, optional }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[13.5px] font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-muted">Optional</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-[12.5px] text-red-700">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12.5px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export default function JobForm({ job, roles }: { job?: JobRecord; roles: RoleOption[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveJobAction, { ok: true });
  const [v, setV] = useState({
    title: job?.title ?? "",
    company: job?.company ?? "",
    company_logo_url: job?.company_logo_url ?? "",
    lane: job?.lane ?? "",
    work_type: job?.work_type ?? "Remote",
    employment_type: job?.employment_type ?? "",
    location: job?.location ?? "",
    seniority: job?.seniority ?? "Not specified",
    salary: job?.salary ?? "",
    apply_url: job?.apply_url ?? "",
    description: job?.description ?? "",
    role_slug: job?.role_slug ?? "",
    tags: (job?.tags ?? []).join(", "),
    is_published: job?.is_published ?? false,
    posted_at: job?.posted_at ?? today(),
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));

  // Client-side validation with the same zod schema the server uses.
  const clientErrors = useMemo(() => {
    const r = jobInputSchema.safeParse({
      ...v,
      employment_type: v.employment_type || null,
      tags: v.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    return r.success ? {} : (r.error.flatten().fieldErrors as Record<string, string[]>);
  }, [v]);
  const err = (k: string) => (touched[k] || state.fieldErrors ? (state.fieldErrors?.[k]?.[0] ?? clientErrors[k]?.[0]) : undefined);
  const aria = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `${k}-err` : undefined });

  const role = roles.find((r) => r.slug === v.role_slug);
  const laneRoles = v.lane ? roles.filter((r) => r.lane === v.lane) : roles;
  const tags = v.tags.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <form
      action={action}
      onSubmit={() => setTouched(Object.fromEntries(Object.keys(v).map((k) => [k, true])))}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
      noValidate
    >
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All jobs
        </Link>
        <h1 className="text-[32px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[38px]">{job ? "Edit job" : "Post a job"}</h1>

        {state.message && !state.ok ? (
          <p role="alert" className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">{state.message}</p>
        ) : null}

        <fieldset className="card-surface space-y-5 p-5 sm:p-6">
          <legend className="sr-only">Role</legend>
          <p className="eyebrow">Role</p>
          <Field id="title" label="Job title" error={err("title")}>
            <input id="title" name="title" value={v.title} onChange={set("title")} onBlur={blur("title")} className="admin-input" required {...aria("title")} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="lane" label="Career lane" error={err("lane")}>
              <select id="lane" name="lane" value={v.lane} onChange={set("lane")} onBlur={blur("lane")} className="admin-input" required {...aria("lane")}>
                <option value="">Select a lane</option>
                {LANES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
            <Field id="role_slug" label="Role guide" optional hint="Links the job to a KRAFT role guide.">
              <select id="role_slug" name="role_slug" value={v.role_slug} onChange={set("role_slug")} className="admin-input">
                <option value="">None</option>
                {laneRoles.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.title}</option>
                ))}
              </select>
            </Field>
            <Field id="seniority" label="Seniority">
              <select id="seniority" name="seniority" value={v.seniority} onChange={set("seniority")} className="admin-input">
                {SENIORITIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field id="employment_type" label="Employment type" optional>
              <select id="employment_type" name="employment_type" value={v.employment_type} onChange={set("employment_type")} className="admin-input">
                <option value="">Not specified</option>
                {EMPLOYMENT_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field id="description" label="Description" optional hint="Plain text. Line breaks are kept.">
            <textarea id="description" name="description" rows={7} value={v.description} onChange={set("description")} className="admin-input" />
          </Field>
          <Field id="tags" label="Tags" optional hint="Comma separated, up to 10. e.g. Solidity, DeFi" error={err("tags")}>
            <input id="tags" name="tags" value={v.tags} onChange={set("tags")} onBlur={blur("tags")} className="admin-input" {...aria("tags")} />
          </Field>
        </fieldset>

        <fieldset className="card-surface space-y-5 p-5 sm:p-6">
          <legend className="sr-only">Company and location</legend>
          <p className="eyebrow">Company &amp; location</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="company" label="Company" error={err("company")}>
              <input id="company" name="company" value={v.company} onChange={set("company")} onBlur={blur("company")} className="admin-input" required {...aria("company")} />
            </Field>
            <Field id="company_logo_url" label="Logo URL" optional error={err("company_logo_url")}>
              <input id="company_logo_url" name="company_logo_url" type="url" inputMode="url" placeholder="https://" value={v.company_logo_url} onChange={set("company_logo_url")} onBlur={blur("company_logo_url")} className="admin-input" {...aria("company_logo_url")} />
            </Field>
            <Field id="work_type" label="Work type">
              <select id="work_type" name="work_type" value={v.work_type} onChange={set("work_type")} className="admin-input">
                {WORK_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field id="location" label="Location" optional hint="e.g. Asia timezones, Jakarta, Global">
              <input id="location" name="location" value={v.location} onChange={set("location")} className="admin-input" />
            </Field>
            <Field id="salary" label="Salary" optional hint="Only if the listing shows it.">
              <input id="salary" name="salary" value={v.salary} onChange={set("salary")} className="admin-input" />
            </Field>
          </div>
        </fieldset>

        <fieldset className="card-surface space-y-5 p-5 sm:p-6">
          <legend className="sr-only">Publishing</legend>
          <p className="eyebrow">Apply &amp; publish</p>
          <Field id="apply_url" label="Apply URL" hint="The employer's official application page." error={err("apply_url")}>
            <input id="apply_url" name="apply_url" type="url" inputMode="url" placeholder="https://" value={v.apply_url} onChange={set("apply_url")} onBlur={blur("apply_url")} className="admin-input" required {...aria("apply_url")} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="posted_at" label="Posted date" error={err("posted_at")}>
              <input id="posted_at" name="posted_at" type="date" value={v.posted_at} onChange={set("posted_at")} onBlur={blur("posted_at")} className="admin-input" required {...aria("posted_at")} />
            </Field>
            <div className="flex items-end">
              <label className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-[12px] border border-border bg-elevated px-3.5 text-[14px]">
                <input type="checkbox" name="is_published" checked={v.is_published} onChange={set("is_published")} className="h-4 w-4 accent-[#146bff]" />
                Published on /jobs
              </label>
            </div>
          </div>
        </fieldset>

        <div className="sticky bottom-0 z-10 -mx-5 flex items-center justify-end gap-2 border-t border-border bg-canvas/90 px-5 py-4 backdrop-blur sm:mx-0 sm:rounded-[16px] sm:border">
          <Link href="/admin" className="btn-secondary">Cancel</Link>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? "Saving…" : v.is_published ? (job ? "Save & keep live" : "Publish job") : "Save draft"}
          </button>
        </div>
      </div>

      {/* Live preview */}
      <aside aria-label="Preview" className="lg:pt-[74px]">
        <div className="space-y-4 lg:sticky lg:top-24">
          <p className="eyebrow">Preview · list row</p>
          <div className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-card">
            <div className="flex items-center gap-3 px-4 py-4">
              <CompanyMark company={v.company || "?"} logo={/^https:\/\//.test(v.company_logo_url) ? v.company_logo_url : undefined} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium">{v.title || "Job title"}</p>
                <p className="truncate text-[13px] text-muted">
                  {v.company || "Company"} · {v.work_type === "Remote" ? "Remote-friendly" : v.work_type}
                </p>
              </div>
              <span className="font-mono text-[11.5px] text-muted">{formatShortDate(v.posted_at)}</span>
            </div>
          </div>
          <p className="eyebrow pt-2">Preview · detail header</p>
          <div className="rounded-[18px] border border-border bg-surface p-5 shadow-card">
            <p className="text-[13px] text-muted">{v.company || "Company"}</p>
            <p className="mt-1 text-[24px] font-medium leading-[1.1] tracking-[-0.035em]">{v.title || "Job title"}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {[v.lane || "Career lane", v.work_type === "Remote" ? "Remote-friendly" : v.work_type, v.seniority, ...tags].map((t, i) => (
                <li key={t + i} className="tag">{t}</li>
              ))}
            </ul>
            {role ? <p className="mt-4 rounded-[12px] bg-navy px-3.5 py-2.5 text-[13px] text-on-navy">Role guide: {role.title}</p> : null}
            {v.description ? <p className="mt-4 line-clamp-5 whitespace-pre-line text-[13.5px] leading-[1.6] text-muted">{v.description}</p> : null}
            <span className="btn-primary pointer-events-none mt-5 !h-10 w-full !rounded-[12px] !text-[14px]">
              Apply on official site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <p className="text-[12.5px] text-muted">
            Status: <b className="font-medium text-ink">{v.is_published ? "Published" : "Draft"}</b>
            {v.is_published ? " - visible on /jobs after saving." : " - only visible here."}
          </p>
        </div>
      </aside>
    </form>
  );
}
