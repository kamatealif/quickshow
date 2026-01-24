import { createSupabaseServerClient } from "@/lib/supabase/server";
import UsersClient from "./users-client";

export default async function AdminUsersPage() {
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
      avatar_url,
      is_admin,
      created_at
    `,
    )
    .order("created_at", { ascending: false });

  const { data: bookings } = await supabase.from("bookings").select(`
      id,
      user_id,
      seats,
      created_at,
      showtimes (
        date,
        time,
        movies (
          title
        )
      )
    `);

  return <UsersClient users={users ?? []} bookings={bookings ?? []} />;
}
