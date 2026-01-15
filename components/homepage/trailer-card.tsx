"use client";

import Image from "next/image";
import { Play, Star, Calendar } from "lucide-react";

export default function TrailerCard({ movie, onPlay }: any) {
  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div
      onClick={() => onPlay(movie.id)}
      className="group relative cursor-pointer flex flex-col gap-3"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[1px]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all duration-300 scale-75 group-hover:scale-100">
            <Play className="h-8 w-8 fill-current ml-1" />
          </div>
        </div>

        {/* Top Info */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-yellow-400 border border-white/10">
          <Star className="h-3.5 w-3.5 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="px-1">
        <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-[11px] text-zinc-500 uppercase font-medium">
          {releaseYear}
        </p>
      </div>
    </div>
  );
}
