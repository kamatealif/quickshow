import { Card } from "@/components/ui/card";
import Image from "next/image";

const TMDB = "https://image.tmdb.org/t/p/w500";

export default function StepMovie({ movie }: { movie: any }) {
  return (
    <Card className="p-6 flex gap-6">
      <div className="relative w-28 h-40 rounded-md overflow-hidden">
        <Image
          src={`${TMDB}${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-muted-foreground">
          Complete steps to book your ticket
        </p>
      </div>
    </Card>
  );
}
