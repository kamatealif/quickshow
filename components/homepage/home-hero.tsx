// components/homepage/home-hero.tsx
import { db } from "@/drizzle/src/db";
import { movies as moviesTable } from "@/drizzle/src/db/schema";
import { desc } from "drizzle-orm";
import HeroSlider from "@/components/homepage/hero-slider";
import type { Movie } from "@/types/movie";

export default async function HomeHero() {
  // Fetch 5 latest movies from your Neon database
  const dbMovies = await db
    .select()
    .from(moviesTable)
    .orderBy(desc(moviesTable.yearOfRelease))
    .limit(5);

  // Map database columns to the Movie type expected by the slider
  const movies: Movie[] = dbMovies.map((m) => ({
    id: m.imdbId, // Using imdb_id as the unique key
    title: m.titleX || "Unknown Title",
    backdrop_path: m.posterPath || undefined, // Using poster as backdrop
    overview: m.summary || m.story || "",
    vote_average: m.imdbRating || 0,
    release_date: m.releaseDate || m.yearOfRelease?.toString() || "N/A",
  }));

  if (movies.length === 0) {
    return (
      <section className="h-[70vh] bg-black flex items-center justify-center">
        <p className="text-zinc-500">No movies found in your collection.</p>
      </section>
    );
  }

  return <HeroSlider movies={movies} />;
}
