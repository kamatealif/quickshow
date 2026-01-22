"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PlusCircle, Clapperboard, Monitor, Users } from "lucide-react";
import { useState } from "react";

export default function CreateTheaterForm() {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const { error } = await supabase.from("theaters").insert({
      name: formData.get("name"),
      screen_type: formData.get("screen_type"),
      total_seats: Number(formData.get("total_seats")),
      location: formData.get("location"),
    });

    if (error) {
      console.error(error);
      alert("Error creating theater");
    } else {
      // Cleaner than reload: you could use router.refresh() from next/navigation
      window.location.reload();
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header Section to match Dashboard */}
      <header className="space-y-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
          Infrastructure.Module
        </span>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
          Register <span className="text-primary">Theater</span>
        </h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card/40 backdrop-blur-xl border-white/5 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10">
            <form action={handleSubmit} className="space-y-8">
              {/* Grid Layout for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <Clapperboard className="w-3 h-3 text-primary" /> Venue Name
                  </Label>
                  <Input
                    name="name"
                    placeholder="Grand Cinema X"
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-primary focus:border-primary font-mono text-sm"
                    required
                  />
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    Location Sync
                  </Label>
                  <Input
                    name="location"
                    placeholder="Floor 4, Sector B"
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-primary focus:border-primary font-mono text-sm"
                    required
                  />
                </div>

                {/* Screen Type Field */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <Monitor className="w-3 h-3 text-primary" /> Display
                    Protocol
                  </Label>
                  <Input
                    name="screen_type"
                    placeholder="IMAX / 4DX / DOLBY"
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-primary focus:border-primary font-mono text-sm uppercase"
                    required
                  />
                </div>

                {/* Total Seats Field */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" /> Capacity
                  </Label>
                  <Input
                    name="total_seats"
                    type="number"
                    placeholder="000"
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-primary focus:border-primary font-mono text-sm"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                disabled={loading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black uppercase italic tracking-tighter text-lg transition-all active:scale-[0.98]"
              >
                {loading ? "Processing..." : "Initialize Infrastructure"}
                <PlusCircle className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visual Feedback Footer */}
      <p className="text-[9px] font-mono text-muted-foreground opacity-40 text-center uppercase tracking-widest">
        Secure encrypted uplink established // No unauthorized access
      </p>
    </div>
  );
}
