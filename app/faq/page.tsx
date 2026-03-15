'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, ChevronDown, Lightbulb } from 'lucide-react';

interface Disclaimer {
  title: string;
  description: string;
}

interface DisclaimerData {
  warnings: Disclaimer[];
  redFlags: string[];
  conclusion: string;
}

export default function FAQPage() {
  const [disclaimers, setDisclaimers] = useState<DisclaimerData | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  useEffect(() => {
    fetch('/data/disclaimers.json')
      .then(res => res.json())
      .then(data => setDisclaimers(data));
  }, []);

  if (!disclaimers) return <div className="text-center py-20 text-[#e8e8f0]">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] text-[#e8e8f0] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-[#f5a8d8]" />
            <h1 className="text-4xl font-bold text-[#e8e8f0]">Important Web3 Disclaimers</h1>
          </div>
          <p className="text-[#d0d0d8] text-lg">Before you start your Web3 career journey, understand the realities and challenges of the industry.</p>
        </div>

        {/* Red Flags Section */}
        <div className="bg-[#1a1a2e] rounded-lg p-8 mb-12 border-2 border-[#f5a8d8]">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-[#f5a8d8]" />
            <h2 className="text-2xl font-bold text-[#e8e8f0]">🚨 Red Flags - Job Scams!</h2>
          </div>
          <div className="space-y-4">
            {disclaimers.redFlags.map((flag, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-[#f5a8d8]/10 rounded-lg border-l-4 border-[#f5a8d8]">
                <span className="text-2xl">❌</span>
                <p className="text-[#d0d0d8] text-base">{flag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings Accordion */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] overflow-hidden mb-12">
          <h2 className="text-2xl font-bold text-[#e8e8f0] p-8 border-b border-[#2a2a3e]">⚠️ Industry Challenges</h2>
          <div className="divide-y divide-[#2a2a3e]">
            {disclaimers.warnings.map((warning, idx) => (
              <div key={idx} className="border-b border-[#2a2a3e] last:border-b-0">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#0f0f1a] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#e8e8f0] text-left">{warning.title}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d8b5e8] transition-transform ${
                      expandedIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedIndex === idx && (
                  <div className="px-6 pb-6 text-[#d0d0d8] bg-[#0f0f1a]">
                    {warning.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-[#f4d03f]/20 via-[#f5a8d8]/20 to-[#d8b5e8]/20 rounded-lg p-8 border-2 border-[#d8b5e8] mb-12">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-[#f4d03f] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">💡 Key Takeaway</h3>
              <p className="text-[#d0d0d8] leading-relaxed">{disclaimers.conclusion}</p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e]">
          <h3 className="text-2xl font-bold text-[#e8e8f0] mb-6">✅ How to Protect Yourself</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#f4d03f]/10 rounded-lg border-l-4 border-[#f4d03f]">
              <h4 className="font-bold text-[#e8e8f0] mb-2">Do Your Research</h4>
              <p className="text-[#d0d0d8] text-sm">Check on-chain activity, company websites, LinkedIn profiles, and reviews on Glassdoor or X (formerly Twitter).</p>
            </div>
            <div className="p-4 bg-[#f5a8d8]/10 rounded-lg border-l-4 border-[#f5a8d8]">
              <h4 className="font-bold text-[#e8e8f0] mb-2">Verify Contacts</h4>
              <p className="text-[#d0d0d8] text-sm">Always verify through official company channels. Use reverse-image searches for photos and avoid new accounts.</p>
            </div>
            <div className="p-4 bg-[#d8b5e8]/10 rounded-lg border-l-4 border-[#d8b5e8]">
              <h4 className="font-bold text-[#e8e8f0] mb-2">Never Share Secrets</h4>
              <p className="text-[#d0d0d8] text-sm">Legitimate jobs never ask for seed phrases, private keys, or upfront payments. These are instant red flags.</p>
            </div>
            <div className="p-4 bg-[#f4d03f]/10 rounded-lg border-l-4 border-[#f4d03f]">
              <h4 className="font-bold text-[#e8e8f0] mb-2">Build Relationships</h4>
              <p className="text-[#d0d0d8] text-sm">Get to know people in the community before accepting opportunities. Real relationships build trust.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
