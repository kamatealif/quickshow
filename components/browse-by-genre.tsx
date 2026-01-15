"use client"

import Link from "next/link"

const GENRES = [
  { name: "Action", slug: "action" },
  { name: "Comedy", slug: "comedy" },
  { name: "Drama", slug: "drama" },
  { name: "Horror", slug: "horror" },
  { name: "Sci-Fi", slug: "science-fiction" },
  { name: "Adventure", slug: "adventure" },
]

export default function BrowseByGenre() {
  return (
    <section className="py-14 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Browse by Genre
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {GENRES.map((genre) => (
            <Link
              key={genre.slug}
              href={`/movies?genre=${genre.slug}`}
              className="shrink-0 rounded-full border border-white/10
                px-6 py-3 text-sm font-semibold text-gray-300
                hover:bg-primary hover:text-white hover:border-primary
                transition-all"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
