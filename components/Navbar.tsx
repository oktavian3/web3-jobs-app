'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { href: '/roles', label: 'Roles' },
  { href: '/skill-check', label: 'Skill Check' },
  { href: '/roadmap', label: 'Roadmaps' },
  { href: '/interview', label: 'Interview Prep' },
  { href: '/get-hired', label: 'Get Hired' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,.08)] backdrop-blur-xl md:px-5">
        <Link href="/" className="flex items-center"><Image src="/images/kraft-logo.png" alt="KRAFT" width={138} height={32} className="h-7 w-auto object-contain" priority /></Link>
        <div className="hidden items-center gap-1 lg:flex">{links.map(link => <Link key={link.href} href={link.href} className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">{link.label}</Link>)}</div>
        <Link href="/jobs" className="hidden items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600 md:flex">Browse jobs <ArrowUpRight className="h-4 w-4" /></Link>
        <button aria-label="Toggle menu" onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-slate-900 md:hidden">{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">{link.label}</Link>)}<Link href="/jobs" onClick={() => setIsOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-bold text-white">Browse jobs <ArrowUpRight className="h-4 w-4" /></Link></div>}
    </nav>
  );
}
