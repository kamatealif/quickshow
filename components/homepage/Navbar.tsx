"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Clapperboard, ChevronRight, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/* ------------------------------------------------------- */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  /* ───────── Mounted flag (prevents hydration bugs) ───────── */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ───────── AUTH STATE (CORRECT PATTERN) ───────── */
  useEffect(() => {
    if (!mounted) return;

    // 1️⃣ Hydrate from session (SOURCE OF TRUTH)
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });

    // 2️⃣ Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, [mounted, supabase]);

  /* ───────── Scroll effect ───────── */
  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  const isSignedIn = !!userEmail;

  /* ───────── Render guard (keeps hooks stable) ───────── */
  if (!mounted) {
    return <div className="h-[72px]" />;
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-transform group-hover:scale-110">
            <Clapperboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            Quick<span className="text-primary">Show</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center bg-white/[0.03] border border-white/10 px-1.5 py-1.5 rounded-2xl backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-xl ${
                  active
                    ? "bg-primary text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={isSignedIn ? "/profile" : "/sign-in"}>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar className="h-10 w-10 border border-white/10 bg-white/5 hover:border-primary transition">
                <AvatarFallback className="bg-primary text-white font-black">
                  {isSignedIn ? (
                    userEmail?.[0]?.toUpperCase()
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              {!isSignedIn && (
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
                  Login
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="z-[110] w-full sm:max-w-md bg-[#080808] border-l border-white/5 p-0 flex flex-col"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation</SheetTitle>
            </VisuallyHidden>

            <div className="flex flex-col gap-2 px-8 mt-12">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between py-6 border-b border-white/5 text-3xl font-black uppercase tracking-tighter ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-zinc-800 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="h-6 w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition" />
                  </Link>
                </SheetClose>
              ))}
            </div>

            <div className="mt-auto p-8 space-y-4">
              {isSignedIn ? (
                <>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full gap-3">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full gap-3"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button className="w-full h-14 rounded-2xl bg-primary font-black uppercase tracking-widest">
                      Get Started
                    </Button>
                  </Link>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

/* ───────── NAV LINKS ───────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Theaters", href: "/theaters" },
  { label: "Bookings", href: "/bookings" },
];
