"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AtSign, Sparkles, Wand2 } from "lucide-react";
import { roles } from "@/data/roles";

type XProfile = {
  source: string;
  handle: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  avatarUrl?: string;
};

const loadingLines = [
  "Tunggu bentar, KRAFT lagi nyeduh data publik X...",
  "Ngecek bio, followers, dan vibes postingan...",
  "Nyari apakah kamu builder, shiller, atau spreadsheet enjoyer...",
  "Sebentar lagi keluar hasilnya, jangan refresh dulu ya.",
];

const fallbackBios = [
  "gm. learning web3, building in public, suka riset project baru, and occasionally overthinking tokenomics.",
  "community helper, meme curator, thread reader, and part-time alpha hunter.",
  "designer-ish, writer-ish, ops-ish. currently exploring web3 careers and better internet communities.",
  "on-chain curious. dashboards, governance, DeFi rabbit holes, and too many saved threads.",
];

const keywordMap = [
  { words: ["dev", "solidity", "rust", "engineer", "code", "contract", "audit", "security", "zk"], lane: "Technical & Security" },
  { words: ["write", "writing", "thread", "content", "marketing", "meme", "creator", "newsletter", "copy", "shitposting"], lane: "Content & Marketing" },
  { words: ["community", "mod", "ambassador", "growth", "discord", "telegram", "partnership"], lane: "Community & Growth" },
  { words: ["data", "research", "defi", "on-chain", "analyst", "token", "market", "dashboard"], lane: "Research & Data" },
  { words: ["product", "ops", "operation", "strategy", "launch", "pm", "project"], lane: "Product & Operations" },
  { words: ["design", "brand", "nft", "artist", "motion", "visual", "ux", "ui"], lane: "Creative & Design" },
] as const;

function hashText(value: string) {
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function cleanUsername(value: string) {
  return value.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
}

function fallbackProfile(username: string): XProfile {
  const seed = hashText(username || "kraft");
  return {
    source: "fallback-generated",
    handle: username || "anonintern",
    name: username || "anon intern",
    followers: 420 + ((seed * 137) % 185000),
    following: 69 + ((seed * 29) % 3200),
    bio: fallbackBios[seed % fallbackBios.length],
    posts: 30 + ((seed * 11) % 9000),
  };
}

function pickRole(username: string, profile: XProfile) {
  const lower = `${username} ${profile.name} ${profile.bio} followers:${profile.followers} posts:${profile.posts}`.toLowerCase();
  const matchedLane = keywordMap.find((item) => item.words.some((word) => lower.includes(word)))?.lane;
  const pool = matchedLane ? roles.filter((role) => role.lane === matchedLane) : roles;
  return pool[hashText(lower) % pool.length];
}

export default function XProfileRoleMatcher() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<XProfile>(() => fallbackProfile(""));
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [notice, setNotice] = useState("");

  const cleanedUsername = cleanUsername(username);
  const role = useMemo(() => pickRole(cleanedUsername, profile), [cleanedUsername, profile]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % loadingLines.length);
    }, 850);
    return () => window.clearInterval(interval);
  }, [isLoading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cleanedUsername) return;

    setShowResult(false);
    setIsLoading(true);
    setLoadingIndex(0);
    setNotice("");

    try {
      const [response] = await Promise.all([
        fetch(`/api/x-profile?username=${encodeURIComponent(cleanedUsername)}`),
        new Promise((resolve) => window.setTimeout(resolve, 2300)),
      ]);

      if (!response.ok) throw new Error("Profile fetch failed");
      const data = (await response.json()) as XProfile;
      setProfile(data);
    } catch {
      setProfile(fallbackProfile(cleanedUsername));
      setNotice("Public profile lagi susah diambil, jadi KRAFT pakai backup vibe mode dulu.");
    } finally {
      setIsLoading(false);
      setShowResult(true);
    }
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-amber-200 bg-[radial-gradient(circle_at_top_left,#fff7d6,transparent_34%),linear-gradient(135deg,#fffdf6,#eaf6ff_52%,#fff)] p-5 shadow-soft sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" /> For fun only
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-5xl">X Profile Role Matcher.</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Masukin username X/Twitter, KRAFT bakal baca data publik profile kamu lewat third-party fetcher, terus nebak role Web3 yang paling cocok dari bio dan vibe akun.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">X username</span>
              <AtSign className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="satyaXBT"
                className="w-full rounded-full border border-border bg-white px-12 py-4 text-sm font-bold text-ink outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <button type="submit" disabled={isLoading || !cleanedUsername} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
              <Wand2 className="h-4 w-4" /> Masak role
            </button>
          </form>
        </div>

        <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur">
          <div className="rounded-3xl bg-ink p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {profile.avatarUrl ? <Image src={profile.avatarUrl} alt="" width={48} height={48} unoptimized className="h-12 w-12 rounded-full border border-white/20 object-cover" /> : null}
                <div>
                  <p className="text-sm font-extrabold">{profile.name}</p>
                  <p className="mt-1 text-xs text-white/65">@{profile.handle} profile snapshot</p>
                </div>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">public data</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/80">{profile.bio}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-white/10 p-3"><strong className="block text-base">{profile.followers.toLocaleString()}</strong> followers</div>
              <div className="rounded-2xl bg-white/10 p-3"><strong className="block text-base">{profile.following.toLocaleString()}</strong> following</div>
              <div className="rounded-2xl bg-white/10 p-3"><strong className="block text-base">{profile.posts.toLocaleString()}</strong> posts</div>
            </div>
          </div>

          {notice ? <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold leading-5 text-amber-800">{notice}</p> : null}

          {isLoading ? (
            <div className="mt-5 rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-5 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
              <p className="mt-4 text-sm font-extrabold text-amber-800">{loadingLines[loadingIndex]}</p>
            </div>
          ) : showResult ? (
            <div className="mt-5 rounded-3xl border border-blue-100 bg-soft p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">Based on your X profile, kamu cocoknya jadi</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{role.title}</h3>
              <p className="mt-2 text-sm font-bold text-blue-700">{role.lane} - {role.level}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{role.summary}</p>
              <Link href={`/roles/${role.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5">
                Lihat role ini <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-blue-200 bg-soft p-5 text-center text-sm font-bold text-muted">
              Hasil role kamu bakal muncul di sini setelah username dimasak.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
