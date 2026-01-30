import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = searchParams.code;

  if (!code) {
    redirect("/sign-in");
  }

  const supabase = await createSupabaseServerClient(); // ✅ THIS IS THE FIX

  await supabase.auth.exchangeCodeForSession(code);

  redirect("/");
}
