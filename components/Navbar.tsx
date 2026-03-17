'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Plus, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/roles', label: 'Roles', hasDropdown: true },
    { href: '/glossary', label: 'Glossary', hasDropdown: true },
    { href: '/bridge', label: 'Get Hired' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/kraft-logo.png"
              alt="KRAFT"
              width={120}
              height={40}
              className="h-8 w-auto"
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
                  {link.hasDropdown && <Plus className="w-3 h-3" />}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/resources"
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
                {link.hasDropdown && <Plus className="w-4 h-4 text-muted" />}
              </Link>
            ))}
            <Link
              href="/resources"
              className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-foreground text-background font-medium rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Job Boards
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
