"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  Clapperboard,
  ChevronRight,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/* ───────────────── TYPES ───────────────── */
type ProfileData = {
  avatar_url: string | null;
  full_name: string | null;
  email: string | null;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("avatar_url, full_name, email")
      .eq("id", userId)
      .single();

    if (data) setProfile(data);
  };

  useEffect(() => {
    if (!mounted) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchProfile(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [mounted, supabase]);

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

  if (!mounted) return <div className="h-20" />;

  const initials = profile?.full_name?.[0] || profile?.email?.[0] || "?";

  return (
    <nav
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "py-4 bg-background/60 backdrop-blur-2xl border-b border-white/5 shadow-xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-8 flex items-center justify-between">
        {/* BRAND - UPDATED TO QUICKSHOW */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
            <Clapperboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground uppercase italic leading-none">
            Quick<span className="text-primary">Show</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center bg-white/[0.02] border border-white/5 px-2 py-2 rounded-[1.5rem] backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-2xl ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP PROFILE */}
        <div className="hidden md:flex items-center gap-4">
          {profile ? (
            <Link href="/profile">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Avatar className="h-11 w-11 border-2 border-white/10 group-hover:border-primary transition-all rounded-2xl shadow-lg">
                  <AvatarImage
                    src={profile.avatar_url || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-secondary text-foreground font-black uppercase rounded-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="secondary"
                className="h-11 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-12 w-12 rounded-2xl bg-white/5 border border-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="z-[110] w-full sm:max-w-md bg-background border-l border-white/5 p-0 flex flex-col"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>

            <div className="px-8 pt-16 pb-8 border-b border-white/5">
              {profile ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-[1.5rem] border-2 border-primary/20">
                    <AvatarImage
                      src={profile.avatar_url || ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-black text-xl rounded-[1.5rem]">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                      {profile.full_name || "Member"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                      {profile.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-primary">
                    QuickShow
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                    Account Hub
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col px-8 py-6">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between py-5 border-b border-white/5 text-2xl font-black uppercase tracking-tighter transition-all ${
                      pathname === link.href
                        ? "text-primary translate-x-2"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronRight
                      className={`h-6 w-6 transition-all ${pathname === link.href ? "opacity-100" : "opacity-0"}`}
                    />
                  </Link>
                </SheetClose>
              ))}
            </div>

            <div className="mt-auto p-8 space-y-4">
              {profile ? (
                <>
                  <SheetClose asChild>
                    <Link href="/profile">
                      <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl gap-3 font-black uppercase tracking-widest text-[10px]"
                      >
                        <Settings className="h-4 w-4" /> Profile Settings
                      </Button>
                    </Link>
                  </SheetClose>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full h-14 rounded-2xl gap-3 font-black uppercase tracking-widest text-[10px] text-destructive hover:bg-destructive/5"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </>
              ) : (
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button className="w-full h-16 rounded-3xl bg-primary font-black uppercase tracking-widest text-xs">
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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Theaters", href: "/theaters" },
];
