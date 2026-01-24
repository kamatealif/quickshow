import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RevenueByShowtime({ bookings }: { bookings: any[] }) {
  const map: Record<string, number> = {};

  bookings.forEach((b) => {
    const t = b.showtimes?.time;
    if (!t) return;
    map[t] = (map[t] || 0) + b.total_amount;
  });

  return (
    <Card className="rounded-lg">
      <CardHeader className="font-medium">Revenue by Showtime</CardHeader>
      <CardContent className="space-y-2 text-sm">
        {Object.entries(map).map(([t, r]) => (
          <div key={t} className="flex justify-between">
            <span>{t}</span>
            <span className="font-mono text-primary">₹{r}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
