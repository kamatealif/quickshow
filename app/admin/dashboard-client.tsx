"use client";

import { useMemo, useState } from "react";
import KpiCard from "./components/kpi-card";
import DateRange from "./components/date-range";
import RevenueChart from "./components/revenue-chart";
import TopMovies from "./components/top-movies";
import PeakHours from "./components/peak-hours";
import RevenueByShowtime from "./components/revenue-by-showtime";

export default function DashboardClient({ bookings }: { bookings: any[] }) {
  const [range, setRange] = useState(30);

  const filtered = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - range);

    return bookings.filter(
      (b) => b.payment_status === "paid" && new Date(b.booking_date) >= cutoff,
    );
  }, [bookings, range]);

  const totalRevenue = filtered.reduce((s, b) => s + b.total_amount, 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Business performance overview
          </p>
        </div>
        <DateRange value={range} onChange={setRange} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard label="Revenue" value={`₹${totalRevenue}`} highlight />
        <KpiCard label="Bookings" value={filtered.length} />
        <KpiCard
          label="Avg / Booking"
          value={
            filtered.length
              ? `₹${Math.round(totalRevenue / filtered.length)}`
              : "—"
          }
        />
        <KpiCard label="Active Period" value={`${range} days`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart bookings={filtered} />
        <TopMovies bookings={filtered} />
        <PeakHours bookings={filtered} />
        <RevenueByShowtime bookings={filtered} />
      </div>
    </div>
  );
}
