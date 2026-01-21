"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Ticket, ChevronRight } from "lucide-react";

type MovieCardProps = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
}: MovieCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800/60 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={poster_path}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur border border-white/10">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-white text-xs font-semibold">
              {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Title */}
        <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2 mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-3">
          {/* Secondary action */}
          <Link
            href={`/movies/${id}`}
            className="w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-200 border border-zinc-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white transition-all active:scale-[0.97]"
          >
            View Details <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Primary action */}
          <button className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.97]">
            <Ticket className="w-4 h-4" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
