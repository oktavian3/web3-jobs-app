import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-anon-key';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;

// A placeholder client keeps static builds and public educational pages available
// when optional admin/job-update credentials are not configured.
export const supabase = createClient(supabaseUrl, supabaseKey);

export const createServerClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey,
);
