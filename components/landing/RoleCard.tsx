import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from './Primitives';

export default function RoleCard({ href, title, difficulty, description, skills }: { href: string; title: string; difficulty: string; description: string; skills: string[] }) {
  return <Link href={href} className="group flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_40px_rgba(72,56,120,0.09)]">
    <div><Badge tone="neutral" className="capitalize">{difficulty}</Badge></div>
    <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] group-hover:text-purple-700">{title}</h3>
    <p className="mt-2 flex-1 text-sm leading-6 text-muted">{description}</p>
    <div className="mt-5 flex flex-wrap gap-2">{skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-lg bg-[#f4f3f7] px-2.5 py-1 text-[11px] font-medium text-[#56515f]">{skill}</span>)}</div>
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">View role <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
  </Link>;
}
