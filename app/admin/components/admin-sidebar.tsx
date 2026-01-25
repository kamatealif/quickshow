"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Fixed: Added Framer Motion imports
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  LayoutDashboard,
  Building2,
  Film,
  Ticket,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const nav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Theaters", href: "/admin/theaters", icon: Building2 },
    { label: "Showtimes", href: "/admin/showtimes", icon: Film },
    { label: "Bookings", href: "/admin/bookings", icon: Ticket },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <aside
      className={cn(
        "relative border-r border-white/5 bg-zinc-950/50 backdrop-blur-2xl flex flex-col sticky top-0 h-screen transition-all duration-500 ease-in-out z-50",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-black border-4 border-[#050505] hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={cn("p-6 pb-4", isCollapsed ? "px-4" : "p-8")}>
        {/* BRAND */}
        <div className="flex items-center gap-3 mb-10 overflow-hidden min-h-[40px]">
          <div className="h-10 w-10 shrink-0 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldCheck className="w-6 h-6 text-black" />
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none text-white">
                  Quick<span className="text-primary">Admin</span>
                </h1>
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
                  v2.0 Beta
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition-all group relative",
                  isActive
                    ? "bg-primary/10 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.03]",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-zinc-600 group-hover:text-primary",
                  )}
                />

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip for Collapsed State */}
                {isCollapsed && (
                  <div className="absolute left-14 invisible group-hover:visible bg-zinc-900 border border-white/10 text-primary text-[10px] font-black uppercase px-3 py-2 rounded-lg whitespace-nowrap z-[60] shadow-2xl">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="mt-auto p-6 space-y-4">
        <div className="h-px w-full bg-white/5" />
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors",
            isCollapsed ? "justify-center" : "px-4",
          )}
        >
          {isCollapsed ? (
            <ExternalLink className="w-4 h-4" />
          ) : (
            <>
              <span className="truncate">View Live Site</span>
              <ExternalLink className="w-3 h-3 ml-2" />
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
