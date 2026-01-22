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
  User,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (!data.session) {
        setMessage(
          "Verification email sent! Please check your inbox to confirm your membership.",
        );
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError("System encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // Added pt-32 to clear the navbar and pb-12 for bottom breathing room
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-background px-4 pt-32 pb-12 overflow-x-hidden">
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
                Join QuickShow
              </CardTitle>
              <CardDescription className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
                Start your movie journey
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-10">
            <AnimatePresence mode="wait">
              {!message ? (
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSignUp}
                  className="space-y-5"
                >
                  {/* FULL NAME */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-3">
                      Full Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                      <Input
                        placeholder="John Doe"
                        className="pl-14 h-14 bg-background/50 border-white/5 rounded-2xl font-mono text-sm focus:ring-primary/20 transition-all shadow-inner"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-3">
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pl-14 pr-12 h-14 bg-background/50 border-white/5 rounded-2xl font-mono text-sm focus:ring-primary/20 transition-all shadow-inner"
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

                  {/* CONFIRM PASSWORD */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-3">
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className={`pl-14 h-14 bg-background/50 border-white/5 rounded-2xl font-mono text-sm transition-all shadow-inner ${
                          passwordsMatch ? "border-primary/20" : ""
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {passwordsMatch && (
                      <div className="flex items-center gap-1.5 ml-3 animate-in fade-in slide-in-from-left-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[9px] font-bold text-primary uppercase tracking-wider font-mono">
                          Credentials matched
                        </span>
                      </div>
                    )}
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
                    disabled={
                      isLoading || (password.length > 0 && !passwordsMatch)
                    }
                    className="group relative w-full h-14 font-black rounded-2xl transition-all shadow-xl shadow-primary/10 hover:shadow-primary/20 mt-4 uppercase italic tracking-tighter"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Create Account{" "}
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center space-y-6 py-12"
                >
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center shadow-inner">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight italic">
                      Success!
                    </h3>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed px-4">
                      {message}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl px-8 font-bold text-xs"
                    asChild
                  >
                    <Link href="/sign-in">GO TO SIGN IN</Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="border-t border-white/5 py-10 mt-8 bg-white/[0.01] flex flex-col items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-muted-foreground/40">
                Already a member?
              </span>
              <Link
                href="/sign-in"
                className="text-primary hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
