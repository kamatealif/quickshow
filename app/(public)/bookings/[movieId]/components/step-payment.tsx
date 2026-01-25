"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type StepPaymentProps = {
  movie: {
    title: string;
  };
  showtime: {
    date: string;
    time: string;
    price: number;
    theaters: {
      name: string;
    };
  };
  seats: string[];
};

export default function StepPayment({
  movie,
  showtime,
  seats,
}: StepPaymentProps) {
  const supabase = createSupabaseBrowserClient();
  const { toast } = useToast();
  const router = useRouter();

  async function handleConfirmBooking() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue.",
        variant: "destructive",
      });
      return;
    }

    // 🔥 INSERT BOOKING (THIS WAS MISSING BEFORE)
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      movie_title: movie.title,
      show_date: showtime.date,
      show_time: showtime.time,
      seats: seats.join(", "),
      theater_name: showtime.theaters.name,
    });

    if (error) {
      console.error(error);
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // ✅ SUCCESS TOAST
    toast({
      title: "Booking successful 🎉",
      description: `Seats ${seats.join(", ")} booked successfully.`,
    });

    // ✅ REDIRECT TO PROFILE
    setTimeout(() => {
      router.push("/profile");
    }, 1200);
  }

  return (
    <Card className="rounded-3xl border border-primary/20 bg-card/30">
      <CardContent className="p-8 space-y-6">
        <h2 className="text-2xl font-black uppercase italic tracking-tight">
          Payment
        </h2>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Movie:</span>{" "}
            {movie.title}
          </p>
          <p>
            <span className="font-semibold text-foreground">Show:</span>{" "}
            {showtime.date} • {showtime.time}
          </p>
          <p>
            <span className="font-semibold text-foreground">Seats:</span>{" "}
            {seats.join(", ")}
          </p>
          <p className="text-lg font-black text-primary">
            Total ₹{seats.length * showtime.price}
          </p>
        </div>

        <Button
          onClick={handleConfirmBooking}
          className="w-full h-14 rounded-2xl font-black uppercase tracking-tight shadow-lg shadow-primary/20"
        >
          Pay & Confirm Booking
        </Button>
      </CardContent>
    </Card>
  );
}
