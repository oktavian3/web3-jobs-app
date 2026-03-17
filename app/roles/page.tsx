'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

interface Role {
  id: string;
  category: string;
  name: string;
  oneLiner: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/roles.json')
      .then(res => res.json())
      .then(data => {
        setRoles(data);
        setFilteredRoles(data);
      });
  }, []);

  useEffect(() => {
    let filtered = roles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(role => role.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.oneLiner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRoles(filtered);
  }, [selectedCategory, searchTerm, roles]);

  const categories = ['all', ...new Set(roles.map(r => r.category))];

  const getCategoryStyle = (category: string) => {
    const styles: { [key: string]: string } = {
      technical: 'bg-blue-50 text-blue-700 border-blue-200',
      'non-tech': 'bg-purple-50 text-purple-700 border-purple-200',
      research: 'bg-amber-50 text-amber-700 border-amber-200',
      design: 'bg-pink-50 text-pink-700 border-pink-200',
    };
    return styles[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="page-wrapper">
      {/* Grid background - fixed, z-0, behind all content */}
      <div className="grid-background opacity-50" />
      
      <div className="page-content pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-muted">Explore Career Paths</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              Web3 Job Roles
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Explore detailed profiles with skills, interview questions, and career paths.
            </p>
          </div>

          {/* Floating decorative cards */}
          <div className="hidden lg:block">
            <div className="absolute top-32 left-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[-6deg] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Smart Contract Dev</p>
                  <p className="text-xs text-muted">$120k - $200k</p>
                </div>
              </div>
            </div>
            <div className="absolute top-48 right-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[4deg]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
                <div>
                  <p className="font-semibold text-foreground text-sm">DeFi Analyst</p>
                  <p className="text-xs text-muted">$90k - $150k</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-border shadow-sm relative z-20">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-foreground transition-all"
                />
              </div>
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
                  {cat === 'all' ? 'All Roles' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 relative z-10">
            {filteredRoles.map(role => (
              <Link key={role.id} href={`/roles/${role.id}`} className="block">
                <div className="h-full bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-[0_8px_30px_rgb(139,92,246,0.12),0_8px_30px_rgb(59,130,246,0.08)] hover:border-purple-300 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  {/* Subtle gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${getCategoryStyle(role.category)}`}>
                      {role.category}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                      {role.name}
                    </h3>
                    <p className="text-muted mb-4 leading-relaxed">{role.oneLiner}</p>
                    
                    <div className="flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredRoles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg">No roles found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
