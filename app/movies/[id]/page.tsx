import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, ArrowLeft, Ticket, Languages } from "lucide-react";

const tmdbBackdrop = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";

const tmdbPoster = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params for Next.js 15 compatibility
  const { id } = await params;

  const supabase = await createClient();

  const { data: movie, error } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      overview,
      poster_path,
      backdrop_path,
      vote_average,
      vote_count,
      release_date,
      original_language
      `,
    )
    .eq("id", id)
    .single();

  if (error || !movie) {
    notFound();
  }

  // Formatting helpers
  const year = movie.release_date?.split("-")[0] ?? "—";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const votes = movie.vote_count ? movie.vote_count.toLocaleString() : "0";

  return (
    /* FIX: Added pt-20 (mobile) and pt-32 (desktop) to push content 
       below your fixed navbar. 
    */
    <main className="bg-[#020202] text-white min-h-screen pt-20 md:pt-32">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        {/* Backdrop */}
        {movie.backdrop_path && (
          <Image
            src={tmdbBackdrop(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end px-6 md:px-16 lg:px-32 pb-12 md:pb-20">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full">
            {/* Left: Poster (Desktop Only) */}
            <div className="hidden lg:block w-[320px] flex-shrink-0">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={tmdbPoster(movie.poster_path)}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="320px"
                />
              </div>
            </div>

            {/* Right: Movie Info */}
            <div className="flex-1 flex flex-col justify-end">
              <Link
                href="/movies"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white mb-6 transition-colors group w-fit"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Archive
              </Link>

              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                {movie.title}
              </h1>

              {/* Meta Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-zinc-300 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#e11d48]" />
                  {year}
                </span>

                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-white font-bold">{rating}</span>
                  <span className="text-zinc-500">({votes})</span>
                </span>

                <span className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded text-xs font-bold tracking-widest uppercase">
                  <Languages className="w-3 h-3" />
                  {movie.original_language}
                </span>
              </div>

              {/* Description Snippet */}
              <p className="text-zinc-300 text-lg leading-relaxed mb-10 max-w-2xl line-clamp-3 md:line-clamp-none">
                {movie.overview || "No description available."}
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-4 bg-[#e11d48] text-white rounded-full font-bold flex items-center gap-2 hover:bg-[#fb1d52] transition active:scale-95 shadow-lg shadow-rose-600/20">
                  <Ticket className="w-5 h-5" />
                  Book Tickets
                </button>

                <button className="px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-bold hover:bg-white/10 transition">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="px-6 md:px-16 lg:px-32 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 italic">
              The Storyline
            </h2>
            <div className="h-1 w-16 bg-[#e11d48] rounded-full mb-8" />
            <p className="text-zinc-400 text-xl leading-relaxed font-light">
              {movie.overview || "No additional details available."}
            </p>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6 bg-zinc-900/40 border border-white/5 rounded-3xl p-8 h-fit sticky top-32">
            <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-4">
              Quick Facts
            </h3>
            <DetailRow label="Release Date" value={movie.release_date} />
            <DetailRow
              label="Language"
              value={movie.original_language?.toUpperCase()}
            />
            <DetailRow label="Rating" value={`${rating} / 10`} />
            <DetailRow label="Total Votes" value={votes} />
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
        {label}
      </span>
      <span className="text-white font-medium">{value ?? "—"}</span>
    </div>
  );
}
