import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TwitterApiUser = {
  name?: string;
  userName?: string;
  description?: string;
  followers?: number;
  following?: number;
  statusesCount?: number;
  profilePicture?: string;
};

function cleanUsername(value: string) {
  return value.trim().replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);
}

async function fetchTwitterApiProfile(username: string) {
  const apiKey = process.env.TWITTERAPI_IO_KEY;
  if (!apiKey) return null;

  const response = await fetch(`https://api.twitterapi.io/twitter/user/info?userName=${encodeURIComponent(username)}`, {
    headers: { "X-API-Key": apiKey },
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { status?: string; data?: TwitterApiUser };
  if (payload.status !== "success" || !payload.data) return null;

  const user = payload.data;
  return {
    source: "twitterapi.io",
    handle: user.userName ?? username,
    name: user.name ?? user.userName ?? username,
    bio: user.description ?? "No public bio found. KRAFT will judge the signal from the handle only.",
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    posts: user.statusesCount ?? 0,
    avatarUrl: user.profilePicture,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = cleanUsername(searchParams.get("username") ?? "");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const profile = await fetchTwitterApiProfile(username);
    if (!profile) {
      return NextResponse.json({ error: "Could not fetch public X profile" }, { status: 502 });
    }

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "X profile lookup failed" }, { status: 500 });
  }
}
