"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import NavDropdown from "@/components/nav/NavDropdown";
import SearchDialog from "@/components/nav/SearchDialog";
import { LEARN, PRIMARY, SECONDARY, TOOLS, isActive, type NavItem } from "@/components/nav/links";

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-9 items-center rounded-full px-3 text-[14px] transition-colors ${
        active ? "border border-border bg-surface text-ink shadow-[0_1px_2px_rgba(17,19,24,0.06)]" : "text-muted hover:text-ink"
      }`}
    >
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  // ⌘K / Ctrl+K and "/" open search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const d = menuRef.current;
    if (!d) return;
    if (menuOpen && !d.open) d.showModal();
    if (!menuOpen && d.open) d.close();
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center gap-4 px-5 sm:px-6 lg:px-10">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2.5" aria-label="KRAFT home">
          <Image src="/kraft%20logo%20trans.png" alt="" width={32} height={32} className="h-7 w-7 object-contain" priority />
          <span className="text-[17px] font-semibold tracking-[-0.03em] text-ink">KRAFT</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {PRIMARY.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
          <NavDropdown label="Learn" items={LEARN} />
          <NavDropdown label="Tools" items={TOOLS} />
          {SECONDARY.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-[230px] items-center gap-2 rounded-full border border-border bg-surface pl-3 pr-2 text-[13.5px] text-muted transition-colors hover:border-border-strong lg:w-[260px]"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Search roles, terms, jobs</span>
            <span className="kbd ml-auto" aria-hidden="true">⌘K</span>
          </button>
          <Link href="/skill-check" className="btn-ink !h-9 !px-4 !text-[13.5px]">
            Find My Role
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button type="button" onClick={() => setSearchOpen(true)} className="grid h-11 w-11 place-items-center rounded-full text-ink" aria-label="Search">
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu sheet (native <dialog> = focus trap + Escape for free) */}
      <dialog
        ref={menuRef}
        onClose={() => setMenuOpen(false)}
        onClick={(e) => {
          if (e.target === menuRef.current) setMenuOpen(false);
        }}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-[min(88vw,380px)] max-w-none bg-transparent p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]"
      >
        <div className="sheet-panel flex h-full flex-col overflow-y-auto bg-canvas">
          <div className="flex h-[64px] items-center justify-between border-b border-border px-5">
            <span className="text-[17px] font-semibold tracking-[-0.03em]">KRAFT</span>
            <button type="button" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-full" aria-label="Close menu">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5 py-6">
            <ul className="space-y-1">
              {[...PRIMARY, ...SECONDARY].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex h-12 items-center rounded-[12px] px-3 text-[20px] font-medium tracking-[-0.02em] aria-[current=page]:bg-surface"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {[
              ["Learn", LEARN],
              ["Tools", TOOLS],
            ].map(([title, items]) => (
              <div key={title as string} className="mt-7">
                <div className="eyebrow px-3">{title as string}</div>
                <ul className="mt-2 grid grid-cols-2 gap-1">
                  {(items as NavItem[]).map((item) =>
                    item.soon ? (
                      <li key={item.label} className="flex min-h-11 flex-col justify-center rounded-[12px] px-3 py-2 text-muted">
                        <span className="text-[15px]">{item.label}</span>
                        <span className="text-[11px]">{item.description}</span>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          aria-current={isActive(pathname, item.href) ? "page" : undefined}
                          className="flex min-h-11 items-center rounded-[12px] px-3 py-2 text-[15px] text-ink aria-[current=page]:bg-highlight"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
          <div className="border-t border-border p-5">
            <Link href="/skill-check" className="btn-primary w-full">
              Find My Role
            </Link>
          </div>
        </div>
      </dialog>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
