import { createClient } from '@supabase/supabase-js';

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return { supabaseUrl, supabaseKey };
}

// Server-side client (for API routes)
export const createServerClient = () => {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  return createClient(
    config.supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || config.supabaseKey
  );
};
