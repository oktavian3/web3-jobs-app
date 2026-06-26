'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

/* ─── Container ─── */
export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* ─── Badge ─── */
type BadgeTone = 'neutral' | 'purple' | 'blue' | 'cyan' | 'amber' | 'pink' | 'green';

const badgeStyles: Record<BadgeTone, string> = {
  neutral: 'bg-purple-50 text-purple-700',
  purple: 'bg-purple-50 text-purple-700',
  blue: 'bg-blue-50 text-blue-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  amber: 'bg-amber-50 text-amber-700',
  pink: 'bg-pink-50 text-pink-700',
  green: 'bg-emerald-50 text-emerald-700',
};

export function Badge({
  children,
  tone = 'purple',
  className = '',
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase ${badgeStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ─── Section Card ─── */
export function SectionCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[28px] border border-black/[0.06] bg-white shadow-[0_14px_44px_rgba(24,21,38,0.04)] ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── Section Heading ─── */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : ''}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2
        className={`mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl ${align === 'center' ? '' : 'max-w-lg'}`}
      >
        {title}
      </h2>
      {copy && (
        <p className={`mt-4 leading-7 text-muted ${align === 'center' ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>
          {copy}
        </p>
      )}
    </div>
  );
}

/* ─── CTA Section ─── */
export function CTASection({
  badge,
  title,
  copy,
  href,
  label,
}: {
  badge: string;
  title: string;
  copy: string;
  href: string;
  label: string;
}) {
  return (
    <SectionCard className="overflow-hidden bg-[linear-gradient(135deg,#f5f1ff_0%,#eff6ff_55%,#f8f8fb_100%)] p-7 text-center sm:p-10">
      <div className="mx-auto max-w-2xl">
        <Badge>
          <Sparkles className="h-3.5 w-3.5" />
          {badge}
        </Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">{copy}</p>
        <Link
          href={href}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionCard>
  );
}

/* ─── Footer Column ─── */
export function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</h4>
      <ul className="mt-5 space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition hover:text-purple-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
