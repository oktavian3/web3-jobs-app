/** Supabase project URL from env, reduced to its origin. Pasting the API URL
 *  with a path (".../rest/v1/") or a trailing slash breaks auth calls, so we
 *  tolerate it instead of failing with a confusing login error. */
export function supabaseUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw).origin;
  } catch {
    return raw;
  }
}
