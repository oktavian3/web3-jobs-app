import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseUrl } from "@/lib/supabase-auth/url";

/**
 * Protects /admin and /api/admin server-side.
 * - Refreshes the Supabase session cookie.
 * - Anyone not signed in with an allowlisted email (ADMIN_EMAILS) is sent to
 *   /admin/login (pages) or gets 401 (API).
 * Server actions re-check auth too, and RLS enforces it again in the database.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login" || pathname.startsWith("/admin/auth");
  const isApi = pathname.startsWith("/api/admin");

  const url = supabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    if (isLogin) return NextResponse.next();
    if (isApi) return NextResponse.json({ error: "Admin is not configured" }, { status: 503 });
    return NextResponse.redirect(new URL("/admin/login?error=not-configured", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const ok = Boolean(email && allow.includes(email));

  if (isLogin) {
    if (ok && pathname === "/admin/login") return NextResponse.redirect(new URL("/admin", request.url));
    return response;
  }
  if (!ok) {
    if (isApi) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const login = new URL("/admin/login", request.url);
    if (data.user && !ok) login.searchParams.set("error", "not-allowed");
    return NextResponse.redirect(login);
  }
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
