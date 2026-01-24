import { Badge } from "@/components/ui/badge";

export default function UserDetailsSheet({
  user,
  bookings,
}: {
  user: any;
  bookings: any[];
}) {
  return (
    <div className="space-y-6">
      {/* Profile */}
      <div>
        <h2 className="text-xl font-semibold">
          {user.full_name || "Unnamed User"}
        </h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm">
        <div>Username: {user.username || "—"}</div>
        <div>Phone: {user.phone || "—"}</div>
        <div>
          Admin:{" "}
          <Badge
            variant={user.is_admin ? "default" : "secondary"}
            className="rounded-md"
          >
            {user.is_admin ? "Yes" : "No"}
          </Badge>
        </div>
      </div>

      {/* Bookings */}
      <div>
        <h3 className="font-medium mb-2">Bookings</h3>

        {bookings.length === 0 && (
          <p className="text-sm text-muted-foreground">No bookings yet</p>
        )}

        <div className="space-y-2">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-white/10 rounded-md p-3 text-sm"
            >
              <div className="font-medium">
                {b.showtimes?.movies?.title ?? "—"}
              </div>
              <div className="text-muted-foreground">
                {b.showtimes?.date} · {b.showtimes?.time}
              </div>
              <div>Seats: {b.seats}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
