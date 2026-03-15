'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Filter, Search } from 'lucide-react';

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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      technical: 'from-[#f4d03f] to-[#f5a8d8]',
      'non-tech': 'from-[#f5a8d8] to-[#d8b5e8]',
      research: 'from-[#d8b5e8] to-[#1a237e]',
      design: 'from-[#f4d03f] to-[#d8b5e8]',
    };
    return `bg-gradient-to-r ${colors[category] || 'from-[#f4d03f] to-[#f5a8d8]'}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e8e8f0] mb-4">Web3 Job Roles</h1>
          <p className="text-[#d0d0d8] text-lg">Explore detailed profiles with skills, interview questions, and career paths.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#1a1a2e] rounded-lg p-6 mb-8 border border-[#2a2a3e]">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-[#d8b5e8]" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0f0f1a] border border-[#2a2a3e] rounded-lg focus:outline-none focus:border-[#f4d03f] text-[#e8e8f0]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                    : 'bg-[#0f0f1a] text-[#e8e8f0] hover:border-[#f4d03f] border border-[#2a2a3e]'
                }`}
              >
                {cat === 'all' ? 'All Roles' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredRoles.map(role => (
            <Link key={role.id} href={`/roles/${role.id}`}>
              <div className="h-full bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e] hover:shadow-xl hover:border-[#f4d03f] transition-all group cursor-pointer">
                <div className={`inline-block px-3 py-1 rounded-full ${getCategoryColor(role.category)} text-white text-xs font-semibold mb-4`}>
                  {role.category}
                </div>
                
                <h3 className="text-xl font-bold text-[#e8e8f0] mb-2 group-hover:text-[#f4d03f] transition-colors">{role.name}</h3>
                <p className="text-[#d0d0d8] mb-4">{role.oneLiner}</p>
                
                <div className="flex items-center text-[#f4d03f] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#d0d0d8] text-lg">No roles found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
