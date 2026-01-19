"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";
import MovieCard from "@/components/MoiveCard";

type FeaturedSectionProps = {
  initialMovies: any[];
  title: string;
  subtitle: string;
};

const FeaturedSection = ({ initialMovies = [], title, subtitle }: FeaturedSectionProps) => {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8 sm:mb-10">
          <div className="w-fit p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <Clapperboard className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="min-w-0">
            <p className="text-primary font-black uppercase tracking-[0.25em] text-[10px] sm:text-[11px]">
              {subtitle}
            </p>
            <h2 className="text-white font-black uppercase tracking-tighter leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl truncate">
              {title}
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {initialMovies.map((movie: any, index: number) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: (index % 4) * 0.08 }}
              className="h-full"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
