import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const { data: revenue } = await supabase
    .from("bookings")
    .select("total_amount")
    .eq("payment_status", "paid");

  const totalRevenue =
    revenue?.reduce((sum, b) => sum + b.total_amount, 0) || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Dashboard</h1>

      <div className="p-6 rounded-xl bg-zinc-900 border border-white/10">
        <p className="text-sm text-zinc-400">Total Revenue</p>
        <p className="text-4xl font-black">₹{totalRevenue}</p>
      </div>

      <p className="text-xs text-zinc-500">
        Read-only metrics derived from bookings & showtimes.
      </p>
    </div>
  );
}
