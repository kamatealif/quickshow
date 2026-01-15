export default function MovieDetails({ movie }: { movie: any }) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Storyline Block */}
      <div className="lg:col-span-2 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 md:p-12 backdrop-blur-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <h2 className="text-sm font-black text-zinc-500 uppercase tracking-[0.3em]">
            Synopsis
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-zinc-100 leading-relaxed font-medium italic tracking-tight">
          "{movie.overview}"
        </p>

        {/* Genre Pills */}
        <div className="mt-12 flex flex-wrap gap-3">
          {movie.genres.map((g: any) => (
            <span
              key={g.id}
              className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Data Sidebar */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/10 p-8 flex flex-col justify-between backdrop-blur-3xl shadow-2xl">
        <div className="space-y-8">
          <Detail label="Status" value={movie.status} />
          <Detail
            label="Original Language"
            value={movie.original_language?.toUpperCase()}
          />
          <Detail
            label="Budget"
            value={`$${(movie.budget / 1000000).toFixed(1)}M`}
          />
          <Detail
            label="Revenue"
            value={`$${(movie.revenue / 1000000).toFixed(1)}M`}
          />
          <Detail
            label="Certification"
            value={movie.adult ? "Adult 18+" : "All Audiences"}
          />
        </div>

        <div className="mt-12 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">
            Available in
          </p>
          <p className="text-sm font-bold text-white mt-1">
            IMAX & Dolby Cinema
          </p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="group border-b border-white/5 pb-4 last:border-0">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-primary transition-colors">
        {label}
      </p>
      <p className="text-lg font-bold text-white mt-1">
        {value === "$0.0M" ? "Not Disclosed" : value}
      </p>
    </div>
  );
}
