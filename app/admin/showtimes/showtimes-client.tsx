"use client";

import { useState } from "react";
import { Plus, Film, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import ShowtimeForm from "./showtime-form";
import ShowtimesTable from "./showtimes-table";
import { Badge } from "@/components/ui/badge";

export default function ShowtimesClient({ theaters, showtimes }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-primary opacity-70" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase font-mono">
              Operational Management / Programming
            </span>
          </div>
          <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
            Showtime <span className="text-primary">Registry</span>
          </h1>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="h-16 px-10 bg-primary text-black hover:bg-white hover:scale-[1.02] transition-all duration-300 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20">
              <Plus className="w-5 h-5 mr-3 stroke-[3]" /> Add New Showtime
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:max-w-[600px] bg-[#050505] border-white/5 p-0 overflow-y-auto custom-scrollbar shadow-[-20px_0_80px_rgba(0,0,0,0.8)]"
          >
            <div className="p-10 md:p-14 space-y-12">
              <SheetHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Film className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                    Programming Module
                  </span>
                </div>
                <SheetTitle className="text-6xl font-black uppercase italic tracking-tighter text-white">
                  Schedule <span className="text-primary">Show</span>
                </SheetTitle>
                <SheetDescription className="text-zinc-500 text-[11px] uppercase tracking-widest leading-relaxed pt-4">
                  Configure exhibition details, pricing models, and theater
                  allocation for the selected title.
                </SheetDescription>
              </SheetHeader>

              <ShowtimeForm
                theaters={theaters}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <ShowtimesTable showtimes={showtimes} />
    </div>
  );
}
