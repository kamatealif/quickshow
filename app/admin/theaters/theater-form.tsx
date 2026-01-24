"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PlusCircle, Monitor, Users, Clapperboard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CreateTheaterFormProps = {
  onSuccess?: () => void;
};

export default function CreateTheaterForm({
  onSuccess,
}: CreateTheaterFormProps) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to create a theater.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("theaters").insert({
      name: formData.get("name"),
      screen_type: formData.get("screen_type"),
      total_seats: Number(formData.get("total_seats")),
      location: formData.get("location"),
      owner_id: user.id,
    });

    if (error) {
      console.error("Create theater failed:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);

    // ✅ close dialog
    onSuccess?.();
  }

  const inputClass =
    "rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/60 border border-white/10 rounded-xl">
        <CardContent className="p-8">
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Clapperboard className="w-4 h-4" />
                  Theater Name
                </Label>
                <Input
                  name="name"
                  placeholder="PVR Phoenix Mall"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">
                  Location
                </Label>
                <Input
                  name="location"
                  placeholder="Lower Parel, Mumbai"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Screen Type
                </Label>
                <select
                  name="screen_type"
                  required
                  className={`h-12 w-full bg-background border border-input px-3 text-sm ${inputClass}`}
                >
                  <option value="">Select screen type</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="imax">IMAX</option>
                  <option value="4dx">4DX</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Seats
                </Label>
                <Input
                  name="total_seats"
                  type="number"
                  placeholder="300"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full h-12 text-sm font-semibold rounded-md"
            >
              {loading ? "Saving..." : "Add Theater"}
              <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
