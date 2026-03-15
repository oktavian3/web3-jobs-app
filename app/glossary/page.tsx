"use client";

import { useState, useEffect, useMemo } from "react";

interface GlossaryTerm {
  term: string;
  definition: string;
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/glossary.json")
      .then((res) => res.json())
      .then((data) => {
        setTerms(data);
        setLoading(false);
      });
  }, []);

  const filteredTerms = useMemo(() => {
    return terms.filter(
      (t) =>
        search === "" ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase())
    );
  }, [terms, search]);

  // Group by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const alphabet = Object.keys(groupedTerms).sort();

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Web3 Glossary</h1>
        <p className="text-lg text-gray-400">
          {terms.length}+ essential terms to understand web3
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search glossary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#a855f7] outline-none transition"
        />
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <>
          {/* Alphabet Jump Nav */}
          <div className="mb-8">
            <p className="text-xs text-gray-400 mb-3">Jump to letter:</p>
            <div className="flex flex-wrap gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#a855f7] hover:text-[#a855f7] transition text-sm font-semibold"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-12">
            {alphabet.map((letter) => (
              <div key={letter}>
                <h2
                  id={`letter-${letter}`}
                  className="text-2xl font-bold text-[#a855f7] mb-6 sticky top-16 bg-[#0f0f0f] py-2"
                >
                  {letter}
                </h2>

                <div className="space-y-6 ml-4">
                  {groupedTerms[letter].map((term, i) => (
                    <div key={i} className="border-l-2 border-[#a855f7] pl-6">
                      <h3 className="text-lg font-semibold mb-2">{term.term}</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">
                No terms found. Try adjusting your search.
              </p>
            </div>
          )}
        </>
      )}

      {/* Learning Tip */}
      <div className="mt-20 pt-12 border-t border-[#2a2a2a]">
        <div className="p-8 rounded-lg bg-gradient-to-r from-[#a855f7]/10 to-[#10b981]/10 border border-[#2a2a2a]">
          <h3 className="font-semibold mb-2">💡 Learning Tip</h3>
          <p className="text-gray-400 text-sm">
            Web3 has its own language. Rather than trying to memorize everything at once,
            focus on the core concepts (blockchain, smart contract, DeFi, DAO) and learn
            others as you encounter them.
          </p>
        </div>
      </div>
    </div>
  );
}
