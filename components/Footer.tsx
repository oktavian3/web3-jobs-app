import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { Container } from "@/components/kraft/Primitives";

const columns = [
  { title: "Explore", links: [{ href: "/roles", label: "Roles" }, { href: "/glossary", label: "Glossary" }, { href: "/learn-web3", label: "Learn Web3" }, { href: "/roadmaps", label: "Roadmaps" }, { href: "/faq", label: "FAQ" }] },
  { title: "Prepare", links: [{ href: "/skill-check", label: "Skill Check" }, { href: "/interview-prep", label: "Interview Prep" }, { href: "/portfolio", label: "Portfolio" }, { href: "/get-hired", label: "Get Hired" }, { href: "/job-boards", label: "Job Boards" }] },
  { title: "Trust", links: [{ href: "/about", label: "About" }, { href: "/methodology", label: "Methodology" }, { href: "/salary-methodology", label: "Salary Methodology" }, { href: "/privacy", label: "Privacy" }, { href: "/disclaimers", label: "Disclaimers" }] },
];

export default function Footer() {
  return (
    <footer className="bg-page px-3 pb-4">
      <Container>
        <div className="rounded-b-[28px] border-x border-b border-border bg-white px-5 py-10 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_2fr_1fr]">
            <div>
              <Link href="/" className="inline-flex" aria-label="KRAFT home">
                <Image src="/images/kraft-logo.png" alt="KRAFT" width={150} height={35} className="h-auto w-[132px] object-contain" />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
                Know the work before you chase the title. KRAFT helps you understand roles, build proof, and apply with context.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">{column.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm font-bold text-ink transition hover:text-blue-700">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">KRAFT</h3>
              <div className="mt-4 flex flex-col gap-3">
                <Link href="/about" className="text-sm font-bold text-ink transition hover:text-blue-700">
                  About
                </Link>
                <a href="https://t.me/satyaxbt" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-blue-700">
                  <Send className="h-4 w-4" /> Telegram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-soft px-4 py-3 text-xs text-muted sm:flex sm:items-center sm:justify-between">
            <span>KRAFT</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
