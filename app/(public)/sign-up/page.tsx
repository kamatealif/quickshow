"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
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
  User,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

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
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Sign up failed", { description: error.message });
        setError(error.message);
        return;
      }

      if (!data.session) {
        setMessage(
          "Verification email sent! Please check your inbox to confirm your membership.",
        );
        toast.success("Check your email");
      } else {
        toast.success("Account created");
        router.push("/profile");
      }
    } catch {
      toast.error("Something went wrong");
      setError("System encountered an error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-background px-4 pt-32 pb-12 overflow-x-hidden">
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
              Join QuickShow
            </CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-[0.2em]">
              Start your movie journey
            </CardDescription>
          </CardHeader>

          <CardContent className="px-10">
            <AnimatePresence mode="wait">
              {!message ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSignUp}
                  className="space-y-5"
                >
                  {/* FULL NAME */}
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase ml-3">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                      <Input
                        className="pl-14 h-14 rounded-2xl"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
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

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase ml-3">
                      Password
                    </Label>
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

                  {/* CONFIRM PASSWORD */}
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase ml-3">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pl-14 h-14 rounded-2xl"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {passwordsMatch && (
                      <div className="flex items-center gap-2 text-primary text-xs ml-3">
                        <ShieldCheck className="w-4 h-4" />
                        Passwords match
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 border border-destructive/20 rounded-xl">
                      <p className="text-xs text-destructive text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  <Button
                    disabled={
                      isLoading || (password.length > 0 && !passwordsMatch)
                    }
                    className="w-full h-14 rounded-2xl font-bold"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ChevronRight className="ml-1" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Mail className="mx-auto text-primary" />
                  <p className="text-sm">{message}</p>
                  <Button asChild variant="outline">
                    <Link href="/sign-in">Go to Sign In</Link>
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="py-8 text-xs justify-center">
            <Link href="/sign-in" className="text-primary">
              Already a member? Sign In
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
