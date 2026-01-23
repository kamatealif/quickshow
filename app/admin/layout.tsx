import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Film, Building2, Ticket, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const nav = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Theaters",
      href: "/admin/theaters",
      icon: Building2,
    },
    {
      label: "Showtimes",
      href: "/admin/showtimes",
      icon: Film,
    },
    {
      label: "Bookings",
      href: "/admin/bookings",
      icon: Ticket,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div className="p-6 space-y-8">
          {/* BRAND */}
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground opacity-60">
              Control Panel
            </p>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              Quick<span className="text-primary">Admin</span>
            </h1>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={<Icon className="w-4 h-4" />}
                >
                  {item.label}
                </NavItem>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10 bg-gradient-to-b from-black to-zinc-950">
        {children}
      </main>
    </div>
  );
}

/* ───────────────── NAV ITEM ───────────────── */

function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
        "text-zinc-400 hover:text-white hover:bg-white/[0.04]",
      )}
    >
      <span className="text-primary">{icon}</span>
      {children}
    </Link>
  );
}
