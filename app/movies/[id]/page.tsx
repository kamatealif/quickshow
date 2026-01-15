import { Suspense } from "react";
import { fetchFromTMDB } from "@/lib/tmdb";
import MovieHero from "@/components/movies/movie-hero";
import MovieDetails from "@/components/movies/movie-details";
import MovieDetailSkeleton from "@/components/movies/movie-detail-skeleton";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary selection:text-white">
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieContent movieId={id} />
      </Suspense>
    </main>
  );
}

async function MovieContent({ movieId }: { movieId: string }) {
  const movie = await fetchFromTMDB(`/movie/${movieId}`);
  if (!movie)
    return (
      <div className="pt-40 text-center text-zinc-500">Movie not found.</div>
    );

  return (
    <>
      {/* Hero handles its own height internally */}
      <MovieHero movie={movie} />

      {/* Content wrapper with a negative margin to create a "floating" overlap */}
      <div className="relative z-20 -mt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <MovieDetails movie={movie} />
        </div>
      </div>
    </>
  );
}
