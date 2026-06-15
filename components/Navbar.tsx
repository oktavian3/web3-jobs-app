import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/landing/Primitives';
export default function Navbar(){return <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[.05] bg-[#f8f7f4]/85 backdrop-blur-xl"><Container><div className="flex h-[72px] items-center justify-between"><Link href="/" aria-label="KRAFT home"><Image src="/images/kraft-logo.png" alt="KRAFT" width={140} height={34} className="h-auto w-[122px]" priority/></Link><div className="flex items-center gap-4"><Link href="/#curriculum" className="hidden text-sm font-semibold text-muted hover:text-foreground sm:block">Curriculum</Link><Link href="/course" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5">Launch Course <ArrowUpRight className="h-4 w-4"/></Link></div></div></Container></header>}
