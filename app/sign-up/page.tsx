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
import {
  Mail,
  Lock,
  Loader2,
  UserPlus,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (!data.session) {
      setMessage("Verification email sent. Please check your inbox.");
      setIsLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md border-border bg-card/40 backdrop-blur-xl shadow-2xl rounded-sm">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8">
          <div className="p-4 bg-primary/10 rounded-sm border border-border text-primary mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight uppercase">
            Create Account
          </CardTitle>
          <CardDescription className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
            User Registration
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!message ? (
            <form onSubmit={handleSignUp} className="space-y-4">
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
                <Label
                  htmlFor="password"
                  className="text-[11px] font-bold uppercase text-muted-foreground ml-1"
                >
                  Password
                </Label>
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

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirm-password"
                  className="text-[11px] font-bold uppercase text-muted-foreground ml-1"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-11 h-12 bg-background/50 border-border focus-visible:ring-primary/20 rounded-sm text-base font-mono transition-all ${
                      passwordsMatch
                        ? "border-green-500/50 focus-visible:border-green-500"
                        : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {passwordsMatch && (
                  <div className="flex items-center gap-1.5 mt-1 ml-1 animate-in fade-in slide-in-from-left-2 duration-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider font-mono">
                      Passwords matched
                    </span>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-sm bg-destructive/10 border border-destructive/20 mt-2">
                  <p className="text-[11px] font-bold text-destructive uppercase text-center tracking-tight">
                    {error}
                  </p>
                </div>
              )}

              <Button
                disabled={isLoading}
                className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90 font-bold transition-all rounded-sm active:scale-[0.98] mt-4 shadow-lg shadow-primary/5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    REGISTERING...
                  </>
                ) : (
                  "SIGN UP"
                )}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold uppercase tracking-tight">
                  Check your email
                </h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                  {message}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full border-border h-12 rounded-sm font-bold text-xs"
                onClick={() => setMessage(null)}
              >
                RETURN TO SIGN UP
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 border-t border-border/50 py-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">
              Already have an account?
            </span>
            <Link
              href="/sign-in"
              className="text-[11px] font-bold text-primary hover:underline underline-offset-4 uppercase tracking-tight"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
