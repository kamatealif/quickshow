"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/userRequireAuth";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Loader2,
  Save,
  X,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
} from "lucide-react";

import LogoutButton from "./logout-button";

/* ───────────────────────────────────────────────────────────── */

type Profile = {
  email: string | null;
  is_admin: boolean;
  full_name: string | null;
};

const MOCK_BOOKINGS = [
  {
    id: "BK-9921",
    movie: "Interstellar: Re-Release",
    date: "Jan 24, 2026",
    time: "07:30 PM",
    seats: "H-12, H-13",
    theater: "Screen 4 – IMAX",
  },
];

/* ───────────────────────────────────────────────────────────── */

export default function ProfilePage() {
  const supabase = createSupabaseBrowserClient();
  const { loading, userId } = useRequireAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function loadProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("email, is_admin, full_name")
        .eq("id", userId)
        .single();

      if (data) {
        setProfile(data);
        setFullName(data.full_name ?? "");
      }
    }
    loadProfile();
  }, [userId, supabase]);

  async function handleUpdateProfile() {
    if (!userId) return;
    setUpdating(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", userId);

    if (!error) {
      setProfile((p) => (p ? { ...p, full_name: fullName } : p));
      setIsEditing(false);
    }
    setUpdating(false);
  }

  if (loading || (!profile && userId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NEAT ALIGNED FIXED HEADER ─── */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary flex items-center justify-center rounded-sm">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-black uppercase tracking-tighter italic text-lg">
              User.Terminal
            </span>
          </div>
          <div className="flex items-center gap-4">
            {profile?.is_admin && (
              <Badge
                variant="outline"
                className="hidden md:flex rounded-sm border-primary/50 text-primary text-[10px] uppercase font-bold"
              >
                <ShieldCheck className="w-3 h-3 mr-1" /> Admin
              </Badge>
            )}
            <div className="h-4 w-[1px] bg-border mx-2 hidden md:block" />
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-12">
        {/* Page Title Section */}
        <section className="space-y-2">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            {profile?.full_name || "Account Profile"}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-widest font-bold">
            <span className="text-primary">●</span> Active Session:{" "}
            {profile?.email}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ───────── IDENTITY PANEL ───────── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                Identity Settings
              </h2>
            </div>

            <Card className="rounded-sm border-border bg-card/50 shadow-none">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground">
                      Display Name
                    </Label>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-primary text-[10px] font-black uppercase hover:underline"
                      >
                        [ Modify ]
                      </button>
                    )}
                  </div>

                  <Input
                    disabled={!isEditing}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 rounded-sm border-border bg-background font-bold uppercase text-xs"
                  />

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdateProfile}
                        disabled={updating}
                        className="flex-1 h-9 rounded-sm text-[10px] font-black uppercase"
                      >
                        {updating ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 px-3 rounded-sm border-border"
                        onClick={() => {
                          setFullName(profile?.full_name ?? "");
                          setIsEditing(false);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground">
                    Node ID (Email)
                  </Label>
                  <div className="text-xs font-mono p-3 bg-muted/50 rounded-sm border border-border break-all">
                    {profile?.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ───────── TRANSMISSIONS PANEL ───────── */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 border-l-2 border-primary pl-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                Active Transmissions
              </h2>
            </div>

            <div className="grid gap-4">
              {MOCK_BOOKINGS.map((booking) => (
                <Card
                  key={booking.id}
                  className="rounded-sm border-border hover:border-primary/50 transition-all bg-card/30 group"
                >
                  <CardContent className="p-0 flex flex-col md:flex-row h-full">
                    <div className="p-6 flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className="rounded-none bg-primary text-[9px] font-black italic">
                          {booking.id}
                        </Badge>
                        <div className="h-[1px] flex-1 bg-border" />
                      </div>

                      <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                        {booking.movie}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black uppercase text-muted-foreground">
                            Date
                          </p>
                          <p className="text-[11px] font-bold uppercase">
                            {booking.date}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black uppercase text-muted-foreground">
                            Time
                          </p>
                          <p className="text-[11px] font-bold uppercase">
                            {booking.time}
                          </p>
                        </div>
                        <div className="space-y-1 col-span-2 md:col-span-1">
                          <p className="text-[8px] font-black uppercase text-muted-foreground">
                            Location
                          </p>
                          <p className="text-[11px] font-bold uppercase truncate">
                            {booking.theater}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-32 bg-muted/50 flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-border">
                      <span className="text-[8px] font-black uppercase text-muted-foreground mb-1">
                        Seats
                      </span>
                      <span className="text-xl font-black text-primary italic">
                        {booking.seats}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
