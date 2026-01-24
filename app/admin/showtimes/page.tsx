import { createSupabaseServerClient } from "@/lib/supabase/server";
import ShowtimesClient from "./showtimes-client";

export default async function AdminShowtimesPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id,
      date,
      time,
      price,
      available_seats,
      total_seats,
      status,
      movies (
        id,
        title
      )
    `,
    )
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  return (
    <ShowtimesClient theaters={theaters ?? []} showtimes={showtimes ?? []} />
  );
}
