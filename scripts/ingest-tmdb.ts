import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first"); // Critical fix for Node 18+

import "dotenv/config";
import axios from "axios";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { movies } from "../drizzle/src/db/schema";

// --- Configuration ---
const TMDB_KEY = process.env.TMDB_API_KEY!;
const DATABASE_URL = process.env.DATABASE_URL!;
const BASE_URL = "https://api.themoviedb.org/3";
const MAX_PAGES = 5; // Start small to test

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

async function ingest() {
  console.log("🚀 Starting Bypass Ingestion...");

  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`📥 Fetching Page ${page}...`);

    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: TMDB_KEY, page },
        timeout: 20000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        }
      });

      const results = response.data.results;
      console.log(`✅ Received ${results.length} movies. Inserting to DB...`);

      for (const m of results) {
        await db.insert(movies).values({
          tmdbId: m.id,
          title: m.title,
          overview: m.overview,
          releaseDate: m.release_date || null,
          rating: m.vote_average?.toString() || "0",
          posterPath: m.poster_path,
          backdropPath: m.backdrop_path,
          language: m.original_language,
          popularity: m.popularity?.toString() || "0",
        }).onConflictDoNothing();
      }

      // Small delay to prevent rate-limit triggers
      await new Promise(res => setTimeout(res, 1000));

    } catch (error: any) {
      console.error(`❌ Error on Page ${page}:`);
      if (error.code === 'ECONNABORTED') console.error("-> Timeout: Connection took too long.");
      else if (error.response) console.error(`-> API Error: ${error.response.status}`);
      else console.error(`-> Network Error: ${error.message}`);
      
      console.log("💡 Suggestion: Try turning on a VPN or switching to a Mobile Hotspot.");
      break; 
    }
  }

  await pool.end();
  console.log("🏁 Ingestion complete.");
}

run();

async function run() {
    try {
        // Test DB first
        await db.select({ id: movies.id }).from(movies).limit(1);
        await ingest();
    } catch (e: any) {
        console.error("Critical Failure:", e.message);
        process.exit(1);
    }
}