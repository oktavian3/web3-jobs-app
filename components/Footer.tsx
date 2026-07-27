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
        <div className="footer-shell">
          {/* Top padding clears the 150px fade band in .footer-shell with margin
              to spare, so white text never lands on the light part of it. */}
          <div className="relative z-10 px-5 pt-[11rem] sm:px-9 sm:pt-[12rem]">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
              {/* Brand block */}
              <div>
                <Link href="/" className="inline-flex" aria-label="KRAFT home">
                  <Image
                    src="/images/kraft-logo.png"
                    alt="KRAFT"
                    width={150}
                    height={35}
                    className="h-auto w-[136px] object-contain brightness-0 invert"
                  />
                </Link>
                <p className="mt-5 max-w-sm text-sm leading-6 text-blue-50">
                  Know the work before you chase the title. KRAFT helps you understand roles, build proof, and apply with context.
                </p>
                <a
                  href="https://t.me/satyaxbt"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="KRAFT on Telegram"
                  className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/12 text-white transition hover:-translate-y-0.5 hover:bg-white/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Send className="h-4 w-4" />
                </a>
              </div>

              {/* Link columns */}
              <div className="grid gap-8 sm:grid-cols-3">
                {columns.map((column) => (
                  <div key={column.title} className="border-t border-white/20 pt-5 sm:border-t-0 sm:pt-0">
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">{column.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm font-bold text-blue-50 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-2 border-t border-white/20 pt-5 text-xs font-bold text-blue-50 sm:flex-row sm:items-center sm:justify-between">
              <span>KRAFT</span>
              <span>All rights reserved.</span>
            </div>
          </div>

          {/* Oversized wordmark, cropped along the bottom edge. */}
          <div className="relative z-10 mt-6 overflow-hidden px-4 sm:px-8">
            <span className="footer-wordmark -mb-[0.14em] block" aria-hidden="true">
              KRAFT
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
