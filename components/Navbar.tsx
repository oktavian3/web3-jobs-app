'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Container } from '@/components/landing/Primitives';

const links = [
  { href: '/', label: 'Home' },
  { href: '/roles', label: 'Roles' },
  { href: '/skill-check', label: 'Skill Check' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/get-hired', label: 'Get Hired' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.05] bg-[#f7f7f8]/85 backdrop-blur-xl">
    <Container>
      <div className="grid h-[76px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[190px_1fr_190px]">
        <Link href="/" className="inline-flex w-fit items-center" aria-label="KRAFT home"><Image src="/images/kraft-logo.png" alt="KRAFT" width={150} height={35} className="h-auto w-[126px] object-contain sm:w-[140px]" priority /></Link>
        <nav className="hidden justify-self-center rounded-full border border-black/[0.06] bg-white/90 p-1 shadow-[0_8px_25px_rgba(23,21,33,0.06)] md:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={`rounded-full px-4 py-2 text-xs font-semibold transition lg:px-5 ${isActive(link.href) ? 'bg-foreground text-white shadow-sm' : 'text-muted hover:bg-[#f4f3f6] hover:text-foreground'}`}>{link.label}</Link>)}
        </nav>
        <Link href="/jobs" className="hidden justify-self-end rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2">Job Boards <ArrowUpRight className="h-4 w-4" /></Link>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation menu" className="justify-self-end rounded-full border border-black/[0.06] bg-white p-2.5 text-foreground shadow-sm md:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/roles', label: 'Roles' },
    { href: '/skill-check', label: 'Skill Check' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/get-hired', label: 'Get Hired' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/kraft-logo.png"
              alt="KRAFT"
              width={180}
              height={42}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu - Pill Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-white rounded-full border border-border px-1 py-1 shadow-sm">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-100 rounded-full transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
          >
            Job Boards
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-2xl border border-border p-4 shadow-lg">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-3 text-foreground font-medium hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/jobs"
              className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-foreground text-background font-medium rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Job Boards
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
      {open && <div className="mb-4 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-xl md:hidden"><nav className="grid gap-1" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? 'page' : undefined} className={`rounded-xl px-4 py-3 text-sm font-semibold ${isActive(link.href) ? 'bg-foreground text-white' : 'text-muted hover:bg-[#f5f4f7] hover:text-foreground'}`}>{link.label}</Link>)}</nav><Link href="/jobs" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white">Job Boards <ArrowUpRight className="h-4 w-4" /></Link></div>}
    </Container>
  </header>;
}
