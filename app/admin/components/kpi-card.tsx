import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function KpiCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        "rounded-lg",
        highlight && "border-primary/40 bg-primary/5",
      )}
    >
      <CardContent className="p-6 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={cn("text-3xl font-semibold", highlight && "text-primary")}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
