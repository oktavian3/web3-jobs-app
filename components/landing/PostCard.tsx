'use client';

import Link from 'next/link';

export type PostCardProps = {
  title: string;
  company: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  compact?: boolean;
};

export function PostCard({ title, company, description, url, tags, featured = false, compact = false }: PostCardProps) {
  return (
    <article className={`group rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] ${compact ? 'p-4' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{company}</p>
          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">{title}</h3>
        </div>
        {featured ? <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">Featured</span> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{description}</p>
      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-4">
        Open post
      </Link>
    </article>
  );
}
