import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";

const columns = [
  { title: "Explore", links: [{ href: "/roles", label: "Roles" }, { href: "/glossary", label: "Glossary" }, { href: "/learn-web3", label: "Learn Web3" }, { href: "/roadmaps", label: "Roadmaps" }, { href: "/faq", label: "FAQ" }] },
  { title: "Prepare", links: [{ href: "/skill-check", label: "Skill Check" }, { href: "/interview-prep", label: "Interview Prep" }, { href: "/portfolio", label: "Portfolio" }, { href: "/get-hired", label: "Get Hired" }, { href: "/jobs", label: "Job Boards" }] },
  { title: "Trust", links: [{ href: "/about", label: "About" }, { href: "/methodology", label: "Methodology" }, { href: "/salary-methodology", label: "Salary Methodology" }, { href: "/privacy", label: "Privacy" }, { href: "/disclaimers", label: "Disclaimers" }] },
];

export default function Footer() {
  return (
    <footer className="mt-6 bg-navy text-on-navy">
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="KRAFT home">
              <Image src="/kraft%20logo%20trans.png" alt="" width={32} height={32} className="h-8 w-8 object-contain invert" />
              <span className="text-[18px] font-semibold tracking-[-0.03em] text-white">KRAFT</span>
            </Link>
            <p className="mt-5 max-w-[300px] text-[14.5px] leading-[1.6] text-on-navy/75">
              Know the work before you chase the title. KRAFT helps you understand roles, build proof, and apply with context.
            </p>
            <a
              href="https://t.me/satyaxbt"
              target="_blank"
              rel="noreferrer"
              aria-label="KRAFT on Telegram"
              className="mt-6 inline-grid h-10 w-10 place-items-center rounded-full border border-white/15 text-on-navy/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow !text-on-navy/60">{column.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-on-navy/85 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex justify-between border-t border-white/10 pt-6 font-mono text-[12px] text-on-navy/60">
          <span>KRAFT</span>
          <span>All rights reserved.</span>
        </div>
      </div>
      <div className="h-[16vw] max-h-[200px] select-none overflow-hidden" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1280px] bg-gradient-to-b from-white/[.14] to-transparent bg-clip-text px-5 text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent sm:px-6 lg:px-10 lg:text-[280px]">
          KRAFT
        </div>
      </div>
    </footer>
  );
}
