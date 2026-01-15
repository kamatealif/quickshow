import HeroSlider from "./hero-slider";

import { fetchFromTMDB } from "@/lib/tmdb";

export default async function HomeHero() {
  const data = await fetchFromTMDB("/trending/movie/week");

  // limit to 5 for hero
  const movies = data.results.slice(0, 5);

  return <HeroSlider movies={movies} />;
}
