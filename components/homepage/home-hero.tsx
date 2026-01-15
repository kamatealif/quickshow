import HeroSlider from "@/components/homepage/hero-slider";
import { fetchFromTMDB } from "@/lib/tmdb";

type TMDBMovie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};

export default async function HomeHero() {
  const data = await fetchFromTMDB("/trending/movie/week");

  // ✅ SAFETY FIRST
  const movies: TMDBMovie[] = Array.isArray(data?.results)
    ? data.results.slice(0, 5)
    : [];

  // Graceful fallback
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
