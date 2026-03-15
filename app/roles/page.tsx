'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Filter, Search } from 'lucide-react';

interface Role {
  id: string;
  category: string;
  title: string;
  description: string;
  resources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
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
        role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRoles(filtered);
  }, [selectedCategory, searchTerm, roles]);

  const categories = ['all', ...new Set(roles.map(r => r.category))];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Development & Engineering': 'from-[#f4d03f] to-[#f5a8d8]',
      'Security & Auditing': 'from-[#f5a8d8] to-[#d8b5e8]',
      'Analysis & Research': 'from-[#d8b5e8] to-[#1a237e]',
      'Marketing & Community': 'from-[#f4d03f] to-[#d8b5e8]',
      'Design & Creative': 'from-[#f5a8d8] to-[#f4d03f]',
      'Operations & Management': 'from-[#d8b5e8] to-[#f5a8d8]',
      'Other Specialized Roles': 'from-[#1a237e] to-[#f4d03f]',
    };
    return colors[category] || 'from-[#f4d03f] to-[#d8b5e8]';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f7f3] via-[#fef9e7] to-[#f8f7f3] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1a237e] mb-4">Web3 Job Roles</h1>
          <p className="text-gray-700 text-lg">Explore 25+ in-demand roles with learning resources and key responsibilities.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-[#e0ddd8]">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e0ddd8] rounded-lg focus:outline-none focus:border-[#d8b5e8]"
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
                    ? 'bg-[#1a237e] text-white'
                    : 'bg-gray-100 text-[#1a237e] hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Roles' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredRoles.map(role => (
            <Link key={role.id} href={`/roles/${role.id}`}>
              <div className="h-full bg-white rounded-lg p-6 border border-[#e0ddd8] hover:shadow-xl transition-all hover:border-[#d8b5e8] cursor-pointer group">
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(role.category)} text-white text-xs font-semibold mb-4`}>
                  {role.category}
                </div>
                
                <h3 className="text-xl font-bold text-[#1a237e] mb-2 group-hover:text-[#f4d03f] transition-colors">{role.title}</h3>
                <p className="text-gray-600 mb-4">{role.description}</p>
                
                <div className="flex items-center text-[#d8b5e8] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No roles found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
