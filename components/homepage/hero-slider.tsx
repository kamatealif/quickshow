"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroSlider({ movies }: { movies: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const getImageUrl = (path: string | undefined, title: string) => {
    if (!path || path === "" || path === "None") {
      return `https://placehold.co/1920x1080/18181b/white?text=${encodeURIComponent(title)}`;
    }
    return path;
  };

  return (
    <section className="relative h-dvh w-full bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="h-full w-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src={getImageUrl(movie.backdrop_path, movie.title)}
                alt={movie.title}
                fill
                className="absolute inset-0 object-cover opacity-60 md:opacity-70"
                priority={index === 0}
                unoptimized={true}
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-32">
                <AnimatePresence mode="wait">
                  {activeIdx === index && (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-3xl"
                    >
                      <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-3 text-xs">
                        Database Featured
                      </h2>

                      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight uppercase">
                        {movie.title}
                      </h1>

                      <p className="text-xl md:text-3xl font-light text-gray-400 mb-6">
                        {movie.release_date?.split("-")[0]}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/40 px-2 py-1 rounded">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-yellow-500 font-bold text-sm">
                            {Number(movie.vote_average).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm md:text-lg max-w-xl mb-8 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {movie.overview}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/movies/${movie.id}`}
                          className="flex items-center gap-2 px-7 py-4 bg-primary text-white rounded-full font-bold hover:brightness-110 transition-all shadow-lg active:scale-95"
                        >
                          View Details
                          <ArrowRight className="w-5 h-5" />
                        </Link>

                        <button className="flex items-center gap-2 px-7 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all active:scale-95">
                          <Play className="w-4 h-4 fill-current" />
                          Trailer
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination - This is where the dots are */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50">
          <div className="custom-pagination flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl" />
        </div>
      </Swiper>

      {/* Custom Styles for the Dots */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white !important;
          opacity: 0.25;
          transition: all 0.4s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 36px;
          opacity: 1;
          background: #e11d48 !important; /* Your primary red color */
          border-radius: 20px;
        }
        @media (min-width: 768px) {
          .custom-pagination .swiper-pagination-bullet-active {
            width: 48px;
          }
        }
      `}</style>
    </section>
  );
}
