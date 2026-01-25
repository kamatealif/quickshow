"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";

export default function PeakHours({ bookings }: { bookings: any[] }) {
  const peakHour = useMemo(() => {
    const hours: Record<string, number> = {};
    bookings.forEach((b) => {
      const h = new Date(b.created_at).getHours();
      hours[h] = (hours[h] || 0) + 1;
    });

    const sorted = Object.entries(hours).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : null;
  }, [bookings]);

  return (
    <div className="p-6 rounded-[2rem] bg-zinc-950/50 border border-white/5 flex items-center gap-6">
      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Clock className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Traffic Peak
        </p>
        <h3 className="text-2xl font-black italic uppercase text-white">
          {peakHour ? `${peakHour}:00` : "—"}
        </h3>
      </div>
    </div>
  );
}
