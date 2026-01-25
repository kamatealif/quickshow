"use client";

import { useMemo } from "react";

export default function RevenueByShowtime({ bookings }: { bookings: any[] }) {
  const timeMap = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      const t = b.show_time; // Correct column name
      if (!t) return;
      // Slice HH:MM if it includes seconds
      const formattedTime = t.slice(0, 5);
      map[formattedTime] =
        (map[formattedTime] || 0) + (Number(b.total_amount) || 0);
    });
    return Object.entries(map).sort();
  }, [bookings]);

  return (
    <div className="space-y-4">
      {timeMap.map(([time, revenue]) => (
        <div
          key={time}
          className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5"
        >
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
            {time} Slot
          </span>
          <span className="text-sm font-black italic text-primary">
            ₹{revenue.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
