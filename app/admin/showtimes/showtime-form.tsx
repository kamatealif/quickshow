"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theater = {
  id: string;
  name: string;
};

type Movie = {
  id: number;
  title: string;
};

/* ---------------------------------------------------- */
/* ⏰ Generate time slots (every 15 minutes)             */
/* ---------------------------------------------------- */
function generateTimeSlots() {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function ShowtimeForm({ theaters }: { theaters: Theater[] }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [theaterId, setTheaterId] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieOpen, setMovieOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searching, setSearching] = useState(false);

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");

  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  const inputClass =
    "h-12 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:outline-none";

  /* ---------------------------------------------------- */
  /* 🔍 Live movie search                                 */
  /* ---------------------------------------------------- */
  useEffect(() => {
    if (!search) {
      setMovies([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);

      const { data } = await supabase
        .from("movies")
        .select("id, title")
        .ilike("title", `%${search}%`)
        .limit(10);

      setMovies(data ?? []);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, supabase]);

  async function handleCreateShowtime() {
    if (!theaterId || !movie || !date || !time || !price || !totalSeats) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const seats = Number(totalSeats);

    const { error } = await supabase.from("showtimes").insert({
      theater_id: theaterId,
      movie_id: movie.id,
      date: format(date, "yyyy-MM-dd"),
      time,
      price: Number(price),
      total_seats: seats,
      available_seats: seats,
      status: "active",
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Theater */}
      <div className="space-y-2">
        <Label>Theater</Label>
        <select
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
          className={cn("w-full border bg-background px-3 text-sm", inputClass)}
        >
          <option value="">Select theater</option>
          {theaters.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Search */}
      <div className="space-y-2">
        <Label>Movie</Label>

        <Popover open={movieOpen} onOpenChange={setMovieOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full h-12 justify-between rounded-md"
            >
              {movie ? movie.title : "Search movie..."}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0 rounded-md">
            <Command>
              <CommandInput
                placeholder="Type movie name..."
                value={search}
                onValueChange={setSearch}
              />
              {searching && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Searching…
                </div>
              )}
              <CommandEmpty>No movies found.</CommandEmpty>
              <CommandGroup>
                {movies.map((m) => (
                  <CommandItem
                    key={m.id}
                    value={m.title}
                    onSelect={() => {
                      setMovie(m);
                      setMovieOpen(false);
                      setSearch("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        movie?.id === m.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {m.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 justify-start rounded-md"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time */}
      <div className="space-y-2">
        <Label>Time</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {TIME_SLOTS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price + Seats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ticket Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label>Total Seats</Label>
          <Input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleCreateShowtime}
        disabled={loading}
        className="w-full h-12 rounded-md font-medium"
      >
        {loading ? "Creating Showtime…" : "Create Showtime"}
      </Button>
    </div>
  );
}
