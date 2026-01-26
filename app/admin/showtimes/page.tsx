// app/admin/showtimes/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ShowtimesClient from "./showtimes-client";

export default async function AdminShowtimesPage() {
  const supabase = await createSupabaseServerClient();

  // Parallel data fetching for performance
  const [{ data: theaters }, { data: showtimes }] = await Promise.all([
    supabase.from("theaters").select("id, name").order("name"),
    supabase
      .from("showtimes")
      .select(
        `
        id, date, time, price, available_seats, total_seats, status,
        movies (id, title)
      `,
      )
      .order("date", { ascending: true })
      .order("time", { ascending: true }),
  ]);

  return (
    <div className="min-h-screen  text-zinc-100 selection:bg-primary/30">
      <div className="max-w-[1400px] mx-auto px-6 py-12 animate-in fade-in duration-700">
        <ShowtimesClient
          theaters={theaters ?? []}
          showtimes={showtimes ?? []}
        />
      </div>
    </div>
  );
}
