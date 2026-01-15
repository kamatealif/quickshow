"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Info, Ticket, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const detailsPath = `/movies/${movie.id}`;

  return (
    <div className="group relative flex flex-col h-full bg-zinc-900 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      {/* 1. Proper Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Floating Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-black/70 backdrop-blur-md px-2 py-1 text-xs font-bold text-yellow-400 border border-white/5">
          <Star className="h-3.5 w-3.5 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex flex-col flex-grow p-4">
        {/* Full Title - No cutting off */}
        <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          <Calendar className="h-3.5 w-3.5" />
          {releaseYear}
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span>Movie</span>
        </div>

        {/* Short Overview */}
        <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2 mb-6">
          {movie.overview || "No description available."}
        </p>

        {/* 3. Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          {/* Primary Action: Details */}
          <Link href={detailsPath} className="w-full">
            <Button className="w-full h-10 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest gap-2">
              <Info className="h-4 w-4" />
              View Details
            </Button>
          </Link>

          {/* Secondary Action: Booking */}
          <Button
            variant="outline"
            className="w-full h-10 rounded-lg border-white/10 bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest gap-2"
          >
            <Ticket className="h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
