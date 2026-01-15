"use client";

import Image from "next/image";
import { Star, Play, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TrailerModal from "@/components/homepage/trailer-modal";

export default function MovieHero({ movie }: { movie: any }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        priority
        className="object-cover transition-transform duration-[20s] scale-110 animate-in fade-in zoom-in-105"
      />
      {/* Multi-layered Gradients for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/20" />{" "}
      {/* Subtle darkening layer */}
      {/* Hero Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center pb-20">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3 animate-in slide-in-from-left duration-500">
            <span className="bg-primary px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter text-white">
              4K Ultra HD
            </span>
            <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
              <Star className="h-4 w-4 fill-current" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] animate-in slide-in-from-left duration-700">
            {movie.title}
          </h1>

          <div className="flex items-center gap-6 text-zinc-300 font-bold text-sm tracking-widest uppercase animate-in slide-in-from-left duration-1000">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>{movie.runtime} Minutes</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <Button
              size="lg"
              className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Book Tickets
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 rounded-xl border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs"
              onClick={() => setOpen(true)}
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
      <TrailerModal
        open={open}
        movieId={movie.id}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
