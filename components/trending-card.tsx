"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

type TrendingCardProps = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function TrendingCard({
  id,
  title,
  poster_path,
  vote_average,
}: TrendingCardProps) {
  return (
    <Link
      href={`/movies/${id}`}
      className="group relative block aspect-[2/3] w-full rounded-2xl overflow-hidden bg-black transition-transform duration-300 hover:scale-[1.04]"
    >
      {/* Poster */}
      <Image
        src={poster_path}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Rating badge */}
      <div className="absolute top-3 left-3 z-20">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur border border-white/10">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-white text-xs font-semibold">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-primary text-xs font-bold">
          View details <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
