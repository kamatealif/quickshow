"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Monitor, Users, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTheaterForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("theaters").insert({
      name: formData.get("name"),
      screen_type: formData.get("screen_type"),
      total_seats: Number(formData.get("total_seats")),
      location: formData.get("location"),
      owner_id: user?.id,
    });

    if (error) {
      alert(error.message);
    } else {
      router.refresh();
      onSuccess?.();
    }
    setLoading(false);
  }

  // Professional Clean Styles
  const inputStyles =
    "bg-zinc-900/50 border-white/10 rounded-lg h-11 focus:border-primary/50 text-sm transition-all placeholder:text-zinc-600";
  const labelStyles =
    "text-xs font-semibold text-zinc-400 flex items-center gap-2 mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Theater Name */}
        <div className="space-y-1.5">
          <Label className={labelStyles}>
            <Building2 className="w-3.5 h-3.5" /> Theater Name
          </Label>
          <Input
            name="name"
            placeholder="e.g. Grand Cinema Hall"
            required
            className={inputStyles}
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <Label className={labelStyles}>
            <MapPin className="w-3.5 h-3.5" /> Location
          </Label>
          <Input
            name="location"
            placeholder="City or District"
            required
            className={inputStyles}
          />
        </div>

        {/* Screen Type */}
        <div className="space-y-1.5">
          <Label className={labelStyles}>
            <Monitor className="w-3.5 h-3.5" /> Screen Configuration
          </Label>
          <div className="relative">
            <select
              name="screen_type"
              required
              className={`w-full appearance-none ${inputStyles} px-3 pr-10 bg-zinc-900 border border-white/10`}
            >
              <option value="standard">Standard Definition</option>
              <option value="premium">Premium Luxe</option>
              <option value="imax">IMAX Experience</option>
              <option value="4dx">4DX Immersive</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Seats */}
        <div className="space-y-1.5">
          <Label className={labelStyles}>
            <Users className="w-3.5 h-3.5" /> Seating Capacity
          </Label>
          <Input
            name="total_seats"
            type="number"
            placeholder="Total count"
            required
            className={inputStyles}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-lg transition-all shadow-lg shadow-primary/10"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Register Theater
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
