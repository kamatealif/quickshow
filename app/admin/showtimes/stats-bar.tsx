import { Ticket, Activity, Ban, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsBar({ showtimes }: { showtimes: any[] }) {
  const active = showtimes.filter((s) => s.status === "active").length;
  const cancelled = showtimes.filter((s) => s.status === "cancelled").length;

  const totalOccupancy = showtimes.reduce((a, s) => {
    if (!s.total_seats) return a;
    return a + (s.total_seats - s.available_seats) / s.total_seats;
  }, 0);
  const avgOccupancy = Math.round(
    (totalOccupancy / (showtimes.length || 1)) * 100,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Shows"
        value={showtimes.length}
        icon={<Ticket className="text-blue-400" />}
      />
      <StatCard
        title="Active"
        value={active}
        icon={<Activity className="text-emerald-400" />}
        color="text-emerald-400"
      />
      <StatCard
        title="Cancelled"
        value={cancelled}
        icon={<Ban className="text-rose-400" />}
        color="text-rose-400"
      />
      <StatCard
        title="Avg Occupancy"
        value={`${avgOccupancy}%`}
        icon={<Users className="text-purple-400" />}
      />
    </div>
  );
}

function StatCard({ title, value, icon, color = "text-zinc-100" }: any) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 p-6 group transition-all hover:bg-zinc-900/60">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">
            {title}
          </p>
          <p className={cn("text-3xl font-black tracking-tight", color)}>
            {value}
          </p>
        </div>
        <div className="p-2.5 bg-white/[0.03] rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </div>
  );
}
