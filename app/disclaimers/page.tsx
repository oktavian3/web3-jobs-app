'use client';

import { useEffect, useState } from 'react';

const DisclaimersPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const warnings = [
    {
      title: 'Fast-Paced and Volatile Environment',
      description: 'Web3 evolves extremely quickly. New technologies, protocols, and trends can emerge or fade within weeks. This pace demands constant upskilling, and what you learn today might be outdated tomorrow. Market cycles (bull runs and crypto winters) lead to boom-and-bust job markets, with sudden layoffs during downturns.',
    },
    {
      title: 'Timezone and Remote Work Challenges',
      description: 'Most Web3 teams are distributed globally, often favoring US, European, or Asian timezones (e.g., EST or UTC). This can mean odd hours for meetings or on-call duties, like 2 AM calls for someone in Indonesia. While remote work is the norm, it often blurs work-life boundaries, leading to exhaustion.',
    },
    {
      title: 'Salary and Compensation Realities',
      description: 'Salaries can be lucrative, especially in high-level positions (e.g., senior developers or auditors earning $150k–$400k+ annually, often with bonuses in tokens). However, entry-level roles might start at $60k–$120k, and pay is frequently in volatile crypto, which can plummet in value. Token grants or equity sound appealing but often vest over years and could become worthless if the project fails or gets rugged.',
    },
    {
      title: 'Burnout and Mental Health Risks',
      description: 'The high-stakes, 24/7 nature of crypto (e.g., monitoring markets, handling hacks) contributes to widespread burnout. Tight deadlines, hype-driven workloads, and the pressure to "ship fast" can lead to stress, anxiety, and health issues. Many in the space report unsustainable work cultures, especially in startups.',
    },
    {
      title: 'Scams and Security Risks',
      description: 'Web3 is rife with scams, rug pulls, and fraudulent projects. Always vet employers thoroughly (check on-chain activity, reviews on platforms like Glassdoor or X). Jobs promising "easy money" or requiring upfront payments are red flags. Personal security is key: phishing, wallet drains, and doxxing are common threats.',
    },
    {
      title: 'Regulatory and Legal Uncertainties',
      description: 'Laws around crypto vary by country (e.g., strict in the US/EU, evolving in Asia), potentially affecting job stability. Roles in DeFi or NFTs might face scrutiny, and some projects operate in gray areas, risking legal issues for employees.',
    },
    {
      title: 'Diversity and Inclusivity Issues',
      description: 'The field is still predominantly male and tech-heavy, with barriers for underrepresented groups. Networking often happens in exclusive communities (e.g., DAOs, conferences), which can feel gatekept.',
    },
    {
      title: 'Job Market Competition and Instability',
      description: 'High demand for skills like Solidity or auditing means fierce competition, but many roles are short-term or freelance. Projects fail frequently (90%+ of startups), leading to job insecurity. Focus on building a portfolio and network to mitigate this.',
    },
  ];

  const redFlags = [
    'Asking you to pay for job opportunities? That\'s a red flag.',
    'Pushing you to go live in video conferences before they\'ve even given you the job? Definitely suspicious.',
    'Requiring you to download unverified apps or software? Not worth the risk.',
    'No official website or social media presence? Proceed with caution.',
    'Making unrealistic promises of big earnings with little work? Trust your instincts, something\'s off.',
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px',
      }}></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
            Web3 Jobs: Disclaimer & Warnings
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Before diving into Web3 careers, understand the real challenges, risks, and market realities.
          </p>
        </div>

        {/* Warnings Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-2xl font-semibold text-slate-900">Key Warnings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {warnings.map((warning, idx) => (
              <div
                key={idx}
                className="group bg-white/60 backdrop-blur border border-slate-200/50 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {idx + 1}. {warning.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {warning.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🚩</span>
            <h2 className="text-2xl font-semibold text-slate-900">Red Flags to Watch Out For</h2>
          </div>

          <div className="bg-white/60 backdrop-blur border border-slate-200/50 rounded-lg p-8 space-y-4">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-600 font-bold text-sm">✗</span>
                </div>
                <p className="text-slate-700 pt-0.5">{flag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 border border-slate-700/50 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">💡</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Conclusion</h3>
                <p className="text-slate-200 leading-relaxed">
                  Web3 can be exciting and rewarding for those passionate about decentralization, but it's not a get-rich-quick scheme. Research thoroughly, start small (e.g., contribute to open-source), and prioritize your well-being. If something seems too good to be true, it probably is.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  );
};

export default DisclaimersPage;
