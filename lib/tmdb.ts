const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint: string) {
  // Ensure endpoint starts correctly
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  // Ensure correct query separator
  const url =
    `${TMDB_BASE_URL}${normalizedEndpoint}` +
    (normalizedEndpoint.includes("?") ? "&" : "?") +
    `api_key=${process.env.TMDB_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 }, // 1 hour cache
  });

  if (!res.ok) {
    console.error("TMDB FETCH FAILED:", url, res.status);
    throw new Error("Failed to fetch TMDB data");
  }

  return res.json();
}
