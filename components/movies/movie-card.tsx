"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Ticket, Info, Clock, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type MovieCardProps = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  runtime?: string; // Adding for tactical feel
  genre?: string; // Adding for tactical feel
};

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  runtime = "142m",
  genre = "Action",
}: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-[2.5rem] p-4 bg-card/30 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
    >
      {/* POSTER AREA */}
      <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl">
        <Image
          src={poster_path}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* TOP OVERLAYS - Tactical Monospace */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-white text-[10px] font-black font-mono tracking-tighter">
              {vote_average.toFixed(1)}
            </span>
          </div>

          <Badge className="bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-lg border-none shadow-lg shadow-primary/20">
            Premium
          </Badge>
        </div>

        {/* VIGNETTE & METADATA OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-mono text-white/80 uppercase">
                {runtime}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clapperboard className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-mono text-white/80 uppercase">
                {genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col p-4 pt-6 space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 bg-primary rounded-full" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] italic">
              Now.Showing
            </span>
          </div>
          <h3 className="text-white font-black text-2xl leading-[0.9] uppercase italic line-clamp-2 group-hover:text-primary transition-colors tracking-tighter pt-1">
            {title}
          </h3>
        </div>

        {/* ACTION TERMINAL */}
        <div className="flex gap-3">
          {/* Details - Tactical Icon Button */}
          <Button
            variant="outline"
            className="w-14 h-14 rounded-2xl bg-white/[0.03] border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shrink-0"
            asChild
          >
            <Link href={`/movies/${id}`}>
              <Info className="w-5 h-5 text-white/60" />
            </Link>
          </Button>

          {/* Book Now - High-Visibility Primary Action */}
          <Button
            className="flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase italic tracking-tighter text-sm shadow-xl shadow-primary/10 transition-all hover:scale-[1.03] active:scale-95 group/btn overflow-hidden relative"
            asChild
          >
            <Link href={`/bookings/${id}`}>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Get Tickets</span>
              </div>
              {/* Subtle button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
