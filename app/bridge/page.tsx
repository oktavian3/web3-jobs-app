'use client';

import { useState, useEffect } from 'react';
import { Rocket, Users, BookOpen, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface GuideData {
  landingTips: {
    title: string;
    intro: string;
    tips: Array<{
      title: string;
      description: string;
    }>;
  };
  hiringProcess: {
    title: string;
    intro: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
    conclusion: string;
  };
}

export default function BridgePage() {
  const [guides, setGuides] = useState<GuideData | null>(null);
  const [activeTab, setActiveTab] = useState<'landing' | 'hiring'>('landing');

  useEffect(() => {
    fetch('/data/guides.json')
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

  if (!guides) return <div className="text-center py-20 text-[#e8e8f0]">Loading...</div>;

  const currentGuide = activeTab === 'landing' ? guides.landingTips : guides.hiringProcess;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] text-[#e8e8f0] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e8e8f0] mb-4">Your Path to a Web3 Job</h1>
          <p className="text-[#d0d0d8] text-lg">Learn the strategies that actually work and navigate the hiring process with confidence.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 bg-[#1a1a2e] rounded-lg p-2 border border-[#2a2a3e]">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'landing'
                ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                : 'text-[#e8e8f0] hover:bg-[#0f0f1a]'
            }`}
          >
            <Rocket className="w-5 h-5 inline mr-2" />
            Landing Tips
          </button>
          <button
            onClick={() => setActiveTab('hiring')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'hiring'
                ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                : 'text-[#e8e8f0] hover:bg-[#0f0f1a]'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Hiring Process
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-[#e8e8f0] mb-4">{currentGuide.title}</h2>
            <p className="text-[#d0d0d8] text-lg mb-8">{currentGuide.intro}</p>

            <div className="space-y-6">
              {activeTab === 'landing'
                ? guides.landingTips.tips.map((tip, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-[#f4d03f]/10 to-[#f5a8d8]/10 rounded-lg border-l-4 border-[#f4d03f] hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f4d03f] to-[#f5a8d8] flex items-center justify-center text-[#0f0f1a] font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">{tip.title}</h3>
                          <p className="text-[#d0d0d8] leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : guides.hiringProcess.steps.map((step, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-r from-[#d8b5e8]/10 to-[#f5a8d8]/10 rounded-lg border-l-4 border-[#d8b5e8] hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b5e8] to-[#f5a8d8] flex items-center justify-center text-[#0f0f1a] font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">{step.title}</h3>
                          <p className="text-[#d0d0d8] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {activeTab === 'hiring' && (
              <div className="mt-12 p-6 bg-[#d8b5e8]/10 rounded-lg border border-[#d8b5e8]">
                <p className="text-[#d0d0d8] text-center font-semibold">
                  {guides.hiringProcess.conclusion}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e] rounded-lg p-8 border border-[#f4d03f]/30">
            <h3 className="text-lg font-bold text-[#e8e8f0] mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#f4d03f]" />
              Pro Tips for Success
            </h3>
            <ul className="space-y-3 text-[#d0d0d8] text-sm">
              <li>✓ Build in public and share your work on Twitter/X</li>
              <li>✓ Contribute to open-source projects on GitHub</li>
              <li>✓ Network actively in Discord/Twitter communities</li>
              <li>✓ Post consistently about Web3 topics</li>
              <li>✓ Participate in bounties and hackathons</li>
            </ul>
          </div>

          <div className="bg-[#1a1a2e] rounded-lg p-8 border border-[#f5a8d8]/30">
            <h3 className="text-lg font-bold text-[#e8e8f0] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#f5a8d8]" />
              Red Flags to Avoid
            </h3>
            <ul className="space-y-3 text-[#d0d0d8] text-sm">
              <li>❌ Jobs asking for payment upfront</li>
              <li>❌ Requests to share seed phrases or private keys</li>
              <li>❌ Unrealistic earnings promises with minimal work</li>
              <li>❌ No official website or social media presence</li>
              <li>❌ Pressure to move fast without due diligence</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] rounded-lg p-8 text-center text-[#0f0f1a]">
          <h3 className="text-2xl font-bold mb-4">Ready to Land Your Web3 Job?</h3>
          <p className="mb-6 text-lg">Check out our job boards and role guides to find your perfect opportunity.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/roles" className="px-6 py-2 bg-[#0f0f1a] text-[#f4d03f] font-semibold rounded-lg hover:bg-[#1a1a2e] transition-all">
              Explore Roles
            </Link>
            <Link href="/resources" className="px-6 py-2 bg-[#0f0f1a]/30 hover:bg-[#0f0f1a]/50 font-semibold rounded-lg transition-all border border-[#0f0f1a]">
              View Job Boards
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
