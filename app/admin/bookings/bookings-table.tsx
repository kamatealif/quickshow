"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BookingsTable({ bookings }: { bookings: any[] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Payment</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              {/* User */}
              <TableCell>
                <div className="text-sm font-medium">
                  {b.profiles?.email ?? "—"}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  REF-{b.id.slice(0, 8)}
                </div>
              </TableCell>

              {/* Movie */}
              <TableCell className="text-sm">
                {b.showtimes?.movies?.title ?? "—"}
              </TableCell>

              {/* Seats */}
              <TableCell className="text-sm font-mono">
                {Array.isArray(b.seats) ? b.seats.join(", ") : b.seats}
              </TableCell>

              {/* Amount */}
              <TableCell className="font-mono text-sm font-semibold">
                ₹{b.total_amount.toLocaleString()}
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant="outline"
                  className={`rounded-sm text-[10px] uppercase ${
                    b.status === "confirmed"
                      ? "border-emerald-500/50 text-emerald-500"
                      : "border-orange-500/50 text-orange-500"
                  }`}
                >
                  {b.status}
                </Badge>
              </TableCell>

              {/* Payment */}
              <TableCell className="text-right">
                <span
                  className={`text-xs font-medium ${
                    b.payment_status === "paid"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {b.payment_status === "paid" ? "Paid" : "Pending"}
                </span>
              </TableCell>
            </TableRow>
          ))}

          {bookings.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
