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
import UserDetailsSheet from "./user-details-sheet";
export default function UsersClient({
  users,
  bookings,
}: {
  users: any[];
  bookings: any[];
}) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  /* -------------------------------------------------- */
  /* 🔍 SAFE + FAST SEARCH (NULL-PROOF)                 */
  /* -------------------------------------------------- */
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    const q = search.toLowerCase();

    return users.filter((u) => {
      const email = u.email ?? "";
      const name = u.full_name ?? "";
      const username = u.username ?? "";

      return (
        email.toLowerCase().includes(q) ||
        name.toLowerCase().includes(q) ||
        username.toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage users and view booking activity
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, email, or username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm rounded-sm"
      />

      {/* Table */}
      <UsersTable
        users={filteredUsers}
        bookings={bookings}
        onSelectUser={setSelectedUser}
      />

      {/* User Details Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent
          side="right"
          className="w-[420px] sm:w-[520px] px-8 py-6 overflow-y-auto rounded-lg"
        >
          <SheetHeader className="mb-6">
            <SheetTitle>User Details</SheetTitle>
          </SheetHeader>

          {selectedUser && (
            <UserDetailsSheet
              user={selectedUser}
              bookings={bookings.filter((b) => b.user_id === selectedUser.id)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
