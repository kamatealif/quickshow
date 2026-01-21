"use client";

import Image from "next/image";
import Link from "next/link";

export default function TrendingSlider({ movies }: { movies: any[] }) {
  if (!movies || movies.length === 0) return null;
  const loopMovies = [...movies, ...movies, ...movies];

  return (
    <div className="relative py-12 overflow-hidden w-full bg-[#020202]">
      {/* Edge Fades - Crucial for "Infinite" feel */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#020202] via-[#020202]/80 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee pause-on-hover">
        {loopMovies.map((movie, index) => (
          <Link
            key={`${movie.id}-${index}`}
            href={`/movies/${movie.id}`}
            className="w-[260px] sm:w-[320px] md:w-[400px] px-4 flex-shrink-0 group"
          >
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-700 group-hover:border-[#e11d48]/50 group-hover:shadow-[0_0_50px_rgba(225,29,72,0.25)]">
              <Image
                src={movie.poster_path}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-xl font-black uppercase tracking-tighter italic">
                  {movie.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
