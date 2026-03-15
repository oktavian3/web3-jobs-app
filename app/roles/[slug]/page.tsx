"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    junior: string;
    mid: string;
    senior: string;
    note: string;
  };
  interviewQuestions: string[];
  whoToFollowOnCT: Array<{
    handle: string;
    why: string;
  }>;
  whereToFindJobs: string[];
}

const categoryColors: Record<string, string> = {
  technical: "bg-blue-500/20 text-blue-300",
  community: "bg-pink-500/20 text-pink-300",
  research: "bg-purple-500/20 text-purple-300",
  design: "bg-yellow-500/20 text-yellow-300",
  business: "bg-green-500/20 text-green-300",
  "non-tech": "bg-orange-500/20 text-orange-300",
};

export default function RoleDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [role, setRole] = useState<Role | null>(null);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/roles.json")
      .then((res) => res.json())
      .then((data) => {
        setAllRoles(data);
        const found = data.find((r: Role) => r.id === slug);
        setRole(found);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-400 mb-4">Role not found</p>
        <Link href="/roles" className="text-[#a855f7] hover:underline">
          ← Back to Roles
        </Link>
      </div>
    );
  }

  const currentIndex = allRoles.findIndex((r) => r.id === slug);
  const prevRole = currentIndex > 0 ? allRoles[currentIndex - 1] : null;
  const nextRole = currentIndex < allRoles.length - 1 ? allRoles[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link href="/roles" className="text-[#a855f7] hover:text-[#10b981] transition mb-8 inline-block">
        ← Back to Roles
      </Link>

      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{role.name}</h1>
            <p className="text-lg text-gray-400 mb-4">{role.oneLiner}</p>
          </div>
          <span
            className={`text-xs font-semibold px-4 py-2 rounded-full capitalize whitespace-nowrap ${
              categoryColors[role.category]
            }`}
          >
            {role.category}
          </span>
        </div>

        {/* Web2 Equivalent */}
        <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] inline-block">
          <span className="text-gray-400">Web2 Equivalent:</span>
          <span className="ml-2 font-semibold text-[#a855f7]">{role.web2Equivalent}</span>
        </div>
      </div>

      {/* Day in the Life */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">What This Role Actually Does</h2>
        <p className="text-gray-400 leading-relaxed">{role.dayInTheLife}</p>
      </section>

      {/* Skills Section */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-8">Skills & Knowledge</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Must Have */}
          <div>
            <h3 className="text-lg font-semibold text-[#10b981] mb-4">Must Have</h3>
            <ul className="space-y-3">
              {role.mustHaveSkills.map((skill, i) => (
                <li key={i} className="flex gap-3 text-gray-400">
                  <span className="text-[#10b981] mt-1">✓</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nice to Have */}
          <div>
            <h3 className="text-lg font-semibold text-[#a855f7] mb-4">Nice to Have</h3>
            <ul className="space-y-3">
              {role.niceToHaveSkills.map((skill, i) => (
                <li key={i} className="flex gap-3 text-gray-400">
                  <span className="text-[#a855f7] mt-1">◆</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tools & Protocols */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Tools & Protocols to Know</h2>
        <div className="flex flex-wrap gap-3">
          {role.toolsAndProtocols.map((tool, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Junior to Senior */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-8">Career Progression</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Junior", description: role.juniorToSenior.junior },
            { title: "Mid-Level", description: role.juniorToSenior.mid },
            { title: "Senior", description: role.juniorToSenior.senior },
          ].map((level, i) => (
            <div key={i} className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold mb-4 text-[#a855f7]">{level.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{level.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof of Work */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Proof of Work / Portfolio Tips</h2>
        <ol className="space-y-3">
          {role.proofOfWorkTips.map((tip, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-[#a855f7] font-semibold min-w-6">{i + 1}.</span>
              <span className="text-gray-400">{tip}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Compensation */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-8">Average Compensation Range</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { level: "Junior", salary: role.avgCompRange.junior },
            { level: "Mid-Level", salary: role.avgCompRange.mid },
            { level: "Senior", salary: role.avgCompRange.senior },
          ].map((comp, i) => (
            <div key={i} className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-[#10b981] mb-2">{comp.level}</h3>
              <p className="font-bold text-xl mb-4">{comp.salary}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 p-4 rounded-lg bg-[#0a0a0a] border border-[#2a2a2a]">
          <span className="font-semibold">Note:</span> {role.avgCompRange.note}
        </p>
      </section>

      {/* Interview Questions */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Sample Interview Questions</h2>
        <div className="space-y-3">
          {role.interviewQuestions.map((question, i) => (
            <button
              key={i}
              onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
              className="w-full text-left p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#a855f7] transition"
            >
              <div className="flex justify-between items-start gap-4">
                <span className="text-gray-300">{question}</span>
                <span className="text-[#a855f7] text-xl">
                  {expandedQuestion === i ? "−" : "+"}
                </span>
              </div>
              {expandedQuestion === i && (
                <div className="mt-4 pt-4 border-t border-[#2a2a2a] text-gray-400 text-sm">
                  Think about real examples from your work. Be specific about challenges,
                  decisions you made, and outcomes.
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Who to Follow */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Who to Follow on CT (Crypto Twitter)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {role.whoToFollowOnCT.map((person, i) => (
            <div key={i} className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
              <p className="font-semibold text-[#a855f7] mb-2">{person.handle}</p>
              <p className="text-gray-400 text-sm">{person.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where to Find Jobs */}
      <section className="mb-12 pb-12 border-b border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Where to Find These Jobs</h2>
        <ul className="space-y-2">
          {role.whereToFindJobs.map((job, i) => (
            <li key={i} className="flex gap-3 text-gray-400">
              <span className="text-[#a855f7]">→</span>
              <span>{job}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-12">
        {prevRole ? (
          <Link
            href={`/roles/${prevRole.id}`}
            className="text-[#a855f7] hover:text-[#10b981] transition flex items-center gap-2"
          >
            ← {prevRole.name}
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/roles"
          className="text-gray-400 hover:text-[#a855f7] transition"
        >
          View All Roles
        </Link>

        {nextRole ? (
          <Link
            href={`/roles/${nextRole.id}`}
            className="text-[#a855f7] hover:text-[#10b981] transition flex items-center gap-2"
          >
            {nextRole.name} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
