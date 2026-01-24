"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RevenueChart({ bookings }: { bookings: any[] }) {
  const data = bookings.map((b) => ({
    date: new Date(b.booking_date).toLocaleDateString(),
    revenue: b.total_amount,
  }));

  return (
    <Card className="rounded-lg">
      <CardHeader className="font-medium">Revenue Trend</CardHeader>
      <CardContent className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="date" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
