import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Role } from "@/data/roles";
import type { JobBoard } from "@/data/jobBoards";

export function RoleCard({ role }: { role: Role }) {
  return (
    <Link
      href={`/roles/${role.slug}`}
      className="card-surface card-surface--interactive group relative flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow">{role.lane}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-[20px] font-medium tracking-[-0.025em] text-ink">{role.title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted">{role.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
        <span className="tag">{role.level}</span>
        <span className="tag">{role.mode}</span>
        {role.tags.slice(0, 2).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <span className="sr-only">View Role</span>
    </Link>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-[16px] border border-border bg-surface">
      {items.map((item) => (
        <li key={item} className="flex gap-3 px-4 py-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.4} aria-hidden="true" />
          <span className="text-[14px] leading-[1.6] text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function JobBoardCard({ board }: { board: JobBoard }) {
  return (
    <article className="card-surface card-surface--interactive group relative flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-border bg-soft text-[15px] font-semibold text-ink" aria-hidden="true">
          {board.name.slice(0, 1)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] font-medium tracking-[-0.02em] text-ink">
            <a href={board.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-blue">
              {board.name}
              <span className="sr-only"> (opens external site)</span>
            </a>
          </h3>
          <p className="mt-1 text-[14px] leading-[1.55] text-muted">{board.bestFor}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" aria-hidden="true" />
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-2 text-sm">
        <div className="mini-stat">
          <dt>Remote</dt>
          <dd>{board.remoteSupport}</dd>
        </div>
        <div className="mini-stat">
          <dt>Salary</dt>
          <dd>{board.salaryVisibility}</dd>
        </div>
        <div className="mini-stat col-span-2">
          <dt>Application style</dt>
          <dd>{board.applicationStyle}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {board.commonRoleTypes.slice(0, 4).map((roleType) => (
          <span className="tag" key={roleType}>
            {roleType}
          </span>
        ))}
      </div>
      <p className="mt-4 flex-1 text-[13.5px] leading-[1.6] text-muted">{board.note}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-blue-deep" aria-hidden="true">
        Visit Platform <ArrowUpRight className="h-4 w-4" />
      </span>
    </article>
  );
}
