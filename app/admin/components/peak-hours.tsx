import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PeakHours({ bookings }: { bookings: any[] }) {
  const hours: Record<string, number> = {};

  bookings.forEach((b) => {
    const h = new Date(b.booking_date).getHours();
    hours[h] = (hours[h] || 0) + 1;
  });

  const peak = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];

  return (
    <Card className="rounded-lg">
      <CardHeader className="font-medium">Peak Booking Hour</CardHeader>
      <CardContent className="text-3xl font-semibold text-primary">
        {peak ? `${peak[0]}:00` : "—"}
      </CardContent>
    </Card>
  );
}
