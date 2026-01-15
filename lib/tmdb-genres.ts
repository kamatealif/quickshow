export type Genre = {
  id: number;
  name: string;
};

export async function fetchMovieGenres(): Promise<Genre[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data?.genres) ? data.genres : [];
}
