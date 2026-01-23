import { Badge } from "@/components/ui/badge";

export default function ShowtimeTable({ showtimes }: { showtimes: any[] }) {
  return (
    <div className="rounded-[2rem] border border-white/5 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="p-4 text-left">Movie</th>
            <th className="p-4">Theater</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((s) => (
            <tr key={s.id} className="border-t border-white/5">
              <td className="p-4 font-bold">{s.movies.title}</td>
              <td className="p-4">{s.theaters.name}</td>
              <td className="p-4">{s.date}</td>
              <td className="p-4">{s.time}</td>
              <td className="p-4">
                <Badge>{s.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
