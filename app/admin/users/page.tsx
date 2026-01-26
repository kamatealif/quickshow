// app/admin/users/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UsersClient from "./users-client";

export default async function AdminUsersPage() {
  // FIX: You must await the client initialization
  const supabase = await createSupabaseServerClient();

  const { data: users } = await supabase
    .from("profiles")
    .select(
      `
      id,
      email,
      full_name,
      username,
      phone,
      is_admin,
      created_at
    `,
    )
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen  text-zinc-100 selection:bg-primary/30">
      <div className="max-w-[1400px] mx-auto px-6 py-12 animate-in fade-in duration-700">
        <UsersClient users={users ?? []} />
      </div>
    </div>
  );
}
