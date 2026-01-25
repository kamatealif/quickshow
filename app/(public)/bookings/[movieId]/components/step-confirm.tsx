"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Film,
} from "lucide-react";

export default function StepConfirm({
  movie,
  showtime,
  onBack,
  onContinue,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="relative overflow-hidden bg-secondary/10 border-white/5 rounded-[2.5rem] shadow-2xl">
        {/* Top Decorative Header */}
        <div className="bg-primary/20 p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground">
              <Ticket className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black uppercase italic tracking-tighter">
              Verify <span className="opacity-60">Selection</span>
            </h2>
          </div>
          <Badge
            variant="outline"
            className="border-primary/50 text-primary font-mono"
          >
            STEP_03
          </Badge>
        </div>

        <div className="p-8 space-y-8">
          {/* Movie Focus */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-bold">
              Feature Presentation
            </p>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
              {movie.title}
            </h1>
          </div>

          <Separator className="bg-white/5" />

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailItem
              icon={Calendar}
              label="Date"
              value={new Date(showtime.date).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            />
            <DetailItem
              icon={Clock}
              label="Showtime"
              value={showtime.time.slice(0, 5)}
            />
            <DetailItem
              icon={MapPin}
              label="Theater"
              value={showtime.theaters?.name || "Premium Screen"}
            />
            <DetailItem
              icon={Film}
              label="Format"
              value={
                showtime.theaters?.screen_type?.toUpperCase() || "STANDARD 2D"
              }
            />
          </div>

          <Separator className="bg-white/5" />

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Change Details
            </Button>
            <Button
              onClick={onContinue}
              className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Confirm & Pick Seats <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Perforation Decorator */}
        <div className="flex justify-between px-8 pb-4 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white" />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function DetailItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/30 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        <p className="text-lg font-bold uppercase tracking-tight text-white leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
