import { createSupabaseServerClient } from "@/lib/supabase/server";
import UsersClient from "./users-client";

export default async function AdminUsersPage() {
  const supabase = createSupabaseServerClient();

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

  return <UsersClient users={users ?? []} />;
}
