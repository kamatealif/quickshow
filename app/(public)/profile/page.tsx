"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Dialog Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  Trash2,
  AlertTriangle,
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

  // Modal & Cancellation State
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

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
          .order("show_date", { ascending: false }),
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

  // Cancellation Logic
  async function handleCancelBooking() {
    if (!selectedBooking) return;
    setCancelling(true);

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", selectedBooking.id);

    if (error) {
      toast.error("Failed to cancel booking", {
        description: "Please check your connection and try again.",
      });
      setCancelling(false);
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
    toast.success("Booking Removed", {
      description: `${selectedBooking.movie_title} has been cancelled successfully.`,
    });
    setSelectedBooking(null);
    setCancelling(false);
  }

  const hasShowEnded = (date: string, time: string) => {
    const showDateTime = new Date(`${date}T${time}`);
    return showDateTime < new Date();
  };

  if (loading || (!profile && userId)) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 md:py-24">
        <section className="mb-12 max-w-3xl">
          <Badge
            variant="secondary"
            className="px-3 py-1 bg-primary/10 text-primary border-none text-[10px] font-bold tracking-[0.2em] mb-4"
          >
            PREMIUM MEMBER
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
            My <span className="text-primary">Cinema</span> <br /> Account
          </h1>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE: PROFILE */}
          <div className="lg:col-span-4 self-start lg:sticky lg:top-24">
            <Card className="border-white/5 bg-secondary/20 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
              <CardHeader className="pb-0 pt-10 text-center">
                <div className="flex flex-col items-center">
                  <ProfileAvatar
                    uid={userId!}
                    url={profile?.avatar_url ?? null}
                    name={profile?.full_name || "User"}
                    onUpload={(url) =>
                      setProfile((p) => (p ? { ...p, avatar_url: url } : p))
                    }
                  />

                  <CardTitle className="mt-6 text-2xl font-black uppercase italic tracking-tight">
                    {profile?.full_name || "Guest Member"}
                  </CardTitle>
                  <p className="text-xs font-mono text-muted-foreground opacity-60 truncate w-full px-4 italic">
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
                        <Settings2 className="w-4 h-4 mr-2" /> Edit Profile
                      </Button>
                    )}
                  </AnimatePresence>
                  <LogoutButton />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE: BOOKING LOGS */}
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
                bookings.map((booking) => {
                  const isExpired = hasShowEnded(
                    booking.show_date,
                    booking.show_time,
                  );
                  return (
                    <Card
                      key={booking.id}
                      className={cn(
                        "group relative border-white/5 transition-all overflow-hidden rounded-[2.2rem]",
                        isExpired
                          ? "bg-secondary/5 opacity-60 grayscale-[0.6]"
                          : "bg-secondary/10 hover:bg-secondary/20 shadow-lg",
                      )}
                    >
                      <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-10 bg-background rounded-full border border-white/5" />
                      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 w-full space-y-4">
                          <p
                            className={cn(
                              "text-[9px] font-bold uppercase tracking-[0.3em]",
                              isExpired
                                ? "text-muted-foreground"
                                : "text-primary",
                            )}
                          >
                            {isExpired ? "Show Ended" : "Confirmed Entry"}
                          </p>
                          <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
                            {booking.movie_title}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <TicketMeta
                              icon={Calendar}
                              label="Date"
                              value={booking.show_date}
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
                            className="h-12 w-12 rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ───────────────── DETAIL DIALOG ───────────────── */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="bg-[#0a0a0a] border-white/5 rounded-[2.5rem] max-w-lg p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="bg-primary/10 p-8 border-b border-white/5 relative">
            <div className="absolute top-4 right-6 text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">
              REF: {selectedBooking?.id.slice(0, 8)}
            </div>
            <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
              Pass <span className="text-primary">Details</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
              Official Digital Booking Confirmation
            </DialogDescription>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            <div className="space-y-1">
              <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Movie Feature
              </Label>
              <div className="text-3xl font-black uppercase italic tracking-tighter text-white">
                {selectedBooking?.movie_title}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1">
                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Schedule
                </Label>
                <div className="text-sm font-bold uppercase text-foreground">
                  {selectedBooking?.show_date} @ {selectedBooking?.show_time}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Cinema Hall
                </Label>
                <div className="text-sm font-bold uppercase text-foreground">
                  {selectedBooking?.theater_name}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Assigned Seats
                </Label>
                <div className="text-sm font-bold text-primary uppercase">
                  {selectedBooking?.seats}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Total Fare
                </Label>
                <div className="text-sm font-bold uppercase text-foreground">
                  ₹{selectedBooking?.total_amount}
                </div>
              </div>
            </div>

            <Separator className="bg-white/5" />

            {/* Warning Note */}
            <div className="bg-primary/5 rounded-2xl p-5 flex items-start gap-4 border border-primary/10">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                  Cancellation Policy
                </p>
                <p className="text-[10px] leading-relaxed text-muted-foreground/80 uppercase font-medium">
                  This digital pass is required for entry. Cancellation will
                  release your seats back to the hall and cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <DialogFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-4 w-full">
            <Button
              variant="ghost"
              className="flex-1 h-12 text-red-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl uppercase font-bold text-[10px] tracking-widest border border-transparent hover:border-red-500/20"
              disabled={cancelling}
              onClick={handleCancelBooking}
            >
              {cancelling ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Revoke Booking
            </Button>
            <Button
              onClick={() => setSelectedBooking(null)}
              className="flex-1 h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
            >
              Keep Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ───────────────── SUBCOMPONENTS ───────────────── */

type ProfileInputProps = {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
};

function ProfileInput({ label, icon: Icon, value, onChange, disabled }: ProfileInputProps) {
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

type TicketMetaProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function TicketMeta({ icon: Icon, label, value }: TicketMetaProps) {
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
