import { fetchFromTMDB } from "@/lib/tmdb";
import UpcomingMoviesClient from "./upcoming-movies-client";

export default async function UpcomingMovies() {
  const data = await fetchFromTMDB("/movie/upcoming");

  // ✅ SAFETY: always an array
  const movies = Array.isArray(data?.results) ? data.results.slice(0, 8) : [];

  return (
    <section className="relative py-16 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Upcoming Movies
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Watch trailers of movies releasing soon
          </p>
        </div>

        <UpcomingMoviesClient movies={movies} />
      </div>
    </section>
  );
}
