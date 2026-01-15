export default function HeroSkeleton() {
  return (
    <section className="h-dvh w-full bg-black animate-pulse">
      <div className="h-full flex items-center px-6 md:px-16 lg:px-32">
        <div className="max-w-3xl space-y-6">
          <div className="h-14 w-2/3 bg-white/10 rounded" />
          <div className="h-4 w-1/3 bg-white/10 rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
            <div className="h-4 w-4/6 bg-white/10 rounded" />
          </div>
          <div className="h-12 w-40 bg-white/10 rounded-full" />
        </div>
      </div>
    </section>
  );
}
