// app/admin/bookings/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import BookingsClient from "./bookings-client";

export default async function AdminBookingsPage() {
  const supabase = await createSupabaseServerClient();

  // We use a "hinted" select to force the relationship join
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      created_at,
      movie_title,
      show_date,
      show_time,
      seats,
      theater_name,
      total_amount,
      profiles!user_id ( email ) 
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    // Professional error handling for the UI
    console.error("Ledger Sync Failure:", error);
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-red-500/20 bg-red-500/5 p-8 rounded-3xl text-center">
          <h2 className="text-red-500 font-black uppercase tracking-widest mb-2">
            Registry Sync Failure
          </h2>
          <p className="text-zinc-500 text-xs font-mono uppercase leading-relaxed">
            Error Code: {error.code} <br />
            {error.details ||
              "The system could not establish a secure link between Transaction and Profile nodes."}
          </p>
        </div>
      </div>
    );
  }

  // Define a type for the booking object
  type Booking = {
    id: string;
    created_at: string;
    movie_title: string;
    show_date: string;
    show_time: string;
    seats: string;
    theater_name: string;
    total_amount: number;
    profiles: { email: string }[]; // as returned by Supabase join
  };

  // Map bookings to match the Booking type (flatten profiles array to single object)
  const normalizedBookings =
    bookings?.map((booking: Booking) => ({
      ...booking,
      profiles: booking.profiles?.[0] || {},
    })) ?? [];

  return (
    <div className="min-h-screen  text-zinc-100">
      <div className="max-w-360 mx-auto px-8 py-16 animate-in fade-in duration-1000">
        <BookingsClient bookings={normalizedBookings} />
      </div>
    </div>
  );
}
