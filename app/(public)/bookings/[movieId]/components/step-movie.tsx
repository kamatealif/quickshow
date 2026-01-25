"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StepMovie({ movie }: { movie: any }) {
  const TMDB = "https://image.tmdb.org/t/p/w500";

  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative p-0 bg-zinc-900/40 backdrop-blur-2xl border-white/5 rounded-[2.5rem] overflow-hidden group shadow-2xl">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-10 -mt-10" />

        <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8">
          {/* Poster Section with Reflective Overlay */}
          <div className="relative w-36 h-52 md:w-44 md:h-64 shrink-0">
            <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-[2rem]" />
            <Image
              src={
                movie.poster_path
                  ? `${TMDB}${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              fill
              className="object-cover rounded-[2rem] shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="h-[1px] w-8 bg-primary/50" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Cinema Selection
                </p>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.85] py-1">
                {movie.title}
              </h2>
            </div>

            {/* Movie Meta Data Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                  Session{" "}
                  <span className="text-white ml-1">
                    {String(movie.id).slice(0, 8)}
                  </span>
                </p>
              </div>
              <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <p className="text-[9px] font-mono text-primary uppercase tracking-widest font-bold">
                  4K • ATMOS
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground/60 font-medium max-w-sm italic">
              Experience the next generation of cinema. Please proceed to select
              your preferred showtime below.
            </p>
          </div>

          {/* Side "Ticket Tear" Decorator - Only visible on desktop */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-2 border-l border-dashed border-white/10 pl-8 h-40">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
