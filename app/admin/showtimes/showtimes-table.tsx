// app/admin/showtimes/showtimes-table.tsx
"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Clock, CalendarIcon, Database } from "lucide-react";

export default function ShowtimesTable({ showtimes }: { showtimes: any[] }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("showtimes")
      .update({ status })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Session status: ${status.toUpperCase()}`);
    router.refresh();
  }

  async function deleteShowtime(id: string) {
    if (!window.confirm("Purge record from registry?")) return;
    const { error } = await supabase.from("showtimes").delete().eq("id", id);
    if (error) return toast.error("Purge Failed");
    toast.success("Asset Removed");
    router.refresh();
  }

  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm relative">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Media Asset
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Timeline
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Capacity
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Tariff
            </TableHead>
            <TableHead className="text-right px-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showtimes.map((s) => (
            <TableRow
              key={s.id}
              className="border-white/5 hover:bg-white/[0.01] transition-all group"
            >
              <TableCell className="py-10 px-10">
                <div className="space-y-1">
                  <p className="text-lg font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                    {s.movies?.title}
                  </p>
                  <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-zinc-600">
                    <Database className="w-3 h-3" /> SID-{s.id.slice(0, 8)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2 font-mono text-[11px]">
                  <span className="text-zinc-400 flex items-center gap-2 uppercase tracking-tighter">
                    <CalendarIcon className="w-3 h-3" /> {s.date}
                  </span>
                  <span className="text-white font-black flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />{" "}
                    {s.time.slice(0, 5)} HRS
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-40 space-y-3">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase font-black">
                    <span>Utilization</span>
                    <span>
                      {Math.round(
                        ((s.total_seats - s.available_seats) / s.total_seats) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-out"
                      style={{
                        width: `${((s.total_seats - s.available_seats) / s.total_seats) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xl font-black text-primary font-mono italic tracking-tighter">
                ₹{s.price}
              </TableCell>
              <TableCell className="text-right px-10">
                <div className="flex items-center justify-end gap-6">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] uppercase font-black px-4 py-1.5 border-none rounded-full",
                      s.status === "active"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-rose-500/10 text-rose-500",
                    )}
                  >
                    {s.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 hover:bg-white/10 rounded-2xl"
                      >
                        <MoreHorizontal className="h-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-zinc-950 border-white/10 p-2 min-w-[180px] rounded-2xl shadow-2xl"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          updateStatus(
                            s.id,
                            s.status === "active" ? "cancelled" : "active",
                          )
                        }
                        className="text-[10px] font-black uppercase py-4 rounded-xl cursor-pointer"
                      >
                        Toggle Session Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteShowtime(s.id)}
                        className="text-[10px] font-black uppercase py-4 rounded-xl text-rose-500 focus:text-rose-500 cursor-pointer"
                      >
                        Purge Asset Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
