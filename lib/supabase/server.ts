import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client
 * - NO auth
 * - NO cookies
 * - NO auth-helpers
 * - SAFE for Next.js 16
 *
 * Use this ONLY for public data (movies, showtimes, etc.)
 */
export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
