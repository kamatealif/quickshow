"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DateRange({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
      {[7, 30, 90].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={cn(
            "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
            value === d
              ? "bg-primary text-black shadow-lg"
              : "text-muted-foreground hover:text-white",
          )}
        >
          {d}D
        </button>
      ))}
    </div>
  );
}
