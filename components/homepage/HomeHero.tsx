"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HomeHero({ initialMovies }: { initialMovies: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative h-dvh w-full bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={900}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }} // ✅ NO custom el
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
        className="h-full w-full"
      >
        {initialMovies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              {/* BACKDROP */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: activeIdx === index ? 1.08 : 1 }}
                transition={{ duration: 8, ease: "linear" }}
              >
                <Image
                  src={movie.backdrop_path}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* CONTENT */}
              <div className="relative z-20 h-full flex items-center px-6 md:px-16 lg:px-32">
                <AnimatePresence mode="wait">
                  {activeIdx === index && (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-3xl"
                    >
                      <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        {movie.title}
                      </h1>

                      <div className="flex items-center gap-6 mb-8">
                        <span className="text-gray-300">
                          {movie.release_date?.split("-")[0]}
                        </span>

                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-white font-semibold">
                            {Number(movie.vote_average || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-200 mb-10 line-clamp-3">
                        {movie.overview}
                      </p>

                      <div className="flex gap-4">
                        <Link
                          href={`/movies/${movie.id}`}
                          className="px-8 py-4 bg-[#e11d48] text-white rounded-full font-bold flex items-center gap-2"
                        >
                          View Details <ArrowRight className="w-5 h-5" />
                        </Link>

                        <button className="px-8 py-4 bg-white/10 text-white rounded-full font-bold flex items-center gap-2">
                          <Play className="w-4 h-4 fill-current" /> Trailer
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* GLOBAL PAGINATION STYLES */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute !important;
          bottom: 32px !important;

          left: 50% !important;
          transform: translateX(-50%) !important;

          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 10px;

          z-index: 50;
          width: auto !important;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          border-radius: 999px;
          transition: all 0.35s ease;
          cursor: pointer;
        }

        .swiper-pagination-bullet-active {
          width: 34px;
          background: #e11d48;
          box-shadow: 0 0 12px rgba(225, 29, 72, 0.6);
        }
      `}</style>
    </section>
  );
}
