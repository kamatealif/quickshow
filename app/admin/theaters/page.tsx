import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteTheaterButton } from "./theater-delete-button";
import { Monitor, Users, Database, MapPin, LayoutGrid } from "lucide-react";
import CreateTheaterDialog from "./create-theater-dialog";
import { Badge } from "@/components/ui/badge";

export default async function AdminTheatersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name, screen_type, total_seats, location")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
            Infrastructure Assets
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Cinema <span className="text-primary">Registry</span>
          </h1>
          <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            Manage physical locations and screen specifications
          </p>
        </div>
        <CreateTheaterDialog />
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {theaters?.map((t) => (
          <div
            key={t.id}
            className="group relative bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-2xl"
          >
            {/* ID Ticker Effect */}
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database className="w-24 h-24 text-primary" />
            </div>

            <div className="p-8 space-y-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary">
                    <LayoutGrid className="w-3 h-3" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-tighter">
                      NODE-ID: {t.id.slice(0, 8)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                    {t.name}
                  </h2>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase font-black">
                    <MapPin className="w-3 h-3" /> {t.location}
                  </p>
                </div>
                <DeleteTheaterButton id={t.id} />
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-primary/5 transition-colors">
                  <p className="text-[9px] uppercase text-primary font-black mb-1 opacity-60">
                    System Mode
                  </p>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono font-bold uppercase text-white">
                      {t.screen_type}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-primary/5 transition-colors">
                  <p className="text-[9px] uppercase text-primary font-black mb-1 opacity-60">
                    Capacity
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      {t.total_seats} Units
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
