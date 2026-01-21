import MovieCard from "../movie-card";

export default function FeaturedMovies({ movies }: { movies: any[] }) {
  return (
    <section className="px-6 md:px-16 lg:px-32 py-16 bg-[#020202]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white">
          Featured Movies
        </h2>

        <span className="text-sm text-gray-400">
          Handpicked from our collection
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
}
