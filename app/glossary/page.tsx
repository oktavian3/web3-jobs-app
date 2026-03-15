'use client';

import { useState, useEffect } from 'react';
import { Search, BookMarked, Filter } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/glossary.json')
      .then(res => res.json())
      .then(data => {
        setTerms(data);
        setFilteredTerms(data);
      });
  }, []);

  useEffect(() => {
    let filtered = terms;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTerms(filtered);
  }, [selectedCategory, searchTerm, terms]);

  const categories = ['all', ...new Set(terms.map(t => t.category))];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Basics & Blockchain Fundamentals': 'bg-[#f4d03f]/20 border-[#f4d03f]',
      'Smart Contracts & Development': 'bg-[#f5a8d8]/20 border-[#f5a8d8]',
      'DeFi (Decentralized Finance)': 'bg-[#d8b5e8]/20 border-[#d8b5e8]',
      'NFTs & Digital Assets': 'bg-[#1a237e]/10 border-[#1a237e]',
      'Governance & Advanced Concepts': 'bg-[#f4d03f]/10 border-[#f4d03f]/50',
    };
    return colors[category] || 'bg-gray-50 border-gray-300';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookMarked className="w-8 h-8 text-[#f4d03f]" />
            <h1 className="text-4xl font-bold text-[#e8e8f0]">Web3 Glossary</h1>
          </div>
          <p className="text-[#d0d0d8] text-lg">Master 50+ essential Web3 terms. From blockchain basics to advanced DeFi concepts.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#1a1a2e] rounded-lg p-6 mb-8 border border-[#2a2a3e]">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#d8b5e8]" />
            <input
              type="text"
              placeholder="Search glossary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#2a2a3e] rounded-lg focus:outline-none focus:border-[#f4d03f] text-base bg-[#0f0f1a] text-[#e8e8f0]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                    : 'bg-[#0f0f1a] text-[#e8e8f0] hover:border-[#f4d03f] border border-[#2a2a3e]'
                }`}
              >
                {cat === 'all' ? 'All Terms' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="space-y-3">
          {filteredTerms.map((term, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg bg-[#1a1a2e] ${getCategoryColor(term.category)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#f4d03f] mb-2">{term.term}</h3>
                  <p className="text-[#d0d0d8] leading-relaxed">{term.definition}</p>
                </div>
                <span className="text-xs font-semibold text-[#0f0f1a] bg-[#f4d03f] px-3 py-1 rounded-full whitespace-nowrap">
                  {term.category.split('&')[0].trim()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#d0d0d8] text-lg">No terms found matching your search.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e] text-center">
          <h3 className="text-2xl font-bold text-[#e8e8f0] mb-4">Master Web3 Fundamentals</h3>
          <p className="text-[#d0d0d8] mb-6">Our comprehensive glossary covers everything from blockchain basics to advanced DeFi concepts, helping you understand the Web3 landscape.</p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div>
              <div className="text-3xl font-bold text-[#f4d03f]">{filteredTerms.length}</div>
              <div className="text-sm text-[#d0d0d8]">Total Terms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f5a8d8]">{categories.length - 1}</div>
              <div className="text-sm text-[#d0d0d8]">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
