"use server";

import { db } from "@/drizzle/src/db";
import { movies as dbTable } from "@/drizzle/src/db/schema";
import { ilike, or } from "drizzle-orm";

export async function searchDatabase(query: string) {
  if (!query || query.length < 2) return [];

  const results = await db
    .select()
    .from(dbTable)
    .where(
      or(
        ilike(dbTable.titleX, `%${query}%`),
        ilike(dbTable.originalTitle, `%${query}%`),
        ilike(dbTable.actors, `%${query}%`),
        ilike(dbTable.genres, `%${query}%`)
      )
    )
    .limit(12);

  return results.map(m => ({
    id: m.imdbId,
    title: m.titleX || "Unknown",
    poster_path: m.posterPath,
    vote_average: m.imdbRating || 0,
    release_date: m.releaseDate || m.yearOfRelease?.toString() || "N/A",
    overview: m.summary || m.story || "No description available.",
  }));
}