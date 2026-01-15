const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint: string) {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url =
    `${TMDB_BASE_URL}${normalizedEndpoint}` +
    (normalizedEndpoint.includes("?") ? "&" : "?") +
    `api_key=${process.env.TMDB_API_KEY}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000); // 8s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 * 60 },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("TMDB responded with error:", res.status, url);
      return { results: [] };
    }

    return await res.json();
  } catch (error: any) {
    console.error("TMDB fetch failed:", {
      url,
      message: error?.message,
    });

    // ✅ NEVER crash the app
    return { results: [] };
  }
}
