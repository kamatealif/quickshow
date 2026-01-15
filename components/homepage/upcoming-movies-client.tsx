"use client";

import { useState } from "react";
import TrailerCard from "@/components/homepage/trailer-card";
import TrailerModal from "@/components/homepage/trailer-modal";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function UpcomingMoviesClient({
  movies = [],
}: {
  movies?: Movie[];
}) {
  const [open, setOpen] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);

  const handlePlayTrailer = (id: number) => {
    setActiveMovieId(id);
    setOpen(true);
  };

  if (!movies.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500">No media available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid of Trailer-First Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {movies.map((movie) => (
          <TrailerCard
            key={movie.id}
            movie={movie}
            onPlay={handlePlayTrailer}
          />
        ))}
      </div>

      {/* Shared Modal */}
      <TrailerModal
        open={open}
        movieId={activeMovieId}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
