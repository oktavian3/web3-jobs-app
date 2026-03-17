'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/roles', label: 'Roles' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/bridge', label: 'Get Hired' },
    { href: '/resources', label: 'Job Boards' },
    { href: '/disclaimers', label: 'Disclaimers' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e0ddd8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <Image 
              src="/kraft-logo.png" 
              height={36} 
              width={120}
              alt="KRAFT"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1a237e] font-semibold hover:text-[#f4d03f] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#f4d03f]/10 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#1a237e]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1a237e]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-[#1a237e] font-semibold hover:bg-[#f4d03f]/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
