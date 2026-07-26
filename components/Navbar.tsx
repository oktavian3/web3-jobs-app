"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/kraft/Primitives";

const navigationLinks = [
  { href: "/roles", label: "Roles" },
  { href: "/skill-check", label: "Skill Check" },
  { href: "/glossary", label: "Glossary" },
  { href: "/learn-web3", label: "Learn Web3" },
  { href: "/get-hired", label: "Get Hired" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/85 backdrop-blur-xl">
      <Container>
        <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[160px_1fr_160px]">
          <Link href="/" className="inline-flex w-fit items-center gap-2.5" aria-label="KRAFT home">
            <Image src="/kraft%20logo.png" alt="" width={40} height={40} className="h-9 w-9 object-contain sm:h-10 sm:w-10" priority />
            <span className="text-lg font-black tracking-[-0.03em] text-ink sm:text-xl">KRAFT</span>
          </Link>

          <nav className="hidden justify-self-center rounded-full border border-border bg-elevated p-1 shadow-soft md:flex" aria-label="Primary navigation">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-bold transition lg:px-4 ${
                  isActive(pathname, link.href) ? "bg-ink text-white" : "text-muted hover:bg-highlight hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
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

        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 md:hidden" aria-label="Small-screen navigation">
          {navigationLinks.map((link) => (
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
      </Container>
    </header>
  );
}
