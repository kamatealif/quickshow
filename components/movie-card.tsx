"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
  };
};

function truncate(text: string, max = 140) {
  if (!text) return "No description available.";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div
      className="overflow-hidden rounded-xl
      bg-black/40 border border-white/10
      hover:border-white/20 transition-all flex flex-col"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />

        {/* Rating badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1
          rounded-full bg-black/70 px-2 py-1 text-xs text-yellow-400"
        >
          <Star className="h-3 w-3 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {movie.title}
        </h3>

        {/* Release year */}
        <p className="text-xs text-gray-400">
          {new Date(movie.release_date).getFullYear()}
        </p>

        {/* Overview */}
        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
          {truncate(movie.overview)}
        </p>

        {/* CTA */}
        <Link href={`/movies/${movie.id}`} className="mt-auto pt-3">
          <Button
            size="sm"
            className="w-full rounded-full bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
