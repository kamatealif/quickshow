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
    vote_average: number;
    genres: { id: number; name: string }[];
    overview: string;
  };
};

function truncate(text: string, max = 120) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl
      bg-black/40 border border-white/10
      hover:border-white/20 transition-all"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster_path}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500
            group-hover:scale-105"
        />

        {/* Rating */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1
          rounded-full bg-black/70 px-2 py-1 text-xs text-yellow-400"
        >
          <Star className="h-3 w-3 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>

        {/* Hover Overview (desktop only) */}
        <div
          className="pointer-events-none absolute inset-0
          bg-gradient-to-t from-black/90 via-black/60 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity
          hidden md:flex items-end p-4"
        >
          <p className="text-xs text-gray-200 leading-snug">
            {truncate(movie.overview)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">
          {movie.title}
        </h3>

        {/* Genres */}
        <p className="text-xs text-gray-400 line-clamp-1">
          {movie.genres.length
            ? movie.genres
                .slice(0, 3)
                .map((g) => g.name)
                .join(" • ")
            : "—"}
        </p>

        {/* CTA */}
        <Link href={`/movies/${movie.id}`} className="block pt-1">
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
