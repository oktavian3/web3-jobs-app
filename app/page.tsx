'use client';

import Link from 'next/link';
import { ChevronRight, Sparkles, Target, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f7f3] via-[#fef9e7] to-[#f8f7f3]">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-[#f4d03f]/20 rounded-full border border-[#f4d03f]">
            <span className="text-sm font-semibold text-[#1a237e]">🚀 Your Guide to Web3 Careers</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#1a237e]">
            Build Your Future in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4d03f] via-[#f5a8d8] to-[#d8b5e8]">Web3</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover the most in-demand roles, learn from industry experts, and start your journey into decentralized finance, blockchain development, and crypto innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/roles" className="px-8 py-3 bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#1a237e] font-semibold rounded-lg hover:shadow-lg transition-all">
              Explore 25+ Roles <ChevronRight className="inline w-5 h-5 ml-2" />
            </Link>
            <Link href="/glossary" className="px-8 py-3 bg-white border-2 border-[#d8b5e8] text-[#1a237e] font-semibold rounded-lg hover:bg-[#d8b5e8]/10 transition-all">
              Learn Web3 Basics
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-20">
            <div className="p-4 bg-white rounded-lg border border-[#f4d03f]">
              <div className="text-3xl font-bold text-[#f4d03f]">25+</div>
              <div className="text-sm text-gray-600">Job Roles</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-[#f5a8d8]">
              <div className="text-3xl font-bold text-[#f5a8d8]">50+</div>
              <div className="text-sm text-gray-600">Glossary Terms</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-[#d8b5e8]">
              <div className="text-3xl font-bold text-[#d8b5e8]">12</div>
              <div className="text-sm text-gray-600">Job Boards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#1a237e]">
            Everything You Need to Succeed
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gradient-to-br from-[#f4d03f]/10 to-transparent rounded-lg border border-[#f4d03f]/30">
              <Target className="w-10 h-10 text-[#f4d03f] mb-4" />
              <h3 className="font-bold text-[#1a237e] mb-2">25+ Job Roles</h3>
              <p className="text-gray-600 text-sm">From blockchain developers to NFT artists, explore all Web3 careers with learning resources.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#f5a8d8]/10 to-transparent rounded-lg border border-[#f5a8d8]/30">
              <Sparkles className="w-10 h-10 text-[#f5a8d8] mb-4" />
              <h3 className="font-bold text-[#1a237e] mb-2">Web3 Glossary</h3>
              <p className="text-gray-600 text-sm">Master 50+ essential terms from blockchain basics to advanced DeFi concepts.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#d8b5e8]/10 to-transparent rounded-lg border border-[#d8b5e8]/30">
              <Zap className="w-10 h-10 text-[#d8b5e8] mb-4" />
              <h3 className="font-bold text-[#1a237e] mb-2">Landing Tips</h3>
              <p className="text-gray-600 text-sm">Proven strategies to build portfolios, network, and land your dream Web3 job.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1a237e]/10 to-transparent rounded-lg border border-[#1a237e]/30">
              <Users className="w-10 h-10 text-[#1a237e] mb-4" />
              <h3 className="font-bold text-[#1a237e] mb-2">Job Boards</h3>
              <p className="text-gray-600 text-sm">Access 12+ top job boards with thousands of active Web3 opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#f4d03f]/20 via-[#f5a8d8]/20 to-[#d8b5e8]/20 rounded-2xl p-12 border border-[#d8b5e8]/50 text-center">
          <h2 className="text-3xl font-bold text-[#1a237e] mb-4">Ready to Launch Your Web3 Career?</h2>
          <p className="text-gray-700 mb-8 text-lg">Start exploring roles, learning Web3 fundamentals, and connecting with opportunities today.</p>
          <Link href="/roles" className="inline-block px-8 py-3 bg-[#1a237e] text-white font-semibold rounded-lg hover:bg-[#1a237e]/90 transition-all">
            Browse All Roles
          </Link>
        </div>
      </section>
    </main>
  );
}
