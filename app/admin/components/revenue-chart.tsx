"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ bookings }: { bookings: any[] }) {
  const chartData = useMemo(() => {
    const dailyMap: Record<string, number> = {};

    bookings.forEach((b) => {
      const date = new Date(b.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });

      const amount = Number(b.total_amount) || 0;
      dailyMap[date] = (dailyMap[date] || 0) + amount;
    });

    return Object.entries(dailyMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));
  }, [bookings]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#ffffff05"
          />
          <XAxis
            dataKey="date"
            fontSize={10}
            tick={{ fill: "#666" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            fontSize={10}
            tick={{ fill: "#666" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip
            cursor={{ fill: "#ffffff05" }}
            contentStyle={{
              backgroundColor: "#000",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          />
          <Bar
            dataKey="revenue"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
