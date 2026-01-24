import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function StepPayment({ movie, showtime, seats }: any) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const total = seats.length * showtime.price;

  async function pay() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("bookings").insert({
      user_id: user.id,
      movie_title: movie.title,
      seats,
      total_amount: total,
    });

    router.push("/profile");
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Payment</h2>
      <p>Seats: {seats.join(", ")}</p>
      <p>Total: ₹{total}</p>

      <Button onClick={pay}>Pay & Book</Button>
    </Card>
  );
}
