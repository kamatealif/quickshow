import HeroSlider from "@/components/homepage/hero-slider";
import { fetchFromTMDB } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type TMDBMovie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
};

export default async function HomeHero() {
  const data = await fetchFromTMDB("/trending/movie/week");

  const movies: Movie[] = Array.isArray(data?.results)
    ? data.results.slice(0, 5).map((m: TMDBMovie) => ({
        id: m.id,
        title: m.title,
        backdrop_path: m.backdrop_path ?? undefined,
        overview: m.overview ?? "",
        vote_average: m.vote_average ?? 0,
        release_date: m.release_date ?? "N/A",
      }))
    : [];

  if (movies.length === 0) {
    return (
      <section className="h-[70vh] bg-black flex items-center justify-center">
        <p className="text-zinc-500">
          Unable to load featured movies right now.
        </p>
      </section>
    );
  }

  return <HeroSlider movies={movies} />;
}
