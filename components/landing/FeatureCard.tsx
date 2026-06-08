import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({ href, title, description, icon: Icon, accent = 'purple' }: { href: string; title: string; description: string; icon: LucideIcon; accent?: 'purple' | 'blue' | 'amber' | 'green' | 'pink' | 'cyan' }) {
  const accents = {
    purple: 'bg-purple-100 text-purple-700', blue: 'bg-blue-100 text-blue-700', amber: 'bg-amber-100 text-amber-700',
    green: 'bg-emerald-100 text-emerald-700', pink: 'bg-pink-100 text-pink-700', cyan: 'bg-cyan-100 text-cyan-700',
  };
  return <Link href={href} className="group flex min-h-56 flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_12px_35px_rgba(17,17,26,0.045)] transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_20px_45px_rgba(90,65,160,0.10)]">
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}><Icon className="h-5 w-5" /></div>
    <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
    <p className="mt-2 flex-1 text-sm leading-6 text-muted">{description}</p>
    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-700">Open tool <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
  </Link>;
}
