import { NextResponse } from "next/server";

export const runtime = "nodejs";

function cleanUsername(value: string) {
  return value.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
}

function parseCompactNumber(value: string) {
  const cleaned = value.replace(/,/g, "").trim();
  const match = cleaned.match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return null;
  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) return null;
  const suffix = match[2]?.toUpperCase();
  const multiplier = suffix === "B" ? 1_000_000_000 : suffix === "M" ? 1_000_000 : suffix === "K" ? 1_000 : 1;
  return Math.round(amount * multiplier);
}

function firstMatch(content: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = cleanUsername(searchParams.get("username") ?? "");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const sources = [
      `https://r.jina.ai/http://https://twitter.com/${username}`,
      `https://r.jina.ai/http://https://x.com/${username}`,
    ];

    let markdown = "";
    for (const source of sources) {
      const response = await fetch(source, {
        headers: { "User-Agent": "KRAFT-role-matcher/1.0" },
        next: { revalidate: 60 * 30 },
      });
      if (response.ok) {
        markdown = await response.text();
        break;
      }
    }

    if (!markdown) {
      return NextResponse.json({ error: "Could not fetch public X profile" }, { status: 502 });
    }
    const displayName = firstMatch(markdown, [/\n([^\n]+)\n\n@\w+/]);
    const bio = firstMatch(markdown, [/@\w+\n\n([^\n]+)\n\n\[/, /@\w+\n\n([^\n]+)\n\nJoined/]);
    const postsText = firstMatch(markdown, [/\n([\d.,]+[KMB]?) posts\n/i]);
    const followingText = firstMatch(markdown, [/\[([\d.,]+[KMB]?) Following\]/i]);
    const followersText = firstMatch(markdown, [/\[([\d.,]+[KMB]?) Followers\]/i]);
    const avatarUrl = firstMatch(markdown, [/\[!\[Image \d+: user avatar\]\((https:\/\/pbs\.twimg\.com\/profile_images\/[^)]+)\)\]/]);

    return NextResponse.json({
      source: "public-x-scrape",
      handle: username,
      name: displayName ?? username,
      bio: bio ?? "No public bio found. KRAFT will judge the vibes from the handle only.",
      followers: parseCompactNumber(followersText ?? "") ?? 0,
      following: parseCompactNumber(followingText ?? "") ?? 0,
      posts: parseCompactNumber(postsText ?? "") ?? 0,
      avatarUrl,
    });
  } catch {
    return NextResponse.json({ error: "X profile lookup failed" }, { status: 500 });
  }
}
