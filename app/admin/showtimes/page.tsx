import { createSupabaseServerClient } from "@/lib/supabase/server";
import ShowtimesClient from "./showtimes-client";

export default async function AdminShowtimesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name")
    .order("name");

  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id, date, time, price, available_seats, total_seats, status,
      movies (id, title)
    `,
    )
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-primary/30">
      {/* Immersive Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 py-12 lg:px-16">
        <ShowtimesClient
          theaters={theaters ?? []}
          showtimes={showtimes ?? []}
        />
      </div>
    </div>
  );
}
