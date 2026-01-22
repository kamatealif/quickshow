import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Film,
  Theater,
  CalendarClock,
  Ticket,
  LayoutDashboard,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

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
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* PREMIUM SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-card/40 backdrop-blur-3xl sticky top-0 h-screen flex flex-col">
        <div className="h-24 flex items-center px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">
              Quick<span className="text-primary">Admin</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem href="/admin" icon={LayoutDashboard}>
            Dashboard
          </NavItem>
          <NavItem href="/admin/theaters" icon={Theater}>
            Theaters
          </NavItem>
          <NavItem href="/admin/showtimes" icon={CalendarClock}>
            Showtimes
          </NavItem>
          <NavItem href="/admin/bookings" icon={Ticket}>
            Bookings
          </NavItem>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
              System.Status
            </p>
            <p className="text-[11px] font-mono text-primary uppercase mt-1">
              Node_Online
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between px-5 py-4 rounded-[1.5rem] 
                 text-muted-foreground hover:text-foreground hover:bg-white/[0.03] 
                 border border-transparent hover:border-white/5 transition-all"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="font-black uppercase italic tracking-tighter text-sm">
          {children}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
