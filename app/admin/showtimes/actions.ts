"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createShowtime(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const movie_id = Number(formData.get("movie_id"));
  const theater_id = String(formData.get("theater_id"));
  const date = String(formData.get("date"));
  const time = String(formData.get("time"));
  const price = Number(formData.get("price"));

  // 1️⃣ Fetch theater layout
  const { data: theater } = await supabase
    .from("theaters")
    .select("seat_layout")
    .eq("id", theater_id)
    .single();

  if (!theater) throw new Error("Invalid theater");

  const layout = JSON.parse(theater.seat_layout);

  // 2️⃣ Create showtime
  const { data: showtime, error } = await supabase
    .from("showtimes")
    .insert({
      movie_id,
      theater_id,
      date,
      time,
      price,
      total_seats: layout.rows.length * layout.seatsPerRow,
      available_seats: layout.rows.length * layout.seatsPerRow,
      status: "active",
    })
    .select()
    .single();

  if (error) throw error;

  // 3️⃣ Generate seats
  const seats = [];

  for (const row of layout.rows) {
    for (let i = 1; i <= layout.seatsPerRow; i++) {
      let type = "regular";
      let seatPrice = price;

      if (layout.vipRows?.includes(row)) {
        type = "vip";
        seatPrice += 150;
      } else if (layout.premiumRows?.includes(row)) {
        type = "premium";
        seatPrice += 80;
      }

      seats.push({
        showtime_id: showtime.id,
        row_letter: row,
        seat_number: i,
        type,
        price: seatPrice,
        is_available: true,
      });
    }
  }

  const { error: seatError } = await supabase.from("seats").insert(seats);
  if (seatError) throw seatError;
}
