import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Calendar, Phone } from "lucide-react";

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: users } = await supabase
    .from("profiles")
    .select(
      `
      id,
      email,
      full_name,
      username,
      phone,
      is_admin,
      created_at
    `,
    )
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <header className="space-y-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
          Identity.Registry
        </span>
        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
          Users
        </h1>
        <p className="text-muted-foreground italic opacity-60">
          Read-only account audit from public.profiles
        </p>
      </header>

      {/* USERS TABLE */}
      <div className="rounded-[2rem] border border-white/5 bg-card/20 backdrop-blur-md overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5">
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                <div className="flex items-center gap-2">
                  <User size={12} /> User
                </div>
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                Role
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary">
                Contact
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest italic text-primary text-right">
                Joined
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((u) => (
              <TableRow
                key={u.id}
                className="border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                {/* USER IDENTITY */}
                <TableCell className="py-6">
                  <div className="space-y-1">
                    <p className="font-mono text-sm font-semibold">
                      {u.full_name || "—"}
                    </p>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase opacity-60">
                      {u.email}
                    </p>
                    {u.username && (
                      <p className="text-[9px] font-mono opacity-40">
                        @{u.username}
                      </p>
                    )}
                  </div>
                </TableCell>

                {/* ROLE */}
                <TableCell>
                  {u.is_admin ? (
                    <Badge className="bg-primary/10 border-primary/20 text-primary uppercase text-[9px] font-black tracking-widest">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="uppercase text-[9px] font-black tracking-widest opacity-60"
                    >
                      User
                    </Badge>
                  )}
                </TableCell>

                {/* CONTACT */}
                <TableCell>
                  {u.phone ? (
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <Phone className="w-3 h-3 opacity-40" />
                      {u.phone}
                    </div>
                  ) : (
                    <span className="text-xs opacity-30">—</span>
                  )}
                </TableCell>

                {/* CREATED */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs font-mono opacity-60">
                    <Calendar className="w-3 h-3" />
                    {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Total Users: {users?.length || 0}</span>
        <span>Access Level: Read-only</span>
      </div>
    </div>
  );
}
