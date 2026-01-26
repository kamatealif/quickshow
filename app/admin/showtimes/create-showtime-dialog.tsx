// app/admin/showtimes/create-showtime-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ShowtimeForm from "./showtime-form";

export default function CreateShowtimeDialog({
  theaters,
}: {
  theaters: any[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-primary text-primary-foreground font-black uppercase italic tracking-tight rounded-md">
          Add Showtime
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-zinc-950/80 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold uppercase italic tracking-tighter">
            Register New Sessions
          </DialogTitle>
        </DialogHeader>

        <ShowtimeForm theaters={theaters} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
