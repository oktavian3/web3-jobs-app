import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'http://127.0.0.1:54321';
const fallbackKey = 'local-build-placeholder-key';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;

// The fallback values keep static builds working in preview environments. Requests
// still fail normally until real Supabase credentials are configured.
export const supabase = createClient(supabaseUrl, supabaseKey);

export const createServerClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey
);
