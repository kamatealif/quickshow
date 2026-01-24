import { Button } from "@/components/ui/button";

export default function DateRange({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[7, 30, 90].map((d) => (
        <Button
          key={d}
          variant={value === d ? "default" : "outline"}
          className="rounded-md text-xs"
          onClick={() => onChange(d)}
        >
          Last {d} days
        </Button>
      ))}
    </div>
  );
}
