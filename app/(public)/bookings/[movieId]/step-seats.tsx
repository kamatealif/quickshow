"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import StepPayment from "./step-payment";

export default function StepSeats({ showtimeId }: { showtimeId: string }) {
  const supabase = createSupabaseBrowserClient();
  const [seats, setSeats] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    supabase
      .from("seats")
      .select("id, row_letter, seat_number, price, is_available")
      .eq("showtime_id", showtimeId)
      .order("row_letter")
      .order("seat_number")
      .then(({ data }) => setSeats(data || []));
  }, [showtimeId]);

  const total = seats
    .filter((s) => selected.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <section className="space-y-6 mt-10">
      <h2 className="text-xl font-bold">Select Seats</h2>

      <div className="space-y-3">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={!seat.is_available}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(seat.id)
                  ? prev.filter((id) => id !== seat.id)
                  : [...prev, seat.id],
              )
            }
            className={`w-10 h-10 mr-2 mb-2 rounded
              ${
                !seat.is_available
                  ? "bg-zinc-800 text-zinc-600"
                  : selected.includes(seat.id)
                    ? "bg-rose-600 text-white"
                    : "bg-zinc-700 hover:bg-zinc-600"
              }`}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <StepPayment showtimeId={showtimeId} seatIds={selected} total={total} />
      )}
    </section>
  );
}
