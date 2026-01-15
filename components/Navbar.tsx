"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Film, Menu, Ticket, User, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { UserButton, useUser } from "@clerk/nextjs";

/* ---------------------------------------
   NAVBAR
---------------------------------------- */
export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------- helper: navigate + close mobile -------- */
  const handleNav = (href: string) => {
    setMobileOpen(false);
    router.push(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500
        ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0 })}
          className="group flex items-center gap-2 font-bold text-lg text-white
            transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
        >
          <Film className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          CineBook
        </Link>

        {/* DESKTOP NAV (unchanged) */}
        <NavigationMenu className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
          <NavigationMenuList className="flex gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
                      ${
                        active
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-1/2 -bottom-1 h-[2px] w-6 -translate-x-1/2 rounded-full bg-primary animate-pulse" />
                    )}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/sign-up"
              className="px-6 py-2 rounded-full text-sm font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col bg-[#111] border-l border-white/10 backdrop-blur-xl"
          >
            <VisuallyHidden>
              <SheetTitle>Mobile navigation</SheetTitle>
            </VisuallyHidden>

            {/* NAV LINKS */}
            <div className="mt-14 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-lg font-semibold transition
                    ${
                      pathname === link.href
                        ? "bg-primary/15 text-primary"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* ACCOUNT SECTION */}
            {user ? (
              <MobileUserMenu user={user} />
            ) : (
              <div className="mt-auto pt-6 border-t border-white/10">
                <Link
                  href="/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-full bg-primary shadow-lg shadow-primary/20"
                >
                  Login
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

/* ---------------------------------------
   DATA
---------------------------------------- */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Theaters", href: "/theaters" },
  { label: "Bookings", href: "/bookings" },
];

/* ---------------------------------------
   USER MENUS
---------------------------------------- */
function UserMenu({ user }: { user: { name: string } }) {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: "h-8 w-8",
          userButtonAvatarImage: "h-8 w-8",
          userButtonAvatarFallback: "h-8 w-8",
        },
      }}
    />
  );
}

function MobileUserMenu({ user }: { user: { name: string } }) {
  return (
    <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
      <div className="flex items-center gap-3 text-white">
        <Avatar className="h-9 w-9">
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.name}</span>
      </div>

      <Button variant="outline" className="justify-start">
        <User className="mr-2 h-4 w-4" />
        Profile
      </Button>

      <Button variant="destructive" className="justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
