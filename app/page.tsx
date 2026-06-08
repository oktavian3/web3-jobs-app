'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  Circle,
  FileCheck2,
  FolderKanban,
  Gauge,
  MessageSquareText,
  Route,
  Search,
  Sparkles,
} from 'lucide-react';
import roles from '@/public/data/roles.json';
import { roleMeta } from '@/lib/career-data';
import FeatureCard from '@/components/landing/FeatureCard';
import RoleCard from '@/components/landing/RoleCard';
import ScrollReveal from '@/components/landing/ScrollReveal';
import { Badge, Container, CTASection, SectionCard, SectionHeading } from '@/components/landing/Primitives';

const rotatingRoles = ['Web3 Product Manager', 'Community Manager', 'Smart Contract Developer', 'DeFi Analyst', 'Content Creator'];

const features = [
  { href: '/roles', title: 'Explore Roles', description: 'Understand real daily work, skills, tools, and salary context.', icon: Search, accent: 'purple' as const },
  { href: '/skill-check', title: 'Skill Check', description: 'Answer 10 questions and get matched to a realistic career lane.', icon: BookOpenCheck, accent: 'blue' as const },
  { href: '/roadmap', title: 'Build Roadmap', description: 'Turn your target role into milestones you can complete.', icon: Route, accent: 'cyan' as const },
  { href: '/interview', title: 'Interview Prep', description: 'Practice role-specific questions and structure stronger answers.', icon: MessageSquareText, accent: 'amber' as const },
  { href: '/portfolio', title: 'Portfolio Builder', description: 'Know what proof-of-work you need before applying.', icon: FolderKanban, accent: 'pink' as const },
  { href: '/salary', title: 'Salary Explorer', description: 'Compare compensation by role before negotiation.', icon: BadgeDollarSign, accent: 'green' as const },
];

const roleFilters = ['All', 'No-code', 'Writing', 'Technical', 'Research', 'Community', 'Growth'];
const rolePreviewIds = ['community-manager', 'content-creator', 'defi-analyst', 'product-manager', 'smart-contract-developer', 'business-development'];
const roleFilterMap: Record<string, string[]> = {
  'community-manager': ['No-code', 'Community'], 'content-creator': ['No-code', 'Writing'], 'defi-analyst': ['Research'],
  'product-manager': ['Growth'], 'smart-contract-developer': ['Technical'], 'business-development': ['No-code', 'Growth'],
};

const interviewQuestions = [
  { category: 'Community', question: 'How would you handle an angry community after a delayed airdrop?' },
  { category: 'Metrics', question: 'How do you measure community health?' },
  { category: 'Research', question: 'What makes a good protocol breakdown?' },
  { category: 'Product', question: 'How do you prioritize features as a Web3 PM?' },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((current) => (current + 1) % rotatingRoles.length), 2600);
    return () => window.clearInterval(interval);
  }, []);

  const previewRoles = useMemo(() => rolePreviewIds
    .map((id) => roles.find((role) => role.id === id))
    .filter((role): role is (typeof roles)[number] => Boolean(role))
    .filter((role) => activeFilter === 'All' || roleFilterMap[role.id]?.includes(activeFilter)), [activeFilter]);

  return (
    <div className="landing-page pb-6 pt-24 sm:pb-8 sm:pt-28">
      <Container className="space-y-6 sm:space-y-8">
        <SectionCard className="hero-surface relative overflow-hidden px-5 pb-10 pt-14 sm:px-10 sm:pb-14 sm:pt-16 lg:px-16 lg:pb-16 lg:pt-20">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />

          <Link href="/roles" className="hero-float-card hero-float-left-top hidden lg:flex">
            <span className="hero-float-icon bg-purple-100 text-purple-700"><BriefcaseBusiness className="h-4 w-4" /></span>
            <span><strong>Role guide</strong><small>20 career paths</small></span>
          </Link>
          <Link href="/skill-check" className="hero-float-card hero-float-right-top hidden lg:flex">
            <span className="hero-float-icon bg-blue-100 text-blue-700"><Gauge className="h-4 w-4" /></span>
            <span><strong>Skill check</strong><small>Find your lane</small></span>
          </Link>
          <Link href="/portfolio" className="hero-float-card hero-float-left-bottom hidden lg:flex">
            <span className="hero-float-icon bg-pink-100 text-pink-700"><FileCheck2 className="h-4 w-4" /></span>
            <span><strong>Portfolio</strong><small>Prove the work</small></span>
          </Link>
          <Link href="/interview" className="hero-float-card hero-float-right-bottom hidden lg:flex">
            <span className="hero-float-icon bg-amber-100 text-amber-700"><MessageSquareText className="h-4 w-4" /></span>
            <span><strong>Interview prep</strong><small>Practice answers</small></span>
          </Link>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Badge tone="neutral"><Sparkles className="h-3.5 w-3.5 text-purple-600" />Your practical map into Web3 work</Badge>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
              Know the work before<br className="hidden sm:block" /> you chase the title.
            </h1>
            <div className="mt-6 flex min-h-9 flex-wrap items-center justify-center text-base text-muted sm:text-lg">
              <span>I want to become a&nbsp;</span>
              <span key={rotatingRoles[roleIndex]} className="role-swap font-semibold text-purple-700">{rotatingRoles[roleIndex]}</span>
              <span className="ml-1 h-5 w-px animate-pulse bg-purple-600" aria-hidden="true" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Understand real roles, test your readiness, build proof-of-work, and apply with context—not guesswork.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/roles" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">Find my role <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/skill-check" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200">Start skill check</Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-12 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-white/80 shadow-sm backdrop-blur sm:mt-16">
            {[['20', 'Role guides'], ['54+', 'Terms decoded'], ['14', 'Job boards']].map(([value, label], index) => <div key={label} className={`px-2 py-4 text-center sm:px-5 ${index ? 'border-l border-black/[0.06]' : ''}`}><strong className="block text-lg sm:text-2xl">{value}</strong><span className="mt-0.5 block text-[10px] text-muted sm:text-xs">{label}</span></div>)}
          </div>
        </SectionCard>

        <ScrollReveal>
          <SectionCard className="p-5 sm:p-8 lg:p-10">
            <SectionHeading eyebrow="Career toolkit" title="Everything you need before applying" copy="Move through one clear journey—from understanding the role to proving you can do the work." align="center" />
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map((feature, index) => <ScrollReveal key={feature.href} delay={index * 45}><FeatureCard {...feature} /></ScrollReveal>)}</div>
          </SectionCard>
        </ScrollReveal>

        <ScrollReveal>
          <SectionCard className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeading eyebrow="Role preview" title="Pick a lane, then learn the work." copy="Filter by the kind of work you enjoy. Each guide explains the day-to-day reality, not just the job title." />
              <Link href="/roles" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-purple-700">Explore all roles <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 flex gap-2 overflow-x-auto pb-2">{roleFilters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-foreground text-white' : 'border border-black/[0.06] bg-white text-muted hover:text-foreground'}`}>{filter}</button>)}</div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{previewRoles.map((role) => <RoleCard key={role.id} href={`/roles/${role.id}`} title={role.name === 'Business Development' ? 'Growth / BD' : role.name} difficulty={roleMeta[role.id]?.difficulty ?? role.category} description={role.dayInTheLife.split('.').slice(0, 2).join('.') + '.'} skills={role.mustHaveSkills} />)}</div>
            {previewRoles.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-white p-8 text-center text-sm text-muted">No preview role matches this filter yet. <Link href="/roles" className="font-semibold text-purple-700">Browse every role.</Link></div>}
          </SectionCard>
        </ScrollReveal>

        <ScrollReveal><CTASection badge="No wallet. No hype. No gatekeeping." title="Start with a ten-question reality check." copy="Get matched to a career lane based on what you already enjoy doing, then leave with a concrete next step." href="/skill-check" label="Start skill check" /></ScrollReveal>

        <ScrollReveal>
          <SectionCard className="overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div><Badge tone="blue"><Route className="h-3.5 w-3.5" />30-day progress</Badge><h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Your roadmap should feel doable, not imaginary.</h2><p className="mt-4 max-w-lg leading-7 text-muted">Break a target role into weekly outcomes, save progress in your browser, and always know the next useful action.</p><Link href="/roadmap" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white">Build my roadmap <ArrowRight className="h-4 w-4" /></Link></div>
              <div className="roadmap-preview rounded-3xl border border-black/[0.06] bg-[#f8f8fa] p-5 shadow-[0_22px_60px_rgba(25,20,48,0.09)] sm:p-7">
                <div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-purple-600">COMMUNITY MANAGER</p><h3 className="mt-1 font-semibold">4-week starter roadmap</h3></div><strong className="text-2xl text-purple-700">50%</strong></div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white"><div className="roadmap-progress h-full w-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" /></div>
                <div className="mt-5 space-y-3">{[['Week 1', 'Learn the role', true], ['Week 2', 'Build basic skills', true], ['Week 3', 'Create proof-of-work', false], ['Week 4', 'Apply with context', false]].map(([week, task, done]) => <div key={String(week)} className={`flex items-center gap-3 rounded-xl border p-3.5 ${done ? 'border-emerald-100 bg-white' : 'border-black/[0.05] bg-white/60'}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full ${done ? 'bg-emerald-500 text-white' : 'bg-[#eeeef2] text-muted'}`}>{done ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}</span><span><small className="block text-[10px] font-semibold uppercase tracking-wider text-muted">{week}</small><strong className="text-sm">{task}</strong></span></div>)}</div>
              </div>
            </div>
          </SectionCard>
        </ScrollReveal>

        <ScrollReveal>
          <SectionCard className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionHeading eyebrow="Interview prep" title="Practice the judgment behind the answer." copy="Use role-specific prompts to rehearse calm, structured answers before the real conversation." /><Link href="/interview" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-purple-700">Practice interview questions <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">{interviewQuestions.map((item, index) => <Link key={item.question} href="/interview" className="group rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_15px_35px_rgba(64,47,120,0.08)]"><div className="flex items-center justify-between"><Badge tone={index % 2 ? 'blue' : 'purple'}>{item.category}</Badge><span className="text-xs font-semibold text-muted">0{index + 1}</span></div><h3 className="mt-6 max-w-md text-lg font-semibold leading-7 tracking-[-0.015em]">“{item.question}”</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-700">See answer framework <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div>
          </SectionCard>
        </ScrollReveal>

        <ScrollReveal>
          <SectionCard className="overflow-hidden bg-[linear-gradient(135deg,#f5f1ff_0%,#eff6ff_55%,#f8f8fb_100%)] p-7 sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><Badge><BarChart3 className="h-3.5 w-3.5" />Ready to move forward?</Badge><h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">Take your next step with context.</h2><p className="mt-3 max-w-xl leading-7 text-muted">Explore trusted job boards after you understand the role, test your readiness, and build evidence recruiters can inspect.</p></div><Link href="/jobs" className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/15 transition hover:-translate-y-0.5">Browse job boards <ArrowRight className="h-4 w-4" /></Link></div>
          </SectionCard>
        </ScrollReveal>
      </Container>
import { useEffect, useState } from 'react';
import roles from '@/public/data/roles.json';
import { roleMeta } from '@/lib/career-data';
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Route,
  Sparkles,
} from 'lucide-react';

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
