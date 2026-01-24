"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import BookingsTable from "./bookings-table";

export default function BookingsClient({ bookings }: { bookings: any[] }) {
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    if (!search.trim()) return bookings;

    const q = search.toLowerCase();

    return bookings.filter((b) => {
      const email = b.profiles?.email ?? "";
      const movie = b.showtimes?.movies?.title ?? "";
      const ref = b.id ?? "";

      return (
        email.toLowerCase().includes(q) ||
        movie.toLowerCase().includes(q) ||
        ref.toLowerCase().includes(q)
      );
    });
  }, [bookings, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Bookings</h1>
        <p className="text-sm text-muted-foreground">
          View and manage ticket bookings
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by user, movie, or reference"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm rounded-sm"
      />

      {/* Table */}
      <BookingsTable bookings={filteredBookings} />
    </div>
  );
}
