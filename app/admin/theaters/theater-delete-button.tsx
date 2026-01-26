"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteTheaterButton({ id }: { id: string }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;

    if (!confirm("This will permanently remove the facility. Continue?")) {
      toast.message("Operation Cancelled");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("theaters").delete().eq("id", id);

    if (error) {
      if (error.code === "23503") {
        toast.error("Deletion Blocked", {
          description:
            "This facility has active showtimes or bookings attached.",
        });
      } else {
        toast.error("Deletion Failed", {
          description: error.message,
        });
      }
      setLoading(false);
      return;
    }

    toast.success("Facility Decommissioned", {
      description: "The theater node has been removed from the registry.",
    });

    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete facility"
      className={`
        h-11 w-11
        inline-flex items-center justify-center
        rounded-xl
        bg-white/5
        border border-white/10
        transition-all duration-200
        hover:bg-rose-500/10 hover:border-rose-500/30
        focus:outline-none focus:ring-2 focus:ring-rose-500/40
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
      ) : (
        <Trash2 className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-rose-500" />
      )}
    </button>
  );
}
