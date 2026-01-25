"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = ["Movie", "Schedule", "Review", "Seats", "Pay"];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={label}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="relative flex flex-col items-center group">
                {/* Number Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isCompleted
                      ? "var(--primary)"
                      : "transparent",
                  }}
                  className={cn(
                    "w-10 h-10 rounded-xl border-2 flex items-center justify-center font-mono font-bold transition-all duration-300",
                    isActive
                      ? "border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] bg-primary/10"
                      : isCompleted
                        ? "border-primary text-primary-foreground"
                        : "border-muted text-muted-foreground/40",
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3px]" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}

                  {/* Active Pulse Ring */}
                  {isActive && (
                    <motion.div
                      layoutId="pulse"
                      className="absolute inset-0 rounded-xl bg-primary/20"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    "absolute -bottom-7 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground opacity-40",
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-[2px] bg-muted relative overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
