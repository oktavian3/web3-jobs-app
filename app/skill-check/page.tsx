'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react';

const questions = [
  { q: 'What kind of work gives you energy?', options: [['Building systems', 'builder'], ['Explaining ideas', 'communicator'], ['Finding patterns', 'analyst']] },
  { q: 'What would you rather ship this weekend?', options: [['A working prototype', 'builder'], ['A launch campaign', 'communicator'], ['A market deep-dive', 'analyst']] },
  { q: 'How technical do you want your day to be?', options: [['Very technical', 'builder'], ['A balanced mix', 'analyst'], ['Mostly people and strategy', 'communicator']] },
  { q: 'Which outcome feels most satisfying?', options: [['It works reliably', 'builder'], ['People understand and use it', 'communicator'], ['The decision is backed by evidence', 'analyst']] },
];
const results = {
  builder: { role: 'Blockchain Developer', copy: 'You learn by making. Engineering, smart contracts, security, and developer relations are strong lanes for you.', href: '/roles/blockchain-developer' },
  communicator: { role: 'Web3 Community Manager', copy: 'You turn complexity into momentum. Community, content, growth, and partnerships fit your strengths.', href: '/roles/community-manager' },
  analyst: { role: 'Protocol Researcher', copy: 'You look for signal before action. Research, product, tokenomics, and data roles are worth exploring.', href: '/roles/onchain-analyst' },
};
export default function SkillCheckPage(){
  const [step,setStep]=useState(0); const [answers,setAnswers]=useState<string[]>([]);
  const result=useMemo(()=>{const scores={builder:0,communicator:0,analyst:0};answers.forEach(a=>scores[a as keyof typeof scores]++);return results[(Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]?.[0]||'builder') as keyof typeof results]},[answers]);
  const choose=(answer:string)=>{setAnswers([...answers,answer]);setStep(step+1)};
  return <main className="min-h-screen bg-[#f6f8fc] px-4 pb-24 pt-36"><div className="mx-auto max-w-3xl"><div className="text-center"><span className="section-kicker">Free career matcher</span><h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] md:text-6xl">Find your Web3 lane.</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Four practical questions. No email wall, no personality-test theater.</p></div>
  {step<questions.length?<div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-10"><div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400"><span>Question {step+1} of {questions.length}</span><span>{Math.round(step/questions.length*100)}%</span></div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{width:`${(step/questions.length)*100}%`}}/></div><h2 className="mt-9 text-2xl font-bold tracking-tight md:text-3xl">{questions[step].q}</h2><div className="mt-7 grid gap-3">{questions[step].options.map(([label,value])=><button key={label} onClick={()=>choose(value)} className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 text-left font-bold transition hover:border-blue-400 hover:bg-blue-50"><span>{label}</span><ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600"/></button>)}</div></div>:
  <div className="mt-12 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-2xl md:p-11"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500"><Sparkles/></div><p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-blue-300">Your strongest match</p><h2 className="mt-2 text-3xl font-extrabold md:text-5xl">{result.role}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{result.copy}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={result.href} className="button-light">Explore this role <ArrowRight className="h-4 w-4"/></Link><Link href="/roadmap" className="button-dark-outline">See the roadmap</Link><button onClick={()=>{setStep(0);setAnswers([])}} className="inline-flex items-center gap-2 px-3 text-sm font-bold text-slate-400"><RotateCcw className="h-4 w-4"/>Retake</button></div><div className="mt-9 grid gap-3 border-t border-slate-800 pt-7 sm:grid-cols-3">{['Role guide unlocked','Roadmap ready','Portfolio ideas included'].map(x=><div className="flex items-center gap-2 text-sm text-slate-300" key={x}><Check className="h-4 w-4 text-emerald-400"/>{x}</div>)}</div></div>}</div></main>
}
