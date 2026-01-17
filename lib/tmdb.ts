const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Safe fetch with timeout.
 * - Never throws
 * - Returns null on failure
 */
async function safeFetch(
  url: string,
  options: RequestInit,
  timeoutMs = 15000
): Promise<Response | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * TMDB fetcher
 * ✔ Never throws
 * ✔ Safe for build-time prerender
 * ✔ Handles network timeouts
 * ✔ Handles rate limits
 * ✔ Retries once
 * ✔ Silent in production
 */
export async function fetchFromTMDB(endpoint: string) {
  try {
    const token = process.env.TMDB_READ_TOKEN;

    // 🔒 Build + runtime safe
    if (!token) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "TMDB_READ_TOKEN missing — TMDB data will be skipped."
        );
      }
      return null;
    }

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const url = `${TMDB_BASE_URL}${normalizedEndpoint}`;

    // 🔁 Retry once on network failure
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await safeFetch(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // 🔥 aggressive caching (homepage safe)
          next: { revalidate: 60 * 60 * 12 }, // 12 hours
        },
        15000
      );

      // Network failure / timeout
      if (!res) continue;

      // Rate limit
      if (res.status === 429) return null;

      // Other HTTP errors
      if (!res.ok) return null;

      return await res.json();
    }

    // All attempts failed
    return null;
  } catch {
    // 🚫 ABSOLUTE GUARANTEE: never crash
    return null;
  }
}
