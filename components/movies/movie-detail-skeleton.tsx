export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] bg-zinc-900/50 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-12 space-y-8">
          <div className="flex gap-4">
            <div className="h-6 w-20 rounded-full bg-zinc-800" />
            <div className="h-6 w-20 rounded-full bg-zinc-800" />
          </div>
          <div className="h-20 w-2/3 rounded-2xl bg-zinc-800" />
          <div className="h-10 w-full max-w-md rounded-xl bg-zinc-800" />
          <div className="flex gap-4">
            <div className="h-14 w-40 rounded-xl bg-zinc-800" />
            <div className="h-14 w-40 rounded-xl bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-40 bg-zinc-900 rounded-lg" />
            <div className="h-4 w-full bg-zinc-900 rounded-lg" />
            <div className="h-4 w-full bg-zinc-900 rounded-lg" />
            <div className="h-4 w-2/3 bg-zinc-900 rounded-lg" />
          </div>
          <div className="h-96 w-full bg-zinc-900/50 rounded-3xl border border-white/5" />
        </div>
      </div>
    </div>
  );
}
