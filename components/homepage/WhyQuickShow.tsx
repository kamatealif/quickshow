export default function WhyQuickShow() {
  return (
    <section className="px-6 md:px-16 lg:px-32 py-20 bg-black/30 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-12">
          Why QuickShow?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Curated, Not Crowded
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We highlight movies that matter — trending, top-rated, and worth
              your time. No endless scrolling.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Real Ratings</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              All scores come from real audience data. No fake popularity, no
              sponsored hype.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Fast & Focused
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Designed for speed, clarity, and simplicity — find a movie, check
              details, book instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
