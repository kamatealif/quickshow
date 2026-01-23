"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Armchair,
  ChevronRight,
  ChevronLeft,
  Ticket,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ───────────────── TYPES ───────────────── */

type BookingStage = "schedule" | "seating" | "summary";

export default function BookingPage({ params }: { params: { id: string } }) {
  const [stage, setStage] = useState<BookingStage>("schedule");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  // Mock data representing showtimes categorized by your schema's screen_type
  const showtimes = [
    { id: "s1", time: "10:30 AM", type: "IMAX", price: 450 },
    { id: "s2", time: "01:45 PM", type: "4DX", price: 550 },
    { id: "s3", time: "05:00 PM", type: "Standard", price: 250 },
    { id: "s4", time: "09:30 PM", type: "Premium", price: 350 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <main className="max-w-3xl mx-auto space-y-10">
        {/* 1. PROGRESS TERMINAL */}
        <div className="flex items-center justify-between px-4">
          <ProgressNode
            label="Schedule"
            active={stage === "schedule"}
            done={stage !== "schedule"}
          />
          <div className="h-px flex-1 bg-white/5 mx-4" />
          <ProgressNode
            label="Seating"
            active={stage === "seating"}
            done={stage === "summary"}
          />
          <div className="h-px flex-1 bg-white/5 mx-4" />
          <ProgressNode
            label="Checkout"
            active={stage === "summary"}
            done={false}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* STAGE 1: SCHEDULE SELECTION */}
          {stage === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {/* Date Selection */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] italic">
                    Select.Date
                  </h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                  {[...Array(7)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const isSelected = selectedDate === date.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date.toDateString())}
                        className={`flex-shrink-0 w-20 py-4 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-primary border-primary shadow-lg shadow-primary/20"
                            : "bg-card/40 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                        >
                          {date.toLocaleDateString("en-IN", {
                            weekday: "short",
                          })}
                        </p>
                        <p
                          className={`text-xl font-black italic ${isSelected ? "text-primary-foreground" : "text-foreground"}`}
                        >
                          {date.getDate()}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Showtime Selection */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] italic">
                    Select.Experience
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showtimes.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedShowtime(st.id)}
                      className={`p-6 rounded-[2rem] border text-left transition-all relative overflow-hidden group ${
                        selectedShowtime === st.id
                          ? "bg-primary/10 border-primary"
                          : "bg-card/40 border-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                          <p className="text-2xl font-black italic tracking-tighter uppercase">
                            {st.time}
                          </p>
                          <Badge
                            variant="outline"
                            className="border-white/10 text-[9px] font-black uppercase tracking-[0.2em]"
                          >
                            {st.type}
                          </Badge>
                        </div>
                        <p className="text-xl font-black italic text-primary">
                          ₹{st.price}
                        </p>
                      </div>
                      {selectedShowtime === st.id && (
                        <motion.div
                          layoutId="activeBG"
                          className="absolute inset-0 bg-primary/5 z-0"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              <Button
                disabled={!selectedDate || !selectedShowtime}
                onClick={() => setStage("seating")}
                className="w-full h-20 rounded-[2rem] font-black uppercase italic tracking-tighter text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                Choose Seats <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          )}

          {/* STAGE 2: SEATING (Placeholder for now) */}
          {stage === "seating" && (
            <motion.div
              key="seating"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Button
                variant="ghost"
                onClick={() => setStage("schedule")}
                className="rounded-xl group"
              >
                <ChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Schedule
              </Button>
              {/* We will build the SVG Seat Map here next */}
              <div className="h-96 rounded-[3rem] border border-dashed border-white/10 flex items-center justify-center italic text-muted-foreground">
                Seating.Grid_Engine_Loading...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ───────────────── COMPONENTS ───────────────── */

function ProgressNode({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${
          active
            ? "bg-primary shadow-lg shadow-primary/20 scale-110"
            : done
              ? "bg-primary/20"
              : "bg-white/5"
        }`}
      >
        {done ? (
          <CheckCircle2 className="w-4 h-4 text-primary" />
        ) : (
          <div
            className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary-foreground" : "bg-white/20"}`}
          />
        )}
      </div>
      <span
        className={`text-[9px] font-black uppercase tracking-widest italic ${active ? "text-primary" : "text-muted-foreground/40"}`}
      >
        {label}
      </span>
    </div>
  );
}
