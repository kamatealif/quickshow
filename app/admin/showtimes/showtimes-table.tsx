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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  CalendarIcon,
  TrendingUp,
} from "lucide-react";

export default function ShowtimesTable({ showtimes }: { showtimes: any[] }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("showtimes")
      .update({ status })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`SYSTEM: Status set to ${status.toUpperCase()}`);
    router.refresh();
  }

  async function deleteShowtime(id: string) {
    if (!window.confirm("PURGE REQUEST: Confirm permanent deletion?")) return;
    const { error } = await supabase.from("showtimes").delete().eq("id", id);
    if (error) return toast.error("ACCESS DENIED: Delete Failed");
    toast.success("SYSTEM: Record Purged");
    router.refresh();
  }

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-[10px] uppercase font-black tracking-[0.3em] py-8 px-10 text-zinc-500">
              Asset Identity
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500">
              Timeframe
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500 text-center">
              Load Factor
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500">
              Commercial
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500 text-right px-10">
              Operations
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showtimes.map((s) => (
            <TableRow
              key={s.id}
              className="border-white/5 hover:bg-white/[0.01] transition-colors group"
            >
              <TableCell className="py-10 px-10">
                <div className="flex flex-col gap-1.5">
                  <p className="text-base font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                    {s.movies?.title ?? "NODE_EMPTY"}
                  </p>
                  <code className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest bg-white/5 w-fit px-2 py-0.5 rounded">
                    REF_{s.id.slice(0, 6)}
                  </code>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3 text-primary/50" />{" "}
                    {s.date}
                  </span>
                  <span className="text-[12px] font-mono text-white font-black flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />{" "}
                    {s.time.slice(0, 5)} HRS
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="mx-auto w-32 space-y-2.5">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500 font-black">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {Math.round(
                        ((s.total_seats - s.available_seats) / s.total_seats) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-700 ease-in-out"
                      style={{
                        width: `${((s.total_seats - s.available_seats) / s.total_seats) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-lg font-black italic text-primary font-mono tracking-tighter">
                  ₹{s.price}
                </span>
              </TableCell>
              <TableCell className="text-right px-10">
                <div className="flex items-center justify-end gap-6">
                  <Badge
                    className={cn(
                      "text-[10px] uppercase tracking-widest px-4 py-1.5 border-none font-black rounded-lg",
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
                        className="h-12 w-12 hover:bg-white/5 rounded-2xl transition-all"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#0d0d0d] border-white/5 p-2 min-w-[180px] rounded-2xl shadow-3xl ring-1 ring-white/10"
                    >
                      <DropdownMenuItem
                        className="py-3 px-4 rounded-xl cursor-pointer text-[11px] font-bold uppercase tracking-widest focus:bg-primary focus:text-black"
                        onClick={() =>
                          updateStatus(
                            s.id,
                            s.status === "active" ? "cancelled" : "active",
                          )
                        }
                      >
                        {s.status === "active" ? (
                          <XCircle className="w-4 h-4 mr-3" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-3" />
                        )}
                        Toggle Ops
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5 my-2" />
                      <DropdownMenuItem
                        className="text-rose-500 focus:bg-rose-500 focus:text-white py-3 px-4 rounded-xl cursor-pointer text-[11px] font-bold uppercase tracking-widest"
                        onClick={() => deleteShowtime(s.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-3" /> Purge Entry
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
