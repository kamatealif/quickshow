"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function StepPayment({ movie, showtime, seats }: any) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirmBooking() {
    setLoading(true);

    try {
      // 1. Verify User Session
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        toast.error("Authentication failed", {
          description: "Please log in to continue.",
        });
        setLoading(false);
        return;
      }

      // 2. Format Data for Postgres Schema
      // Postgres 'date' expects YYYY-MM-DD
      // Postgres 'numeric' expects a valid number
      const bookingPayload = {
        user_id: user.id,
        movie_title: movie.title,
        show_date: new Date(showtime.date).toISOString().split("T")[0],
        show_time: showtime.time,
        seats: seats.join(", "),
        theater_name: showtime.theaters.name,
        total_amount: parseFloat((seats.length * showtime.price).toFixed(2)),
      };

      // 3. Perform Insert
      const { error: dbError } = await supabase
        .from("bookings")
        .insert([bookingPayload]);

      if (dbError) {
        console.error(
          "Database Insert Failed:",
          dbError.message,
          dbError.details,
        );
        toast.error("Booking Failed", { description: dbError.message });
        setLoading(false);
        return;
      }

      // 4. Success Flow
      toast.success("Transaction Complete", {
        description: `Successfully booked ${seats.length} seats for ${movie.title}.`,
      });

      // Navigate to profile to see the new ticket
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      console.error("Unexpected Error:", err);
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  }

  const totalPrice = seats.length * showtime.price;

  return (
    <Card className="p-8 bg-primary/5 border-primary/20 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
      {/* Visual Flair */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
        <CreditCard className="w-48 h-48 text-primary" />
      </div>

      <div className="relative z-10 space-y-8">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Finalize Pass
          </h2>
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
              Secure Pay
            </span>
          </div>
        </header>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            <div>Cinema</div>
            <div className="text-right text-foreground font-bold">
              {showtime.theaters.name}
            </div>

            <div>Schedule</div>
            <div className="text-right text-foreground font-bold">
              {showtime.date} @ {showtime.time}
            </div>

            <div>Seats</div>
            <div className="text-right text-foreground font-bold">
              {seats.join(", ")}
            </div>
          </div>

          <div className="h-px bg-white/5 my-6" />

          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-[0.4em]">
              Amount Payable
            </span>
            <span className="text-4xl font-black italic tracking-tighter text-primary">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          disabled={loading || seats.length === 0}
          onClick={handleConfirmBooking}
          className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl shadow-primary/20 group overflow-hidden relative"
        >
          {loading ? (
            <Loader2 className="animate-spin w-6 h-6" />
          ) : (
            <>
              Authorize Payment
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
