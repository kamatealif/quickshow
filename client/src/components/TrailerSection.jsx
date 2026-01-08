import React, { useState } from "react";
import { PlayCircleIcon, FilmIcon, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { dummyTrailers } from "../assets/assets";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 bg-black relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      {/* Header Section */}
      <div className="flex items-center gap-3 mb-10 max-w-[960px] mx-auto">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FilmIcon className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-white font-bold text-2xl uppercase tracking-tighter">
          Official Trailers
        </h2>
      </div>

      {/* Main Player */}
      <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 aspect-video max-w-[960px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          <motion.iframe
            key={currentTrailer.videoUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${getYouTubeId(
              currentTrailer.videoUrl
            )}?autoplay=0&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></motion.iframe>
        </AnimatePresence>
      </div>

      {/* --- FIXED BOTTOM TRAILER IMAGES --- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-[960px] mx-auto">
        {dummyTrailers.map((trailer, idx) => {
          const isActive = currentTrailer.videoUrl === trailer.videoUrl;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group/thumb relative cursor-pointer rounded-2xl overflow-hidden aspect-video border-2 transition-all duration-500 ${
                isActive
                  ? "border-primary shadow-[0_10px_30px_-10px_rgba(230,36,41,0.6)]"
                  : "border-white/5 opacity-60 hover:opacity-100 hover:border-white/20"
              }`}
              onClick={() => setCurrentTrailer(trailer)}
            >
              {/* Image with improved contrast */}
              <img
                src={trailer.image}
                alt="Trailer Thumbnail"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isActive ? "scale-110" : "group-hover/thumb:scale-110"
                }`}
              />

              {/* Cinematic Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive
                    ? "bg-primary/10"
                    : "bg-black/40 group-hover/thumb:bg-black/20"
                }`}
              />

              {/* Improved Play Icon logic */}
              {!isActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transform group-hover/thumb:scale-110 transition-transform">
                    <PlayCircleIcon className="w-8 h-8 text-white/90 stroke-[1.5px]" />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Active Progress Bar at bottom */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TrailerSection;
