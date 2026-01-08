import React, { useState } from "react";
import { assets } from "../assets/assets";
import { ArrowRight, ClockIcon, Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const MOVIE_DATA = [
  {
    title: "Black Panther",
    subtitle: "Wakanda Forever",
    genres: "Action | Adventure",
    duration: "2h 41m",
    rating: "7.2",
    description:
      "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Spider-Man",
    subtitle: "No Way Home",
    genres: "Action | Adventure",
    duration: "2h 28m",
    rating: "8.2",
    description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help, accidentally unleashing multiversal threats.",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Guardians",
    subtitle: "Volume 2",
    genres: "Action | Sci-fi",
    duration: "2h 16m",
    rating: "7.6",
    description:
      "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage.",
    image:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "The Avengers",
    subtitle: "Endgame",
    genres: "Action | Drama",
    duration: "3h 02m",
    rating: "8.4",
    description:
      "The remaining Avengers must assemble once more to restore balance to the universe after Thanos' devastating actions.",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Doctor Strange",
    subtitle: "Multiverse",
    genres: "Fantasy | Sci-fi",
    duration: "2h 06m",
    rating: "6.9",
    description:
      "Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses to battle threats.",
    image:
      "https://images.unsplash.com/photo-1636467222374-f37672bd22c6?q=80&w=2076&auto=format&fit=crop",
  },
];

function HeroSection() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative h-dvh w-full bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="h-full w-full"
      >
        {MOVIE_DATA.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black overflow-hidden">
              {/* Image Layer - darker on mobile for text readability */}
              <img
                src={movie.image}
                className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-70"
                alt=""
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />

              {/* Content Box */}
              <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-32">
                <AnimatePresence mode="wait">
                  {activeIdx === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-3xl"
                    >
                      {/* Brand Logo - Scaled for mobile */}
                      <img
                        src={assets.marvelLogo}
                        alt="marvel"
                        className="h-6 md:h-10 mb-6"
                      />

                      <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-2 text-[10px] md:text-xs">
                        Now Streaming
                      </h2>

                      {/* Responsive Title sizes */}
                      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight uppercase">
                        {movie.title}
                      </h1>
                      <p className="text-xl sm:text-2xl md:text-4xl font-light text-gray-400 mb-6">
                        {movie.subtitle}
                      </p>

                      {/* Info Pills */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/40 px-2 py-1 rounded">
                          <Star className="w-3 md:w-4 h-3 md:h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-yellow-500 font-bold text-xs md:text-sm">
                            {movie.rating}
                          </span>
                        </div>
                        <span className="text-gray-300 text-xs md:text-sm font-medium">
                          {movie.genres}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs md:text-sm">
                          <ClockIcon className="w-3 md:w-4 h-3 md:h-4" />{" "}
                          {movie.duration}
                        </div>
                      </div>

                      {/* Description - Clamped to 2 lines on small mobile */}
                      <p className="text-gray-300 text-sm md:text-lg max-w-xl mb-8 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {movie.description}
                      </p>

                      {/* Buttons - Stacked on tiny screens, flex on mobile+ */}
                      <div className="flex items-center gap-3 md:gap-4">
                        <button
                          onClick={() => navigate("/movies")}
                          className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-full text-xs md:text-base font-bold hover:brightness-110 transition-all shadow-lg active:scale-95"
                        >
                          EXPLORE{" "}
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs md:text-base font-bold hover:bg-white/20 transition-all active:scale-95">
                          <Play className="w-3 md:w-4 h-3 md:h-4 fill-current" />{" "}
                          TRAILER
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="custom-pagination flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto shadow-2xl" />
        </div>
      </Swiper>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white !important;
          opacity: 0.2;
          margin: 0 !important;
          transition: all 0.4s ease;
        }
        @media (min-width: 768px) {
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 25px;
          opacity: 1;
          background: var(--color-primary) !important;
          border-radius: 20px;
        }
        @media (min-width: 768px) {
          .custom-pagination .swiper-pagination-bullet-active {
            width: 45px;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
