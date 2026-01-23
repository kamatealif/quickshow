import { createSupabaseServerClient } from "@/lib/supabase/server";
import ShowtimeForm from "./showtime-form";
import ShowtimeTable from "./showtime-table";

export default async function AdminShowtimesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: movies } = await supabase
    .from("movies")
    .select("id, title")
    .order("title");

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name, seat_layout")
    .order("created_at", { ascending: false });

  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id,
      date,
      time,
      price,
      status,
      movies ( title ),
      theaters ( name )
    `,
    )
    .order("date", { ascending: false })
    .order("time");

  return (
    <div className="space-y-16">
      {/* HEADER */}
      <header className="space-y-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
          Inventory.Control
        </span>
        <h1 className="text-6xl font-black tracking-tighter uppercase italic">
          Showtimes
        </h1>
        <p className="text-muted-foreground italic">
          Movie × Theater × Time → Seats
        </p>
      </header>

      {/* CREATE */}
      <ShowtimeForm movies={movies || []} theaters={theaters || []} />

      {/* LIST */}
      <ShowtimeTable showtimes={showtimes || []} />
    </div>
  );
}
