'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Star, Filter, Search } from 'lucide-react';

interface JobBoard {
  id: number;
  name: string;
  rating: number;
  description: string;
  url: string;
  jobCount: string;
  features: string[];
}

export default function ResourcesPage() {
  const [boards, setBoards] = useState<JobBoard[]>([]);
  const [filteredBoards, setFilteredBoards] = useState<JobBoard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'jobs'>('rating');

  useEffect(() => {
    fetch('/data/job-boards.json')
      .then(res => res.json())
      .then(data => {
        setBoards(data);
        setFilteredBoards(data);
      });
  }, []);

  useEffect(() => {
    let filtered = boards;

    if (searchTerm) {
      filtered = filtered.filter(board =>
        board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        board.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else {
      filtered = [...filtered].sort((a, b) => {
        const aNum = parseInt(b.jobCount.replace(/\D/g, '')) || 0;
        const bNum = parseInt(a.jobCount.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });
    }

    setFilteredBoards(filtered);
  }, [searchTerm, sortBy, boards]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f7f3] via-[#fef9e7] to-[#f8f7f3] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1a237e] mb-4">Top Web3 Job Boards</h1>
          <p className="text-gray-700 text-lg">Access the most active job boards with thousands of opportunities across all Web3 roles and experience levels.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-[#e0ddd8]">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search job boards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e0ddd8] rounded-lg focus:outline-none focus:border-[#d8b5e8]"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'jobs')}
              className="px-4 py-2 border border-[#e0ddd8] rounded-lg focus:outline-none focus:border-[#d8b5e8] bg-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="jobs">Sort by Job Count</option>
            </select>
          </div>
        </div>

        {/* Job Boards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredBoards.map(board => (
            <a 
              key={board.id}
              href={board.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg p-6 border border-[#e0ddd8] hover:shadow-xl hover:border-[#d8b5e8] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#1a237e] group-hover:text-[#f4d03f] transition-colors">{board.name}</h3>
                <ExternalLink className="w-5 h-5 text-[#d8b5e8] group-hover:text-[#f4d03f] transition-colors flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {Array.from({ length: board.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f4d03f] text-[#f4d03f]" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{board.rating}/5</span>
              </div>

              <p className="text-gray-700 mb-4">{board.description}</p>

              <div className="mb-4">
                <div className="text-sm font-semibold text-[#f5a8d8] mb-2">{board.jobCount} active jobs</div>
                <div className="flex flex-wrap gap-2">
                  {board.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-[#f4d03f]/10 border border-[#f4d03f] text-[#1a237e] rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[#d8b5e8] font-semibold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center">
                Visit Board <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </a>
          ))}
        </div>

        {filteredBoards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No job boards found matching your search.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-white rounded-lg p-8 border border-[#e0ddd8] mb-12">
          <h3 className="text-2xl font-bold text-[#1a237e] mb-8 text-center">Top Platforms by Numbers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#f4d03f]/10 to-transparent rounded-lg border border-[#f4d03f]">
              <div className="text-4xl font-bold text-[#f4d03f] mb-2">72,000+</div>
              <p className="text-gray-600">Total jobs on Web3.career (largest board)</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#f5a8d8]/10 to-transparent rounded-lg border border-[#f5a8d8]">
              <div className="text-4xl font-bold text-[#f5a8d8] mb-2">12</div>
              <p className="text-gray-600">Top curated job boards</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#d8b5e8]/10 to-transparent rounded-lg border border-[#d8b5e8]">
              <div className="text-4xl font-bold text-[#d8b5e8] mb-2">1000+</div>
              <p className="text-gray-600">New roles posted daily</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-[#f4d03f]/20 via-[#f5a8d8]/20 to-[#d8b5e8]/20 rounded-lg p-8 border-2 border-[#d8b5e8]">
          <h3 className="text-2xl font-bold text-[#1a237e] mb-4">💡 How to Find the Best Opportunities</h3>
          <ul className="space-y-3 text-gray-800">
            <li className="flex gap-3">
              <span className="text-[#f4d03f] font-bold">1.</span>
              <span><strong>Check multiple boards:</strong> Don't rely on just one. Different companies post on different platforms.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f5a8d8] font-bold">2.</span>
              <span><strong>Use filters:</strong> Most boards let you filter by experience level, salary, location (for timezone requirements), and skills.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d8b5e8] font-bold">3.</span>
              <span><strong>Set up alerts:</strong> Many boards have email alerts for new postings matching your criteria.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1a237e] font-bold">4.</span>
              <span><strong>Research companies:</strong> Before applying, check the company's on-chain activity, GitHub repos, and community presence.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f4d03f] font-bold">5.</span>
              <span><strong>Apply consistently:</strong> High demand means high competition. Apply to multiple roles and build your network.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
