// app/admin/users/users-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Shield,
  User,
  Database,
  Calendar,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UsersTable({
  users,
  onSelect,
}: {
  users: any[];
  onSelect: (u: any) => void;
}) {
  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
      <Table>
        <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-white/5 hover:bg-transparent text-zinc-500">
            <TableHead className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em]">
              Identity Node
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em]">
              Privilege Level
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.3em]">
              Entry Date
            </TableHead>
            <TableHead className="text-right px-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow
              key={u.id}
              className="border-white/5 hover:bg-white/[0.01] transition-all group"
            >
              <TableCell className="py-8 px-10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <User className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                      {u.full_name || "UNIDENTIFIED_ASSET"}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase font-bold">
                      <Database className="w-3 h-3" /> NODE-{u.id.slice(0, 8)} •{" "}
                      {u.email}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[9px] uppercase font-black px-3 py-1 border-none rounded-full",
                    u.is_admin
                      ? "bg-primary/10 text-primary"
                      : "bg-zinc-900 text-zinc-600",
                  )}
                >
                  {u.is_admin ? (
                    <>
                      <Shield className="mr-1.5 h-3 w-3" /> ADMIN_PRIVILEGES
                    </>
                  ) : (
                    "STANDARD_ACCESS"
                  )}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase">
                  <Calendar className="w-3 h-3 text-zinc-600" />
                  {new Date(u.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </TableCell>

              <TableCell className="text-right px-10">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 hover:bg-white/10 rounded-xl"
                  onClick={() => onSelect(u)}
                >
                  <MoreHorizontal className="h-5 h-5 text-zinc-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
