"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Terminal } from "lucide-react";
import { useState } from "react";
import CreateTheaterForm from "./theater-form";

export default function CreateTheaterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-14 bg-primary text-white font-black uppercase italic tracking-[0.2em] px-8 rounded-xl hover:opacity-90 shadow-xl shadow-primary/20">
          Register Node
          <PlusCircle className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl bg-zinc-950/90 backdrop-blur-2xl border-none rounded-[2.5rem] p-0 overflow-hidden">
        <div className="p-12">
          <DialogHeader className="mb-10">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Terminal className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
                System_Acquisition_Protocol
              </span>
            </div>

            <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter text-white">
              Initialize <span className="text-primary">Facility</span>
            </DialogTitle>

            <DialogDescription className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
              Deploy a new screening facility into the infrastructure registry.
            </DialogDescription>
          </DialogHeader>

          <CreateTheaterForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
