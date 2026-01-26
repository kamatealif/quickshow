import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteTheaterButton } from "./theater-delete-button";
import { Monitor, Users, Database, Activity, MapPin } from "lucide-react";
import CreateTheaterDialog from "./create-theater-dialog";
import { Badge } from "@/components/ui/badge";

export default async function AdminTheatersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name, screen_type, total_seats, location")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <Badge className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1">
            Infrastructure Registry
          </Badge>

          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            Facility <span className="text-primary">Nodes</span>
          </h1>

          <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity className="w-3 h-3 text-emerald-500" />
            System Status: Operational
          </p>
        </div>

        <CreateTheaterDialog />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {theaters?.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] hover:border-primary/30 transition-all shadow-2xl"
          >
            <div className="p-10 space-y-8">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Database className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                      NODE-{t.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    {t.name}
                  </h2>

                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase">
                    <MapPin className="w-3 h-3" />
                    {t.location || "Unassigned Sector"}
                  </div>
                </div>

                <DeleteTheaterButton id={t.id} />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase text-primary font-black tracking-[0.2em] opacity-70">
                    Display Protocol
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Monitor className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-mono font-bold uppercase text-white">
                      {t.screen_type}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-primary font-black tracking-[0.2em] opacity-70">
                    Capacity Units
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Users className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-mono font-bold uppercase text-white">
                      {t.total_seats} Seats
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
