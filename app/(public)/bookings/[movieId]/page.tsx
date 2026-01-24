import { createSupabaseServerClient } from "@/lib/supabase/server";
import BookingClient from "./bookings-client";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: movie } = await supabase
    .from("movies")
    .select("id,title,poster_path")
    .eq("id", movieId)
    .single();

  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id,
      date,
      time,
      price,
      theaters ( name, screen_type )
    `,
    )
    .eq("movie_id", movieId)
    .eq("status", "active");

  return <BookingClient movie={movie} showtimes={showtimes ?? []} />;
}
