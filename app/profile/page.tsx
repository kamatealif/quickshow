"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Loader2,
  X,
  Calendar,
  MapPin,
  Armchair,
  Ticket,
  ChevronRight,
} from "lucide-react";

import LogoutButton from "./logout-button";
import ProfileAvatar from "@/components/profile/Avatar";

/* ───────────────── TYPES ───────────────── */

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
};

type Booking = {
  id: string;
  movie_title: string;
  show_date: string;
  show_time: string;
  seats: string;
  theater_name: string;
};

export default function ProfilePage() {
  const supabase = createSupabaseBrowserClient();
  const { loading, userId } = useRequireAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!userId) return;
    async function loadData() {
      const [pRes, bRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase
          .from("bookings")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
      ]);

      if (pRes.data) {
        setProfile(pRes.data);
        setFullName(pRes.data.full_name ?? "");
      }
      if (bRes.data) setBookings(bRes.data);
      setLoadingBookings(false);
    }
    loadData();
  }, [userId, supabase]);

  async function handleUpdateProfile() {
    if (!userId || !fullName.trim()) return;
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
        <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* NAVBAR */}
      <nav className="fixed top-20 w-full z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase italic text-primary/90">
              Cinema.Club
            </span>
          </div>
          <LogoutButton />
        </div>
      </nav>

      {/* Main Container - Adjusted Padding Top to pt-60 for extra margin */}
      <main className="max-w-7xl mx-auto px-8 pt-60 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: PROFILE CARD - Adjusted sticky top to match main padding */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-60">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                <CardContent className="p-10 -mt-16 space-y-8 flex flex-col items-center">
                  <ProfileAvatar
                    uid={userId!}
                    url={profile?.avatar_url || null}
                    name={profile?.full_name || ""}
                    onUpload={(url) =>
                      setProfile((p) => (p ? { ...p, avatar_url: url } : p))
                    }
                  />

                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-black tracking-tight">
                      {profile?.full_name || "Member"}
                    </h2>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                      {profile?.email}
                    </p>
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="w-full space-y-5">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground/60 ml-3 tracking-widest">
                        Display Name
                      </Label>
                      <Input
                        disabled={!isEditing}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-background/50 border-white/5 h-14 rounded-2xl px-6 font-medium transition-all focus:ring-primary/20"
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="edit-mode"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex gap-2"
                        >
                          <Button
                            onClick={handleUpdateProfile}
                            disabled={updating}
                            className="flex-1 h-14 rounded-2xl font-bold shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]"
                          >
                            {updating ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="h-14 w-14 rounded-2xl border-white/10"
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      ) : (
                        <Button
                          variant="secondary"
                          className="w-full h-14 rounded-2xl font-bold hover:bg-secondary/70 transition-all"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: BOOKINGS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-3">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  My Tickets
                </h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Manage your upcoming movie experiences
                </p>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/5 text-primary border-none px-5 py-1.5 font-bold"
              >
                {bookings.length} Total
              </Badge>
            </div>

            <div className="grid gap-5">
              {loadingBookings ? (
                <div className="py-24 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-card/10">
                  <Ticket className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                    No movies booked yet
                  </p>
                </div>
              ) : (
                bookings.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group border-white/5 bg-card/30 hover:bg-card/50 transition-all duration-300 rounded-[2.2rem] overflow-hidden cursor-default">
                      <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-1 space-y-5 text-center md:text-left w-full">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">
                              Confirmed Ticket
                            </span>
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                              {b.movie_title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-1">
                            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest">
                              <Calendar className="w-4 h-4 text-primary/40" />{" "}
                              {new Date(b.show_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest">
                              <MapPin className="w-4 h-4 text-primary/40" />{" "}
                              {b.theater_name}
                            </div>
                            <div className="flex items-center gap-2.5 text-sm font-black text-primary uppercase tracking-tighter">
                              <Armchair className="w-4 h-4" /> Seats {b.seats}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-16 w-16 rounded-[1.5rem] bg-background/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0 shadow-lg border-white/5"
                        >
                          <ChevronRight className="w-7 h-7" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
