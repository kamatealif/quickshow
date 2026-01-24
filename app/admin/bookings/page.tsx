import BookingsClient from "./bookings-client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminBookingsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      booking_date,
      total_amount,
      status,
      payment_status,
      seats,
      profiles ( email ),
      showtimes (
        movies ( title )
      )
    `,
    )
    .order("booking_date", { ascending: false });

  // 🔒 GUARANTEE JSX RETURN (prevents the error)
  if (error) {
    console.error(error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-red-500">Failed to load bookings</p>
      </div>
    );
  }

  return <BookingsClient bookings={bookings ?? []} />;
}
