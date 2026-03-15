"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Role {
  id: string;
  name: string;
  category: string;
  oneLiner: string;
  web2Equivalent: string;
}

const categories = ["technical", "community", "research", "design", "business", "non-tech"];

const categoryColors: Record<string, string> = {
  technical: "bg-blue-500/20 text-blue-300",
  community: "bg-pink-500/20 text-pink-300",
  research: "bg-purple-500/20 text-purple-300",
  design: "bg-yellow-500/20 text-yellow-300",
  business: "bg-green-500/20 text-green-300",
  "non-tech": "bg-orange-500/20 text-orange-300",
};

function RolesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "";

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Load roles on mount
  useEffect(() => {
    fetch("/data/roles.json")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        setLoading(false);
      });
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesSearch =
        search === "" ||
        role.name.toLowerCase().includes(search.toLowerCase()) ||
        role.oneLiner.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || role.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [roles, search, selectedCategory]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">Loading roles...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Web3 Roles</h1>
        <p className="text-gray-400">
          Discover {roles.length}+ roles and find your fit in web3
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#a855f7] outline-none transition"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === ""
                ? "bg-[#a855f7] text-white"
                : "border border-[#2a2a2a] hover:border-[#a855f7]"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition capitalize ${
                selectedCategory === cat
                  ? "bg-[#a855f7] text-white"
                  : "border border-[#2a2a2a] hover:border-[#a855f7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8 text-sm text-gray-400">
        Showing {filteredRoles.length} role{filteredRoles.length !== 1 ? "s" : ""}
      </div>

      {/* Roles Grid */}
      {filteredRoles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((role) => (
            <Link
              key={role.id}
              href={`/roles/${role.id}`}
              className="group p-6 rounded-lg border border-[#2a2a2a] hover:border-[#a855f7] hover:bg-[#1a1a1a]/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold group-hover:text-[#a855f7] transition flex-1">
                  {role.name}
                </h2>
              </div>

              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 capitalize ${
                  categoryColors[role.category]
                }`}
              >
                {role.category}
              </span>

              <p className="text-gray-400 mb-4">{role.oneLiner}</p>

              <div className="pt-4 border-t border-[#2a2a2a] text-sm text-gray-500">
                <p>Web2 Equivalent: <span className="text-gray-300">{role.web2Equivalent}</span></p>
              </div>

              <div className="mt-4">
                <span className="text-[#a855f7] group-hover:translate-x-1 transition inline-block">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No roles found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

export default function RolesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <RolesContent />
    </Suspense>
  );
}
