"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout?.();
    router.push("/sign-in");
  }

  return (
    <Button
      variant="ghost"
      className="w-full h-14 rounded-2xl text-rose-500 hover:text-white hover:bg-rose-500 border border-transparent hover:border-rose-600 transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  );
}
