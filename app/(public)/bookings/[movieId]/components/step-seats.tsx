import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const rows = ["A", "B", "C", "D"];

export default function StepSeats({ onConfirm }: any) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Select Seats</h2>

      {rows.map((r) => (
        <div key={r} className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => {
            const seat = `${r}${i + 1}`;
            return (
              <Button
                key={seat}
                size="sm"
                variant={selected.includes(seat) ? "default" : "outline"}
                onClick={() =>
                  setSelected((s) =>
                    s.includes(seat)
                      ? s.filter((x) => x !== seat)
                      : [...s, seat],
                  )
                }
              >
                {i + 1}
              </Button>
            );
          })}
        </div>
      ))}

      <Button onClick={() => onConfirm(selected)} disabled={!selected.length}>
        Confirm Seats
      </Button>
    </Card>
  );
}
