import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TopMovies({ bookings }: { bookings: any[] }) {
  const map: Record<string, number> = {};

  bookings.forEach((b) => {
    const title = b.showtimes?.movies?.title;
    if (!title) return;
    map[title] = (map[title] || 0) + b.total_amount;
  });

  const top = Object.entries(map).slice(0, 5);

  return (
    <Card className="rounded-lg">
      <CardHeader className="font-medium">Top Movies</CardHeader>
      <CardContent className="space-y-3">
        {top.map(([t, r]) => (
          <div key={t} className="flex justify-between text-sm">
            <span>{t}</span>
            <span className="font-mono text-primary">₹{r}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
