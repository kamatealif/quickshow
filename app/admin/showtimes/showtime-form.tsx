"use client";

import { createShowtime } from "./actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Film, MapPin, Calendar, Clock, IndianRupee } from "lucide-react";

export default function ShowtimeForm({
  movies,
  theaters,
}: {
  movies: any[];
  theaters: any[];
}) {
  return (
    <Card className="bg-card/40 border-white/5 rounded-[2.5rem]">
      <CardHeader>
        <CardTitle className="text-2xl font-black uppercase italic">
          Create Showtime
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          action={createShowtime}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* MOVIE */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Film className="w-4 h-4 text-primary" /> Movie
            </Label>
            <Select name="movie_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Select movie" />
              </SelectTrigger>
              <SelectContent>
                {movies.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* THEATER */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Theater
            </Label>
            <Select name="theater_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Select theater" />
              </SelectTrigger>
              <SelectContent>
                {theaters.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DATE */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Date
            </Label>
            <Input type="date" name="date" required />
          </div>

          {/* TIME */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Time
            </Label>
            <Input type="time" name="time" required />
          </div>

          {/* PRICE */}
          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-primary" /> Base Price
            </Label>
            <Input type="number" name="price" placeholder="250" required />
          </div>

          <div className="md:col-span-2 pt-4">
            <Button className="w-full h-14 font-black uppercase italic">
              Create Showtime & Generate Seats
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
