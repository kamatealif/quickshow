import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import MovieCard from "@/components/MoiveCard";
import type { Movie } from "@/types/movie";

export default function MovieSection({
  title,
  subtitle,
  movies,
}: {
  title: string;
  subtitle?: string;
  movies: Movie[];
}) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 py-16">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-rose-400/80">
          {subtitle || "From the vault"}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase">
          {title}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
