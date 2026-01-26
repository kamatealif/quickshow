"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Monitor,
  Users,
  ShieldCheck,
  Activity,
  Database,
  MapPin,
} from "lucide-react";

const SCREEN_TYPES = [
  { label: "Standard Digital", value: "standard" },
  { label: "Premium Large Format", value: "premium" },
  { label: "IMAX Laser Experience", value: "imax" },
  { label: "4DX Motion", value: "4dx" },
];

export default function CreateTheaterForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [screenType, setScreenType] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 🔒 Validation
    if (!name || !screenType || !totalSeats) {
      toast.warning("Validation Error", {
        description: "Facility name, screen type, and seat count are required.",
      });
      return;
    }

    setLoading(true);

    // 🔐 Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Authentication Required", {
        description: "You must be logged in to register a facility.",
      });
      setLoading(false);
      return;
    }

    // 🧠 Insert
    const { error } = await supabase.from("theaters").insert({
      name: name.trim(),
      location: location.trim(),
      screen_type: screenType,
      total_seats: Number(totalSeats),
      owner_id: user.id,
    });

    if (error) {
      toast.error("Deployment Failed", {
        description: error.message,
      });
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    toast.success("Facility Registered", {
      description: "The theater node has been successfully added.",
    });

    router.refresh();
    onSuccess(); // closes dialog
  }

  const label =
    "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <Label className={label}>
          <Database className="w-3 h-3 text-primary" />
          Facility Name
        </Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label className={label}>
          <MapPin className="w-3 h-3 text-primary" />
          Location
        </Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className={label}>
            <Monitor className="w-3 h-3 text-primary" />
            Screen Type
          </Label>
          <Select value={screenType} onValueChange={setScreenType}>
            <SelectTrigger>
              <SelectValue placeholder="Select protocol" />
            </SelectTrigger>
            <SelectContent>
              {SCREEN_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className={label}>
            <Users className="w-3 h-3 text-primary" />
            Total Seats
          </Label>
          <Input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
          />
        </div>
      </div>

      <Button disabled={loading} className="w-full h-14 font-black uppercase">
        {loading ? (
          <Activity className="w-4 h-4 animate-spin" />
        ) : (
          <ShieldCheck className="w-4 h-4" />
        )}
        {loading ? "Deploying…" : "Deploy Facility"}
      </Button>
    </form>
  );
}
