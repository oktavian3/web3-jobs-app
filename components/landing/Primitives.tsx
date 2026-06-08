import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionCard({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`landing-card ${className}`}>{children}</section>;
}

export function Badge({ children, tone = 'purple', className = '' }: { children: ReactNode; tone?: 'purple' | 'blue' | 'neutral' | 'dark'; className?: string }) {
  const tones = {
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    neutral: 'border-black/5 bg-white/75 text-foreground',
    dark: 'border-white/10 bg-white/10 text-white',
  };
  return <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow?: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">{eyebrow}</p>}
    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">{title}</h2>
    {copy && <p className="mt-4 text-base leading-7 text-muted">{copy}</p>}
  </div>;
}

export function CTASection({ badge, title, copy, href, label, children, className = '' }: { badge: string; title: string; copy: string; href: string; label: string; children?: ReactNode; className?: string }) {
  return <SectionCard className={`overflow-hidden bg-[linear-gradient(135deg,#17171a_0%,#242132_58%,#242b45_100%)] p-7 text-white sm:p-10 lg:p-12 ${className}`}>
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
      <div className="max-w-2xl">
        <Badge tone="dark">{badge}</Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-xl leading-7 text-white/65">{copy}</p>
      </div>
      <Link href={href} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5">
        {label}<ArrowRight className="h-4 w-4" />
      </Link>
    </div>
    {children}
  </SectionCard>;
}

export function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string; external?: boolean }> }) {
  return <div>
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    <ul className="mt-4 space-y-3 text-sm text-muted">
      {links.map((link) => <li key={link.href}><Link href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} className="transition hover:text-purple-700">{link.label}</Link></li>)}
    </ul>
  </div>;
}
