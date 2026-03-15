'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Star, Filter, Search, Zap, BookOpen, Code } from 'lucide-react';

interface JobBoard {
  id: number;
  name: string;
  rating: number;
  description: string;
  url: string;
  jobCount: string;
  features: string[];
}

interface Learning {
  title: string;
  description: string;
  resources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

export default function ResourcesPage() {
  const [boards, setBoards] = useState<JobBoard[]>([]);
  const [filteredBoards, setFilteredBoards] = useState<JobBoard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'jobs'>('rating');
  const [activeTab, setActiveTab] = useState<'boards' | 'learning'>('boards');

  const learningResources: Learning[] = [
    {
      title: 'Blockchain & Smart Contracts',
      description: 'Master blockchain fundamentals, smart contract development, and DeFi protocols.',
      resources: [
        {
          title: 'Ethereum Developer Tutorials',
          url: 'https://ethereum.org/en/developers/tutorials/',
          description: '100+ free lessons on blockchain basics and Ethereum development'
        },
        {
          title: 'CryptoZombies',
          url: 'https://cryptozombies.io',
          description: 'Gamified Solidity tutorials - learn by building'
        },
        {
          title: 'Solidity by Example',
          url: 'https://solidity-by-example.org/',
          description: 'Code examples and explanations for Solidity'
        },
        {
          title: 'BuildSpace',
          url: 'https://buildspace.so',
          description: 'Hands-on projects for Ethereum/Polygon'
        },
        {
          title: 'Hardhat Documentation',
          url: 'https://hardhat.org/docs',
          description: 'Tool documentation for testing and deploying smart contracts'
        },
        {
          title: 'OpenZeppelin',
          url: 'https://docs.openzeppelin.com/',
          description: 'Secure contract libraries and guides'
        }
      ]
    },
    {
      title: 'Rust & Solana',
      description: 'Learn Rust programming and develop on the Solana blockchain.',
      resources: [
        {
          title: 'The Rust Book',
          url: 'https://doc.rust-lang.org/book/',
          description: 'Official free Rust programming language guide'
        },
        {
          title: 'Solana Development Guide',
          url: 'https://docs.solana.com/developing/programming-model',
          description: 'Tutorials on Rust for Solana program development'
        },
        {
          title: 'Solana Jobs',
          url: 'https://jobs.solana.com/',
          description: 'Solana ecosystem job opportunities'
        }
      ]
    },
    {
      title: 'Security & Auditing',
      description: 'Learn smart contract security and vulnerability detection.',
      resources: [
        {
          title: 'Cyfrin Updraft',
          url: 'https://updraft.cyfrin.io/',
          description: 'Free Solidity security courses and advanced topics'
        },
        {
          title: 'RareSkills',
          url: 'https://rareskills.io/learn-solidity',
          description: 'In-depth free auditing and security modules'
        },
        {
          title: 'Trail of Bits',
          url: 'https://www.trailofbits.com/',
          description: 'Security research and tools'
        }
      ]
    },
    {
      title: 'On-Chain Analysis & Data',
      description: 'Master on-chain analytics, tokenomics, and market research.',
      resources: [
        {
          title: 'Dune Analytics',
          url: 'https://dune.com/docs/',
          description: 'Free SQL-based on-chain analysis platform'
        },
        {
          title: 'Nansen',
          url: 'https://www.nansen.ai/',
          description: 'On-chain analytics and portfolio tracking'
        },
        {
          title: 'Glassnode',
          url: 'https://glassnode.com/',
          description: 'On-chain metrics and indicators'
        },
        {
          title: 'Messari Research',
          url: 'https://messari.io/research',
          description: 'Free crypto research and industry insights'
        },
        {
          title: 'DefiLlama',
          url: 'https://defillama.com/docs',
          description: 'Free DeFi data and protocol analytics'
        }
      ]
    },
    {
      title: 'DeFi & Tokenomics',
      description: 'Understand DeFi protocols, economics, and governance.',
      resources: [
        {
          title: 'Bankless Academy',
          url: 'https://academy.bankless.com/',
          description: 'Free DeFi education and onboarding'
        },
        {
          title: 'Alchemy University',
          url: 'https://university.alchemy.com/',
          description: 'Free blockchain and DeFi courses'
        },
        {
          title: 'Tokenomics DAO',
          url: 'https://tokenomicsdao.com/resources',
          description: 'Free guides on token design and economics'
        }
      ]
    },
    {
      title: 'Web3 Community & Networking',
      description: 'Build your network and learn from the community.',
      resources: [
        {
          title: 'Developer DAO',
          url: 'https://blog.developerdao.com/',
          description: 'Community-driven guides and learning resources'
        },
        {
          title: 'Web3.Career Learning Path',
          url: 'https://web3.career/learn-web3',
          description: 'Curated learning paths for different roles'
        },
        {
          title: 'EatTheBlocks',
          url: 'https://www.youtube.com/c/EatTheBlocks',
          description: 'Free YouTube channel on Web3 development'
        },
        {
          title: 'Dapp University',
          url: 'https://www.youtube.com/c/DappUniversity',
          description: 'Free full-stack dApp development tutorials'
        }
      ]
    },
    {
      title: 'Design & NFTs',
      description: 'Learn digital design for Web3 and NFT creation.',
      resources: [
        {
          title: 'Blender',
          url: 'https://www.blender.org/support/tutorials/',
          description: 'Free 3D modeling and animation software'
        },
        {
          title: 'OpenSea Learn',
          url: 'https://opensea.io/learn',
          description: 'Free NFT creation and minting guides'
        },
        {
          title: 'Figma Web3 Community',
          url: 'https://www.figma.com/community/search?query=web3',
          description: 'Free UI/UX design tools and Web3 templates'
        }
      ]
    }
  ];

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
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] text-[#e8e8f0] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e8e8f0] mb-4">Learning Resources & Job Boards</h1>
          <p className="text-[#d0d0d8] text-lg">Access thousands of job opportunities and comprehensive learning materials to level up your Web3 skills.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 bg-[#1a1a2e] rounded-lg p-2 border border-[#2a2a3e]">
          <button
            onClick={() => setActiveTab('learning')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'learning'
                ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                : 'text-[#e8e8f0] hover:bg-[#0f0f1a]'
            }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Learn Web3
          </button>
          <button
            onClick={() => setActiveTab('boards')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'boards'
                ? 'bg-gradient-to-r from-[#f4d03f] to-[#f5a8d8] text-[#0f0f1a]'
                : 'text-[#e8e8f0] hover:bg-[#0f0f1a]'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Job Boards
          </button>
        </div>

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <div className="space-y-8">
            {learningResources.map((category, catIdx) => (
              <div key={catIdx} className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e]">
                <h2 className="text-2xl font-bold text-[#e8e8f0] mb-2 flex items-center gap-3">
                  <Code className="w-6 h-6 text-[#f4d03f]" />
                  {category.title}
                </h2>
                <p className="text-[#d0d0d8] mb-6">{category.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-[#0f0f1a] rounded-lg border border-[#2a2a3e] hover:border-[#f4d03f] transition-all hover:shadow-lg group"
                    >
                      <h3 className="font-bold text-[#f4d03f] mb-1 group-hover:text-[#f5a8d8]">{resource.title}</h3>
                      <p className="text-[#d0d0d8] text-sm">{resource.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-[#d8b5e8] text-xs">
                        Visit <ExternalLink className="w-3 h-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Boards Tab */}
        {activeTab === 'boards' && (
          <>
            {/* Search and Filter */}
            <div className="bg-[#1a1a2e] rounded-lg p-6 mb-8 border border-[#2a2a3e]">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-[#d8b5e8]" />
                  <input
                    type="text"
                    placeholder="Search job boards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#0f0f1a] border border-[#2a2a3e] rounded-lg focus:outline-none focus:border-[#f4d03f] text-[#e8e8f0]"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'jobs')}
                  className="px-4 py-2 border border-[#2a2a3e] rounded-lg focus:outline-none focus:border-[#f4d03f] bg-[#0f0f1a] text-[#e8e8f0]"
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
                  className="group bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e] hover:shadow-xl hover:border-[#d8b5e8] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#e8e8f0] group-hover:text-[#f4d03f] transition-colors">{board.name}</h3>
                    <ExternalLink className="w-5 h-5 text-[#d8b5e8] group-hover:text-[#f4d03f] transition-colors flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {Array.from({ length: board.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f4d03f] text-[#f4d03f]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#d0d0d8]">{board.rating}/5</span>
                  </div>

                  <p className="text-[#d0d0d8] mb-4">{board.description}</p>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-[#f5a8d8] mb-2">{board.jobCount} active jobs</div>
                    <div className="flex flex-wrap gap-2">
                      {board.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-[#f4d03f]/10 border border-[#f4d03f] text-[#f4d03f] rounded">
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
                <p className="text-[#d0d0d8] text-lg">No job boards found matching your search.</p>
              </div>
            )}

            {/* Stats Section */}
            <div className="bg-[#1a1a2e] rounded-lg p-8 border border-[#2a2a3e] mb-12">
              <h3 className="text-2xl font-bold text-[#e8e8f0] mb-8 text-center">Top Platforms by Numbers</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-[#f4d03f]/10 to-transparent rounded-lg border border-[#f4d03f]">
                  <div className="text-4xl font-bold text-[#f4d03f] mb-2">72,000+</div>
                  <p className="text-[#d0d0d8]">Total jobs on Web3.career (largest board)</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#f5a8d8]/10 to-transparent rounded-lg border border-[#f5a8d8]">
                  <div className="text-4xl font-bold text-[#f5a8d8] mb-2">12</div>
                  <p className="text-[#d0d0d8]">Top curated job boards</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#d8b5e8]/10 to-transparent rounded-lg border border-[#d8b5e8]">
                  <div className="text-4xl font-bold text-[#d8b5e8] mb-2">1000+</div>
                  <p className="text-[#d0d0d8]">New roles posted daily</p>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-[#f4d03f]/20 via-[#f5a8d8]/20 to-[#d8b5e8]/20 rounded-lg p-8 border-2 border-[#d8b5e8]">
              <h3 className="text-2xl font-bold text-[#e8e8f0] mb-4">💡 How to Find the Best Opportunities</h3>
              <ul className="space-y-3 text-[#d0d0d8]">
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
                  <span className="text-[#f4d03f] font-bold">4.</span>
                  <span><strong>Research companies:</strong> Before applying, check the company's on-chain activity, GitHub repos, and community presence.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f5a8d8] font-bold">5.</span>
                  <span><strong>Apply consistently:</strong> High demand means high competition. Apply to multiple roles and build your network.</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
