import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket, CreditCard, User, Calendar } from "lucide-react";

export default async function AdminBookingsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      id,
      total_amount,
      status,
      payment_status,
      booking_date,
      seats,
      profiles ( email )
    `,
    )
    .order("booking_date", { ascending: false });

  return (
    <div className="space-y-12">
      {/* HEADER SECTION */}
      <header className="space-y-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
          Transaction.Logs
        </span>
        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
          Revenue <span className="text-primary">Stream</span>
        </h1>
        <p className="text-muted-foreground font-medium italic opacity-60">
          Real-time booking verification and payment status.
        </p>
      </header>

      {/* TABLE CONTAINER */}
      <div className="rounded-[2rem] border border-white/5 bg-card/20 backdrop-blur-md overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest italic text-primary">
                <div className="flex items-center gap-2">
                  <User size={12} /> User Node
                </div>
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                <div className="flex items-center gap-2">
                  <Ticket size={12} /> Seats
                </div>
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                <div className="flex items-center gap-2">
                  <CreditCard size={12} /> Amount
                </div>
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                Status
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary text-right">
                Verification
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings?.map((b) => (
              <TableRow
                key={b.id}
                className="border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                {/* User Email */}
                <TableCell className="py-6">
                  <div className="space-y-1">
                    <p className="font-mono text-sm font-medium">
                      {b.profiles?.email}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-mono uppercase opacity-50">
                      REF_{b.id.slice(0, 8)}
                    </p>
                  </div>
                </TableCell>

                {/* Seats */}
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(b.seats) ? (
                      b.seats.map((seat: string) => (
                        <span
                          key={seat}
                          className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[10px] font-mono text-primary"
                        >
                          {seat}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs">{b.seats}</span>
                    )}
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="font-mono text-sm font-bold tracking-tight">
                  ₹{b.total_amount.toLocaleString()}
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`uppercase text-[9px] font-black tracking-widest px-3 py-1 rounded-full ${
                      b.status === "confirmed"
                        ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5"
                        : "border-orange-500/50 text-orange-500 bg-orange-500/5"
                    }`}
                  >
                    {b.status}
                  </Badge>
                </TableCell>

                {/* Payment Status */}
                <TableCell className="text-right">
                  <span
                    className={`text-[10px] font-black uppercase tracking-tighter italic ${
                      b.payment_status === "paid"
                        ? "text-primary"
                        : "text-rose-500"
                    }`}
                  >
                    {b.payment_status === "paid"
                      ? "● SYNC_COMPLETE"
                      : "○ PENDING_GATEWAY"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER METRIC */}
      <div className="flex justify-between items-center px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Total Logs: {bookings?.length || 0}</span>
        <span>System Status: Nominal</span>
      </div>
    </div>
  );
}
