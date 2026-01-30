"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, Play, Ticket } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HomeHero({ initialMovies }: { initialMovies: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative h-[90dvh] md:h-dvh w-full bg-background overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1200}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
        className="h-full w-full"
      >
        {initialMovies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              {/* BACKDROP WITH ENHANCED KEN BURNS */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                animate={{ scale: activeIdx === index ? 1 : 1.15 }}
                transition={{ duration: 10, ease: "linear" }}
              >
                <Image
                  src={movie.backdrop_path}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  className="object-cover opacity-80"
                />
              </motion.div>

              {/* GRADIENT VIGNETTES */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

              {/* CONTENT AREA */}
              <div className="relative z-20 h-full flex items-center px-8 md:px-16 lg:px-32">
                <AnimatePresence mode="wait">
                  {activeIdx === index && (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-4xl"
                    >
                      {/* PRE-TITLE METADATA */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] px-1">
                          Featured.Node
                        </span>
                        <div className="h-[1px] w-12 bg-primary/30" />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                          {movie.release_date?.split("-")[0]}
                        </span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 uppercase italic tracking-tighter leading-[0.9]">
                        {movie.title}
                      </h1>

                      <div className="flex items-center gap-4 mb-10">
                        {/* PREMIUM RATING BADGE */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-foreground font-mono font-bold text-sm">
                            {Number(movie.vote_average || 0).toFixed(1)}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic ml-2">
                          Global Rating / {movie.vote_count} Votes
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm md:text-base mb-12 line-clamp-3 max-w-xl font-medium leading-relaxed uppercase tracking-tight opacity-80">
                        {movie.overview}
                      </p>

                      {/* ACTION BUTTONS - NORMAL BUT PREMIUM */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/movies/${movie.id}`}
                          className="group px-10 py-5 bg-primary text-primary-foreground rounded-[1.5rem] font-black uppercase italic tracking-tighter text-sm flex items-center gap-3 shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Ticket className="w-5 h-5" />
                          QuickView
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* REFINED PAGINATION STYLES */}
      <style jsx global>{`
        .swiper-pagination {
          padding-left: 32px !important;
          padding-bottom: 48px !important;
          justify-content: flex-start !important;
          left: 0 !important;
          transform: none !important;
          width: 100% !important;
        }

        @media (min-width: 1024px) {
          .swiper-pagination {
            padding-left: 128px !important;
          }
        }

        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          border-radius: 4px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .swiper-pagination-bullet-active {
          width: 48px;
          background: #e11d48; /* Your primary color */
          box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
        }
      `}</style>
    </section>
  );
}
