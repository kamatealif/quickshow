"use client";

export default function StepPayment({
  showtimeId,
  seatIds,
  total,
}: {
  showtimeId: string;
  seatIds: string[];
  total: number;
}) {
  return (
    <section className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 mt-8">
      <h2 className="text-xl font-bold">Payment</h2>

      <p className="text-zinc-400 mt-2">Seats selected: {seatIds.length}</p>

      <p className="text-lg font-bold mt-4">Total: ₹{total}</p>

      <button className="mt-6 px-6 py-3 rounded bg-rose-600 hover:bg-rose-700 font-bold">
        Pay Now
      </button>
    </section>
  );
}
