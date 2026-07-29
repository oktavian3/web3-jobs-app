"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/kraft/Primitives";
import ToolsDropdown from "@/components/nav/ToolsDropdown";

const primaryLinks = [
  { href: "/roles", label: "Roles" },
] as const;

const secondaryLinks = [
  { href: "/glossary", label: "Glossary" },
  { href: "/learn-web3", label: "Learn Web3" },
  { href: "/get-hired", label: "Get Hired" },
] as const;

const TOOLS = [
  { href: "/skill-check", label: "Skill Check" },
  { href: "/cv-maker", label: "CV Maker" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isToolRoute(pathname: string) {
  return TOOLS.some((tool) => isActive(pathname, tool.href));
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  return (
    <Link
      href={href}
      aria-current={isActive(pathname, href) ? "page" : undefined}
      className={`rounded-full px-3 py-2 text-sm font-bold transition duration-200 lg:px-4 ${
        isActive(pathname, href) ? "bg-ink text-white shadow-[0_6px_16px_rgba(17,19,24,0.22)]" : "text-muted hover:bg-highlight hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  // Route change closes the mobile Tools accordion too — adjusted during
  // render (not in an effect) per React's guidance for resetting state when a
  // value changes. The desktop dropdown applies the same pattern internally.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileToolsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/80 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_8px_24px_rgba(17,19,24,0.04)] backdrop-blur-xl backdrop-saturate-150">
      <Container>
        <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[160px_1fr_160px]">
          <Link href="/" className="inline-flex w-fit items-center gap-2.5" aria-label="KRAFT home">
            <Image src="/images/kraft-mark.png" alt="" width={330} height={358} className="h-9 w-auto object-contain" priority />
            <span className="text-xl font-extrabold tracking-tight text-ink">KRAFT</span>
          </Link>

          <nav className="hidden justify-self-center items-center gap-1 rounded-full border border-border bg-elevated p-1 shadow-soft md:flex" aria-label="Primary navigation">
            {primaryLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
            <ToolsDropdown />
            {secondaryLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
            ))}
          </nav>

          <Link href="/job-boards" className="hidden justify-self-end rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2">
            Job Boards
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link href="/job-boards" className="inline-flex justify-self-end rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-soft md:hidden">
            Jobs
          </Link>
        </div>

        <div className="md:hidden">
          <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2" aria-label="Small-screen navigation">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive(pathname, link.href) ? "bg-ink text-white" : "border border-border bg-elevated text-muted shadow-soft hover:bg-highlight hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setMobileToolsOpen((v) => !v)}
              aria-expanded={mobileToolsOpen}
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isToolRoute(pathname) ? "bg-ink text-white" : "border border-border bg-elevated text-muted shadow-soft hover:bg-highlight hover:text-ink"
              }`}
            >
              Tools
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive(pathname, link.href) ? "bg-ink text-white" : "border border-border bg-elevated text-muted shadow-soft hover:bg-highlight hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Accordion reveal for the two Tools items — this navbar has no
              hamburger menu (mobile nav is the horizontal pill strip above),
              so "Tools" expands inline beneath it instead of inside a drawer. */}
          {mobileToolsOpen && (
            <div className="-mx-4 grid grid-cols-2 gap-2 px-4 pb-4" role="menu" aria-label="Tools">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  role="menuitem"
                  className={`rounded-2xl border px-3 py-2.5 text-center text-xs font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isActive(pathname, tool.href) ? "border-blue-600 bg-highlight text-blue-700" : "border-border bg-elevated text-ink hover:bg-highlight"
                  }`}
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
