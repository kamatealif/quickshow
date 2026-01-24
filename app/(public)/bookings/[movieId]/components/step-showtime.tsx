import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StepShowtime({
  showtimes,
  onSelect,
}: {
  showtimes: any[];
  onSelect: (s: any) => void;
}) {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Choose Showtime</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {showtimes.map((s) => (
          <Button
            key={s.id}
            variant="outline"
            className="h-auto justify-between p-4"
            onClick={() => onSelect(s)}
          >
            <div className="text-left">
              <p className="font-medium">{s.date}</p>
              <p className="text-muted-foreground">{s.time}</p>
            </div>
            <span>₹{s.price}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
