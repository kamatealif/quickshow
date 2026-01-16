const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 15000
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchFromTMDB(endpoint: string) {
  const token = process.env.TMDB_READ_TOKEN;

  if (!token) {
    throw new Error("TMDB_READ_TOKEN is missing");
  }

  const url = `${TMDB_BASE_URL}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // 🔥 heavy caching (homepage-safe)
          next: { revalidate: 60 * 60 * 12 }, // 12 hours
        },
        15000
      );

      if (!res.ok) return null;
      return await res.json();
    } catch {
      if (attempt === 2 && process.env.NODE_ENV === "development") {
        console.warn("TMDB request failed (network/timeout):", url);
      }
    }
  }

  return null;
}
