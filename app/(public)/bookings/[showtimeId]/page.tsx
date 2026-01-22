import { createSupabaseServerClient } from "@/lib/supabase/server";
import SeatSelector from "./seat-selector";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ showtimeId: string }>;
}) {
  const { showtimeId } = await params;

  const supabase = await createSupabaseServerClient();

  const expiryISO = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { data: seats } = await supabase
    .from("seats")
    .select("id, row_letter, seat_number, price")
    .eq("showtime_id", showtimeId)
    .eq("is_available", true)
    .or(`locked_at.is.null,locked_at.lt.${expiryISO}`);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black mb-8">Select Your Seats</h1>

      <SeatSelector seats={seats ?? []} showtimeId={showtimeId} />
    </main>
  );
}
