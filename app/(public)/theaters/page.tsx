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
  User,
  Accessibility,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ───────────────── TYPES ───────────────── */

type Theater = {
  id: string;
  name: string;
  location: string;
  screen_type: "standard" | "premium" | "imax" | "4dx";
  facilities: string;
  showtimes: {
    movie: {
      id: number;
      title: string;
      poster_path: string;
    };
  }[];
};

export default function TheatersPage() {
  const supabase = createSupabaseBrowserClient();
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function fetchTheaters() {
      setLoading(true);
      // Fetch theaters with their associated movies through showtimes
      const { data, error } = await supabase.from("theaters").select(`
          *,
          showtimes (
            movie:movies (id, title, poster_path)
          )
        `);

      if (data) {
        // Simple logic to remove duplicate movies from the same theater list
        const formattedData = data.map((t: any) => {
          const uniqueMovies = Array.from(
            new Set(t.showtimes?.map((s: any) => s.movie?.id)),
          ).map((id) => t.showtimes.find((s: any) => s.movie?.id === id).movie);
          return { ...t, uniqueMovies };
        });
        setTheaters(formattedData);
      }
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

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground">
          Syncing Cinemas...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 uppercase tracking-widest text-[10px]">
            The Digital Directory
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] mb-8">
            Cinema <br /> <span className="text-primary">Network</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-4 mt-12 items-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Find a theater near you..."
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

      {/* MAIN GRID */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTheaters.map((theater) => (
              <motion.div
                key={theater.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="group bg-zinc-950 border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* THEATER DETAILS */}
                      <div className="p-8 flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <Badge className="bg-white/5 text-white/60 font-mono text-[9px] border-none uppercase tracking-widest">
                              {theater.screen_type}
                            </Badge>
                            <FacilityIcons list={theater.facilities} />
                          </div>

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

                        <div className="mt-12">
                          <Button className="w-full h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest group-hover:bg-primary transition-all">
                            View Schedule{" "}
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>

                      {/* NOW SHOWING AT THIS THEATER */}
                      <div className="p-8 w-full md:w-[45%] bg-white/[0.02]">
                        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <MonitorPlay className="w-3 h-3" /> Now Showing
                        </p>

                        <div className="space-y-4">
                          {(theater as any).uniqueMovies?.length > 0 ? (
                            (theater as any).uniqueMovies
                              .slice(0, 3)
                              .map((movie: any) => (
                                <div
                                  key={movie.id}
                                  className="flex items-center gap-4 group/movie"
                                >
                                  <div className="relative w-12 h-16 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                    <Image
                                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                      alt={movie.title}
                                      fill
                                      sizes="48px"
                                      className="object-cover grayscale group-hover/movie:grayscale-0 transition-all"
                                    />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-xs font-bold uppercase tracking-tight truncate text-white/80">
                                      {movie.title}
                                    </p>
                                    <Link
                                      href={`/bookings/${movie.id}`}
                                      className="text-[9px] font-black text-primary uppercase hover:underline underline-offset-4 mt-1 block"
                                    >
                                      Get Tickets
                                    </Link>
                                  </div>
                                </div>
                              ))
                          ) : (
                            <p className="text-[10px] italic text-muted-foreground uppercase py-10">
                              No sessions scheduled
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function FacilityIcons({ list }: { list: string }) {
  const icons: any = {
    parking: <ParkingCircle className="w-3.5 h-3.5" />,
    snacks: <Coffee className="w-3.5 h-3.5" />,
    wifi: <Wifi className="w-3.5 h-3.5" />,
    wheelchair: <Accessibility className="w-3.5 h-3.5" />,
    standard: <Tv className="w-3.5 h-3.5" />,
  };

  return (
    <div className="flex gap-2">
      {list.split(",").map((f) => (
        <div
          key={f}
          className="text-muted-foreground/40 hover:text-primary transition-colors"
          title={f}
        >
          {icons[f.trim().toLowerCase()] || <Tv className="w-3.5 h-3.5" />}
        </div>
      ))}
    </div>
  );
}
