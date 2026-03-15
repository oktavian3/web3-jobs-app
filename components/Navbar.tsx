"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-[#2a2a2a] bg-[#0f0f0f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#a855f7] to-[#10b981] rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">W3</span>
            </div>
            <span className="text-lg font-bold">Web3 Jobs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/roles" className="hover:text-[#a855f7] transition">
              Roles
            </Link>
            <Link href="/bridge" className="hover:text-[#a855f7] transition">
              Web2 → Web3
            </Link>
            <Link href="/resources" className="hover:text-[#a855f7] transition">
              Resources
            </Link>
            <Link href="/glossary" className="hover:text-[#a855f7] transition">
              Glossary
            </Link>
            <Link href="/faq" className="hover:text-[#a855f7] transition">
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-[#1a1a1a]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/roles" className="hover:text-[#a855f7] transition">
              Roles
            </Link>
            <Link href="/bridge" className="hover:text-[#a855f7] transition">
              Web2 → Web3
            </Link>
            <Link href="/resources" className="hover:text-[#a855f7] transition">
              Resources
            </Link>
            <Link href="/glossary" className="hover:text-[#a855f7] transition">
              Glossary
            </Link>
            <Link href="/faq" className="hover:text-[#a855f7] transition">
              FAQ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
