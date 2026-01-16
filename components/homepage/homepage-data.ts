import { fetchFromTMDB } from "@/lib/tmdb";

export async function getHomepageMovies() {
  const [nowPlaying, trending, upcoming] = await Promise.all([
    fetchFromTMDB("/movie/now_playing"),
    fetchFromTMDB("/trending/movie/week"),
    fetchFromTMDB("/movie/upcoming"),
  ]);

  return {
    nowPlaying: Array.isArray(nowPlaying?.results)
      ? nowPlaying.results
      : [],
    trending: Array.isArray(trending?.results)
      ? trending.results
      : [],
    upcoming: Array.isArray(upcoming?.results)
      ? upcoming.results
      : [],
  };
}
