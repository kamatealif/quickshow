"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Database, Film, Loader2, X } from "lucide-react";
import BookingsTable from "./bookings-table";

type Booking = {
  id: string;
  seats: string;
  movie_title?: string; // Matching your flat schema
  created_at?: string;
  total_amount?: number;
  profiles?: {
    email?: string;
  } | null;
};

export default function BookingsClient({
  bookings = [],
}: {
  bookings?: Booking[];
}) {
  const [search, setSearch] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Simulation of registry scanning for user feedback
  useEffect(() => {
    if (search) {
      setIsScanning(true);
      const timeout = setTimeout(() => setIsScanning(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const filteredBookings = useMemo(() => {
    if (!search.trim()) return safeBookings;
    const q = search.toLowerCase().trim();

    return safeBookings.filter((b) => {
      const email = b.profiles?.email?.toLowerCase() ?? "";
      const movie = b.movie_title?.toLowerCase() ?? "";
      const ref = b.id?.toLowerCase() ?? "";

      return email.includes(q) || movie.includes(q) || ref.includes(q);
    });
  }, [safeBookings, search]);

  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
            Registry Ledger
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Booking <span className="text-primary">Sync</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
            {isScanning ? (
              <span className="text-primary animate-pulse flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Scanning Node
                Assets...
              </span>
            ) : (
              "Data integrity verified: All records active"
            )}
          </p>
        </div>

        {/* REFINED TACTICAL INPUT */}
        <div className="relative w-full md:w-96 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-all duration-300">
            <Database className="h-3 w-3 text-primary" />
            <div className="h-3 w-[1px] bg-white/10" />
            <Film className="h-3 w-3 text-primary" />
          </div>

          <Input
            placeholder="Search by Email, Movie or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-16 pr-12 bg-white/[0.03] border-white/10 rounded-2xl focus:border-primary/50 transition-all text-sm placeholder:text-zinc-700 placeholder:font-mono focus:bg-white/[0.05]"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-tighter text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* SEARCH SUMMARY MESSAGE */}
      {search && !isScanning && (
        <div className="flex items-center gap-2 animate-in slide-in-from-left-2">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary/60">
            {filteredBookings.length} results identified in registry
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      )}

      {/* TABLE */}
      <BookingsTable bookings={filteredBookings} />
    </div>
  );
}
