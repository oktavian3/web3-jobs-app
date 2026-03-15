import Link from "next/link";

const categories = [
  {
    id: "technical",
    name: "Technical",
    description: "Developers, engineers, auditors",
    icon: "⚙️",
  },
  {
    id: "community",
    name: "Community",
    description: "Community managers, moderators",
    icon: "👥",
  },
  {
    id: "research",
    name: "Research",
    description: "Analysts, researchers, strategists",
    icon: "🔬",
  },
  {
    id: "design",
    name: "Design",
    description: "Designers, artists, creators",
    icon: "🎨",
  },
  {
    id: "business",
    name: "Business",
    description: "Product, partnerships, operations",
    icon: "💼",
  },
  {
    id: "non-tech",
    name: "Non-Technical",
    description: "Marketing, operations, support",
    icon: "📱",
  },
];

const stats = [
  { number: "30+", label: "Roles Covered" },
  { number: "6", label: "Categories" },
  { number: "100%", label: "Free" },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#a855f7] via-[#f5f5f5] to-[#10b981] bg-clip-text text-transparent">
            Know Exactly What You're Applying For
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            The definitive guide to web3 jobs. Learn what each role actually does,
            what skills you need, and how to break in from web2.
          </p>
          <Link
            href="/roles"
            className="inline-block bg-gradient-to-r from-[#a855f7] to-[#10b981] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition text-white"
          >
            Explore Roles →
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[#2a2a2a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#a855f7] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-gray-400">Find roles that match your interests and skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/roles?category=${category.id}`}
              className="group p-6 rounded-lg border border-[#2a2a2a] hover:border-[#a855f7] hover:bg-[#1a1a1a] transition cursor-pointer"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#a855f7] transition">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Web2 to Web3 Bridge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-y border-[#2a2a2a]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Coming From Web2?
            </h2>
            <p className="text-gray-400 mb-6">
              Your skills are more transferable than you think. We map common web2
              roles to their web3 equivalents and show you exactly where to start.
            </p>
            <Link
              href="/bridge"
              className="inline-block border border-[#a855f7] text-[#a855f7] px-6 py-3 rounded-lg hover:bg-[#a855f7]/10 transition"
            >
              See Web2 → Web3 Bridge →
            </Link>
          </div>
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Backend Dev</span>
                <span className="text-[#a855f7]">→</span>
                <span className="font-semibold">Smart Contract Dev</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Full Stack Eng</span>
                <span className="text-[#a855f7]">→</span>
                <span className="font-semibold">Web3 Frontend</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Data Scientist</span>
                <span className="text-[#a855f7]">→</span>
                <span className="font-semibold">Researcher</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Graphic Designer</span>
                <span className="text-[#a855f7]">→</span>
                <span className="font-semibold">NFT Designer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn Web3 Terminology
          </h2>
          <p className="text-gray-400 mb-8">
            New to crypto? We break down 40+ essential terms so you understand the
            language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#a855f7] mb-2">DeFi</div>
            <p className="text-sm text-gray-400">
              Decentralized Finance - financial protocols built on blockchain
            </p>
          </div>
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#10b981] mb-2">Smart Contract</div>
            <p className="text-sm text-gray-400">
              Self-executing code deployed on blockchain without intermediaries
            </p>
          </div>
          <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#a855f7] mb-2">DAO</div>
            <p className="text-sm text-gray-400">
              Decentralized Autonomous Organization - governed by token holders
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/glossary"
            className="inline-block text-[#a855f7] hover:text-[#10b981] transition font-semibold"
          >
            View Full Glossary (40+ Terms) →
          </Link>
        </div>
      </section>
    </div>
  );
}
