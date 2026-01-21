import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const supabase = createSupabaseServerClient();

  const code = searchParams.code;

  if (!code) {
    redirect("/login");
  }

  await supabase.auth.exchangeCodeForSession(code);

  redirect("/");
}
