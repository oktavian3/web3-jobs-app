'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  ChevronRight, Code2, Compass, FileCheck2, Gauge, MessageSquareText,
  Route, Search, Sparkles, WalletCards,
} from 'lucide-react';

const rotatingRoles = ['Smart Contract Developer', 'Web3 Product Manager', 'Protocol Researcher', 'Community Lead'];

const paths = [
  { icon: Code2, title: 'Build', copy: 'Engineering, security, data, and protocol roles.', color: 'blue', href: '/roles?category=technical' },
  { icon: Compass, title: 'Grow', copy: 'Product, growth, community, and operations.', color: 'violet', href: '/roles?category=non-tech' },
  { icon: WalletCards, title: 'Create', copy: 'Design, content, research, and ecosystem work.', color: 'amber', href: '/roles' },
];

const toolkit = [
  { icon: Gauge, title: 'Skill check', copy: 'Find your strongest role match in under three minutes.', href: '/skill-check', tag: 'Start here' },
  { icon: Route, title: '30-day roadmaps', copy: 'Turn curiosity into a daily, trackable learning plan.', href: '/roadmap', tag: 'Build skills' },
  { icon: MessageSquareText, title: 'Interview practice', copy: 'Rehearse the questions Web3 teams actually ask.', href: '/interview', tag: 'Get ready' },
  { icon: FileCheck2, title: 'Portfolio builder', copy: 'Ship proof of work that recruiters can verify.', href: '/portfolio', tag: 'Stand out' },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % rotatingRoles.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);


  return (
    <div className="home-shell">
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <div className="site-container relative z-10 pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/skill-check" className="eyebrow-pill">
              <Sparkles className="h-3.5 w-3.5" /> Built for the next generation of Web3 talent
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            <h1 className="hero-title mt-7">
              Don&apos;t just find a Web3 job.
              <span> Become ready for one.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Clear role guides, practical roadmaps, and honest career tools for people who want to build a real career onchain.
            </p>
            <div className="mt-8 flex min-h-8 items-center justify-center gap-2 text-sm font-semibold text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,.12)]" />
              Explore a path as a <span key={roleIndex} className="role-swap">{rotatingRoles[roleIndex]}</span>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/skill-check" className="button-primary">
                Find my Web3 role <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/roles" className="button-secondary">
                Explore all roles <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="hero-dashboard mx-auto mt-16 max-w-5xl">
            <div className="dashboard-topbar">
              <div className="flex gap-1.5"><i /><i /><i /></div>
              <div className="dashboard-search"><Search className="h-3.5 w-3.5" /> usekraft.xyz / career-map</div>
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
            </div>
            <div className="grid gap-px bg-slate-200 md:grid-cols-[1.15fr_.85fr]">
              <div className="bg-white p-6 md:p-9">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Your career map</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Blockchain Developer</h2></div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">82% match</span>
                </div>
                <div className="mt-8 space-y-5">
                  {['Blockchain fundamentals', 'Solidity & smart contracts', 'Testing & security'].map((skill, index) => (
                    <div key={skill}>
                      <div className="mb-2 flex justify-between text-xs font-semibold"><span>{skill}</span><span className="text-slate-400">{[92, 68, 44][index]}%</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${[92, 68, 44][index]}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#111827] p-6 text-white md:p-9">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Next milestone</p>
                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300"><Code2 className="h-6 w-6" /></div>
                <h3 className="mt-5 text-xl font-semibold">Ship your first contract</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">Complete three focused tasks and deploy to a public testnet.</p>
                <div className="mt-7 space-y-3 text-sm">
                  {['Write contract', 'Add test coverage', 'Deploy & document'].map((item, i) => <div key={item} className="flex items-center gap-3"><span className={`flex h-5 w-5 items-center justify-center rounded-full ${i === 0 ? 'bg-emerald-400 text-slate-950' : 'border border-slate-600'}`}>{i === 0 && <Check className="h-3 w-3" />}</span>{item}</div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="stats-strip mx-auto max-w-4xl">
            {[['20', 'career paths'], ['54', 'Web3 terms'], ['12', 'trusted job boards'], ['100%', 'free to explore']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="section-heading"><span>Find your lane</span><h2>There&apos;s more than one way into Web3.</h2><p>Start with the kind of work you enjoy. We&apos;ll show you the roles, skills, and proof of work that matter.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {paths.map(({ icon: Icon, title, copy, color, href }) => <Link href={href} key={title} className={`path-card path-${color}`}><div className="path-icon"><Icon /></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">I want to</p><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight className="ml-auto h-5 w-5" /></Link>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f6f7fb]">
        <div className="site-container">
          <div className="section-heading"><span>Your career toolkit</span><h2>From “where do I start?” to “I got the offer.”</h2><p>Practical tools designed around each stage of your Web3 career—not generic advice and endless link lists.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {toolkit.map(({ icon: Icon, title, copy, href, tag }, index) => <Link key={title} href={href} className="tool-card"><div className={`tool-number tool-number-${index}`}>0{index + 1}</div><div className="tool-icon"><Icon /></div><span>{tag}</span><h3>{title}</h3><p>{copy}</p><div className="tool-link">Open tool <ArrowRight className="h-4 w-4" /></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="proof-card">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">Proof of work</p><h3 className="mt-1 text-xl font-bold">Your portfolio signal</h3></div><span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">4 / 6</span></div>
              <div className="mt-5 space-y-3">{['Public project with README', 'Onchain deployment', 'Technical write-up', 'Open-source contribution', 'Demo video', 'Community reference'].map((item, i) => <div key={item} className={`flex items-center gap-3 rounded-xl border p-3.5 text-sm font-medium ${i < 4 ? 'border-emerald-100 bg-emerald-50/60 text-slate-800' : 'border-slate-100 text-slate-400'}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full ${i < 4 ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>{i < 4 && <Check className="h-3.5 w-3.5" />}</span>{item}</div>)}</div>
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl md:-right-8"><p className="text-xs font-bold text-slate-400">RECRUITER READY</p><p className="mt-1 text-2xl font-black text-emerald-500">67%</p></div>
          </div>
          <div>
            <span className="section-kicker">Build evidence, not hype</span>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] text-slate-950 md:text-5xl">Your work should speak before the interview starts.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">The best Web3 teams hire visible builders. Use our portfolio checklist to turn small projects, writing, and community contributions into a credible body of work.</p>
            <ul className="mt-7 space-y-4 text-sm font-semibold text-slate-700">{['Role-specific project ideas', 'A recruiter-ready checklist', 'Clear examples of strong proof of work'].map(item => <li key={item} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700"><Check className="h-3.5 w-3.5" /></span>{item}</li>)}</ul>
            <Link href="/portfolio" className="mt-9 inline-flex items-center gap-2 font-bold text-blue-700">Build my portfolio <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-5 md:pb-28">
        <div className="site-container overflow-hidden rounded-[2rem] bg-[#111827] px-6 py-14 text-center text-white md:px-14 md:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white"><BriefcaseBusiness className="h-6 w-6" /></div>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-[-.03em] md:text-5xl">Ready to make your move into Web3?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">Start with a role match, build the missing skills, and apply with proof—not guesswork.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/skill-check" className="button-light">Take the skill check <ArrowRight className="h-4 w-4" /></Link><Link href="/jobs" className="button-dark-outline">Browse Web3 jobs <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </div>
  );
}
