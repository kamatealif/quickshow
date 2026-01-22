"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Users,
  TrendingUp,
  ArrowUpRight,
  Download,
  MousePointer2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ───────────────── SCHEMA-DRIVEN INR DATA ───────────────── */
// Reflects aggregation of public.bookings.total_amount in ₹
const revenueTrends = [
  { date: "2026-01-16", revenue: 85000 },
  { date: "2026-01-17", revenue: 125000 },
  { date: "2026-01-18", revenue: 98000 },
  { date: "2026-01-19", revenue: 145000 },
  { date: "2026-01-20", revenue: 210000 },
  { date: "2026-01-21", revenue: 185000 },
  { date: "2026-01-22", revenue: 250000 },
];

const theaterLoad = [
  { name: "Alpha", load: 82 },
  { name: "IMAX_01", load: 95 },
  { name: "Premium_04", load: 45 },
  { name: "Standard_02", load: 68 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* COMMAND HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 font-mono text-[9px] uppercase tracking-widest">
            Instance: IN-WEST-1 // ₹_NODE
          </Badge>
          <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
            Quick<span className="text-primary">Admin</span>.IO
          </h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.3em] opacity-50">
            Currency_Standard: INR (₹) // Status: Nominal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[160px] h-14 rounded-2xl bg-card/40 border-white/5 font-black uppercase italic text-[10px] tracking-widest">
              <SelectValue placeholder="Archive Range" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/5 rounded-2xl">
              <SelectItem value="24h">24h Runtime</SelectItem>
              <SelectItem value="7d">7d Archive</SelectItem>
              <SelectItem value="30d">30d Dataset</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="icon"
            className="h-14 w-14 rounded-2xl bg-primary shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* CORE KPI GRID (INR Focused) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Gross_Revenue"
          value="₹8.42L"
          detail="Total_Amount"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active_Users"
          value="1,842"
          detail="Total_Profiles"
          icon={Users}
        />
        <MetricCard
          title="Occupancy_Rate"
          value="74.2%"
          detail="Total_Seats"
          icon={Activity}
        />
        <MetricCard
          title="System_Security"
          value="Secure"
          detail="Admin_Bypass"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* REVENUE STREAM - AREA CHART */}
        <Card className="lg:col-span-8 bg-card/30 backdrop-blur-3xl border-white/5 rounded-[3rem] p-10">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                Revenue.Flow (₹)
              </h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest italic opacity-40">
                Derived from public.bookings.total_amount
              </p>
            </div>
            <Zap className="w-5 h-5 text-primary opacity-30 animate-pulse" />
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrends}>
                <defs>
                  <linearGradient id="primaryGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="rgba(255,255,255,0.03)"
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-mono)"
                />
                <YAxis hide />
                <RechartsTooltip
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                  }}
                  formatter={(value: number) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#primaryGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* THEATER CAPACITY - BAR CHART */}
        <Card className="lg:col-span-4 bg-card/30 backdrop-blur-3xl border-white/5 rounded-[3rem] p-10">
          <div className="space-y-1 mb-10">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">
              Theater.Load
            </h3>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest italic opacity-40">
              Available / Total_Seats
            </p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={theaterLoad} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(255,255,255,0.03)"
                />
                <XAxis type="number" hide />
                <XAxis
                  type="category"
                  dataKey="name"
                  stroke="rgba(255,255,255,0.4)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="var(--font-mono)"
                  width={80}
                />
                <Bar
                  dataKey="load"
                  fill="hsl(var(--primary))"
                  radius={[0, 15, 15, 0]}
                  barSize={32}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ACTIVITY BUFFER (Live from public.user_activities) */}
      <div className="p-12 rounded-[3.5rem] border border-white/5 bg-card/10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <MousePointer2 className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-black uppercase tracking-widest italic">
              User_Activity.Buffer
            </h3>
          </div>
          <p className="text-[9px] font-mono opacity-30 uppercase tracking-[0.4em]">
            Listening // WebSocket_Secure
          </p>
        </div>
        <div className="space-y-2">
          <LogEntry
            status="BOOKING"
            user="U_8812"
            action="Confirmed"
            details="seats: [F10, F11] | ₹950.00"
            time="11:22:04"
          />
          <LogEntry
            status="AUTH"
            user="U_9021"
            action="Login_Success"
            details="ID: 88f.. | New Session Initialized"
            time="11:20:55"
          />
          <LogEntry
            status="SYSTEM"
            user="ROOT"
            action="Price_Update"
            details="showtime_id: 8b2.. | New Rate: ₹350.00"
            time="11:18:22"
          />
        </div>
      </div>
    </div>
  );
}

/* ───────────────── COMPONENTS ───────────────── */

function MetricCard({ title, value, detail, icon: Icon }: any) {
  return (
    <Card className="bg-card/40 backdrop-blur-md border-white/5 rounded-[2.5rem] p-8 group hover:border-primary/40 transition-all duration-500">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground opacity-40">
            {title}
          </p>
          <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
            {value}
          </h3>
          <p className="text-[10px] font-black text-primary uppercase tracking-widest italic opacity-60">
            {detail}
          </p>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
          />
        </div>
      </div>
    </Card>
  );
}

function LogEntry({ status, user, action, details, time }: any) {
  return (
    <div className="flex items-center gap-8 font-mono text-[10px] p-5 rounded-2xl hover:bg-primary/[0.04] transition-all border-b border-white/[0.02] group">
      <span className="text-primary font-black uppercase w-20">[{status}]</span>
      <span className="opacity-30">{time}</span>
      <span className="text-foreground font-black uppercase italic w-24 group-hover:text-primary transition-colors">
        {action}
      </span>
      <span className="opacity-40 w-16">{user}</span>
      <span className="text-muted-foreground flex-1 truncate opacity-60 italic">
        {details}
      </span>
      <ArrowUpRight className="w-4 h-4 opacity-5 group-hover:opacity-100 group-hover:text-primary transition-all" />
    </div>
  );
}
