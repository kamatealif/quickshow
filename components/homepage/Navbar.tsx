"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Clapperboard, ChevronRight, Settings } from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk(); // Built-in Clerk helper
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* 1. BRAND LOGO */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-transform group-hover:scale-110">
            <Clapperboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            Quick<span className="text-primary">Show</span>
          </span>
        </Link>

        {/* 2. DESKTOP NAVIGATION */}
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

        {/* 3. MOBILE TRIGGER & AUTH */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-up">
                <Button className="rounded-xl bg-white text-black hover:bg-zinc-200 font-bold px-6 h-10 text-xs uppercase tracking-widest">
                  Login
                </Button>
              </Link>
            )}
          </div>

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

            {/* FIXED: High Z-index and solid background to prevent overlap */}
            <SheetContent
              side="right"
              className="z-[110] w-full sm:max-w-md bg-[#080808] border-l border-white/5 p-0 flex flex-col focus:ring-0 outline-none"
            >
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>

              {/* Header with CUSTOM Close Button ONLY */}
              <div className="flex items-center justify-between p-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <Clapperboard className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-black text-white uppercase italic tracking-tighter text-lg">
                    QuickShow
                  </span>
                </div>

                {/* Our only close button */}
                {/* <SheetClose className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-primary group focus:outline-none">
                  <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
                </SheetClose> */}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 px-8 mt-4 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`group flex items-center justify-between py-6 border-b border-white/5 text-3xl font-black uppercase tracking-tighter transition-all ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-zinc-800 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        className={`h-6 w-6 transition-transform ${
                          pathname === link.href
                            ? "text-primary opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
                        }`}
                      />
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* FOOTER: Integrated Profile Button */}
              <div className="mt-auto p-8 bg-gradient-to-t from-black to-transparent">
                {isSignedIn ? (
                  <div
                    onClick={() => openUserProfile()} // Opens built-in Clerk dialog
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-primary/50 cursor-pointer shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonTrigger: "pointer-events-none",
                          },
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                          {user?.firstName || "My Profile"}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1">
                          Manage Account <Settings className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Link href="/sign-up">
                      <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20">
                        Get Started
                      </Button>
                    </Link>
                  </SheetClose>
                )}
                <p className="mt-8 text-[9px] text-zinc-700 font-black uppercase tracking-[0.4em] text-center">
                  Premium Cinema Experience
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Theaters", href: "/theaters" },
  { label: "Bookings", href: "/bookings" },
];
