'use client';

import { useState, useEffect } from 'react';
import { Rocket, Users, BookOpen, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
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

  if (!guides) return (
    <div className="page-wrapper">
      <div className="page-content flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-50" />
      
      <div className="page-content pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-6">
              <Rocket className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-muted">Career Guide</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              Your Path to a Web3 Job
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Learn the strategies that actually work and navigate the hiring process with confidence.
            </p>
          </div>

          {/* Floating decorative elements */}
          <div className="hidden lg:block">
            <div className="absolute top-40 left-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[-5deg]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Application Sent</p>
                  <p className="text-[10px] text-muted">Smart Contract Dev</p>
                </div>
              </div>
            </div>
            <div className="absolute top-56 right-8 bg-purple-500 text-white rounded-2xl shadow-lg p-4 rotate-[4deg]">
              <p className="text-xs font-semibold">Interview Scheduled</p>
              <p className="text-[10px] opacity-80">Tomorrow, 2:00 PM</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-12 bg-white rounded-full p-1.5 border border-border shadow-sm max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('landing')}
              className={`flex-1 py-3 px-6 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'landing'
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Rocket className="w-4 h-4" />
              Landing Tips
            </button>
            <button
              onClick={() => setActiveTab('hiring')}
              className={`flex-1 py-3 px-6 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'hiring'
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              Hiring Process
            </button>
          </div>

          {/* Timeline Content */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-6">
              {activeTab === 'landing'
                ? guides.landingTips.tips.map((tip, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      {/* Timeline dot */}
                      <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                        {idx + 1}
                      </div>
                      
                      {/* Content card */}
                      <div className="flex-1 bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300">
                        <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mb-4">
                          {idx + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{tip.title}</h3>
                        <p className="text-muted leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  ))
                : guides.hiringProcess.steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      {/* Timeline dot */}
                      <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                        {idx + 1}
                      </div>
                      
                      {/* Content card */}
                      <div className="flex-1 bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mb-4">
                          {idx + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
            </div>

            {activeTab === 'hiring' && (
              <div className="mt-8 ml-0 md:ml-18 bg-purple-50 rounded-2xl p-6 border border-purple-200">
                <p className="text-purple-700 text-center font-medium">
                  {guides.hiringProcess.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Key Insights */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:shadow-green-500/5 transition-all">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                Pro Tips for Success
              </h3>
              <ul className="space-y-3 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Build in public and share your work on Twitter/X
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Contribute to open-source projects on GitHub
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Network actively in Discord/Twitter communities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Post consistently about Web3 topics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Participate in bounties and hackathons
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:shadow-red-500/5 transition-all">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                Red Flags to Avoid
              </h3>
              <ul className="space-y-3 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  Jobs asking for payment upfront
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  Requests to share seed phrases or private keys
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  Unrealistic earnings promises with minimal work
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  No official website or social media presence
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  Pressure to move fast without due diligence
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-foreground rounded-2xl p-8 text-center text-background">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-4">
              Ready to Land Your Web3 Job?
            </h3>
            <p className="mb-6 text-background/80 max-w-md mx-auto">
              Check out our job boards and role guides to find your perfect opportunity.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/roles" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground font-medium rounded-full hover:bg-gray-100 transition-all"
              >
                Explore Roles
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/resources" 
                className="px-6 py-3 bg-white/10 text-background font-medium rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                View Job Boards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
