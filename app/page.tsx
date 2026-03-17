'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Briefcase, Code, Users } from 'lucide-react';

// Floating card components
function UserCard({ 
  name, 
  date, 
  week, 
  position, 
  variant = 'light' 
}: { 
  name: string; 
  date: string; 
  week: string; 
  position: string; 
  variant?: 'light' | 'dark';
}) {
  const isLight = variant === 'light';
  return (
    <div className={`absolute ${position} rounded-2xl px-4 py-3 shadow-lg border ${
      isLight 
        ? 'bg-white border-border' 
        : 'bg-foreground text-background border-foreground'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${isLight ? 'bg-purple-100' : 'bg-gray-700'} flex items-center justify-center`}>
          <Users className={`w-5 h-5 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
        </div>
        <div>
          <p className={`font-semibold text-sm ${isLight ? 'text-foreground' : 'text-background'}`}>{name}</p>
          <p className={`text-xs ${isLight ? 'text-muted' : 'text-gray-400'}`}>Started {date}</p>
        </div>
      </div>
      <p className={`text-xs mt-2 ${isLight ? 'text-muted' : 'text-gray-400'}`}>{week}</p>
    </div>
  );
}

function AppointmentCard({ position }: { position: string }) {
  return (
    <div className={`absolute ${position} bg-white rounded-2xl p-4 shadow-lg border border-purple-200 rotate-6`}>
      <p className="text-xs text-muted mb-1">Learn about</p>
      <p className="font-semibold text-foreground text-sm">Blockchain Dev</p>
      <div className="flex gap-2 mt-2">
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Solidity</span>
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Smart Contracts</span>
      </div>
      <div className="flex items-center gap-2 mt-3 text-purple-600">
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-medium">Start Today</span>
      </div>
    </div>
  );
}

function ExpertCard({ name, role, position, variant = 'dark' }: { name: string; role: string; position: string; variant?: 'dark' | 'purple' }) {
  return (
    <div className={`absolute ${position} rounded-full px-4 py-2 flex items-center gap-3 shadow-lg ${
      variant === 'dark' ? 'bg-foreground' : 'bg-purple-500'
    }`}>
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
        <Briefcase className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-xs text-gray-300">{role}</p>
      </div>
    </div>
  );
}

// Press logos component
function PressLogos() {
  const logos = [
    { name: 'CoinDesk', style: 'font-serif font-bold' },
    { name: 'The Block', style: 'font-serif italic' },
    { name: 'Decrypt', style: 'font-bold tracking-wider' },
    { name: 'CryptoSlate', style: 'font-mono' },
    { name: 'DeFi Pulse', style: 'font-bold' },
    { name: 'Messari', style: 'font-semibold tracking-wide' },
  ];

  return (
    <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-60">
      {logos.map((logo) => (
        <span key={logo.name} className={`text-foreground text-sm md:text-base ${logo.style}`}>
          {logo.name}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Grid background - fixed position, stays behind all content */}
      <div className="grid-background opacity-50" />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 pt-32 overflow-hidden">
        
        <div className="max-w-5xl mx-auto text-center relative page-content">
          {/* Floating UI Elements */}
          <UserCard 
            name="Alex Chen" 
            date="Wed 12 Mar, 2026" 
            week="Week 4, Day 2"
            position="left-0 md:-left-8 top-12 md:top-24 -rotate-3"
            variant="light"
          />
          
          <UserCard 
            name="Sarah Kim" 
            date="Mon 10 Mar, 2026" 
            week="Week 6, Day 5"
            position="right-0 md:-right-4 top-20 md:top-32 rotate-2"
            variant="light"
          />
          
          <AppointmentCard position="left-1/2 -translate-x-1/2 top-48 md:top-56" />
          
          <ExpertCard 
            name="DeFi Expert"
            role="Advisor"
            position="left-4 md:left-16 bottom-48 md:bottom-64"
            variant="dark"
          />
          
          <ExpertCard 
            name="Smart Contract Dev"
            role="Mentor"
            position="right-4 md:right-8 bottom-40 md:bottom-56"
            variant="purple"
          />

          {/* Decorative cursor icons */}
          <div className="absolute left-1/4 top-1/3 hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-400">
              <path d="M5 3L19 12L12 13L9 20L5 3Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute right-1/4 bottom-1/3 hidden md:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
              <path d="M5 3L19 12L12 13L9 20L5 3Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Main Content */}
          <div className="pt-32 md:pt-48 pb-8">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-medium mb-6 text-foreground leading-tight text-balance">
              Career Matters.
              <br />
              <span className="text-muted">Empowering You</span>
              <br />
              For Web3 & Crypto
              <br />
              To Build Tomorrow
            </h1>
            
            <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
              Educational resources for Web3 careers.
              <br />
              Empowering the curious to build the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link 
                href="/glossary" 
                className="px-8 py-3.5 bg-white border border-border text-foreground font-medium rounded-full hover:bg-gray-50 transition-all shadow-sm"
              >
                Learn More
              </Link>
              <Link 
                href="/roles" 
                className="px-8 py-3.5 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Press Logos Bar */}
        <div className="max-w-5xl mx-auto pt-8 pb-4 border-t border-border relative z-10">
          <PressLogos />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Comprehensive resources to help you navigate and succeed in the Web3 ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-background rounded-3xl border border-border hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">8+ Roles</h3>
              <p className="text-muted text-sm leading-relaxed">
                From blockchain developers to NFT artists, detailed profiles with interview questions.
              </p>
            </div>

            <div className="p-8 bg-background rounded-3xl border border-border hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Web3 Glossary</h3>
              <p className="text-muted text-sm leading-relaxed">
                Master 50+ essential terms from blockchain basics to advanced DeFi concepts.
              </p>
            </div>

            <div className="p-8 bg-background rounded-3xl border border-border hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Get Hired</h3>
              <p className="text-muted text-sm leading-relaxed">
                Proven strategies to build portfolios, network, and land your dream Web3 job.
              </p>
            </div>

            <div className="p-8 bg-background rounded-3xl border border-border hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Job Boards</h3>
              <p className="text-muted text-sm leading-relaxed">
                Access 12+ top job boards with thousands of active Web3 opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-8 bg-white rounded-3xl border border-border shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all">
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-medium text-purple-600 mb-2">8+</div>
              <div className="text-muted text-sm">Role Profiles</div>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl border border-border shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all">
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-medium text-blue-600 mb-2">50+</div>
              <div className="text-muted text-sm">Glossary Terms</div>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl border border-border shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all">
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-medium text-purple-600 mb-2">12</div>
              <div className="text-muted text-sm">Job Boards</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-6">
            Ready to Launch Your Web3 Career?
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Start exploring roles, learning Web3 fundamentals, and connecting with opportunities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/glossary" 
              className="px-8 py-3.5 bg-white border border-border text-foreground font-medium rounded-full hover:bg-gray-50 transition-all shadow-sm"
            >
              Learn More
            </Link>
            <Link 
              href="/roles" 
              className="px-8 py-3.5 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all flex items-center justify-center gap-2"
            >
              Browse All Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
