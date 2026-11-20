import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { getRoleBySlug } from "@/data/roles";
import CompanyMark from "@/components/jobs/CompanyMark";
import JobRow from "@/components/jobs/JobRow";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import CopyLinkButton from "@/components/jobs/CopyLinkButton";
import ApplyButton from "@/components/jobs/ApplyButton";
import { formatLongDate } from "@/components/jobs/format";
import { getPublicJob, getPublicJobs } from "@/lib/jobs/repository";
import { safety, trackingAdvice } from "@/lib/jobs/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getPublicJob(id);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} at ${job.company}`,
    description: `${job.title} at ${job.company} - ${job.lane}. Selected by KRAFT. Verify the employer and application path before applying.`,
    alternates: { canonical: `/jobs/${job.id}` },
  };
}

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={`space-y-2.5 text-[14px] leading-[1.55] ${dark ? "text-on-navy/90" : "text-ink"}`}>
      {items.map((s) => (
        <li key={s} className="flex gap-2.5">
          <Check className={`mt-[3px] h-4 w-4 shrink-0 ${dark ? "text-[#9cc2ff]" : "text-blue"}`} strokeWidth={2.4} aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  );
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getPublicJob(id);
  if (!job) notFound();
  const role = job.roleSlug ? getRoleBySlug(job.roleSlug) : undefined;
  const more = (await getPublicJobs()).filter((j) => j.lane === job.lane && j.id !== job.id).slice(0, 4);

  const facts = [
    { k: "Location", v: job.location },
    { k: "Seniority", v: job.seniority },
    ...(job.employmentType ? [{ k: "Employment type", v: job.employmentType }] : []),
    ...(job.salary ? [{ k: "Salary", v: job.salary }] : []),
    { k: "Source", v: job.source === "admin" ? "KRAFT" : "KRAFT Job Bot" },
    { k: "Added", v: formatLongDate(job.postedAt), mono: true },
  ];

  const applyCard = (
    <div className="card-surface p-6">
      <div className="flex items-center gap-3">
        <CompanyMark company={job.company} logo={job.companyLogo} />
        <div className="min-w-0">
          <p className="text-[15px] font-medium leading-tight text-ink">{job.title}</p>
          <p className="text-[13px] text-muted">{job.company}</p>
        </div>
      </div>
      <ApplyButton applyUrl={job.applyUrl} company={job.company} />
      <p className="eyebrow mt-2.5 text-center !text-[10.5px]">Opens external site</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <SaveJobButton id={job.id} title={job.title} variant="button" />
        <CopyLinkButton />
      </div>
      <p className="mt-5 flex gap-3 border-t border-border pt-5 text-[13px] leading-[1.5] text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
        Each still requires you to verify the employer and application path.
      </p>
    </div>
  );

  return (
    <div className="bg-canvas">
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-12 pt-8 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[13px] text-muted">
              <li>
                <Link href="/jobs" className="hover:text-ink">Jobs</Link>
              </li>
              <li aria-hidden="true" className="text-border-strong">/</li>
              <li>
                <Link href="/jobs" className="hover:text-ink">Curated opportunities</Link>
              </li>
              <li aria-hidden="true" className="text-border-strong">/</li>
              <li aria-current="page" className="truncate text-ink">{job.company}</li>
            </ol>
          </nav>
          <div className="mt-10 flex flex-col items-start gap-5 md:flex-row md:gap-6">
            <CompanyMark company={job.company} logo={job.companyLogo} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] text-muted">{job.company}</p>
              <h1 className="mt-1 text-[36px] font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-[48px] lg:text-[56px]">{job.title}</h1>
              <ul className="mt-5 flex flex-wrap gap-2 text-[13px]" aria-label="Job tags">
                <li className="inline-flex h-8 items-center rounded-full border border-border bg-surface px-3">{job.lane}</li>
                <li className="inline-flex h-8 items-center rounded-full border border-border bg-surface px-3">{job.workType}</li>
                <li className="inline-flex h-8 items-center rounded-full border border-border bg-surface px-3">{job.seniority}</li>
                {job.tags.map((t) => (
                  <li key={t} className="inline-flex h-8 items-center rounded-full border border-border bg-surface px-3">{t}</li>
                ))}
                {job.note ? (
                  <li className="inline-flex h-8 items-center gap-1.5 rounded-full bg-blue-soft px-3 text-blue-deep">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" /> {job.note}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 lg:px-10 lg:py-14">
        <aside className="order-first lg:order-none lg:col-start-2 lg:row-start-1" aria-label="Apply">
          <div className="lg:sticky lg:top-24">{applyCard}</div>
        </aside>

        <div className="min-w-0 space-y-14 lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="listing-h">
            <h2 id="listing-h" className="eyebrow">Listing</h2>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-[18px] border border-border bg-border text-[14.5px] sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k} className="bg-surface p-5">
                  <dt className="text-[13px] text-muted">{f.k}</dt>
                  <dd className={`mt-1 text-ink ${f.mono ? "font-mono text-[13.5px]" : ""}`}>{f.v}</dd>
                </div>
              ))}
            </dl>
            {job.description ? (
              <div className="mt-8 max-w-[68ch] whitespace-pre-line text-[15.5px] leading-[1.7] text-ink/90">{job.description}</div>
            ) : null}
          </section>

          {role ? (
            <section aria-labelledby="role-h">
              <p className="eyebrow">Know the work</p>
              <h2 id="role-h" className="mt-3 text-[30px] font-medium leading-[1.05] tracking-[-0.04em] text-ink sm:text-[36px]">
                See what the role <span className="accent">actually expects.</span>
              </h2>
              <div className="mt-6 overflow-hidden rounded-[22px] bg-navy text-on-navy">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="eyebrow !text-on-navy/60">Role guide · {role.lane}</span>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[11px] text-on-navy/80">Confidence: {role.compensationConfidence}</span>
                  </div>
                  <h3 className="mt-3 text-[28px] font-medium tracking-[-0.03em]">{role.title}</h3>
                  <p className="mt-2 max-w-[640px] text-[15px] leading-[1.6] text-on-navy/75">{role.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-[12.5px]">
                    {[role.level, role.mode, ...role.tags].map((t) => (
                      <li key={t} className="rounded-full bg-white/[.08] px-2.5 py-1">{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-2">
                  <div className="bg-navy p-6 sm:p-7">
                    <h4 className="eyebrow !text-on-navy/60">Daily Work</h4>
                    <div className="mt-4"><Bullets items={role.dailyWork.slice(0, 3)} dark /></div>
                  </div>
                  <div className="bg-navy p-6 sm:p-7">
                    <h4 className="eyebrow !text-on-navy/60">Proof</h4>
                    <div className="mt-4"><Bullets items={role.proofOfWork.slice(0, 4)} dark /></div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-white/[.03] p-5">
                  <Link href={`/roles/${role.slug}`} className="btn-white !h-10 !text-[13.5px]">
                    View Role <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={`/portfolio/${role.slug}`} className="btn-ghost-white !h-10 !text-[13.5px]">Build proof-of-work</Link>
                  <Link href="/interview-prep" className="btn-ghost-white !h-10 !text-[13.5px]">Practice interview</Link>
                </div>
              </div>
            </section>
          ) : null}

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[20px] border border-border-strong bg-highlight p-6">
              <h2 className="eyebrow flex items-center gap-2 !text-blue-deep">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Before you apply
              </h2>
              <div className="mt-4"><Bullets items={safety} /></div>
            </div>
            <div className="rounded-[20px] border border-border bg-surface p-6">
              <h2 className="eyebrow">Track your applications</h2>
              <div className="mt-4"><Bullets items={trackingAdvice} /></div>
            </div>
          </section>

          {more.length ? (
            <section aria-labelledby="more-h">
              <div className="flex items-end justify-between gap-4">
                <h2 id="more-h" className="text-[22px] font-medium tracking-[-0.025em]">More in {job.lane}</h2>
                <Link href={`/jobs?lane=${encodeURIComponent(job.lane)}`} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13.5px] font-medium text-blue-deep">
                  View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ul className="mt-5 overflow-hidden rounded-[20px] border border-border bg-surface">
                {more.map((j) => (
                  <JobRow key={j.id} job={j} roleTitle={j.roleSlug ? getRoleBySlug(j.roleSlug)?.title : undefined} />
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
