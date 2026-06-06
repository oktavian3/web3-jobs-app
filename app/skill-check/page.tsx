'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import ToolPageHeader from '@/components/ToolPageHeader';

type Track = 'newbie' | 'dev' | 'community' | 'creator' | 'trader';
type Lane = 'builder' | 'analyst' | 'operator' | 'creative';
const backgrounds: { id: Track; label: string; hint: string; boost: Lane }[] = [
  { id:'newbie', label:'New to Web3', hint:'I am exploring where I fit.', boost:'operator' }, { id:'dev', label:'Developer', hint:'I already build software.', boost:'builder' },
  { id:'community', label:'Community operator', hint:'I organize and support people.', boost:'operator' }, { id:'creator', label:'Creator / designer', hint:'I communicate ideas visually or in writing.', boost:'creative' }, { id:'trader', label:'Trader / researcher', hint:'I follow markets, protocols, and data.', boost:'analyst' },
];
const prompts: [string, Lane, Lane][] = [
  ['I can break a complex problem into testable steps.','builder','analyst'], ['I enjoy validating claims with data.','analyst','builder'], ['I can coordinate people through ambiguity.','operator','creative'],
  ['I can explain technical ideas simply.','creative','operator'], ['I understand wallets, transactions, and gas.','builder','analyst'], ['I can identify useful metrics for a product.','analyst','operator'],
  ['I have handled conflict or support publicly.','operator','creative'], ['I can turn an insight into a polished artifact.','creative','analyst'], ['I regularly document what I learn.','creative','builder'],
  ['I have shipped work others can inspect.','builder','operator'], ['I am comfortable learning in public.','operator','creative'], ['I can defend a decision with evidence.','analyst','builder'],
];
const resultMap: Record<Lane, { title:string; roles:string[]; slug:string; gaps:string[] }> = {
  builder:{title:'Builder',roles:['Smart Contract Developer','Full-stack Web3 Developer','Security Engineer'],slug:'smart-contract-developer',gaps:['Ship a testnet project','Practice security-first reviews']},
  analyst:{title:'Analyst',roles:['On-chain Analyst','DeFi Analyst','Economy Designer'],slug:'onchain-analyst',gaps:['Publish a live-data dashboard','Write a defensible protocol thesis']},
  operator:{title:'Operator',roles:['Community Manager','Product Manager','Business Development'],slug:'community-manager',gaps:['Create a 30-day operating plan','Document a measurable community loop']},
  creative:{title:'Translator',roles:['Content Creator','UX Designer','Marketing Specialist'],slug:'content-creator',gaps:['Publish three focused explainers','Build one audience-specific case study']},
};

export default function SkillCheckPage(){
  const [track,setTrack]=useState<Track|null>(null); const [answers,setAnswers]=useState<number[]>([]); const [saved,setSaved]=useState(false);
  useEffect(()=>{const raw=localStorage.getItem('kraft-skill-result'); const frame=requestAnimationFrame(()=>setSaved(Boolean(raw))); return()=>cancelAnimationFrame(frame)},[]);
  const result=useMemo(()=>{if(!track||answers.length<prompts.length)return null; const score:Record<Lane,number>={builder:0,analyst:0,operator:0,creative:0}; score[backgrounds.find(x=>x.id===track)!.boost]+=2; answers.forEach((value,i)=>{score[prompts[i][1]]+=value; score[prompts[i][2]]+=4-value}); const lane=(Object.keys(score) as Lane[]).sort((a,b)=>score[b]-score[a])[0]; const readiness=Math.min(92,Math.round(38+answers.reduce((a,b)=>a+b,0)/answers.length*12)); return {...resultMap[lane],readiness,lane};},[track,answers]);
  useEffect(()=>{if(result){localStorage.setItem('kraft-skill-result',JSON.stringify({...result,track,createdAt:new Date().toISOString()})); const frame=requestAnimationFrame(()=>setSaved(true)); return()=>cancelAnimationFrame(frame)}},[result,track]);
  const reset=()=>{setTrack(null);setAnswers([]);setSaved(false);localStorage.removeItem('kraft-skill-result')};
  return <div className="page-wrapper px-4 pb-20 pt-32 sm:px-6 lg:px-8"><div className="grid-background opacity-40"/><main className="page-content mx-auto max-w-3xl"><ToolPageHeader eyebrow="Four-step career diagnostic" title="How ready are you—and for what?" description="Start with your background, score twelve practical signals, then get a role match and focused gap analysis." icon={Sparkles}/><div className="rounded-3xl border border-border bg-white p-6 shadow-xl sm:p-10">
    {!track?<><p className="text-sm font-semibold text-purple-700">STEP 1 OF 4 · YOUR BACKGROUND</p><h2 className="mt-3 text-2xl font-semibold">Who are you right now?</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{backgrounds.map(x=><button key={x.id} onClick={()=>setTrack(x.id)} className="rounded-2xl border border-border p-5 text-left hover:border-purple-400 hover:bg-purple-50"><strong>{x.label}</strong><span className="mt-1 block text-sm text-muted">{x.hint}</span></button>)}</div></>:
    !result?<><div className="flex items-center gap-3"><div className="h-2 flex-1 rounded-full bg-gray-100"><div className="h-full rounded-full bg-purple-600" style={{width:`${answers.length/prompts.length*100}%`}}/></div><span className="text-sm">{answers.length+1}/{prompts.length}</span></div><p className="mt-6 text-sm font-semibold text-purple-700">STEP 2 OF 4 · SKILL SIGNALS</p><h2 className="mt-3 text-2xl font-semibold">{prompts[answers.length][0]}</h2><div className="mt-7 grid grid-cols-4 gap-2">{[1,2,3,4].map(value=><button key={value} onClick={()=>setAnswers([...answers,value])} className="rounded-xl border border-border py-4 font-semibold hover:border-purple-500 hover:bg-purple-50">{value}<span className="mt-1 block text-xs font-normal text-muted">{value===1?'Not yet':value===4?'Strong':'Somewhat'}</span></button>)}</div>{answers.length>0&&<button onClick={()=>setAnswers(answers.slice(0,-1))} className="mt-6 text-sm text-muted">← Previous</button>}</>:
    <div className="text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500"/><p className="mt-5 text-sm font-semibold text-purple-700">STEP 3 · READINESS RESULT</p><h2 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl">{result.readiness}% ready · {result.title}</h2><p className="mt-3 text-muted">Strongest matches: <strong className="text-foreground">{result.roles.join(' · ')}</strong></p><div className="mt-7 grid gap-3 text-left sm:grid-cols-2">{result.gaps.map(gap=><div key={gap} className="rounded-2xl bg-amber-50 p-4"><span className="text-xs font-semibold text-amber-700">FOCUS NEXT</span><p className="mt-1 font-medium">{gap}</p></div>)}</div><p className="mt-6 text-sm font-semibold text-emerald-700">{saved?'✓ Result saved in this browser':''}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href={`/roles/${result.slug}`} className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-white">View role <ArrowRight className="h-4 w-4"/></Link><Link href="/roadmap" className="rounded-full bg-purple-600 px-6 py-3 font-semibold text-white">Open roadmap</Link><Link href="/portfolio" className="rounded-full border border-border px-6 py-3 font-semibold">Portfolio checklist</Link><button onClick={reset} className="inline-flex items-center gap-2 px-4 text-sm text-muted"><RotateCcw className="h-4 w-4"/>Retake</button></div></div>}
  </div></main></div>;
}
