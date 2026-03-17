'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Star, Search, Zap, BookOpen, Code, Sparkles } from 'lucide-react';

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
    <div className="page-wrapper">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-50 -z-10 pointer-events-none" />
      
      <div className="page-content pt-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-muted">Level Up Your Career</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium text-foreground mb-4 text-balance">
              Resources & Job Boards
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Access thousands of job opportunities and comprehensive learning materials to level up your Web3 skills.
            </p>
          </div>

          {/* Floating decorative elements */}
          <div className="hidden lg:block">
            <div className="absolute top-40 left-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[-4deg]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">72,000+</p>
                  <p className="text-xs text-muted">Active Jobs</p>
                </div>
              </div>
            </div>
            <div className="absolute top-56 right-8 bg-white rounded-2xl shadow-lg border border-border p-4 rotate-[3deg]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">50+ Resources</p>
                  <p className="text-xs text-muted">Free Learning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-12 bg-white rounded-full p-1.5 border border-border shadow-sm max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('boards')}
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'boards'
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Zap className="w-4 h-4" />
              Job Boards
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'learning'
                  ? 'bg-foreground text-background'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learn Web3
            </button>
          </div>

          {/* Learning Tab */}
          {activeTab === 'learning' && (
            <div className="space-y-8">
              {learningResources.map((category, catIdx) => (
                <div key={catIdx} className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
                  <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Code className="w-5 h-5 text-purple-600" />
                    </div>
                    {category.title}
                  </h2>
                  <p className="text-muted mb-6 ml-13">{category.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-background rounded-xl border border-border hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
                      >
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">{resource.title}</h3>
                        <p className="text-muted text-sm mb-2">{resource.description}</p>
                        <div className="flex items-center gap-2 text-purple-600 text-xs font-medium">
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
              <div className="bg-white rounded-2xl p-6 mb-8 border border-border shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      placeholder="Search job boards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-foreground transition-all"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'rating' | 'jobs')}
                    className="px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-foreground"
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
                    className="group bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-600 transition-colors">{board.name}</h3>
                      <ExternalLink className="w-5 h-5 text-muted group-hover:text-purple-600 transition-colors flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {Array.from({ length: board.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - board.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-200" />
                        ))}
                      </div>
                      <span className="text-sm text-muted">{board.rating}/5</span>
                    </div>

                    <p className="text-muted mb-4">{board.description}</p>

                    <div className="mb-4">
                      <div className="text-sm font-semibold text-purple-600 mb-2">{board.jobCount} active jobs</div>
                      <div className="flex flex-wrap gap-2">
                        {board.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform inline-flex items-center">
                      Visit Board <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                  </a>
                ))}
              </div>

              {filteredBoards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted text-lg">No job boards found matching your search.</p>
                </div>
              )}

              {/* Stats Section */}
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm mb-12">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-8 text-center">Top Platforms by Numbers</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">72,000+</div>
                    <p className="text-muted">Total jobs on Web3.career (largest board)</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">12</div>
                    <p className="text-muted">Top curated job boards</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                    <p className="text-muted">New roles posted daily</p>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground mb-6">How to Find the Best Opportunities</h3>
                <ul className="space-y-4 text-muted">
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <span><strong className="text-foreground">Check multiple boards:</strong> Different companies post on different platforms.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0">2</span>
                    <span><strong className="text-foreground">Use filters:</strong> Most boards let you filter by experience level, salary, location, and skills.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center flex-shrink-0">3</span>
                    <span><strong className="text-foreground">Set up alerts:</strong> Many boards have email alerts for new postings matching your criteria.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center flex-shrink-0">4</span>
                    <span><strong className="text-foreground">Research companies:</strong> Check the company&apos;s on-chain activity, GitHub repos, and community presence.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0">5</span>
                    <span><strong className="text-foreground">Apply consistently:</strong> High demand means high competition. Apply to multiple roles and build your network.</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
