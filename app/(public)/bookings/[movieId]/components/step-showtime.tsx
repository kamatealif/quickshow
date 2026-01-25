"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  ChevronRight,
  Info,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StepShowtime({
  showtimes,
  onSelect,
}: {
  showtimes: any[];
  onSelect: (s: any) => void;
}) {
  // Group showtimes by date for better readability
  const groupedShowtimes = showtimes.reduce((acc: any, show) => {
    if (!acc[show.date]) acc[show.date] = [];
    acc[show.date].push(show);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
              Pick Your <span className="text-primary">Slot</span>
            </h2>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mt-1">
              Live Cinema Availability
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        {Object.keys(groupedShowtimes).map((date) => (
          <section key={date} className="space-y-6">
            {/* Elegant Date Divider */}
            <div className="flex items-center gap-4">
              <div className="bg-secondary/50 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/5 shadow-xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {groupedShowtimes[date].map((s: any, idx: number) => {
                const isSoldOut = s.available_seats <= 0 || s.status === "full";

                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      disabled={isSoldOut}
                      onClick={() => onSelect(s)}
                      className={cn(
                        "group relative w-full text-left rounded-[2.5rem] p-7 transition-all duration-500 border overflow-hidden",
                        isSoldOut
                          ? "bg-zinc-900/40 border-white/5 opacity-50 cursor-not-allowed"
                          : "bg-secondary/10 border-white/5 hover:border-primary/40 hover:bg-secondary/20 shadow-xl",
                      )}
                    >
                      {/* Left "Pass" Ticket Notch */}
                      <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-4 h-10 bg-background rounded-r-full border-r border-white/5 shadow-inner" />

                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                              <Clock className="w-4 h-4" />
                              <span className="text-4xl font-black italic tracking-tighter">
                                {s.time.slice(0, 5)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground/80">
                              <MapPin className="w-3.5 h-3.5 text-primary/60" />
                              <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[180px]">
                                {s.theaters?.name || "Main Screen"}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-end gap-2.5">
                            <Badge
                              className={cn(
                                "font-mono text-[9px] tracking-[0.2em] px-3 py-1 uppercase border-none",
                                isSoldOut
                                  ? "bg-zinc-800"
                                  : "bg-primary/20 text-primary",
                              )}
                            >
                              {s.theaters?.screen_type || "STANDARD"}
                            </Badge>
                            <p className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase">
                              {s.available_seats} Seats Left
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                              Pass Fare
                            </span>
                            <span className="text-2xl font-black italic text-white tracking-tight">
                              ₹{s.price}
                            </span>
                          </div>

                          <div
                            className={cn(
                              "h-14 w-14 rounded-[1.25rem] flex items-center justify-center transition-all duration-300",
                              isSoldOut
                                ? "bg-white/5"
                                : "bg-white/5 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]",
                            )}
                          >
                            {isSoldOut ? (
                              <Info className="w-5 h-5 opacity-20" />
                            ) : (
                              <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </div>
                      </div>

                      {isSoldOut && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[3px] z-20">
                          <div className="border-2 border-red-500/50 rounded-xl px-6 py-2 -rotate-12">
                            <span className="text-sm font-black uppercase tracking-[0.6em] text-red-500/50">
                              Full House
                            </span>
                          </div>
                        </div>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
