const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchWithTimeout(url: string, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchFromTMDB(endpoint: string) {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url =
    `${TMDB_BASE_URL}${normalizedEndpoint}` +
    (normalizedEndpoint.includes("?") ? "&" : "?") +
    `api_key=${process.env.TMDB_API_KEY}`;

  // 🔁 Retry once on network failure
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(url, 8000);

      if (res.status === 429) {
        console.warn("TMDB rate limit hit");
        return null;
      }

      if (!res.ok) {
        console.warn("TMDB HTTP error:", res.status);
        return null;
      }

      return await res.json();
    } catch {
      if (attempt === 2) {
        if (process.env.NODE_ENV === "development") {
          console.warn("TMDB request failed after retry:", url);
        }
        return null;
      }
    }
  }

  return null;
}
