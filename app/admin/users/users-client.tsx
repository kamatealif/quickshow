"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import UsersTable from "./users-table";
import UserSheet from "./user-sheet";

export default function UsersClient({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    const q = search.toLowerCase();

    return users.filter((u) => {
      return (
        (u.email ?? "").toLowerCase().includes(q) ||
        (u.full_name ?? "").toLowerCase().includes(q) ||
        (u.username ?? "").toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">Manage registered users</p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, email, username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm rounded-sm"
      />

      {/* Table */}
      <UsersTable users={filteredUsers} onSelect={setSelectedUser} />

      {/* Details Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent side="right" className="w-[420px] px-6 py-6 rounded-lg">
          <SheetHeader className="mb-6">
            <SheetTitle>User Details</SheetTitle>
          </SheetHeader>

          {selectedUser && <UserSheet user={selectedUser} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
