"use client";

import { useState, useEffect } from "react";

interface ResourceItem {
  name: string;
  type: string;
  isPaid: boolean;
  description: string;
  link: string;
}

interface ResourceSection {
  category: string;
  items: ResourceItem[];
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        Loading resources...
      </div>
    );
  }

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      video: "bg-red-500/20 text-red-300",
      article: "bg-blue-500/20 text-blue-300",
      course: "bg-purple-500/20 text-purple-300",
      guide: "bg-green-500/20 text-green-300",
      documentation: "bg-yellow-500/20 text-yellow-300",
      tool: "bg-cyan-500/20 text-cyan-300",
      library: "bg-pink-500/20 text-pink-300",
      community: "bg-indigo-500/20 text-indigo-300",
      newsletter: "bg-orange-500/20 text-orange-300",
      default: "bg-gray-500/20 text-gray-300",
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
        <p className="text-lg text-gray-400">
          Curated links to learn web3, from basics to advanced topics
        </p>
      </div>

      {/* Resources by Category */}
      <div className="space-y-16">
        {resources.map((section, i) => (
          <div key={i}>
            <h2 className="text-2xl font-bold text-[#a855f7] mb-6">
              {section.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, j) => (
                <a
                  key={j}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-lg border border-[#2a2a2a] hover:border-[#a855f7] hover:bg-[#1a1a1a]/50 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-[#a855f7] transition flex-1">
                      {item.name}
                    </h3>
                    {item.isPaid && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] ml-2 whitespace-nowrap">
                        Paid
                      </span>
                    )}
                  </div>

                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize ${getTypeBadgeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>

                  <p className="text-sm text-gray-400 mb-4">{item.description}</p>

                  <span className="text-[#a855f7] text-sm group-hover:translate-x-1 transition inline-block">
                    Visit →
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-20 pt-12 border-t border-[#2a2a2a]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#a855f7] mb-3">📖</div>
            <h3 className="font-semibold mb-2">Learn By Doing</h3>
            <p className="text-sm text-gray-400">
              Don't just read - deploy contracts, build dapps, and create portfolios
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#10b981] mb-3">🔍</div>
            <h3 className="font-semibold mb-2">Read Code</h3>
            <p className="text-sm text-gray-400">
              Study successful projects on GitHub. Understanding existing code teaches
              you patterns and best practices
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#a855f7] mb-3">🤝</div>
            <h3 className="font-semibold mb-2">Join Communities</h3>
            <p className="text-sm text-gray-400">
              Discord servers and Twitter spaces are where you'll find help and
              opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
