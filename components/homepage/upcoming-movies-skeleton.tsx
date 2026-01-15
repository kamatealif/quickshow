import MovieCardSkeleton from "@/components/homepage/movie-card-skeleton";

export default function UpcomingMoviesSkeleton() {
  return (
    <section className="relative py-16 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-10 space-y-3">
          <div className="h-6 w-56 bg-white/10 rounded" />
          <div className="h-4 w-72 bg-white/10 rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
