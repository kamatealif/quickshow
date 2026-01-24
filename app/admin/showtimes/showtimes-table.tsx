"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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

import { MoreHorizontal, CheckCircle, XCircle, Trash2 } from "lucide-react";

type Showtime = {
  id: string;
  date: string;
  time: string;
  price: number;
  available_seats: number;
  total_seats: number;
  status: "active" | "cancelled" | "full";
  movies: {
    id: number;
    title: string;
  } | null;
};

export default function ShowtimesTable({
  showtimes,
}: {
  showtimes: Showtime[];
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function updateStatus(showtimeId: string, status: Showtime["status"]) {
    const { error } = await supabase
      .from("showtimes")
      .update({ status })
      .eq("id", showtimeId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  async function deleteShowtime(showtimeId: string) {
    const confirm = window.confirm(
      "Are you sure you want to delete this showtime? This action cannot be undone.",
    );

    if (!confirm) return;

    const { error } = await supabase
      .from("showtimes")
      .delete()
      .eq("id", showtimeId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Movie</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {showtimes.map((s) => (
            <TableRow key={s.id}>
              {/* Movie */}
              <TableCell className="font-medium">
                {s.movies?.title ?? "—"}
              </TableCell>

              {/* Date */}
              <TableCell>{s.date}</TableCell>

              {/* Time */}
              <TableCell>{s.time}</TableCell>

              {/* Seats */}
              <TableCell>
                {s.available_seats}/{s.total_seats}
              </TableCell>

              {/* Price */}
              <TableCell>₹{s.price}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={
                    s.status === "active"
                      ? "default"
                      : s.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {s.status}
                </Badge>
              </TableCell>

              {/* Actions Menu */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-44">
                    {s.status !== "active" && (
                      <DropdownMenuItem
                        onClick={() => updateStatus(s.id, "active")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                    )}

                    {s.status === "active" && (
                      <DropdownMenuItem
                        onClick={() => updateStatus(s.id, "cancelled")}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteShowtime(s.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {showtimes.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No showtimes created yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
