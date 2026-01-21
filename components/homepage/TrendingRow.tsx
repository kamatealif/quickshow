"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import TrendingCard from "@/components/trending-card";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

type TrendingRowProps = {
  title: string;
  subtitle?: string;
  movies: any[];
};

export default function TrendingRow({
  title,
  subtitle,
  movies,
}: TrendingRowProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-12 bg-[#020202]">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-8 px-6 md:px-16 lg:px-32">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-[#e11d48] rounded-full shadow-[0_0_10px_#e11d48]" />
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-sm md:text-base text-zinc-500 font-medium pl-4 italic">
              {subtitle}
            </p>
          )}
        </div>

        {/* Custom Navigation Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="row-prev p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all active:scale-90">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="row-next p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all active:scale-90">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="px-6 md:px-16 lg:px-32 relative group">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1.2} // Show a peek of the next card on mobile
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".row-next",
            prevEl: ".row-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
            1536: { slidesPerView: 5.2 },
          }}
          className="!overflow-visible" // Allows cards to not be clipped while moving
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <TrendingCard {...movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Make the slider feel more "fluid" */
        .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        /* Disable default swiper navigation icons */
        .swiper-button-next:after,
        .swiper-button-prev:after {
          display: none;
        }
      `}</style>
    </section>
  );
}
