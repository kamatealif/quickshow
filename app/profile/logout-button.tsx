"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full h-12 rounded-sm font-semibold transition-all active:scale-[0.99] shadow-lg shadow-destructive/10"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </>
      )}
    </Button>
  );
}
