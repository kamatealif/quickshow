import MovieCard from "@/components/movies/movie-card";
import { getHomepageMovies } from "./homepage-data";

export default async function HomepageSections() {
  const { nowPlaying, trending, upcoming } = await getHomepageMovies();

  return (
    <>
      {nowPlaying.length > 0 && (
        <Section title="Now Playing" movies={nowPlaying.slice(0, 8)} />
      )}

      {trending.length > 0 && (
        <Section title="Trending This Week" movies={trending.slice(0, 8)} />
      )}

      {upcoming.length > 0 && (
        <Section title="Upcoming Movies" movies={upcoming.slice(0, 8)} />
      )}
    </>
  );
}

function Section({ title, movies }: { title: string; movies: any[] }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-2xl font-bold text-white mb-8">{title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
