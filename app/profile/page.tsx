"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
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
  User,
  Phone,
  AtSign,
} from "lucide-react";

import LogoutButton from "./logout-button";
import ProfileAvatar from "@/components/profile/Avatar";

/* ───────────────── TYPES ───────────────── */

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
  phone: string | null;
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

  // Editable States
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

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
        setUsername(pRes.data.username ?? "");
        setPhone(pRes.data.phone ?? "");
      }
      if (bRes.data) setBookings(bRes.data);
      setLoadingBookings(false);
    }
    loadData();
  }, [userId, supabase]);

  async function handleUpdateProfile() {
    if (!userId) return;
    setUpdating(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username: username || null,
        phone: phone || null,
      })
      .eq("id", userId);

    if (!error) {
      setProfile((p) =>
        p ? { ...p, full_name: fullName, username, phone } : p,
      );
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
      {/* Main Container Spacing: 
          pt-36 provides room for a fixed navbar (h-16 or h-20) 
          plus a balanced top margin.
      */}
      <main className="max-w-7xl mx-auto px-8 pt-36 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: PROFILE CARD */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                <CardContent className="p-10 -mt-16 space-y-8">
                  {/* HEADER AREA */}
                  <div className="flex flex-col items-center">
                    <ProfileAvatar
                      uid={userId!}
                      url={profile?.avatar_url || null}
                      name={profile?.full_name || ""}
                      onUpload={(url) =>
                        setProfile((p) => (p ? { ...p, avatar_url: url } : p))
                      }
                    />
                    <div className="text-center mt-4 space-y-1">
                      <h2 className="text-2xl font-black tracking-tight italic uppercase leading-none">
                        {profile?.full_name || "Quick Member"}
                      </h2>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] opacity-60">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-white/5" />

                  {/* INPUT FIELDS */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 ml-3 flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Display Name
                      </Label>
                      <Input
                        disabled={!isEditing}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-background/40 border-white/5 h-14 rounded-2xl px-6 font-medium focus:ring-primary/20 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 ml-3 flex items-center gap-2">
                        <AtSign className="w-3.5 h-3.5" /> Handle
                      </Label>
                      <Input
                        disabled={!isEditing}
                        value={username}
                        placeholder="quick_fan"
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-background/40 border-white/5 h-14 rounded-2xl px-6 font-medium focus:ring-primary/20 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 ml-3 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> Contact
                      </Label>
                      <Input
                        disabled={!isEditing}
                        value={phone}
                        placeholder="+1 000 000 000"
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-background/40 border-white/5 h-14 rounded-2xl px-6 font-medium focus:ring-primary/20 transition-all shadow-inner"
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-2 pt-2"
                        >
                          <Button
                            onClick={handleUpdateProfile}
                            disabled={updating}
                            className="flex-1 h-14 rounded-2xl font-black shadow-xl shadow-primary/10 uppercase"
                          >
                            {updating ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              "Update Profile"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            className="h-14 w-14 rounded-2xl border-white/10"
                            onClick={() => {
                              setFullName(profile?.full_name ?? "");
                              setUsername(profile?.username ?? "");
                              setPhone(profile?.phone ?? "");
                              setIsEditing(false);
                            }}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      ) : (
                        <div className="space-y-3 pt-2">
                          <Button
                            variant="secondary"
                            className="w-full h-14 rounded-2xl font-black uppercase tracking-tight shadow-lg"
                            onClick={() => setIsEditing(true)}
                          >
                            Modify Settings
                          </Button>

                          <div className="pt-4 border-t border-white/5">
                            <LogoutButton />
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: BOOKINGS */}
          <div className="lg:col-span-7 space-y-8 pt-4">
            <div className="flex items-center justify-between px-3">
              <div className="space-y-1">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary/80">
                  QuickTickets
                </h2>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">
                  Confirmed Showings
                </p>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-white/10 text-[10px] px-4 py-1 font-black uppercase tracking-widest italic"
              >
                {bookings.length} Total
              </Badge>
            </div>

            <div className="grid gap-6">
              {loadingBookings ? (
                <div className="py-24 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-card/10 flex flex-col items-center justify-center space-y-4">
                  <Ticket className="w-10 h-10 text-muted-foreground/20" />
                  <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">
                    No active booking nodes found
                  </p>
                </div>
              ) : (
                bookings.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group relative border-white/5 bg-card/20 hover:bg-card/40 transition-all duration-500 rounded-[2.5rem] overflow-hidden border-l-4 border-l-primary/30">
                      <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-1 space-y-5 text-center md:text-left">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-60 leading-none">
                              #{b.id.slice(0, 8)}
                            </span>
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none">
                              {b.movie_title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap justify-center md:justify-start gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5 text-primary/40" />
                              {new Date(b.show_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5 text-primary/40" />
                              {b.theater_name}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-primary">
                              <Armchair className="w-3.5 h-3.5" />
                              {b.seats}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-16 w-16 rounded-3xl bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground shadow-2xl transition-all duration-300"
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
