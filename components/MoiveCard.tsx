"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Calendar, Ticket, Eye } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  runtime?: string | number;
  release_date?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&h=750&auto=format&fit=crop";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movie.poster_path && movie.poster_path.trim() !== "") {
      let url = movie.poster_path;
      if (url.startsWith("//")) url = `https:${url}`;
      setImgSrc(url);
    } else {
      setImgSrc(FALLBACK_IMAGE);
    }
    setIsLoading(true);
  }, [movie.poster_path]);

  const year = movie.release_date ? movie.release_date.split("-")[0] : "2026";
  const runtime = movie.runtime ? `${movie.runtime} MIN` : "120 MIN";

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#050505] border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-1">
      {/* Premium glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-20 bg-gradient-to-r from-primary/25 via-red-500/10 to-amber-400/10 blur-3xl" />
      </div>

      {/* IMAGE (fixed ratio, no variation) */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-neutral-900">
        <img
          src={imgSrc}
          alt={movie.title || "Movie poster"}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc(FALLBACK_IMAGE);
            setIsLoading(false);
          }}
          className={`h-full w-full object-cover object-top transition-all duration-1000 group-hover:scale-[1.06] ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-transparent" />

        {isLoading && <div className="absolute inset-0 animate-pulse bg-neutral-900" />}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col p-4">
        {/* Title */}
        <h3 className="text-white font-extrabold text-[15px] tracking-tight truncate">
          {movie.title || "Untitled Movie"}
        </h3>

        {/* Runtime + Release */}
        <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            {runtime}
          </span>

          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />

          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            {year}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          {/* Book */}
          <Link href={`/bookings/${movie.id}`} className="flex-1">
            <button className="w-full h-11 rounded-xl bg-primary hover:bg-[#8b1a1e] text-white font-extrabold text-[10px] uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 relative overflow-hidden">
              <Ticket className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-12" />
              Book Tickets
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </button>
          </Link>

          {/* View Details */}
          <Link href={`/movies/${movie.id}`} className="flex-1">
            <button className="w-full h-11 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:bg-white hover:text-black hover:border-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95">
              <Eye className="w-4 h-4 shrink-0" />
              <span className="font-extrabold text-[10px] uppercase tracking-[0.18em]">
                View Details
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
