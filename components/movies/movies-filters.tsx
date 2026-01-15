"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Genre } from "@/lib/tmdb-genres";

export default function MoviesFilters({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // IMPORTANT: local state only, not auto-syncing
  const [query, setQuery] = useState("");
  const activeGenre = params.get("genre") ?? "";

  // Track last applied query to avoid re-push
  const lastQueryRef = useRef<string | null>(null);

  function applySearch() {
    const trimmed = query.trim();

    // ❌ Do nothing if empty
    if (!trimmed) return;

    // ❌ Do nothing if same query already applied
    if (lastQueryRef.current === trimmed) return;

    const sp = new URLSearchParams(params.toString());
    sp.set("q", trimmed);

    lastQueryRef.current = trimmed;

    startTransition(() => {
      router.push(`/movies?${sp.toString()}`);
    });
  }

  function applyGenre(genre: string) {
    const sp = new URLSearchParams(params.toString());

    genre ? sp.set("genre", genre) : sp.delete("genre");

    startTransition(() => {
      router.push(`/movies?${sp.toString()}`);
    });
  }

  return (
    <div className="mb-12 space-y-8">
      {/* Search */}
      <div className="relative max-w-md group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Search className="h-5 w-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
          )}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          placeholder="Search for movies..."
          className="w-full pl-14 pr-6 py-5 rounded-[2rem]
            bg-zinc-900/40 border border-white/5
            text-white placeholder:text-zinc-600
            outline-none focus:border-primary/50 transition-all"
        />
      </div>

      {/* Genre pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => applyGenre("")}
          className={cn(
            "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border transition-all",
            activeGenre === ""
              ? "bg-primary border-primary text-white"
              : "bg-white/5 border-white/5 text-zinc-500 hover:text-white"
          )}
        >
          All Genres
        </button>

        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => applyGenre(String(g.id))}
            className={cn(
              "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border transition-all whitespace-nowrap",
              activeGenre === String(g.id)
                ? "bg-primary border-primary text-white"
                : "bg-white/5 border-white/5 text-zinc-500 hover:text-white"
            )}
          >
            {g.name}
          </button>
        ))}
      </div>
    </div>
  );
}
