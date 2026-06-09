'use client';

import Link from 'next/link';

export default function RoleCard({
  href,
  title,
  difficulty,
  description,
  skills,
}: {
  href: string;
  title: string;
  difficulty: string;
  description: string;
  skills: string[];
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_12px_30px_rgba(64,47,120,0.08)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">{title}</h3>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-black/[0.06] bg-[#f5f4f8] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
          {difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">{description}</p>
      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-purple-700"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="rounded-full bg-[#f0eff3] px-2.5 py-1 text-[11px] font-medium text-muted">
              +{skills.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
