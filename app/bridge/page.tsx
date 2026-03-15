"use client";

import { useState, useEffect } from "react";

interface BridgeMapping {
  web2Role: string;
  web3Equivalent: string;
  whereToStart: string;
}

export default function BridgePage() {
  const [mappings, setMappings] = useState<BridgeMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/bridge.json")
      .then((res) => res.json())
      .then((data) => {
        setMappings(data);
        setLoading(false);
      });
  }, []);

  const filtered = mappings.filter(
    (m) =>
      search === "" ||
      m.web2Role.toLowerCase().includes(search.toLowerCase()) ||
      m.web3Equivalent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Web2 → Web3 Bridge</h1>
        <p className="text-lg text-gray-400 mb-8">
          Your web2 skills are valuable. See how your current role maps to web3.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search your web2 role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#a855f7] outline-none transition"
        />
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  <th className="text-left py-4 px-4 font-semibold">Web2 Role</th>
                  <th className="text-center py-4 px-4 text-[#a855f7]">↓</th>
                  <th className="text-left py-4 px-4 font-semibold">Web3 Equivalent</th>
                  <th className="text-left py-4 px-4 font-semibold">Where to Start</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((mapping, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                  >
                    <td className="py-4 px-4 text-gray-300">{mapping.web2Role}</td>
                    <td className="text-center py-4 px-4 text-[#a855f7] font-bold">→</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#10b981]">
                        {mapping.web3Equivalent}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {mapping.whereToStart}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((mapping, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-[#2a2a2a] hover:border-[#a855f7] transition"
              >
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Web2 Role</p>
                  <p className="font-semibold text-lg">{mapping.web2Role}</p>
                </div>

                <div className="text-center text-[#a855f7] mb-4 font-bold">↓</div>

                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Web3 Equivalent</p>
                  <p className="font-semibold text-[#10b981] text-lg">
                    {mapping.web3Equivalent}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2a2a2a]">
                  <p className="text-xs text-gray-400 mb-2">Where to Start</p>
                  <p className="text-sm text-gray-400">{mapping.whereToStart}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">
                No roles found. Try adjusting your search.
              </p>
            </div>
          )}
        </>
      )}

      {/* Key Insights */}
      <div className="mt-20 pt-12 border-t border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-8">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#a855f7] mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Your Skills Transfer</h3>
            <p className="text-sm text-gray-400">
              Web2 expertise in building systems, working with APIs, and solving problems
              directly applies to web3 development.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#10b981] mb-2">📚</div>
            <h3 className="font-semibold mb-2">New Concepts to Learn</h3>
            <p className="text-sm text-gray-400">
              While skills transfer, you'll need to understand blockchain, smart contracts,
              and crypto-specific patterns.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text--purple-400 mb-2">🚀</div>
            <h3 className="font-semibold mb-2">Move Quickly</h3>
            <p className="text-sm text-gray-400">
              Web3 moves fast. Your web2 experience + willingness to learn can get you hired
              quickly.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-[#a855f7]/10 to-[#10b981]/10 border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-4">
            <span className="text-[#a855f7] font-semibold min-w-6">1.</span>
            <span>Find your web2 role in the bridge above</span>
          </li>
          <li className="flex gap-4">
            <span className="text-[#a855f7] font-semibold min-w-6">2.</span>
            <span>Read the "Where to Start" guidance for your specific path</span>
          </li>
          <li className="flex gap-4">
            <span className="text-[#a855f7] font-semibold min-w-6">3.</span>
            <span>
              Explore the corresponding web3 role to learn full details about responsibilities
              and compensation
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-[#a855f7] font-semibold min-w-6">4.</span>
            <span>Start building proof of work and applying to positions</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
