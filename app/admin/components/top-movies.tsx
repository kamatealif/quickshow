"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/badge"; // or custom bar

export default function TopMovies({ bookings }: { bookings: any[] }) {
  const sortedMovies = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      const title = b.movie_title; // Schema direct access
      if (!title) return;
      map[title] = (map[title] || 0) + (Number(b.total_amount) || 0);
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [bookings]);

  const maxRevenue = sortedMovies[0]?.[1] || 1;

  return (
    <div className="space-y-6">
      {sortedMovies.map(([title, revenue]) => (
        <div key={title} className="space-y-2">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
            <span className="truncate pr-4">{title}</span>
            <span className="text-primary italic">
              ₹{revenue.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${(revenue / maxRevenue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
