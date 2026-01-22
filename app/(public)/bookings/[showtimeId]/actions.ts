"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const LOCK_EXPIRY_MINUTES = 10;

/**
 * STEP 1: Lock seats atomically
 */
export async function lockSeats(
  showtimeId: string,
  seatIds: string[]
) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const expiryISO = new Date(
    Date.now() - LOCK_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  const { error, count } = await supabase
    .from("seats")
    .update({
      locked_by: user.id,
      locked_at: new Date().toISOString(),
    })
    .in("id", seatIds)
    .eq("showtime_id", showtimeId)
    .eq("is_available", true)
    .or(`locked_at.is.null,locked_at.lt.${expiryISO}`)
    .select("*", { count: "exact" });

  if (error || count !== seatIds.length) {
    throw new Error("Some seats are no longer available");
  }

  return { success: true };
}

/**
 * STEP 2: Finalize booking after payment
 */
export async function finalizeBooking(
  showtimeId: string,
  seatIds: string[],
  totalAmount: number
) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Mark seats as booked
  const { error: seatError } = await supabase
    .from("seats")
    .update({
      is_available: false,
      locked_by: null,
      locked_at: null,
    })
    .in("id", seatIds)
    .eq("locked_by", user.id);

  if (seatError) throw new Error("Seat finalization failed");

  // Create booking
  const { error: bookingError } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      showtime_id: showtimeId,
      seats: JSON.stringify(seatIds),
      total_amount: totalAmount,
      status: "confirmed",
      payment_status: "paid",
      show_date: new Date(),
      show_time: new Date(),
    });

  if (bookingError) throw new Error("Booking failed");

  return { success: true };
}
