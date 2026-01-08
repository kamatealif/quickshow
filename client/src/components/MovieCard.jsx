import React from "react";
import { Star, Play, Ticket, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movies/${movie._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div className="group relative p-5 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] hover:border-primary/40 hover:-translate-y-4 shadow-2xl">
      {/* Poster with Inner Shadow */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] bg-neutral-900 shadow-2xl">
        <img
          onClick={handleNavigate}
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        {/* Hover Blur Overlay */}
        <div
          onClick={handleNavigate}
          className="absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
        >
          <div className="p-5 bg-primary rounded-full shadow-[0_0_30px_rgba(230,36,41,0.6)] transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-black text-white">
            {movie.vote_average?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="mt-6 px-2">
        <h3 className="text-white font-bold text-xl md:text-2xl truncate group-hover:text-primary transition-colors duration-300">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(movie.release_date).getFullYear()}
          </span>
          <span className="text-white/10">|</span>
          <span className="truncate">
            {movie.genres?.slice(0, 1).map((g) => g.name) || "Action"}
          </span>
        </div>

        {/* Divider & Metadata */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
            <Clock className="w-4 h-4 text-primary" />
            {timeFormat(movie.runtime)} Min
          </div>
          <span className="px-2 py-1 bg-white/5 rounded text-[9px] text-gray-500 border border-white/5 uppercase">
            Ultra HD
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNavigate}
          className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-primary text-white text-[11px] font-black rounded-2xl transition-all hover:brightness-125 hover:shadow-[0_0_20px_rgba(230,36,41,0.4)] active:scale-[0.95]"
        >
          <Ticket className="w-4 h-4" />
          GET TICKETS
        </button>
      </div>
    </motion.div>
  );
};

export default MovieCard;
