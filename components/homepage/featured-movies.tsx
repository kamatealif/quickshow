import MovieCard from "@/components/movies/movie-card";
import { fetchFromTMDB } from "@/lib/tmdb";

type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

export default async function FeaturedMovies() {
  const data = await fetchFromTMDB("/movie/now_playing");

  // ✅ SAFETY: handle null + invalid shape
  const movies: TMDBMovie[] = Array.isArray(data?.results)
    ? data.results.slice(0, 8)
    : [];

  if (movies.length === 0) {
    return (
      <section className="relative py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-zinc-500">
            Unable to load featured movies right now.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Now Showing
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Movies currently playing in theaters
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
