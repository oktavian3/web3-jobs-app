import Link from "next/link";
import { BookOpen } from "lucide-react";
import CompanyMark from "./CompanyMark";
import SaveJobButton from "./SaveJobButton";
import { formatShortDate } from "./format";
import type { PublicJob } from "@/lib/jobs/types";

/** One job in a list. The whole row is a link (stretched ::after); the save
 *  button sits above it so both are separately focusable. */
export default function JobRow({ job, roleTitle }: { job: PublicJob; roleTitle?: string }) {
  return (
    <li className="job-row relative grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-4 border-t border-border px-4 py-4 first:border-t-0 sm:px-5 md:grid-cols-[44px_minmax(0,1fr)_64px_40px]">
      <CompanyMark company={job.company} logo={job.companyLogo} />
      <div className="min-w-0">
        <h3 className="truncate text-[15.5px] font-medium tracking-[-0.01em] text-ink">
          <Link href={`/jobs/${job.id}`} className="inline-block min-h-6 leading-6 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[12px] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-blue">
            {job.title}
          </Link>
        </h3>
        <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[13px] text-muted">
          <span className="truncate">{job.company}</span>
          <span aria-hidden="true" className="text-border-strong">·</span>
          <span className="shrink-0">{job.workType}</span>
          {roleTitle ? (
            <span className="ml-1.5 hidden h-6 shrink-0 items-center gap-1 rounded-full bg-blue-soft px-2 text-[12px] text-blue-deep md:inline-flex">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {roleTitle}
            </span>
          ) : null}
        </p>
      </div>
      <time dateTime={job.postedAt} className="hidden text-right font-mono text-[12px] text-muted md:block">
        {formatShortDate(job.postedAt)}
      </time>
      <div className="justify-self-end">
        <SaveJobButton id={job.id} title={job.title} />
      </div>
    </li>
  );
}
