"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Shield } from "lucide-react";

export default function UsersTable({
  users,
  onSelect,
}: {
  users: any[];
  onSelect: (u: any) => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Admin</TableHead>
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
                  <Badge className="rounded-sm">
                    <Shield className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                )}
              </TableCell>

              <TableCell className="text-sm">
                {new Date(u.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-sm"
                  onClick={() => onSelect(u)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
