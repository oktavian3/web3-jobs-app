'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Container } from '@/components/landing/Primitives';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/roles', label: 'Roles' },
  { href: '/skill-check', label: 'Skill Check' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/get-hired', label: 'Get Hired' },
] as const;

function isNavigationLinkActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.05] bg-[#f7f7f8]/85 backdrop-blur-xl">
      <Container>
        <div className="grid h-[76px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[190px_1fr_190px]">
          <Link href="/" className="inline-flex w-fit items-center" aria-label="KRAFT home">
            <Image
              src="/images/kraft-logo.png"
              alt="KRAFT"
              width={150}
              height={35}
              className="h-auto w-[126px] object-contain sm:w-[140px]"
              priority
            />
          </Link>

          <nav
            className="hidden justify-self-center rounded-full border border-black/[0.06] bg-white/90 p-1 shadow-[0_8px_25px_rgba(23,21,33,0.06)] md:flex"
            aria-label="Primary navigation"
          >
            {navigationLinks.map((link) => {
              const isActive = isNavigationLinkActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition lg:px-5 ${
                    isActive
                      ? 'bg-foreground text-white shadow-sm'
                      : 'text-muted hover:bg-[#f4f3f6] hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/jobs"
            className="hidden justify-self-end rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2"
          >
            Job Boards
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            className="justify-self-end rounded-full border border-black/[0.06] bg-white p-2.5 text-foreground shadow-sm md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="mb-4 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navigationLinks.map((link) => {
                const isActive = isNavigationLinkActive(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive
                        ? 'bg-foreground text-white'
                        : 'text-muted hover:bg-[#f5f4f7] hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/jobs"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Job Boards
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
