import MovieCard from "@/components/movies/movie-card";
import MovieFilters from "@/components/movies/MovieFilters";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChevronRight, ChevronLeft, Film } from "lucide-react";

const tmdbPoster = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

const PAGE_SIZE = 20;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    rating?: string;
    page?: string;
  }>;
}) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;

  const search = params.q ?? "";
  const sort = params.sort ?? "popular";
  const rating = Number(params.rating ?? 0);
  const page = Number(params.page ?? 1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("movies")
    .select("id, title, poster_path, vote_average", { count: "exact" })
    .not("poster_path", "is", null);

  if (search) query = query.ilike("title", `%${search}%`);
  if (rating > 0) query = query.gte("vote_average", rating);

  switch (sort) {
    case "rating":
      query = query.order("vote_average", { ascending: false });
      break;
    case "latest":
      query = query.order("release_date", { ascending: false });
      break;
    default:
      query = query.order("vote_count", { ascending: false });
  }

  const { data, count } = await query.range(from, to);

  const movies =
    data?.map((m) => ({
      id: String(m.id),
      title: m.title ?? "Untitled",
      poster_path: tmdbPoster(m.poster_path),
      vote_average: Number(m.vote_average ?? 0),
    })) ?? [];

  const totalResults = count ?? 0;
  const hasMore = totalResults > page * PAGE_SIZE;

  const getPageUrl = (nextPage: number) => {
    const p = new URLSearchParams();
    if (search) p.set("q", search);
    if (sort) p.set("sort", sort);
    if (rating) p.set("rating", String(rating));
    p.set("page", String(nextPage));
    return `/movies?${p.toString()}`;
  };

  return (
    <main className="bg-[#020202] min-h-screen text-white px-6 md:px-16 lg:px-32 py-20">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-10 bg-[#e11d48] rounded-full shadow-[0_0_15px_#e11d48]" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Archive
            </h1>
          </div>
          <p className="text-zinc-500 max-w-xl text-lg font-medium italic">
            Explore our complete cinematic database.
          </p>
        </div>

        {/* Feature 1: Results Metadata */}
        <div className="text-zinc-500 font-mono text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10">
          <span className="text-white font-bold">
            {totalResults.toLocaleString()}
          </span>{" "}
          MOVIES FOUND
        </div>
      </div>

      <div className="mb-12 sticky top-24 z-40 space-y-4">
        <MovieFilters />

        {/* Feature 2: Active Filter Chips */}
        {(search || rating > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2">
              Active:
            </span>
            {search && (
              <span className="flex items-center gap-2 px-3 py-1 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-full text-xs text-[#e11d48]">
                "{search}"
              </span>
            )}
            {rating > 0 && (
              <span className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-500">
                ★ {rating}+
              </span>
            )}
            <Link
              href="/movies"
              className="text-xs text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
            >
              Clear All
            </Link>
          </div>
        )}
      </div>

      {movies.length === 0 ? (
        <div className="py-40 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <Film className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 text-xl font-medium">
            No results found for your selection.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>

          {/* Feature 3: Bidirectional Pagination */}
          <div className="flex items-center justify-between mt-24 pt-12 border-t border-white/5">
            <div className="flex-1">
              {page > 1 && (
                <Link
                  href={getPageUrl(page - 1)}
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold uppercase text-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </Link>
              )}
            </div>

            <div className="flex-none text-zinc-500 font-mono">PAGE {page}</div>

            <div className="flex-1 text-right">
              {hasMore && (
                <Link
                  href={getPageUrl(page + 1)}
                  className="inline-flex items-center gap-2 text-[#e11d48] hover:text-[#fb7185] transition-colors font-bold uppercase text-sm"
                >
                  Next Page
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
