"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
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
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/profile");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md border-border bg-card/40 backdrop-blur-xl shadow-2xl rounded-sm transition-all duration-300">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8">
          <div className="p-4 bg-primary/10 rounded-sm border border-border text-primary mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight uppercase">
            Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
            Enter your credentials
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[11px] font-bold uppercase text-muted-foreground ml-1"
              >
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11 h-12 bg-background/50 border-border focus-visible:ring-primary/20 rounded-sm text-base font-mono transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <Label
                  htmlFor="password"
                  className="text-[11px] font-bold uppercase text-muted-foreground"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-background/50 border-border focus-visible:ring-primary/20 rounded-sm text-base font-mono transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-sm bg-destructive/10 border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                <p className="text-[11px] font-bold text-destructive uppercase text-center">
                  {error}
                </p>
              </div>
            )}

            <Button
              disabled={isLoading}
              className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90 font-bold transition-all rounded-sm active:scale-[0.98] mt-2 shadow-lg shadow-primary/5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                "SIGN IN"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 border-t border-border/50 py-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">
              New User?
            </span>
            <Link
              href="/sign-up"
              className="text-[11px] font-bold text-primary hover:underline underline-offset-4 uppercase tracking-tight"
            >
              Create Account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
