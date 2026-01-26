// app/admin/showtimes/showtime-form.tsx
"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "@/components/ui/command";

import {
  MapPin,
  Film,
  CalendarIcon,
  Clock,
  IndianRupee,
  Users,
  Check,
  Save,
  X,
  Search,
  Activity,
} from "lucide-react";

const TIME_SLOTS = ["09:00", "12:00", "15:00", "18:00", "21:00", "23:00"];

export default function ShowtimeForm({
  theaters,
  onSuccess,
}: {
  theaters: any[];
  onSuccess: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [theaterId, setTheaterId] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [movieOpen, setMovieOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from("movies")
        .select("id, title")
        .ilike("title", `%${query}%`)
        .limit(10);
      setResults(data ?? []);
    }, 300);
    return () => clearTimeout(t);
  }, [query, supabase]);

  async function submit() {
    if (
      !theaterId ||
      !date ||
      !time ||
      selected.length === 0 ||
      !price ||
      !seats
    ) {
      toast.warning("Infrastructure Error: Fields Missing");
      return;
    }
    setLoading(true);
    const payload = selected.map((m) => ({
      theater_id: theaterId,
      movie_id: m.id,
      date: format(date, "yyyy-MM-dd"),
      time,
      price: Number(price),
      total_seats: Number(seats),
      available_seats: Number(seats),
      status: "active",
    }));

    const { error } = await supabase.from("showtimes").insert(payload);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sync Complete", {
        description: `${payload.length} sessions deployed.`,
      });
      onSuccess();
    }
    setLoading(false);
  }

  const field =
    "h-14 bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 transition-all px-4 text-sm font-medium";
  const label =
    "text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 flex items-center gap-2 ml-1";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-12 gap-6">
        {/* ROW 1: VENUE & MOVIE */}
        <div className="col-span-12 md:col-span-6 space-y-1">
          <Label className={label}>
            <MapPin className="w-3 h-3" /> Location Node
          </Label>
          <Select value={theaterId} onValueChange={setTheaterId}>
            <SelectTrigger className={cn(field, "w-full")}>
              <SelectValue placeholder="Select Theater" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10">
              {theaters.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-12 md:col-span-6 space-y-1">
          <Label className={label}>
            <Film className="w-3 h-3" /> Media Inventory
          </Label>
          <Popover open={movieOpen} onOpenChange={setMovieOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(field, "w-full justify-between")}
              >
                <span className="truncate">
                  {selected.length
                    ? `${selected.length} Selected`
                    : "Search Archives..."}
                </span>
                <Search className="h-4 w-4 opacity-40" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[350px] p-0 bg-zinc-950 border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Type to scan..."
                  value={query}
                  onValueChange={setQuery}
                  className="h-12 border-none"
                />
                <CommandEmpty className="py-6 text-xs text-center font-mono opacity-50 uppercase tracking-widest">
                  No match
                </CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto p-2">
                  {results.map((m) => {
                    const active = selected.some((s) => s.id === m.id);
                    return (
                      <CommandItem
                        key={m.id}
                        className="rounded-xl py-3"
                        onSelect={() =>
                          setSelected((prev) =>
                            active
                              ? prev.filter((x) => x.id !== m.id)
                              : [...prev, m],
                          )
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-primary",
                            active ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span className="text-[11px] font-black uppercase tracking-tight">
                          {m.title}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* ROW 2: PREVIEW BOX */}
        {selected.length > 0 && (
          <div className="col-span-12 flex flex-wrap gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            {selected.map((m) => (
              <Badge
                key={m.id}
                variant="secondary"
                className="bg-primary/10 text-primary border border-primary/20 text-[10px] px-3 py-1 font-black uppercase tracking-tight gap-2"
              >
                {m.title}{" "}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setSelected((s) => s.filter((x) => x.id !== m.id))
                  }
                />
              </Badge>
            ))}
          </div>
        )}

        {/* ROW 3: DATE & TIME */}
        <div className="col-span-12 md:col-span-8 space-y-1">
          <Label className={label}>
            <CalendarIcon className="w-3 h-3" /> Deployment Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  field,
                  "w-full justify-start gap-4 font-mono font-bold",
                )}
              >
                <CalendarIcon className="h-4 w-4 text-primary" />
                {date ? format(date, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-zinc-950 border-white/10 rounded-3xl overflow-hidden"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-12 md:col-span-4 space-y-1">
          <Label className={label}>
            <Clock className="w-3 h-3" /> Time Slot
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className={cn(field, "w-full font-mono font-black")}>
              <SelectValue placeholder="00:00" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-white/10">
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t} className="font-mono font-bold">
                  {t} HRS
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ROW 4: COST & CAPACITY */}
        <div className="col-span-6 space-y-1">
          <Label className={label}>
            <IndianRupee className="w-3 h-3" /> Tariff (INR)
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
            <Input
              className={cn(field, "pl-10 font-mono font-bold text-lg")}
              placeholder="0.00"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-6 space-y-1">
          <Label className={label}>
            <Users className="w-3 h-3" /> Quota
          </Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
            <Input
              className={cn(field, "pl-10 font-mono font-bold text-lg")}
              placeholder="Units"
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        onClick={submit}
        className="w-full h-20 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl shadow-primary/20 hover:scale-[1.01] transition-all relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10 flex items-center justify-center gap-4">
          <Activity className="h-5 w-5 animate-pulse" />
          {loading ? "Synchronizing Network..." : "Deploy Showtimes"}
          <Save className="h-5 w-5" />
        </span>
      </Button>
    </div>
  );
}
