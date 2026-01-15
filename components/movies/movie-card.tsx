"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Ticket, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MovieCard({ movie }: any) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="group relative flex flex-col rounded-[2.5rem] bg-zinc-900/20 transition-all duration-500 hover:-translate-y-2">
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

        {/* Rating */}
        <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-2xl bg-black/50 backdrop-blur-xl px-3 py-1.5 text-[11px] font-black text-yellow-400 border border-white/10">
          <Star className="h-3.5 w-3.5 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-extrabold tracking-tight text-white leading-tight mb-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 mb-6 text-[11px] font-bold text-zinc-500 uppercase tracking-[0.1em]">
          <span>{releaseYear}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span className="text-primary/80">Premium</span>
        </div>

        <Link href={`/movies/${movie.id}`} className="mt-auto">
          <Button className="w-full h-12 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest group/btn">
            Book Now
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Background Hover Glow */}
      <div className="absolute -inset-2 bg-primary/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </div>
  );
}
