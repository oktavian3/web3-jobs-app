'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Briefcase, Code, DollarSign, Zap, Lightbulb, CheckCircle, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="absolute inset-0 grid-background opacity-50 -z-10 pointer-events-none" />
        <div className="page-content pt-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm">
              <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-muted">Loading role details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="page-wrapper">
        <div className="absolute inset-0 grid-background opacity-50 -z-10 pointer-events-none" />
        <div className="page-content pt-24 relative z-10">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-medium text-foreground mb-4">Role not found</h1>
            <p className="text-muted mb-6">Sorry, we couldn&apos;t find the role you&apos;re looking for.</p>
            <Link href="/roles" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to all roles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryStyle = (category: string) => {
    const styles: { [key: string]: string } = {
      technical: 'bg-blue-50 text-blue-700 border-blue-200',
      'non-tech': 'bg-purple-50 text-purple-700 border-purple-200',
      research: 'bg-amber-50 text-amber-700 border-amber-200',
      design: 'bg-pink-50 text-pink-700 border-pink-200',
    };
    return styles[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const nextRole = allRoles[(allRoles.findIndex(r => r.id === role.id) + 1) % allRoles.length];

  return (
    <div className="page-wrapper">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-50 -z-10 pointer-events-none" />
      
      <div className="page-content pt-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link 
            href="/roles" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm text-foreground hover:border-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to roles
          </Link>

          {/* Floating decorative elements */}
          <div className="hidden lg:block">
            <div className="absolute top-40 right-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[3deg]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{role.avgCompRange.usd}</p>
                  <p className="text-xs text-muted">Avg. Salary Range</p>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${getCategoryStyle(role.category)}`}>
              {role.category.charAt(0).toUpperCase() + role.category.slice(1)}
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4">
              {role.name}
            </h1>
            <p className="text-lg text-muted mb-6 max-w-2xl">{role.oneLiner}</p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm text-sm">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span className="text-muted">Web2:</span>
                <span className="text-foreground font-medium">{role.web2Equivalent}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm text-sm">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-foreground font-medium">{role.avgCompRange.usd}</span>
              </div>
            </div>
          </div>

          {/* Day in the Life */}
          <section className="bg-white rounded-2xl p-8 border border-border shadow-sm mb-8 hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-foreground">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              A Day in the Life
            </h2>
            <p className="text-muted leading-relaxed">{role.dayInTheLife}</p>
          </section>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Must Have */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                Must-Have Skills
              </h3>
              <div className="space-y-2">
                {role.mustHaveSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-blue-500 text-sm">&#10003;</span>
                    <span className="text-foreground text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nice to Have */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                </div>
                Nice-to-Have Skills
              </h3>
              <div className="space-y-2">
                {role.niceToHaveSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <span className="text-purple-500 text-sm">&#9670;</span>
                    <span className="text-foreground text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Protocols */}
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm mb-8 hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <Code className="w-4 h-4 text-pink-600" />
              </div>
              Tools & Protocols
            </h3>
            <div className="flex flex-wrap gap-2">
              {role.toolsAndProtocols.map((tool, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full text-sm text-purple-700 font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Career Progression */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Career Progression</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 border-l-4 border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
                <h3 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">Junior</h3>
                <p className="text-muted text-sm leading-relaxed">{role.juniorToSenior.junior}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-400 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 transition-shadow">
                <h3 className="text-sm font-bold text-purple-600 mb-2 uppercase tracking-wide">Mid-Level</h3>
                <p className="text-muted text-sm leading-relaxed">{role.juniorToSenior.mid}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border-l-4 border-pink-400 shadow-sm hover:shadow-lg hover:shadow-pink-500/10 transition-shadow">
                <h3 className="text-sm font-bold text-pink-600 mb-2 uppercase tracking-wide">Senior</h3>
                <p className="text-muted text-sm leading-relaxed">{role.juniorToSenior.senior}</p>
              </div>
            </div>
          </section>

          {/* Proof of Work Tips */}
          <section className="bg-white rounded-2xl p-8 border border-border shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Proof of Work Tips</h2>
            <div className="space-y-3">
              {role.proofOfWorkTips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-background rounded-xl border border-border">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-muted leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compensation */}
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-purple-200 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Average Compensation</h2>
            <div className="text-3xl font-bold text-purple-600 mb-2">{role.avgCompRange.usd}</div>
            <p className="text-muted">{role.avgCompRange.note}</p>
          </div>

          {/* Interview Questions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Common Interview Questions</h2>
            <div className="space-y-4">
              {role.interviewQuestions.map((question, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
                  <p className="font-medium text-foreground">
                    <span className="text-purple-600 mr-2">Q{idx + 1}:</span>
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Resources */}
          {role.resources && role.resources.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Learning Resources</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {role.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 transition-all group"
                  >
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                    <p className="text-muted text-sm">{resource.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Next Role CTA */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-4 text-foreground">Interested in other roles?</h3>
            <p className="text-muted mb-6">Explore {nextRole.name} or check out all Web3 career options.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href={`/roles/${nextRole.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                Explore {nextRole.name.split('(')[0].trim()}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/roles"
                className="px-6 py-3 border border-border text-foreground font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                View All Roles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
