export default function MovieCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl
      bg-black/40 border border-white/10
      animate-pulse"
    >
      {/* Poster */}
      <div className="aspect-2/3 bg-white/10" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-3 w-2/3 bg-white/10 rounded" />
        <div className="h-9 w-full bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
