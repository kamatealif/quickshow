import { Badge } from "@/components/ui/badge";

export default function UserSheet({ user }: { user: any }) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-lg font-semibold">
          {user.full_name || "Unnamed User"}
        </h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="space-y-1">
        <div>Username: {user.username || "—"}</div>
        <div>Phone: {user.phone || "—"}</div>
        <div>
          Role:{" "}
          <Badge
            variant={user.is_admin ? "default" : "secondary"}
            className="rounded-sm"
          >
            {user.is_admin ? "Admin" : "User"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
