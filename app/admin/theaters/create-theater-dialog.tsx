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
import CreateTheaterForm from "./theater-form";

export default function CreateTheaterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-primary text-primary-foreground font-black uppercase italic tracking-tight rounded-md">
          Add Theater
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl bg-card/80 backdrop-blur-xl border-white/10 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Theater
          </DialogTitle>
        </DialogHeader>

        <CreateTheaterForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
