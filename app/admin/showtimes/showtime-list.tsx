import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ShowtimeList({ movieId }: { movieId: string }) {
  const supabase = await createSupabaseServerClient();

  const { data: showtimes } = await supabase
    .from("showtimes")
    .select(
      `
      id,
      date,
      time,
      price,
      theaters ( name )
    `,
    )
    .eq("movie_id", movieId)
    .order("date");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Existing Showtimes</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Theater</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {showtimes?.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.theaters?.name}</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>{s.time}</TableCell>
              <TableCell>₹{s.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
