'use client';

import { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedTerms, setExpandedTerms] = useState<Set<number>>(new Set());

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

  const toggleTerm = (idx: number) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx);
    } else {
      newExpanded.add(idx);
    }
    setExpandedTerms(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Basics & Blockchain Fundamentals': 'bg-blue-100 text-blue-700',
      'Smart Contracts & Development': 'bg-purple-100 text-purple-700',
      'DeFi (Decentralized Finance)': 'bg-green-100 text-green-700',
      'NFTs & Digital Assets': 'bg-pink-100 text-pink-700',
      'Governance & Advanced Concepts': 'bg-amber-100 text-amber-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="page-wrapper">
      {/* Grid background - z-index -1 ensures it's behind all content */}
      <div className="absolute inset-0 grid-background opacity-50 -z-10 pointer-events-none" />
      
      <div className="page-content pt-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-6">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-muted">Learn Web3</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              Web3 Glossary
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Master 50+ essential Web3 terms. From blockchain basics to advanced DeFi concepts.
            </p>
          </div>

          {/* Floating decorative elements */}
          <div className="hidden lg:block">
            <div className="absolute top-40 left-4 bg-white rounded-2xl shadow-lg border border-border p-3 rotate-[-8deg]">
              <p className="text-xs font-mono text-purple-600">{"{ blockchain }"}</p>
            </div>
            <div className="absolute top-56 right-4 bg-purple-500 text-white rounded-2xl shadow-lg p-3 rotate-[6deg]">
              <p className="text-xs font-semibold">Smart Contract</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-border shadow-sm">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-foreground transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground hover:bg-gray-100 border border-border'
                  }`}
                >
                  {cat === 'all' ? 'All Terms' : cat.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Terms List - Accordion Style */}
          <div className="space-y-3">
            {filteredTerms.map((term, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300"
              >
                <button
                  onClick={() => toggleTerm(idx)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-foreground">{term.term}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}>
                      {term.category.split('&')[0].trim()}
                    </span>
                  </div>
                  {expandedTerms.has(idx) ? (
                    <ChevronUp className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted" />
                  )}
                </button>
                {expandedTerms.has(idx) && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted leading-relaxed">{term.definition}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No terms found matching your search.</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-border shadow-sm text-center">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-4">
              Master Web3 Fundamentals
            </h3>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Our comprehensive glossary covers everything from blockchain basics to advanced DeFi concepts.
            </p>
            <div className="flex justify-center gap-12">
              <div>
                <div className="text-3xl font-bold text-purple-600">{filteredTerms.length}</div>
                <div className="text-sm text-muted">Total Terms</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{categories.length - 1}</div>
                <div className="text-sm text-muted">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
