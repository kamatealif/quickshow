// app/admin/showtimes/showtimes-client.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import CreateShowtimeDialog from "./create-showtime-dialog";
import ShowtimesTable from "./showtimes-table";

export default function ShowtimesClient({ theaters, showtimes }: any) {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER - No background, matches Theater Page style */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
            Infrastructure Assets
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Showtime <span className="text-primary">Registry</span>
          </h1>
          <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            Synchronize movie broadcasts and seating inventory
          </p>
        </div>
        <CreateShowtimeDialog theaters={theaters} />
      </header>

      {/* TABLE - This still carries its own container styling */}
      <ShowtimesTable showtimes={showtimes} />
    </div>
  );
}
