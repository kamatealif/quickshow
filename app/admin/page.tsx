import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  // Fetching specifically the columns from your provided schema
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("total_amount, created_at, movie_title")
    .order("created_at", { ascending: true });

  if (error) console.error("Admin Fetch Error:", error);

  return (
    <div className="min-h-screen">
      <DashboardClient bookings={bookings ?? []} />
    </div>
  );
}
