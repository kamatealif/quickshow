"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
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
import Link from "next/link";

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
        setError(error.message);
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden">
      {/* SOFT AMBIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-white/5 bg-card/40 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-3 flex flex-col items-center text-center pt-12 pb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-primary/10 rounded-3xl text-primary mb-2 shadow-inner"
            >
              <Ticket className="w-8 h-8" />
            </motion.div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-black tracking-tight uppercase italic">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
                Sign in to your account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* EMAIL */}
              <div className="space-y-2.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-3">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-14 h-14 bg-background/50 border-white/5 rounded-2xl font-mono text-sm focus:ring-primary/20 transition-all shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-[9px] font-bold text-primary/40 hover:text-primary transition-colors uppercase"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-14 pr-14 h-14 bg-background/50 border-white/5 rounded-2xl font-mono text-sm focus:ring-primary/20 transition-all shadow-inner"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-destructive/5 border border-destructive/10 rounded-2xl"
                >
                  <p className="text-[10px] font-bold text-destructive uppercase text-center tracking-wide">
                    {error}
                  </p>
                </motion.div>
              )}

              <Button
                disabled={isLoading}
                className="group relative w-full h-14 font-black rounded-2xl transition-all shadow-xl shadow-primary/10 hover:shadow-primary/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      SIGN IN
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-white/5 py-10 mt-8 bg-white/[0.01] flex flex-col items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-muted-foreground/40">
                New to the cinema?
              </span>
              <Link
                href="/sign-up"
                className="text-primary hover:underline underline-offset-4"
              >
                Create Account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
