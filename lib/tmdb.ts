const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(
    `${TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`,
    {
      // Cache for performance (Next.js feature)
      next: { revalidate: 60 * 60 }, // 1 hour
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB data")
  }

  return res.json()
}
