"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Film, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    // Masking the navbar with fixed inset
    <div className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* SUBTLE BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <h1 className="text-[20vw] font-black italic uppercase tracking-tighter opacity-[0.03] leading-none">
          Missing
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* ANIMATED FILM STRIP ICON */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-10 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10"
        >
          <Film className="w-16 h-16 text-primary" />

          {/* Decorative "Film Holes" */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-sm bg-primary/20" />
            ))}
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-sm bg-primary/20" />
            ))}
          </div>
        </motion.div>

        {/* MESSAGING */}
        <div className="space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              Scene{" "}
              <span className="text-primary italic font-mono tracking-normal">
                00
              </span>{" "}
              Not Found
            </h2>
            <p className="mt-4 text-muted-foreground text-sm font-bold uppercase tracking-widest italic opacity-60">
              The reel you requested is currently out of focus or missing from
              the projector.
            </p>
          </motion.div>
        </div>

        {/* LIGHTWEIGHT BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            className="h-14 px-8 rounded-2xl bg-primary font-black uppercase italic tracking-tighter text-sm group"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Main Lobby
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 font-black uppercase italic tracking-tighter text-sm hover:bg-white/10"
            asChild
          >
            <Link href="/movies">
              <Search className="w-4 h-4 mr-2" />
              Browse Archives
            </Link>
          </Button>
        </div>

        {/* FOOTER ACCENT */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => window.history.back()}
          className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-3 h-3" />
          Rewind One Step
        </motion.button>
      </div>

      {/* TECHNICAL OVERLAY LOG */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <p className="font-mono text-[9px] text-muted-foreground/30 uppercase tracking-[0.4em] rotate-90 origin-left">
          QuickShow.Sys // Error_Relay_04
        </p>
      </div>
    </div>
  );
}
