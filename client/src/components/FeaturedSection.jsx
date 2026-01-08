import React, { useState, useRef } from "react";
import { ArrowRight, Plus, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

function FeaturedSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Set initial visible count to 8 (2 rows of 4)
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleMovies = () => {
    if (visibleCount < dummyShowsData.length) {
      // Increase by 8 to add two more full rows
      setVisibleCount((prev) => Math.min(prev + 8, dummyShowsData.length));
    } else {
      // Reset to initial 8 and scroll smoothly back to the top of the section
      setVisibleCount(8);
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="px-6 md:px-16 lg:px-36 py-20 bg-black">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2">
            Marvel Universe
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Now Showing
          </h2>
        </div>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all cursor-pointer border-b border-transparent hover:border-primary pb-1 w-fit"
        >
          Explore All Movies
          <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
        </button>
      </div>

      {/* 2. Optimized Grid: Fixed to 4 Columns on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
        <AnimatePresence mode="popLayout">
          {dummyShowsData.slice(0, visibleCount).map((show, index) => (
            <motion.div
              key={show._id || index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
            >
              <MovieCard movie={show} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. Logic-Driven Toggle Button */}
      {dummyShowsData.length > 8 && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={toggleMovies}
            className={`flex items-center gap-3 px-12 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 group border-2 ${
              visibleCount < dummyShowsData.length
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 shadow-[0_0_20px_rgba(230,36,41,0.2)]"
            }`}
          >
            {visibleCount < dummyShowsData.length ? (
              <>
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                SHOW MORE
              </>
            ) : (
              <>
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                SHOW LESS
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default FeaturedSection;
