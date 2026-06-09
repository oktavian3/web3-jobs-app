'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

const accentColors: Record<string, string> = {
  purple: 'border-l-purple-500 bg-purple-50/50 hover:border-l-purple-500 hover:bg-purple-50',
  blue: 'border-l-blue-500 bg-blue-50/50 hover:border-l-blue-500 hover:bg-blue-50',
  cyan: 'border-l-cyan-500 bg-cyan-50/50 hover:border-l-cyan-500 hover:bg-cyan-50',
  amber: 'border-l-amber-500 bg-amber-50/50 hover:border-l-amber-500 hover:bg-amber-50',
  pink: 'border-l-pink-500 bg-pink-50/50 hover:border-l-pink-500 hover:bg-pink-50',
  green: 'border-l-emerald-500 bg-emerald-50/50 hover:border-l-emerald-500 hover:bg-emerald-50',
};

const iconColors: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700',
  blue: 'bg-blue-100 text-blue-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  amber: 'bg-amber-100 text-amber-700',
  pink: 'bg-pink-100 text-pink-700',
  green: 'bg-emerald-100 text-emerald-700',
};

export default function FeatureCard({
  href,
  title,
  description,
  icon: Icon,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl border border-black/[0.06] border-l-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(24,21,38,0.07)] ${accentColors[accent] ?? accentColors.purple}`}
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconColors[accent] ?? iconColors.purple}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted">{description}</p>
    </Link>
  );
}
