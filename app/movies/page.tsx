import { Suspense } from "react";
import MoviesFilters from "@/components/movies/movies-filters";
import MovieGridSkeleton from "@/components/movies/movie-grid-skeleton";
import MovieResults from "./MovieResults";
import { fetchMovieGenres } from "@/lib/tmdb-genres";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    genre?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: PageProps) {
  const { q, genre } = await searchParams;
  const genres = await fetchMovieGenres();

  return (
    <section className="relative min-h-screen bg-[#050505] pt-32 pb-20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
        w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Browse <span className="text-primary">Cinema</span>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400 font-medium">
            No defaults. Just live data. Search or filter to begin.
          </p>
        </header>

        <MoviesFilters genres={genres} />

        <Suspense
          key={`${q ?? "all"}-${genre ?? "all"}`}
          fallback={<MovieGridSkeleton />}
        >
          <MovieResults q={q} genre={genre} />
        </Suspense>
      </div>
    </section>
  );
}
