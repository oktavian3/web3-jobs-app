'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Briefcase, Code, DollarSign, Zap, Users, Lightbulb, BookOpen, CheckCircle } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  category: string;
  oneLiner: string;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  toolsAndProtocols: string[];
  web2Equivalent: string;
  dayInTheLife: string;
  juniorToSenior: {
    junior: string;
    mid: string;
    senior: string;
  };
  proofOfWorkTips: string[];
  avgCompRange: {
    usd: string;
    note: string;
  };
  interviewQuestions: string[];
  resources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

export default function RoleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [role, setRole] = useState<Role | null>(null);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    fetch('/data/roles.json')
      .then(res => res.json())
      .then(data => {
        setAllRoles(data);
        const found = data.find((r: Role) => r.id === slug);
        if (!found) {
          setError(true);
        }
        setRole(found || null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-[#e8e8f0]">Loading...</div>;
  if (error || !role) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] text-[#e8e8f0] pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Role not found</h1>
          <p className="text-[#d0d0d8] mb-6">Sorry, we couldn't find the role you're looking for.</p>
          <Link href="/roles" className="text-[#f4d03f] hover:underline font-semibold">
            ← Back to all roles
          </Link>
        </div>
      </main>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      technical: 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8]',
      'non-tech': 'bg-gradient-to-r from-[#f5a8d8] to-[#d8b5e8]',
      research: 'bg-gradient-to-r from-[#d8b5e8] to-[#1a237e]',
      design: 'bg-gradient-to-r from-[#f4d03f] to-[#d8b5e8]',
    };
    return colors[category] || 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8]';
  };

  const nextRole = allRoles[(allRoles.findIndex(r => r.id === role.id) + 1) % allRoles.length];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] text-[#e8e8f0] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/roles" className="flex items-center gap-2 text-[#f4d03f] hover:text-[#f5a8d8] mb-8 font-semibold">
          <ArrowLeft className="w-5 h-5" /> Back to roles
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className={`inline-block px-4 py-2 rounded-full ${getCategoryColor(role.category)} text-white text-sm font-bold mb-4`}>
            {role.category.charAt(0).toUpperCase() + role.category.slice(1)}
          </div>
          <h1 className="text-5xl font-bold mb-4">{role.name}</h1>
          <p className="text-xl text-[#d8b5e8] mb-6">{role.oneLiner}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[#f5a8d8]">
              <Briefcase className="w-5 h-5" />
              <span>Web2 equivalent: {role.web2Equivalent}</span>
            </div>
            <div className="flex items-center gap-2 text-[#f4d03f]">
              <DollarSign className="w-5 h-5" />
              <span>{role.avgCompRange.usd}</span>
            </div>
          </div>
        </div>

        {/* Day in the Life */}
        <section className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e] mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#f4d03f]" />
            A Day in the Life
          </h2>
          <p className="text-[#d0d0d8] leading-relaxed text-lg">{role.dayInTheLife}</p>
        </section>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Must Have */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#f4d03f]/30">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#f4d03f]">
              <CheckCircle className="w-5 h-5" /> Must-Have Skills
            </h3>
            <div className="space-y-2">
              {role.mustHaveSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-[#f4d03f]/10 rounded border-l-2 border-[#f4d03f]">
                  <span className="text-[#f4d03f]">✓</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#d8b5e8]/30">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#d8b5e8]">
              <Lightbulb className="w-5 h-5" /> Nice-to-Have Skills
            </h3>
            <div className="space-y-2">
              {role.niceToHaveSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-[#d8b5e8]/10 rounded border-l-2 border-[#d8b5e8]">
                  <span className="text-[#d8b5e8]">◆</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Protocols */}
        <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e] mb-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#f5a8d8]">
            <Code className="w-5 h-5" /> Tools & Protocols
          </h3>
          <div className="flex flex-wrap gap-3">
            {role.toolsAndProtocols.map((tool, idx) => (
              <span key={idx} className="px-4 py-2 bg-gradient-to-r from-[#f4d03f]/20 to-[#f5a8d8]/20 border border-[#f5a8d8]/50 rounded-full text-[#f5a8d8]">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Career Progression */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Career Progression</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a2e] rounded-lg p-6 border-l-4 border-[#f4d03f]">
              <h3 className="text-lg font-bold text-[#f4d03f] mb-3">Junior</h3>
              <p className="text-[#d0d0d8]">{role.juniorToSenior.junior}</p>
            </div>
            <div className="bg-[#1a1a2e] rounded-lg p-6 border-l-4 border-[#f5a8d8]">
              <h3 className="text-lg font-bold text-[#f5a8d8] mb-3">Mid</h3>
              <p className="text-[#d0d0d8]">{role.juniorToSenior.mid}</p>
            </div>
            <div className="bg-[#1a1a2e] rounded-lg p-6 border-l-4 border-[#d8b5e8]">
              <h3 className="text-lg font-bold text-[#d8b5e8] mb-3">Senior</h3>
              <p className="text-[#d0d0d8]">{role.juniorToSenior.senior}</p>
            </div>
          </div>
        </section>

        {/* Proof of Work Tips */}
        <section className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e] mb-12">
          <h2 className="text-2xl font-bold mb-6">Proof of Work Tips</h2>
          <div className="space-y-3">
            {role.proofOfWorkTips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-[#0f0f1a] rounded-lg">
                <span className="text-[#f4d03f] font-bold flex-shrink-0">{idx + 1}.</span>
                <p className="text-[#d0d0d8]">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compensation */}
        <div className="bg-gradient-to-r from-[#f4d03f]/20 via-[#f5a8d8]/20 to-[#d8b5e8]/20 rounded-lg p-8 border border-[#d8b5e8]/30 mb-12">
          <h2 className="text-2xl font-bold mb-4">Average Compensation</h2>
          <div className="text-3xl font-bold text-[#f4d03f] mb-2">{role.avgCompRange.usd}</div>
          <p className="text-[#d8b5e8]">{role.avgCompRange.note}</p>
        </div>

        {/* Interview Questions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Interview Questions</h2>
          <div className="space-y-4">
            {role.interviewQuestions.map((question, idx) => (
              <div key={idx} className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
                <p className="font-semibold text-[#f5a8d8] mb-2">Q{idx + 1}: {question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        {role.resources && role.resources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {role.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e] hover:border-[#f4d03f] transition-all hover:shadow-lg"
                >
                  <h3 className="font-bold text-[#f4d03f] mb-2">{resource.title}</h3>
                  <p className="text-[#d0d0d8]">{resource.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Next Role CTA */}
        <div className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e] text-center">
          <h3 className="text-2xl font-bold mb-4">Interested in other roles?</h3>
          <p className="text-[#d0d0d8] mb-6">Explore {nextRole.name} or check out all Web3 career options.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/roles/${nextRole.id}`}
              className="px-6 py-3 bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a] font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Explore {nextRole.name.split('(')[0].trim()}
            </Link>
            <Link
              href="/roles"
              className="px-6 py-3 border-2 border-[#d8b5e8] text-[#d8b5e8] font-bold rounded-lg hover:bg-[#d8b5e8]/10 transition-all"
            >
              View All Roles
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
