"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Shield } from "lucide-react";

export default function UsersTable({
  users,
  bookings,
  onSelectUser,
}: {
  users: any[];
  bookings: any[];
  onSelectUser: (u: any) => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  function ticketCount(userId: string) {
    return bookings
      .filter((b) => b.user_id === userId)
      .reduce((sum, b) => sum + b.seats, 0);
  }

  async function toggleAdmin(id: string, isAdmin: boolean) {
    await supabase.from("profiles").update({ is_admin: !isAdmin }).eq("id", id);

    router.refresh();
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Tickets</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <div className="font-medium">{u.full_name || "—"}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
              </TableCell>

              <TableCell>
                {u.is_admin && (
                  <Badge className="rounded-md">
                    <Shield className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                )}
              </TableCell>

              <TableCell>{ticketCount(u.id)}</TableCell>

              <TableCell className="text-sm">
                {new Date(u.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="rounded-md">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="rounded-md">
                    <DropdownMenuItem onClick={() => onSelectUser(u)}>
                      View details
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => toggleAdmin(u.id, u.is_admin)}
                    >
                      {u.is_admin ? "Remove admin" : "Make admin"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
