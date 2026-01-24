import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const { data: bookings } = await supabase.from("bookings").select(`
      total_amount,
      booking_date,
      payment_status,
      showtimes (
        time,
        movies ( title )
      )
    `);

  return <DashboardClient bookings={bookings ?? []} />;
}
