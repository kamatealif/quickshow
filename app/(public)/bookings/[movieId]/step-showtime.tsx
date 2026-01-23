"use client";

import { useState } from "react";
import StepSeats from "./step-seats";

export default function StepShowtime({ showtimes }: any) {
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Select Theater & Time</h2>

      <div className="grid gap-4">
        {showtimes.map((s: any) => (
          <button
            key={s.id}
            onClick={() => setSelectedShowtime(s)}
            className={`p-5 rounded-xl border text-left transition
              ${
                selectedShowtime?.id === s.id
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
              }`}
          >
            <p className="font-bold">{s.theaters.name}</p>
            <p className="text-sm text-zinc-400">
              {s.date} • {s.time}
            </p>
            <p className="text-xs uppercase text-zinc-500">
              {s.theaters.screen_type}
            </p>
          </button>
        ))}
      </div>

      {selectedShowtime && <StepSeats showtimeId={selectedShowtime.id} />}
    </section>
  );
}
