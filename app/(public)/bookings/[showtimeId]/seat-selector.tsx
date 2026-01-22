"use client";

import { useState } from "react";
import { lockSeats, finalizeBooking } from "./actions";
import { Button } from "@/components/ui/button";

type Seat = {
  id: string;
  row_letter: string;
  seat_number: number;
  price: number;
};

export default function SeatSelector({
  seats,
  showtimeId,
}: {
  seats: Seat[];
  showtimeId: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const grouped = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    acc[seat.row_letter] ||= [];
    acc[seat.row_letter].push(seat);
    return acc;
  }, {});

  const total = seats
    .filter((s) => selected.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  async function handleProceed() {
    setLoading(true);
    try {
      await lockSeats(showtimeId, selected);

      // 🔒 At this point seats are locked
      // Later this is where payment gateway goes

      await finalizeBooking(showtimeId, selected, total);
      alert("Booking confirmed!");
    } catch (err: any) {
      alert(err.message || "Seats just became unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Seat Map */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-6 font-bold">{row}</span>

            {rowSeats.map((seat) => {
              const active = selected.includes(seat.id);

              return (
                <button
                  key={seat.id}
                  onClick={() =>
                    setSelected((prev) =>
                      active
                        ? prev.filter((id) => id !== seat.id)
                        : [...prev, seat.id],
                    )
                  }
                  className={`w-9 h-9 rounded-md text-xs font-bold transition
                    ${
                      active
                        ? "bg-rose-600 text-white"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                >
                  {seat.seat_number}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
        <span className="text-lg font-bold">Total: ₹{total}</span>

        <Button
          disabled={!selected.length || loading}
          onClick={handleProceed}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </Button>
      </div>
    </div>
  );
}
