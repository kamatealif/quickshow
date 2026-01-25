import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/admin-sidebar"; // Import the new component

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30">
      <AdminSidebar />

      <main className="flex-1 relative transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="relative p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
