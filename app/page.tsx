'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Route,
  Sparkles,
} from 'lucide-react';
import roles from '@/public/data/roles.json';
import { roleMeta } from '@/lib/career-data';

const rotatingRoles = [
  'Smart Contract Developer',
  'Protocol Researcher',
  'Web3 Product Manager',
  'Community Lead',
  'On-chain Analyst',
];

const stats = [
  { value: 20, suffix: '', label: 'role guides' },
  { value: 54, suffix: '+', label: 'terms decoded' },
  { value: 14, suffix: '', label: 'trusted job boards' },
];

const pathways = [
  {
    href: '/skill-check',
    title: 'Find your role fit',
    copy: 'Answer a focused set of questions and get a practical role match.',
    icon: BookOpenCheck,
    accent: 'bg-purple-100 text-purple-700',
  },
  {
    href: '/roadmap',
    title: 'Build your roadmap',
    copy: 'Turn a target role into milestones you can complete and track.',
    icon: Route,
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    href: '/interview',
    title: 'Practice interviews',
    copy: 'Flip through role-specific prompts and structure stronger answers.',
    icon: BriefcaseBusiness,
    accent: 'bg-amber-100 text-amber-700',
  },
  {
    href: '/salary',
    title: 'Know your range',
    copy: 'Compare compensation by role before you enter a negotiation.',
    icon: BadgeDollarSign,
    accent: 'bg-emerald-100 text-emerald-700',
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    const duration = 900;
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <>{display}{suffix}</>;
}

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % rotatingRoles.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="grid-background opacity-50" />
      <div className="gradient-orb-primary" />
      <div className="gradient-orb-secondary" />

      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8">
        <div className="page-content mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Your practical map into Web3 work
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-medium leading-[1.04] tracking-tight text-foreground sm:text-7xl">
              Know the work before<br className="hidden sm:block" /> you chase the title.
            </h1>

            <div className="mt-7 flex min-h-10 items-center justify-center text-lg text-muted sm:text-xl">
              I want to become a&nbsp;
              <span key={rotatingRoles[roleIndex]} className="role-swap font-semibold text-purple-700">
                {rotatingRoles[roleIndex]}
              </span>
              <span className="ml-1 h-6 w-0.5 animate-pulse bg-purple-600" aria-hidden="true" />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Explore real role expectations, test your readiness, build a learning plan, and apply with proof—not guesswork.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/roles" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5 sm:w-auto">
                Find my role
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/skill-check" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-7 py-3.5 font-semibold text-foreground backdrop-blur transition-colors hover:border-purple-300 hover:text-purple-700 sm:w-auto">
                Start skill check
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-border bg-white/80 shadow-sm backdrop-blur">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`px-3 py-5 text-center sm:px-6 ${index > 0 ? 'border-l border-border' : ''}`}>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="page-content mx-auto max-w-6xl">
          <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">How it works</p><h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl font-medium">Five steps from curious to credible.</h2></div>
          <div className="mt-10 grid gap-3 md:grid-cols-5">{[
            ['01','Find your fit','Match strengths to a role.'],['02','Read the reality','Learn tasks, tools, and pay.'],['03','Close the gaps','Follow a 30-day roadmap.'],['04','Build evidence','Create role-specific proof.'],['05','Apply prepared','Practice and target real jobs.'],
          ].map(([number,title,copy])=><div key={number} className="rounded-2xl border border-border bg-white p-5"><span className="text-sm font-bold text-purple-600">{number}</span><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-sm leading-5 text-muted">{copy}</p></div>)}</div>
          <div className="mt-20 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Featured roles</p><h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl">See what the work is worth.</h2></div><Link href="/roles" className="font-semibold text-purple-700">View all roles →</Link></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{roles.slice(0,6).map(role=><Link key={role.id} href={`/roles/${role.id}`} className="group rounded-2xl border border-border bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg"><div className="flex justify-between gap-3"><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize">{roleMeta[role.id]?.difficulty}</span><strong className="text-purple-700">{role.avgCompRange.usd}</strong></div><h3 className="mt-5 text-xl font-semibold group-hover:text-purple-700">{role.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{role.oneLiner}</p><div className="mt-4 flex flex-wrap gap-2">{role.mustHaveSkills.slice(0,2).map(skill=><span key={skill} className="rounded-lg bg-purple-50 px-2 py-1 text-xs text-purple-700">{skill}</span>)}</div></Link>)}</div>
        </div>
      </section>

      <section className="relative bg-foreground px-4 py-20 text-background sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">From curious to credible</p>
              <h2 className="max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-medium sm:text-5xl">One workspace for your Web3 career decisions.</h2>
            </div>
            <Link href="/get-hired" className="inline-flex items-center gap-2 font-semibold text-purple-300 hover:text-white">
              See the full playbook <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map(({ href, title, copy, icon: Icon, accent }) => (
              <Link key={href} href={href} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-all hover:-translate-y-1 hover:border-purple-400/50 hover:bg-white/10">
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
                <ArrowRight className="mt-5 h-4 w-4 text-purple-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="page-content mx-auto grid max-w-6xl gap-8 rounded-3xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 p-8 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-purple-700"><CheckCircle2 className="h-4 w-4" /> No wallet. No hype. No gatekeeping.</div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium sm:text-4xl">Start with a ten-question reality check.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">Get matched to a career lane based on what you already enjoy doing, then leave with a concrete next step.</p>
          </div>
          <Link href="/skill-check" className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-7 py-3.5 font-semibold text-white hover:bg-purple-700">
            Start skill check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
