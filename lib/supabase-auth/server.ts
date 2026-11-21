import { cookies } from "next/headers";
import { createServerClient as createSsrClient } from "@supabase/ssr";

export function supabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Cookie-bound Supabase client for Server Components, Server Actions and
 *  Route Handlers. Uses the public anon key + the signed-in user's session,
 *  so every write is checked by Row Level Security. */
export async function getSupabaseServer() {
  if (!supabaseConfigured()) return null;
  const cookieStore = await cookies();
  return createSsrClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there. The
          // proxy refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}

/** Comma-separated allowlist, e.g. ADMIN_EMAILS="me@example.com,ops@example.com". */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdmin(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

/** Returns the signed-in admin user or null. Server-side only. */
export async function getAdminUser() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user || !isAllowedAdmin(user.email)) return null;
  return user;
}
