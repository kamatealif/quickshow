"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ShowtimeForm from "./showtime-form";
import ShowtimesTable from "./showtimes-table";

type Props = {
  theaters: any[];
  showtimes: any[];
};

export default function ShowtimesClient({ theaters, showtimes }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Showtimes</h1>
          <p className="text-sm text-muted-foreground">
            Manage movie showtimes, pricing, and availability
          </p>
        </div>

        {/* Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button>Create Showtime</Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-[480px]
              sm:w-[560px]
              lg:w-[640px]
              px-8
              py-6
              overflow-y-auto
            "
          >
            <SheetHeader className="mb-6">
              <SheetTitle>Create Showtime</SheetTitle>
            </SheetHeader>

            <ShowtimeForm
              theaters={theaters}
              onSuccess={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Table */}
      <ShowtimesTable showtimes={showtimes} />
    </div>
  );
}
