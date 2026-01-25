"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
  User,
  Phone,
  AtSign,
  Settings2,
  History,
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
  total_amount?: number;
};

export default function ProfilePage() {
  const supabase = createSupabaseBrowserClient();
  const { loading, userId } = useRequireAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function loadData() {
      setLoadingBookings(true);
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

    setUpdating(false);

    if (error) {
      toast.error("Update failed. Please try again.");
      return;
    }

    setProfile((p) => (p ? { ...p, full_name: fullName, username, phone } : p));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  }

  if (loading || (!profile && userId)) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Dynamic Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 md:py-24">
        {/* HEADER SECTION - Constrained Width for Readability */}
        <section className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary border-none text-[10px] font-bold tracking-[0.2em]"
            >
              PREMIUM MEMBER
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
            My <span className="text-primary">Cinema</span> <br />
            Account
          </h1>
          <p className="mt-4 text-muted-foreground font-medium max-w-md">
            Manage your digital identity and review your previous cinematic
            adventures.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: USER CARD - Sticky on Desktop */}
          <div className="lg:col-span-4 self-start lg:sticky lg:top-24">
            <Card className="border-white/5 bg-secondary/20 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
              <CardHeader className="pb-0 pt-10">
                <div className="flex flex-col items-center">
                  <div className="relative p-1 rounded-full ring-2 ring-primary/20">
                    <ProfileAvatar
                      uid={userId!}
                      url={profile?.avatar_url}
                      name={profile?.full_name || "User"}
                      onUpload={(url) =>
                        setProfile((p) => (p ? { ...p, avatar_url: url } : p))
                      }
                    />
                  </div>
                  <CardTitle className="mt-6 text-2xl font-black uppercase italic tracking-tight">
                    {profile?.full_name || "Guest Member"}
                  </CardTitle>
                  <p className="text-xs font-mono text-muted-foreground opacity-60 truncate w-full text-center px-4">
                    {profile?.email}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <ProfileInput
                    label="Full Name"
                    icon={User}
                    value={fullName}
                    onChange={setFullName}
                    disabled={!isEditing}
                  />
                  <ProfileInput
                    label="Handle"
                    icon={AtSign}
                    value={username}
                    onChange={setUsername}
                    disabled={!isEditing}
                  />
                  <ProfileInput
                    label="Contact"
                    icon={Phone}
                    value={phone}
                    onChange={setPhone}
                    disabled={!isEditing}
                  />
                </div>

                <Separator className="bg-white/5" />

                <div className="flex flex-col gap-3">
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2"
                      >
                        <Button
                          onClick={handleUpdateProfile}
                          disabled={updating}
                          className="w-full h-12 rounded-xl font-bold uppercase tracking-widest"
                        >
                          {updating ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="h-12 w-12 rounded-xl shrink-0"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="w-full h-12 rounded-xl font-bold uppercase tracking-widest border-white/10 hover:bg-white/5"
                      >
                        <Settings2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </AnimatePresence>
                  <LogoutButton />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: BOOKINGS - Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-end justify-between px-2 pb-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  Booking Logs
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                {bookings.length} Found
              </span>
            </div>

            <div className="grid gap-4">
              {loadingBookings ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-white/10 rounded-[2.5rem] bg-secondary/10">
                  <Ticket className="mx-auto mb-4 w-10 h-10 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 italic">
                    No cinema history found
                  </p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="group relative bg-secondary/10 hover:bg-secondary/20 border-white/5 transition-all overflow-hidden rounded-[2rem]"
                  >
                    {/* Visual Notch */}
                    <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-10 bg-background rounded-full border border-white/5" />

                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 w-full space-y-4">
                        <div>
                          <p className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mb-1">
                            Confirmed Entry
                          </p>
                          <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                            {booking.movie_title}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <TicketMeta
                            icon={Calendar}
                            label="Show Date"
                            value={new Date(
                              booking.show_date,
                            ).toLocaleDateString()}
                          />
                          <TicketMeta
                            icon={MapPin}
                            label="Cinema"
                            value={booking.theater_name}
                          />
                          <TicketMeta
                            icon={Armchair}
                            label="Seats"
                            value={booking.seats}
                          />
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:pl-8 md:border-l border-white/5">
                        <div className="text-left md:text-right">
                          <p className="text-[9px] font-mono text-muted-foreground uppercase">
                            Fare Paid
                          </p>
                          <p className="text-2xl font-black italic tracking-tighter">
                            ₹{booking.total_amount}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-12 w-12 rounded-xl hover:bg-primary hover:text-white transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileInput({ label, icon: Icon, value, onChange, disabled }: any) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 ml-1">
        <Icon className="w-3 h-3 text-primary" /> {label}
      </Label>
      <Input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl bg-background/50 border-white/5 focus:border-primary/40 transition-all text-sm"
      />
    </div>
  );
}

function TicketMeta({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[8px] font-mono text-muted-foreground/50 uppercase tracking-tighter flex items-center gap-1">
        <Icon className="w-2.5 h-2.5" /> {label}
      </p>
      <p className="text-[11px] font-bold uppercase text-white truncate">
        {value}
      </p>
    </div>
  );
}
