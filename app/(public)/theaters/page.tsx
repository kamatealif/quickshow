"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Tv,
  Wifi,
  ParkingCircle,
  Coffee,
  ArrowUpRight,
  MonitorPlay,
  Loader2,
  Accessibility,
  Clock,
  Ticket,
  Star,
  ChevronRight,
  CalendarDays,
  Play,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* ───────────────── TYPES ───────────────── */

type Theater = {
  id: string;
  name: string;
  location: string;
  screen_type: "standard" | "premium" | "imax" | "4dx";
  facilities: string;
  showtimes: any[];
};

export default function TheatersPage() {
  const supabase = createSupabaseBrowserClient();
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);

  useEffect(() => {
    async function fetchTheaters() {
      setLoading(true);
      const { data, error } = await supabase.from("theaters").select(`
          *,
          showtimes (
            id, time, date, price,
            movie:movies (*)
          )
        `);

      if (data) setTheaters(data);
      setLoading(false);
    }
    fetchTheaters();
  }, [supabase]);

  const filteredTheaters = theaters.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      activeFilter === "all" || t.screen_type === activeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* 1. HERO SECTION ... (Keep previous hero code) */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 uppercase tracking-widest text-[10px]">
            Cinema Discovery
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] mb-8">
            The <span className="text-primary">Network</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mt-12 items-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by theater name..."
                className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {["all", "standard", "premium", "imax", "4dx"].map((type) => (
                <Button
                  key={type}
                  variant={activeFilter === type ? "default" : "outline"}
                  onClick={() => setActiveFilter(type)}
                  className={cn(
                    "h-14 px-6 rounded-2xl uppercase font-black text-[10px] tracking-widest",
                    activeFilter === type
                      ? "shadow-lg shadow-primary/20"
                      : "border-white/10",
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. THEATERS LIST */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTheaters.map((theater) => (
            <Card
              key={theater.id}
              className="group bg-zinc-950 border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="p-8 flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                  <div className="space-y-6">
                    <Badge className="bg-white/5 text-white/60 font-mono text-[9px] border-none uppercase tracking-widest">
                      {theater.screen_type}
                    </Badge>
                    <div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                        {theater.name}
                      </h3>
                      <p className="text-muted-foreground text-xs flex items-center gap-2 mt-2 font-medium">
                        <MapPin className="w-3 h-3 text-primary" />{" "}
                        {theater.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedTheater(theater)}
                    className="mt-8 w-full h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all"
                  >
                    View Schedule <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="p-8 w-full md:w-[45%] bg-white/[0.02] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-black italic text-white/20 uppercase tracking-tighter">
                      Quick<span className="text-primary/20">Show</span>
                    </p>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/40">
                      {theater.showtimes?.length || 0} active sessions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 3. SCHEDULE SHEET WITH BOOKING BUTTON */}
      <Sheet
        open={!!selectedTheater}
        onOpenChange={() => setSelectedTheater(null)}
      >
        <SheetContent className="w-full sm:max-w-xl bg-zinc-950 border-white/5 p-0 overflow-y-auto">
          <SheetHeader className="p-8 bg-secondary/10 border-b border-white/5">
            <Badge className="bg-primary/20 text-primary border-none uppercase tracking-widest text-[9px] w-fit mb-2">
              {selectedTheater?.screen_type}
            </Badge>
            <SheetTitle className="text-4xl font-black italic uppercase tracking-tighter text-white">
              {selectedTheater?.name}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" />{" "}
              {selectedTheater?.location}
            </SheetDescription>
          </SheetHeader>

          <div className="p-8 space-y-12">
            {selectedTheater?.showtimes &&
            selectedTheater.showtimes.length > 0 ? (
              Object.entries(
                selectedTheater.showtimes.reduce((acc: any, curr: any) => {
                  const movieTitle = curr.movie.title;
                  if (!acc[movieTitle])
                    acc[movieTitle] = { movie: curr.movie, sessions: [] };
                  acc[movieTitle].sessions.push(curr);
                  return acc;
                }, {}),
              ).map(([title, data]: any) => (
                <div
                  key={title}
                  className="group flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  <div className="flex gap-6 items-start">
                    {/* Poster */}
                    <div className="relative w-28 h-40 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${data.movie.poster_path}`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[10px] font-bold text-white/80">
                            {data.movie.vote_average.toFixed(1)} Rating
                          </span>
                        </div>
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none text-white group-hover:text-primary transition-colors">
                          {title}
                        </h4>
                      </div>

                      {/* Sessions Preview */}
                      <div className="flex flex-wrap gap-2">
                        {data.sessions.slice(0, 3).map((st: any) => (
                          <div
                            key={st.id}
                            className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center"
                          >
                            <span className="text-[10px] font-black italic text-white/60">
                              {st.time.slice(0, 5)}
                            </span>
                          </div>
                        ))}
                        {data.sessions.length > 3 && (
                          <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 flex items-center">
                            <span className="text-[8px] font-black uppercase text-muted-foreground">
                              +{data.sessions.length - 3} More
                            </span>
                          </div>
                        )}
                      </div>

                      {/* PRIMARY BOOKING BUTTON */}
                      <Link href={`/bookings/${data.movie.id}`}>
                        <Button className="w-full mt-2 h-11 rounded-xl font-black uppercase text-[10px] tracking-widest gap-2 group-hover:bg-primary transition-all">
                          <Ticket className="w-4 h-4" /> Get Tickets
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="bg-white/5" />
                </div>
              ))
            ) : (
              <div className="py-20 text-center opacity-20">
                <CalendarDays className="w-12 h-12 mx-auto mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  No sessions currently active
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full", className)} />;
}
