"use client";

import { useMemo, useState } from "react";
import KpiCard from "./components/kpi-card";
import RevenueChart from "./components/revenue-chart";
import TopMovies from "./components/top-movies";
import PeakHours from "./components/peak-hours";
import RevenueByShowtime from "./components/revenue-by-showtime";
import DateRange from "./components/date-range";
import { TrendingUp, Ticket, Target, Calendar } from "lucide-react";

// Ensure 'export default' is right here!
export default function DashboardClient({ bookings }: { bookings: any[] }) {
  const [range, setRange] = useState(30);

  const stats = useMemo(() => {
    const total = bookings.reduce(
      (acc, curr) => acc + (Number(curr.total_amount) || 0),
      0,
    );
    return {
      totalRevenue: total,
      totalTickets: bookings.length,
      avgTicket: bookings.length > 0 ? total / bookings.length : 0,
    };
  }, [bookings]);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Finance <span className="text-primary">Overview</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Command Center Analytics
          </p>
        </div>
        <DateRange value={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          isPrimary
        />
        <KpiCard
          label="Tickets Sold"
          value={stats.totalTickets}
          icon={Ticket}
        />
        <KpiCard
          label="Avg. Order"
          value={`₹${Math.round(stats.avgTicket)}`}
          icon={Target}
        />
        <KpiCard label="Range" value={`${range} Days`} icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black uppercase italic tracking-widest">
              Revenue Velocity
            </h3>
            <PeakHours bookings={bookings} />
          </div>
          <RevenueChart bookings={bookings} />
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-lg font-black uppercase italic tracking-widest mb-6">
              Top Features
            </h3>
            <TopMovies bookings={bookings} />
          </div>
          <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-lg font-black uppercase italic tracking-widest mb-6">
              By Showtime
            </h3>
            <RevenueByShowtime bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
