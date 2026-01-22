"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Ticket, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type MovieCardProps = {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
};

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
}: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col rounded-[2rem] p-3 bg-card/40 backdrop-blur-md border border-white/5 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* POSTER AREA */}
      <div className="relative aspect-[2/3] rounded-[1.5rem] overflow-hidden shadow-xl">
        <Image
          src={poster_path}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* TOP OVERLAYS */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-white text-[11px] font-black font-mono">
              {vote_average.toFixed(1)}
            </span>
          </div>

          <Badge
            variant="secondary"
            className="bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest border-none text-white/70"
          >
            HD
          </Badge>
        </div>

        {/* BOTTOM GRADIENT VIGNETTE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col p-4 pt-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-60">
            Now Showing
          </span>
          <h3 className="text-white font-black text-xl leading-tight uppercase italic line-clamp-1 group-hover:text-primary transition-colors tracking-tighter">
            {title}
          </h3>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-5 gap-2">
          {/* Details - Small Round Button */}
          <Button
            variant="secondary"
            className="col-span-1 h-12 rounded-2xl bg-white/5 border-white/5 hover:bg-white/10"
            asChild
          >
            <Link href={`/movies/${id}`}>
              <Info className="w-5 h-5" />
            </Link>
          </Button>

          {/* Book Now - Main Action */}
          <Button className="col-span-4 h-12 rounded-2xl font-black uppercase italic tracking-tighter shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Ticket className="w-4 h-4 mr-2" />
            Quick Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
