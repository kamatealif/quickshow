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
  const movies: TMDBMovie[] = data.results.slice(0, 8);

  return (
    <section className="relative py-16 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Now Showing
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Book tickets for movies currently playing in theaters
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                overview: movie.overview,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
