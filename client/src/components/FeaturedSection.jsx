import React from "react";
import { ArrowRight, Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FEATURED_MOVIES = [
  {
    id: 1,
    title: "Deadpool & Wolverine",
    rating: "8.1",
    year: "2024",
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    rating: "8.2",
    year: "2021",
    category: "Sci-Fi",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Thor: Love and Thunder",
    rating: "6.2",
    year: "2022",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "The Avengers",
    rating: "8.4",
    year: "2012",
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Black Widow",
    rating: "6.7",
    year: "2021",
    category: "Action",
    image:
      "https://images.unsplash.com/photo-1636467222374-f37672bd22c6?q=80&w=400&h=600&fit=crop",
  },
];

function FeaturedSection() {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 lg:px-36 py-12 bg-black">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
            Marvel Universe
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter">
            Now Showing
          </h2>
        </div>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
        </button>
      </div>

      {/* 2. Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {FEATURED_MOVIES.map((movie) => {
          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Poster Card */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-neutral-900 border border-white/5 shadow-2xl">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-primary rounded-full shadow-xl">
                    <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>

                {/* Rating Tag */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-[10px] font-bold text-white">
                    {movie.rating}
                  </span>
                </div>
              </div>

              {/* Movie Details Below Card */}
              <div className="mt-3">
                <h3 className="text-white font-medium text-xs md:text-sm truncate group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">
                  <span>{movie.category}</span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedSection;
