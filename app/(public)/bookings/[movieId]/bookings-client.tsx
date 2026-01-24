"use client";

import { useState } from "react";
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
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-10">
      <Stepper currentStep={step} />

      <StepMovie movie={movie} />

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
        />
      )}

      {step === 5 && (
        <StepPayment movie={movie} showtime={showtime} seats={seats} />
      )}
    </main>
  );
}
