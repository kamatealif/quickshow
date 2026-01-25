"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  isPrimary?: boolean;
}

export default function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  isPrimary,
}: KpiProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden",
        isPrimary
          ? "bg-primary/10 border-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]"
          : "bg-zinc-950/50 border-white/5 hover:border-white/10",
      )}
    >
      {isPrimary && (
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
      )}

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className={cn(
            "p-3 rounded-2xl",
            isPrimary ? "bg-primary text-black" : "bg-white/5 text-primary",
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase tracking-widest">
            {trend}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}
