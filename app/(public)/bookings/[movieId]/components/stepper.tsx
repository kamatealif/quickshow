import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const steps = ["Movie", "Showtime", "Confirm", "Seats", "Payment"];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step === currentStep;
        const done = step < currentStep;

        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-9 w-9 rounded-md border text-sm font-semibold flex items-center justify-center",
                  done && "bg-primary text-primary-foreground border-primary",
                  active && "border-2 border-primary text-primary",
                  !done && !active && "border-muted text-muted-foreground",
                )}
              >
                {step}
              </div>
              <span className="mt-2 text-xs">{label}</span>
            </div>

            {step < steps.length && (
              <Separator
                className={cn("mx-4", done ? "bg-primary" : "bg-muted")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
