import HomeHero from "@/components/homepage/HomeHero";
import TrendingSlider from "@/components/homepage/TrendingSlider";
import TrendingRow from "@/components/homepage/TrendingRow";
import MovieCard from "@/components/movies/movie-card";
import WhyQuickShow from "@/components/homepage/WhyQuickShow";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// TMDB helpers
const tmdbBackdrop = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";

const tmdbPoster = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  /* ───────────────────────── HERO (RANDOM EACH REFRESH) ───────────────────────── */

  const { count } = await supabase
    .from("movies")
    .select("*", { count: "exact", head: true })
    .not("backdrop_path", "is", null);

  const heroLimit = 5;
  const total = count ?? 0;

  const randomOffset =
    total > heroLimit ? Math.floor(Math.random() * (total - heroLimit)) : 0;

  const { data: heroData } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      overview,
      backdrop_path,
      vote_average,
      release_date
    `,
    )
    .not("backdrop_path", "is", null)
    .range(randomOffset, randomOffset + heroLimit - 1);

  const heroMovies =
    heroData?.map((m) => ({
      id: String(m.id),
      title: m.title ?? "Untitled",
      backdrop_path: tmdbBackdrop(m.backdrop_path),
      vote_average: Number(m.vote_average ?? 0),
      release_date: m.release_date ?? "",
      overview: m.overview ?? "",
    })) ?? [];

  /* ───────────────────────── TRENDING (SOCIAL PROOF) ───────────────────────── */

  const { data: trendingData } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      poster_path,
      vote_average,
      vote_count
    `,
    )
    .not("poster_path", "is", null)
    .order("vote_count", { ascending: false })
    .limit(15);

  const trendingMovies =
    trendingData?.map((m) => ({
      id: String(m.id),
      title: m.title ?? "Untitled",
      poster_path: tmdbPoster(m.poster_path),
      vote_average: Number(m.vote_average ?? 0),
    })) ?? [];

  /* ───────────────────────── FEATURED (CURATED) ───────────────────────── */

  const { data: featuredData } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      poster_path,
      vote_average
    `,
    )
    .not("poster_path", "is", null)
    .gte("vote_average", 7.5)
    .order("vote_average", { ascending: false })
    .limit(10);

  const featuredMovies =
    featuredData?.map((m) => ({
      id: String(m.id),
      title: m.title ?? "Untitled",
      poster_path: tmdbPoster(m.poster_path),
      vote_average: Number(m.vote_average ?? 0),
    })) ?? [];

  /* ───────────────────────── RENDER ───────────────────────── */

  return (
    <main className="bg-[#020202] min-h-screen text-white overflow-x-hidden">
      {/* 1. HERO */}
      <HomeHero initialMovies={heroMovies} />

      {/* 2. TRENDING MARQUEE */}
      <section className="py-14 border-y border-white/5 bg-black/20">
        <TrendingSlider movies={trendingMovies} />
      </section>

      {/* 3. TRENDING ROW */}
      <TrendingRow
        title="Trending This Week"
        subtitle="Popular movies people are watching right now"
        movies={trendingMovies}
      />

      {/* 4. FEATURED GRID */}
      <section className="px-6 md:px-16 lg:px-32 py-20">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Featured Selection
          </h2>
          <div className="w-20 h-1.5 bg-primary mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </section>

      {/* 5. STATIC VALUE SECTION */}
      <WhyQuickShow />
    </main>
  );
}
