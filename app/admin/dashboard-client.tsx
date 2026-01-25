"use client";

import { useMemo, useState } from "react";
import KpiCard from "./components/kpi-card";
import RevenueChart from "./components/revenue-chart";
import TopMovies from "./components/top-movies";
import PeakHours from "./components/peak-hours";
import DateRange from "./components/date-range";
import {
  TrendingUp,
  Ticket,
  Target,
  Calendar,
  Zap,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

  // Simulated Recent Activity (In a real app, fetch these)
  const recentBookings = bookings.slice(0, 6);

  return (
    <div className="space-y-10 pb-20">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary text-[10px] uppercase tracking-widest px-3"
          >
            Live Intelligence
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Finance <span className="text-primary">Overview</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Performance metrics for the last {range} days
          </p>
        </div>
        <DateRange value={range} onChange={setRange} />
      </header>

      {/* 2. KPI GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Gross Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          trend="+12.5%"
          isPrimary
        />
        <KpiCard
          label="Tickets Sold"
          value={stats.totalTickets}
          icon={Ticket}
          trend="+4.2%"
        />
        <KpiCard
          label="Avg. Ticket Value"
          value={`₹${Math.round(stats.avgTicket)}`}
          icon={Target}
        />
        <KpiCard
          label="Analysis Window"
          value={`${range} Days`}
          icon={Calendar}
        />
      </section>

      {/* 3. MAIN ANALYTICS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Revenue Velocity & Smart Insights */}
        <div className="xl:col-span-8 space-y-8">
          {/* Main Chart Card */}
          <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-widest">
                  Revenue Velocity
                </h3>
              </div>
              <PeakHours bookings={bookings} />
            </div>
            <RevenueChart bookings={bookings} />
          </div>

          {/* Smart Insights Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-[2rem] flex items-start gap-4">
              <Zap className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                  Growth Insight
                </p>
                <p className="text-sm text-white/80 leading-relaxed font-medium">
                  Evening shows (18:00+) are currently outperforming matinee
                  sessions by 34% in total volume.
                </p>
              </div>
            </div>
            <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-[2rem] flex items-start gap-4">
              <Activity className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                  Stability Report
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  User retention is holding steady. 82% of bookings this week
                  came from returning profiles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Feature Stats & Recent Activity */}
        <div className="xl:col-span-4 space-y-8">
          {/* Recent Activity Ticker */}
          <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black uppercase italic tracking-widest">
                Recent Activity
              </h3>
              <Link
                href="/admin/bookings"
                className="text-[9px] font-black text-primary uppercase flex items-center hover:underline group"
              >
                Full Logs{" "}
                <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-6">
              {recentBookings.length > 0 ? (
                recentBookings.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Ticket className="w-4 h-4 text-zinc-500 group-hover:text-black" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-white truncate uppercase tracking-tight">
                        {b.movie_title}
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground uppercase">
                        ₹{b.total_amount} •{" "}
                        {new Date(b.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-mono text-muted-foreground uppercase py-4">
                  No recent bookings
                </p>
              )}
            </div>
          </div>

          {/* Top Features (Movies) */}
          <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-black uppercase italic tracking-widest">
                Top Features
              </h3>
            </div>
            <TopMovies bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
