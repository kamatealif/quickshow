// app/admin/bookings/bookings-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database, User, Film, MapPin, IndianRupee, Clock } from "lucide-react";

export default function BookingsTable({ bookings = [] }: { bookings: any[] }) {
  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl">
      <Table>
        <TableHeader className="bg-white/[0.03]">
          <TableRow className="border-white/5 hover:bg-transparent text-zinc-500">
            <TableHead className="py-10 px-12 text-[10px] font-bold uppercase tracking-[0.4em]">
              Transaction Hash
            </TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Media Asset
            </TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Deployment Info
            </TableHead>
            <TableHead className="text-right px-12 text-[10px] font-bold uppercase tracking-[0.4em]">
              Settlement
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow
              key={b.id}
              className="border-white/5 hover:bg-white/[0.02] transition-all group"
            >
              <TableCell className="py-12 px-12">
                <div className="flex items-center gap-4 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <Database className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-tight italic">
                    {b.id}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-all">
                    {b.movie_title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                    <User className="w-3.5 h-3.5 text-primary/40" />
                    {b.profiles?.email || "EXTERNAL_GUEST"}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-mono text-zinc-300 font-bold uppercase">
                    <MapPin className="w-4 h-4 text-primary" />
                    {b.theater_name}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase text-zinc-500">
                    <Clock className="w-3.5 h-3.5" /> {b.show_date} @{" "}
                    {b.show_time.slice(0, 5)} HRS •{" "}
                    <span className="text-primary/60">SEATS: {b.seats}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-right px-12">
                <div className="flex items-center justify-end gap-2 text-white">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  <span className="text-3xl font-black italic tracking-tighter font-mono">
                    {Number(b.total_amount).toFixed(2)}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
