"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
  Mail,
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

  /* ───────────────── DATA FETCHING ───────────────── */

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

  /* ───────────────── UPDATE HANDLER ───────────────── */

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
      toast.error("Profile update failed");
      return;
    }

    setProfile((p) => (p ? { ...p, full_name: fullName, username, phone } : p));
    setIsEditing(false);
    toast.success("Account settings updated");
  }

  if (loading || (!profile && userId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* FIXED: pt-32 (128px) ensures clearance for your Navbar. 
          The 'main' tag acts as the primary layout container.
      */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-2">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Member{" "}
            <span className="text-primary font-mono tracking-normal">
              Account
            </span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm max-w-xl italic opacity-70">
            Securely manage your identity and view your ₹ cinematic
            reservations.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: PROFILE CONTROL PANEL */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
            <Card className="rounded-[2.5rem] bg-card/40 backdrop-blur-xl border-white/5 overflow-hidden shadow-2xl">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-transparent" />
              <CardContent className="p-10 -mt-12 space-y-10">
                <div className="flex flex-col items-center">
                  <ProfileAvatar
                    uid={userId!}
                    url={profile?.avatar_url}
                    name={profile?.full_name || "User"}
                    onUpload={(url) =>
                      setProfile((p) => (p ? { ...p, avatar_url: url } : p))
                    }
                  />
                  <h2 className="mt-6 text-3xl font-black uppercase italic tracking-tighter">
                    {profile?.full_name || "Quick Member"}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground opacity-60">
                    <Mail className="w-3 h-3" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {profile?.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <ProfileField
                    label="Full Name"
                    icon={User}
                    value={fullName}
                    onChange={setFullName}
                    disabled={!isEditing}
                  />
                  <ProfileField
                    label="Username"
                    icon={AtSign}
                    value={username}
                    onChange={setUsername}
                    disabled={!isEditing}
                  />
                  <ProfileField
                    label="Phone"
                    icon={Phone}
                    value={phone}
                    onChange={setPhone}
                    disabled={!isEditing}
                  />

                  <div className="pt-6 space-y-3">
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <Button
                            onClick={handleUpdateProfile}
                            disabled={updating}
                            className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-tight"
                          >
                            {updating ? (
                              <Loader2 className="animate-spin" />
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
                          className="w-full h-14 rounded-2xl font-bold uppercase tracking-tight bg-white/5 border-white/5 hover:bg-white/10"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </AnimatePresence>
                    <LogoutButton />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: TICKET HISTORY */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex justify-between items-end px-2">
              <div className="space-y-1">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                  My Bookings
                </h2>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-40 italic">
                  Previous_Transactions
                </p>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-primary/20 text-primary font-black px-4 py-1"
              >
                {bookings.length} Total
              </Badge>
            </div>

            <div className="space-y-6">
              {loadingBookings ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-30 italic">
                  <Ticket className="mx-auto mb-4 w-10 h-10" />
                  <p className="text-sm font-black uppercase tracking-widest">
                    No active reels found
                  </p>
                </div>
              ) : (
                bookings.map((b) => (
                  <Card
                    key={b.id}
                    className="rounded-[2rem] bg-card/30 backdrop-blur-md border-white/5 border-l-4 border-l-primary/40 hover:border-l-primary transition-all overflow-hidden group shadow-lg"
                  >
                    <CardContent className="p-8 flex items-center justify-between">
                      <div className="space-y-4 flex-1">
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">
                            Confirmed
                          </p>
                          <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                            {b.movie_title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary opacity-60" />{" "}
                            {new Date(b.show_date).toLocaleDateString("en-IN")}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary opacity-60" />{" "}
                            {b.theater_name}
                          </span>
                          <span className="flex items-center gap-2">
                            <Armchair className="w-3.5 h-3.5 text-primary opacity-60" />{" "}
                            {b.seats}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-mono opacity-40 uppercase">
                            Total Paid
                          </p>
                          <p className="text-lg font-black italic tracking-tighter">
                            ₹{b.total_amount?.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-12 w-12 rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-white transition-all"
                        >
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

function ProfileField({ label, icon: Icon, value, onChange, disabled }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 ml-1">
        <Icon className="w-3.5 h-3.5 text-primary" /> {label}
      </Label>
      <Input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 rounded-2xl bg-white/[0.02] border-white/10 focus:border-primary/40 focus:ring-primary/20 transition-all font-medium text-sm"
      />
    </div>
  );
}
