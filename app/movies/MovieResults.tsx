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

export default async function MovieResults({
  q,
  genre,
}: {
  q?: string;
  genre?: string;
}) {
  const endpoint = q
    ? `/search/movie?query=${encodeURIComponent(q)}`
    : `/discover/movie?sort_by=popularity.desc${
        genre ? `&with_genres=${genre}` : ""
      }`;

  const data = await fetchFromTMDB(endpoint);
  const movies: TMDBMovie[] = Array.isArray(data?.results) ? data.results : [];

  if (movies.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24
        border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]"
      >
        <p className="text-zinc-500 font-bold uppercase tracking-widest">
          No results found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
