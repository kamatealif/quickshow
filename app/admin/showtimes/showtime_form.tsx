"use client";

import { useState } from "react";
import { createShowtime } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ShowtimeForm({ movieId }: { movieId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await createShowtime(movieId, formData);
    setLoading(false);
    location.reload();
  }

  return (
    <Card className="max-w-xl bg-zinc-900/60 border-zinc-800">
      <CardHeader>
        <CardTitle>Create Showtime</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label>Theater</Label>
            <Input name="theater_id" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input type="date" name="date" required />
            </div>

            <div>
              <Label>Time</Label>
              <Input type="time" name="time" required />
            </div>
          </div>

          <div>
            <Label>Base Price</Label>
            <Input type="number" name="price" required />
          </div>

          <Button disabled={loading} className="w-full bg-rose-600">
            {loading ? "Creating..." : "Create Showtime"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
