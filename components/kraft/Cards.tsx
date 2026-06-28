import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import type { Role } from "@/data/roles";
import type { JobBoard } from "@/data/jobBoards";

export function RoleCard({ role }: { role: Role }) {
  return (
    <Link href={`/roles/${role.slug}`} className="interactive-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-100/80 bg-[linear-gradient(145deg,#ffffff_0%,#f5f9ff_58%,#eaf3ff_100%)] p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-blue">
      <div className="pointer-events-none absolute -right-12 -top-16 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl transition group-hover:bg-blue-300/60" />
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full border border-blue-100 bg-white/85 px-3 py-1 text-xs font-extrabold text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">{role.lane}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-soft transition group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="relative mt-5 text-xl font-extrabold tracking-tight text-ink">{role.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-6 text-slate-700">{role.summary}</p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        <span className="tag">{role.level}</span>
        <span className="tag">{role.mode}</span>
        {role.tags.slice(0, 2).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
        View Role <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item} className="flex gap-3 rounded-xl border border-blue-100 bg-white/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition hover:border-blue-200 hover:bg-blue-50/45">
          <CheckCircle2 className={`mt-0.5 h-5 w-5 ${index < 3 ? "text-blue-600" : "text-slate-300"}`} />
          <span className="text-sm leading-6 text-ink">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function JobBoardCard({ board }: { board: JobBoard }) {
  return (
    <article className="interactive-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-100 bg-[linear-gradient(150deg,#ffffff_0%,#f7fbff_55%,#edf5ff_100%)] p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-blue">
      <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-blue-200/50 blur-2xl transition group-hover:bg-blue-300/70" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-sm font-extrabold text-white shadow-blue">
            {board.name.slice(0, 1)}
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-ink">{board.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">{board.bestFor}</p>
        </div>
        <a href={board.url} target="_blank" rel="noreferrer" className="icon-button transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:text-blue-700" aria-label={`Visit ${board.name}`}>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <dl className="relative mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="mini-stat">
          <dt>Remote</dt>
          <dd>{board.remoteSupport}</dd>
        </div>
        <div className="mini-stat">
          <dt>Salary</dt>
          <dd>{board.salaryVisibility}</dd>
        </div>
        <div className="mini-stat sm:col-span-2">
          <dt>Application style</dt>
          <dd>{board.applicationStyle}</dd>
        </div>
      </dl>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {board.commonRoleTypes.slice(0, 4).map((roleType) => (
          <span className="tag" key={roleType}>
            {roleType}
          </span>
        ))}
      </div>
      <p className="relative mt-5 flex-1 text-sm leading-6 text-slate-700">{board.note}</p>
      <a href={board.url} target="_blank" rel="noreferrer" className="relative mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
        Visit Platform <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </article>
  );
}
