"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
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
import {
  Check,
  CalendarIcon,
  IndianRupee,
  Users,
  SendHorizontal,
  Film,
  MapPin,
  Search,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShowtimeForm({
  theaters,
  onSuccess,
}: {
  theaters: any[];
  onSuccess: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [theaterId, setTheaterId] = useState("");
  const [movie, setMovie] = useState<any | null>(null);
  const [movieOpen, setMovieOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  // Professional Squircle Styles (16px rounding)
  const inputStyles =
    "bg-white/[0.03] border-white/10 rounded-2xl h-16 focus:border-primary/50 text-base transition-all px-6 hover:bg-white/[0.05] outline-none";
  const labelStyles =
    "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 flex items-center gap-2 ml-1";

  useEffect(() => {
    if (!search) return;
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("movies")
        .select("id, title")
        .ilike("title", `%${search}%`)
        .limit(5);
      setMovies(data ?? []);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, supabase]);

  async function handleCreateShowtime() {
    if (!theaterId || !movie || !date || !time || !price || !totalSeats) {
      toast.error("PROTOCOL REJECTED: DATA INCOMPLETE");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("showtimes").insert({
      theater_id: theaterId,
      movie_id: movie.id,
      date: format(date, "yyyy-MM-dd"),
      time,
      price: Number(price),
      total_seats: Number(totalSeats),
      available_seats: Number(totalSeats),
      status: "active",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("BROADCAST SYNCED: SESSION LIVE");
      router.refresh();
      onSuccess();
    }
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col gap-10">
        {/* Theater Hub - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <MapPin className="w-3.5 h-3.5 text-primary" /> Cinema Node
          </Label>
          <Select value={theaterId} onValueChange={setTheaterId}>
            <SelectTrigger className={inputStyles}>
              <SelectValue placeholder="Identify Hub Location..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-2xl">
              {theaters.map((t: any) => (
                <SelectItem
                  key={t.id}
                  value={t.id}
                  className="py-4 px-6 focus:bg-primary/20"
                >
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Movie Asset - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <Film className="w-3.5 h-3.5 text-primary" /> Media Asset
          </Label>
          <Popover open={movieOpen} onOpenChange={setMovieOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-between font-bold", inputStyles)}
              >
                <span className="truncate">
                  {movie ? movie.title : "Identify Film Entry..."}
                </span>
                <Search className="h-5 w-5 opacity-40 text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[500px] p-0 bg-zinc-900 border-white/10 shadow-2xl rounded-2xl"
              align="start"
            >
              <Command className="bg-transparent">
                <CommandInput
                  placeholder="Type title..."
                  className="h-16 border-none text-white px-6"
                  onValueChange={setSearch}
                />
                <CommandEmpty className="py-6 text-xs text-center text-zinc-500 font-mono uppercase">
                  Unrecognized Asset
                </CommandEmpty>
                <CommandGroup className="p-3">
                  {movies.map((m) => (
                    <CommandItem
                      key={m.id}
                      onSelect={() => {
                        setMovie(m);
                        setMovieOpen(false);
                      }}
                      className="rounded-xl py-5 px-6 cursor-pointer hover:bg-primary/10 transition-all mb-2"
                    >
                      <Check
                        className={cn(
                          "mr-3 h-4 w-4 text-primary",
                          movie?.id === m.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="text-xs font-black uppercase tracking-tight">
                        {m.title}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <CalendarIcon className="w-3.5 h-3.5 text-primary" /> Deployment
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start font-mono font-bold",
                  inputStyles,
                )}
              >
                <CalendarIcon className="mr-4 h-5 w-5 text-primary/60" />
                {date ? format(date, "PPPP") : "Set Calendar Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-6 bg-[#0a0a0a] border-white/10 rounded-[2.5rem] shadow-2xl"
              align="start"
            >
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <Clock className="w-3.5 h-3.5 text-primary" /> Temporal Slot
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className={cn("font-mono font-black", inputStyles)}>
              <SelectValue placeholder="00:00 HRS" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10 rounded-2xl">
              {["09:00", "12:00", "15:00", "18:00", "21:00", "23:00"].map(
                (t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    className="py-4 px-6 font-mono text-base font-black"
                  >
                    {t} HRS
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Price - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <IndianRupee className="w-3.5 h-3.5 text-primary" /> Unit Tariff
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={cn("pl-16 font-mono font-black text-xl", inputStyles)}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Total Seats - Full Width */}
        <div className="space-y-1">
          <Label className={labelStyles}>
            <Users className="w-3.5 h-3.5 text-primary" /> Payload Capacity
          </Label>
          <div className="relative">
            <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <Input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              className={cn("pl-16 font-mono font-black text-xl", inputStyles)}
              placeholder="Quantity"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleCreateShowtime}
        disabled={loading}
        className="w-full h-24 bg-primary text-black font-black uppercase tracking-[0.4em] text-[11px] rounded-3xl hover:bg-white hover:scale-[1.01] transition-all shadow-2xl relative group overflow-hidden mt-12"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10 flex items-center justify-center gap-4">
          {loading ? (
            "Establishing Connection..."
          ) : (
            <>
              Deploy to Registry{" "}
              <SendHorizontal className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </span>
      </Button>
    </div>
  );
}
