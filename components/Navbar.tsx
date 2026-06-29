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
    <header className="sticky top-0 z-50 border-b border-white/60 bg-page/80 backdrop-blur-xl">
      <Container>
        <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[160px_1fr_160px]">
          <Link href="/" className="inline-flex w-fit items-center" aria-label="KRAFT home">
            <Image src="/images/kraft-logo.png" alt="KRAFT" width={150} height={35} className="h-auto w-[128px] object-contain" priority />
          </Link>

          <nav className="hidden justify-self-center rounded-full border border-border bg-white p-1 shadow-soft md:flex" aria-label="Primary navigation">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-bold transition lg:px-4 ${
                  isActive(pathname, link.href) ? "bg-ink text-white" : "text-muted hover:bg-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/job-boards" className="hidden justify-self-end rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2">
            Job Boards
            <ArrowUpRight className="h-4 w-4" />
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
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition ${
                isActive(pathname, link.href) ? "bg-ink text-white" : "bg-white text-muted shadow-soft hover:bg-soft hover:text-ink"
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
