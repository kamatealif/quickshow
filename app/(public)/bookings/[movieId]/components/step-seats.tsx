"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Armchair, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const rows = ["A", "B", "C", "D", "E"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8];

export default function StepSeats({
  movie,
  showtime,
  onConfirm,
  onBack,
}: {
  movie?: { title: string };
  showtime?: { date: string; time: string };
  onConfirm: (seats: string[]) => void;
  onBack: () => void;
}) {
  const supabase = createSupabaseBrowserClient();

  const [selected, setSelected] = useState<string[]>([]);
  const [occupied, setOccupied] = useState<Set<string>>(new Set());
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    // ✅ HARD GUARD — prevents crash
    if (!movie?.title || !showtime?.date || !showtime?.time) {
      setOccupied(new Set());
      return;
    }

    let cancelled = false;

    async function fetchOccupiedSeats() {
      setFetching(true);

      const { data, error } = await supabase
        .from("bookings")
        .select("seats")
        .eq("movie_title", movie.title)
        .eq("show_date", showtime.date)
        .eq("show_time", showtime.time);

      if (cancelled) return;

      if (error) {
        console.error("Seat fetch error:", error);
        setFetching(false);
        return;
      }

      const seatSet = new Set<string>();

      data?.forEach((b) => {
        b.seats
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((s) => seatSet.add(s));
      });

      setOccupied(seatSet);
      setFetching(false);
    }

    fetchOccupiedSeats();

    return () => {
      cancelled = true;
    };
  }, [movie?.title, showtime?.date, showtime?.time, supabase]);

  const toggleSeat = (seatId: string) => {
    if (occupied.has(seatId)) return;

    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  return (
    <Card className="p-8 bg-zinc-950/50 border-white/5 rounded-[3rem] space-y-12 relative">
      {/* SCREEN */}
      <div className="flex flex-col items-center pb-10">
        <div className="h-2 w-[80%] bg-primary rounded-full" />
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-primary/40">
          Screen
        </p>
      </div>

      {/* SEATS */}
      <div className="relative flex flex-col items-center gap-4">
        {fetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl z-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-6 text-xs text-muted-foreground">{row}</span>

            <div className="flex gap-2">
              {cols.map((col) => {
                const seatId = `${row}${col}`;
                const isOccupied = occupied.has(seatId);
                const isSelected = selected.includes(seatId);

                return (
                  <motion.button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => toggleSeat(seatId)}
                    whileHover={!isOccupied ? { scale: 1.1 } : undefined}
                    whileTap={!isOccupied ? { scale: 0.95 } : undefined}
                    className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center",
                      isOccupied
                        ? "bg-zinc-900 opacity-30 cursor-not-allowed"
                        : isSelected
                          ? "bg-primary text-white border-primary"
                          : "bg-zinc-900/50 border-white/5 hover:border-primary/50",
                    )}
                  >
                    <Armchair className="w-4 h-4 opacity-80" />
                  </motion.button>
                );
              })}
            </div>

            <span className="w-6 text-xs text-muted-foreground">{row}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          disabled={!selected.length || fetching}
          onClick={() => onConfirm(selected)}
          className="px-10 h-12 font-bold uppercase"
        >
          Confirm ({selected.length})
        </Button>
      </div>
    </Card>
  );
}
