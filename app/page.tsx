import { db } from "@/drizzle/src/db";
import { movies as dbTable } from "@/drizzle/src/db/schema";
import { desc, gte, ilike, sql } from "drizzle-orm";

// COMPONENTS
import HomeHero from "@/components/homepage/home-hero";
import FeaturedSection from "@/components/homepage/featured-section";

export default async function HomePage() {
  // Parallel Fetching for 3 distinct 8-movie pools
  const [topRatedData, recentData, actionData] = await Promise.all([
    // Pool 1: Random selection of movies rated 8.0+
    db.select().from(dbTable)
      .where(gte(dbTable.imdbRating, 8.0))
      .orderBy(sql`RANDOM()`)
      .limit(8),

    // Pool 2: Latest releases, shuffled to keep it fresh
    db.select().from(dbTable)
      .orderBy(desc(dbTable.yearOfRelease))
      .limit(15), // Fetch more to allow for duplication filtering

    // Pool 3: Random action movies
    db.select().from(dbTable)
      .where(ilike(dbTable.genres, "%Action%"))
      .orderBy(sql`RANDOM()`)
      .limit(8),
  ]);

  // Unified Data Mapper
  const mapMovies = (data: any[]) =>
    data.map((m, index) => ({
      id: m.imdbId || `movie-${index}-${Math.random()}`, 
      title: m.titleX || "Encrypted Title",
      poster_path: m.posterPath,
      vote_average: m.imdbRating || 0,
      release_date: m.releaseDate || m.yearOfRelease?.toString() || "2026",
      runtime: m.runtime || 120,
      overview: m.summary || m.story || "No neural description available.",
    }));

  // Filtering to prevent the same movie appearing in 'Top Rated' and 'Latest Drops'
  const topIds = new Set(topRatedData.map(m => m.imdbId));
  const uniqueRecent = recentData
    .filter(m => !topIds.has(m.imdbId))
    .slice(0, 8);

  return (
    <main className="relative min-h-screen bg-[#020202] overflow-x-hidden pb-20">
      {/* 1. HERO SECTION */}
      <HomeHero />
      
      {/* 2. FEATURED SECTIONS (8 Movies Each) */}
      <div className="space-y-12 mt-10">
        <FeaturedSection 
          initialMovies={mapMovies(topRatedData)} 
          title="Top Rated" 
          subtitle="Critics pick" 
        />

        <FeaturedSection 
          initialMovies={mapMovies(uniqueRecent)} 
          title="Latest Drops" 
          subtitle="Fresh release" 
        />

        <FeaturedSection 
          initialMovies={mapMovies(actionData)} 
          title="Action Pulse" 
          subtitle="High voltage" 
        />
      </div>
    </main>
  );
}