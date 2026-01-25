"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Mail,
  Lock,
  Loader2,
  Ticket,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Login failed", { description: error.message });
        setError(error.message);
        return;
      }

      toast.success("Welcome back!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Unable to sign in");
      setError("Connection error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-white/5 bg-card/40 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-3 text-center pt-12 pb-8">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary mx-auto">
              <Ticket className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-black uppercase italic">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-[0.2em]">
              Sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="px-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase ml-3">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <Input
                    type="email"
                    className="pl-14 h-14 rounded-2xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase ml-3">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-14 pr-12 h-14 rounded-2xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 border border-destructive/20 rounded-xl">
                  <p className="text-xs text-destructive text-center">
                    {error}
                  </p>
                </div>
              )}

              <Button disabled={isLoading} className="w-full h-14 rounded-2xl">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    SIGN IN
                    <ChevronRight className="ml-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="py-8 text-xs justify-center">
            <Link href="/sign-up" className="text-primary">
              Create Account
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
