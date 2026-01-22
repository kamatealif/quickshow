"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteTheaterButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("CONFIRM SYSTEM PURGE: Delete this theater record?")) return;

    setIsDeleting(true);
    const { error } = await supabase.from("theaters").delete().eq("id", id);

    if (error) {
      alert("Error: Access Denied or Network Failure");
    } else {
      router.refresh(); // Refreshes server components without a full reload
    }
    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-rose-500/20 rounded-lg group transition-colors"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
      ) : (
        <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-rose-500 transition-colors" />
      )}
    </button>
  );
}
