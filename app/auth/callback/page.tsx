import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuthCallbackPage() {
  const supabase = createSupabaseServerClient();

  await supabase.auth.exchangeCodeForSession();

  redirect("/");
}
