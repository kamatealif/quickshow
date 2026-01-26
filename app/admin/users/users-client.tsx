// app/admin/users/users-client.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, Users, Loader2, X, Terminal, Fingerprint } from "lucide-react";
import UsersTable from "./users-table";
import UserSheet from "./user-sheet";

export default function UsersClient({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (search) {
      setIsScanning(true);
      const timeout = setTimeout(() => setIsScanning(false), 450);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        (u.email ?? "").toLowerCase().includes(q) ||
        (u.full_name ?? "").toLowerCase().includes(q) ||
        (u.username ?? "").toLowerCase().includes(q),
    );
  }, [users, search]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
            Personnel Directory
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Identity <span className="text-primary">Registry</span>
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
              {isScanning ? (
                <span className="text-primary animate-pulse flex items-center gap-2 font-bold">
                  <Loader2 className="w-3 h-3 animate-spin" /> Querying Auth
                  Nodes...
                </span>
              ) : (
                "Personnel Integrity: Verified"
              )}
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-96 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-all">
            <Users className="h-3 w-3 text-primary" />
            <div className="h-3 w-[1px] bg-white/10" />
            <Fingerprint className="h-3 w-3 text-primary" />
          </div>
          <Input
            placeholder="Identify Asset by Name or Alias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pl-16 pr-12 bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 transition-all text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <UsersTable users={filteredUsers} onSelect={setSelectedUser} />

      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent
          side="right"
          className="w-[450px] bg-zinc-950/95 border-l border-white/10 p-0 backdrop-blur-3xl shadow-2xl outline-none"
        >
          {/* Accessibility Protocol Fix */}
          <div className="sr-only">
            <SheetHeader>
              <SheetTitle>Personnel Profile Identification</SheetTitle>
              <SheetDescription>
                Detailed system metadata for {selectedUser?.full_name}
              </SheetDescription>
            </SheetHeader>
          </div>
          {selectedUser && <UserSheet user={selectedUser} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
