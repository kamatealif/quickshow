import { createSupabaseServerClient } from "@/lib/supabase/server";
import CreateTheaterForm from "./theater-form";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteTheaterButton } from "./theater-delete-button";
import { Monitor, Users, Database } from "lucide-react";

export default async function AdminTheatersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name, screen_type, total_seats")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <header className="space-y-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
          Infrastructure.Assets
        </span>
        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
          Active <span className="text-primary">Theaters</span>
        </h1>
        <p className="text-muted-foreground font-medium italic opacity-60">
          Live database of physical screening assets.
        </p>
      </header>

      {/* THEATER LISTING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {theaters?.map((t) => (
          <Card
            key={t.id}
            className="bg-card/40 backdrop-blur-md border-white/5 rounded-[2rem] overflow-hidden relative group"
          >
            <CardContent className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      ID: {t.id.slice(0, 8)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                    {t.name}
                  </h2>
                </div>
                <DeleteTheaterButton id={t.id} />
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                    Display
                  </p>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-xs uppercase">
                      {t.screen_type}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                    Capacity
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-xs">{t.total_seats}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <hr className="border-white/5" />

      {/* FORM SECTION */}
      <div className="pt-4">
        <CreateTheaterForm />
      </div>
    </div>
  );
}
