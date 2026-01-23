import { createSupabaseServerClient } from "@/lib/supabase/server";
import StepMovie from "./step-movie";
import StepShowtime from "./step-showtime";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const supabase = await createSupabaseServerClient();

  // Fetch movie
  const { data: movie } = await supabase
    .from("movies")
    .select("id, title, poster_path")
    .eq("id", movieId)
    .single();

  if (!movie) {
    return <div className="p-10">Invalid movie</div>;
  }

  // Fetch showtimes
  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id,
      date,
      time,
      price,
      theaters (
        id,
        name,
        screen_type
      )
    `,
    )
    .eq("movie_id", movieId)
    .eq("status", "active")
    .order("date")
    .order("time");

  // No shows available
  if (!showtimes || showtimes.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-8">
        <StepMovie movie={movie} />

        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-bold">No shows available</h2>
          <p className="text-zinc-400 mt-2">Please try another movie.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 space-y-12">
      <StepMovie movie={movie} />
      <StepShowtime showtimes={showtimes} />
    </main>
  );
}
