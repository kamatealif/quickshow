"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

function FilterContent() {
  const router = useRouter();
  const params = useSearchParams();

  // State
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState(params.get("sort") ?? "popular");
  const [rating, setRating] = useState(params.get("rating") ?? "0");

  const isDirty = query !== "" || sort !== "popular" || rating !== "0";

  function applyFilters() {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (sort) search.set("sort", sort);
    if (rating !== "0") search.set("rating", rating);
    search.set("page", "1"); // Reset to page 1 on new filter
    router.push(`/movies?${search.toString()}`, { scroll: false });
  }

  const clearFilters = () => {
    setQuery("");
    setSort("popular");
    setRating("0");
    router.push("/movies", { scroll: false });
  };

  return (
    <div className="w-full space-y-4">
      {/* Label/Header (Optional) */}
      <div className="flex items-center gap-2 px-1 mb-2">
        <Filter className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Refine Search
        </span>
      </div>

      {/* Main Glass Container */}
      <div className="group relative">
        {/* Border Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />

        <div className="relative flex flex-col lg:flex-row items-stretch lg:items-center gap-3 p-3 rounded-[2rem] bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
          {/* 1. Interactive Search Field */}
          <div className="relative flex-1 group/input">
            {/* No icon inside, much cleaner typography */}
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="What are you looking for?"
              className="h-14 px-6 bg-white/[0.03] border-white/10 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-zinc-600 transition-all text-base border-dashed focus:border-solid"
            />

            {/* Clear Button (Visible only when typing) */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full text-zinc-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Tactical Sort Select */}
          <div className="flex flex-row gap-3">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-14 min-w-[160px] bg-white/[0.03] border-white/5 rounded-2xl focus:ring-primary/40 hover:bg-white/5 transition-colors">
                <SlidersHorizontal className="mr-2.5 h-4 w-4 text-zinc-500" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white rounded-2xl backdrop-blur-3xl">
                <SelectItem value="popular">Trending First</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="latest">Newly Released</SelectItem>
              </SelectContent>
            </Select>

            {/* 3. Rating Select */}
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="h-14 min-w-[140px] bg-white/[0.03] border-white/5 rounded-2xl focus:ring-primary/40 hover:bg-white/5 transition-colors">
                <Star className="mr-2.5 h-4 w-4 text-zinc-500" />
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white rounded-2xl backdrop-blur-3xl">
                <SelectItem value="0">All Ratings</SelectItem>
                <SelectItem value="7">Min 7.0+</SelectItem>
                <SelectItem value="8">Min 8.0+</SelectItem>
                <SelectItem value="9">Min 9.0+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 4. Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={applyFilters}
              size="lg"
              className="h-14 flex-1 lg:flex-none px-10 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Apply
            </Button>

            <AnimatePresence>
              {isDirty && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilters}
                    className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 group"
                  >
                    <RotateCcw className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors group-hover:-rotate-180 duration-500" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 5. Active Filter Status Chips */}
      <div className="flex flex-wrap gap-2 px-2 min-h-[24px]">
        {query && (
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          >
            Search: {query}
          </Badge>
        )}
        {rating !== "0" && (
          <Badge
            variant="secondary"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          >
            Min Score: {rating}+
          </Badge>
        )}
      </div>
    </div>
  );
}

export default function MovieFilters() {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full animate-pulse bg-white/5 rounded-[2rem]" />
      }
    >
      <FilterContent />
    </Suspense>
  );
}
