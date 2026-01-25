"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "./components/stepper";
import StepMovie from "./components/step-movie";
import StepShowtime from "./components/step-showtime";
import StepConfirm from "./components/step-confirm";
import StepSeats from "./components/step-seats";
import StepPayment from "./components/step-payment";

export type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingClient({
  movie,
  showtimes,
}: {
  movie: any;
  showtimes: any[];
}) {
  const [step, setStep] = useState<Step>(2);
  const [showtime, setShowtime] = useState<any>(null);
  const [seats, setSeats] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 pb-20">
      {/* Decorative Blur Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 space-y-12">
        <header className="space-y-4 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Secure Your <span className="text-primary">Pass</span>
          </h1>
          <Stepper currentStep={step} />
        </header>

        <section className="grid gap-8">
          <StepMovie movie={movie} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 2 && (
                <StepShowtime
                  showtimes={showtimes}
                  onSelect={(s) => {
                    setShowtime(s);
                    setStep(3);
                  }}
                />
              )}

              {step === 3 && (
                <StepConfirm
                  movie={movie}
                  showtime={showtime}
                  onBack={() => setStep(2)}
                  onContinue={() => setStep(4)}
                />
              )}

              {step === 4 && (
                <StepSeats
                  onConfirm={(s) => {
                    setSeats(s);
                    setStep(5);
                  }}
                  onBack={() => setStep(3)}
                />
              )}

              {step === 5 && (
                <StepPayment movie={movie} showtime={showtime} seats={seats} />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
