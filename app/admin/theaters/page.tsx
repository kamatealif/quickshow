import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteTheaterButton } from "./theater-delete-button";
import { Monitor, Users, Database } from "lucide-react";
import CreateTheaterDialog from "./create-theater-dialog";

export default async function AdminTheatersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: theaters } = await supabase
    .from("theaters")
    .select("id, name, screen_type, total_seats")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Theaters</h1>
          <p className="text-sm text-muted-foreground">
            Manage theaters available for movie screenings
          </p>
        </div>

        <CreateTheaterDialog />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {theaters?.map((t) => (
          <Card
            key={t.id}
            className="bg-card/40 backdrop-blur-md border-white/5 rounded-xl"
          >
            <CardContent className="p-8 space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-mono uppercase">
                      ID: {t.id.slice(0, 8)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase italic">
                    {t.name}
                  </h2>
                </div>

                <DeleteTheaterButton id={t.id} />
              </div>

              <div className="flex gap-8 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[9px] uppercase text-primary font-black">
                    Screen
                  </p>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">
                      {t.screen_type}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] uppercase text-primary font-black">
                    Seats
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-mono">{t.total_seats}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
