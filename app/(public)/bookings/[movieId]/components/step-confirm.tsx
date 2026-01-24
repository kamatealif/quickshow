import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StepConfirm({
  movie,
  showtime,
  onBack,
  onContinue,
}: any) {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Confirm</h2>

      <p>{movie.title}</p>
      <p>
        {showtime.date} • {showtime.time}
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Change
        </Button>
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </Card>
  );
}
