export default function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-6 animate-pulse">
          {/* Poster Skeleton */}
          <div className="relative aspect-[2/3] w-full rounded-[2.5rem] bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>

          {/* Text Skeletons */}
          <div className="space-y-3 px-2">
            <div className="h-6 w-3/4 rounded-lg bg-zinc-900" />
            <div className="h-4 w-1/4 rounded-lg bg-zinc-900" />
            <div className="h-12 w-full rounded-2xl bg-zinc-900 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
