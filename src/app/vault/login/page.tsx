"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  type AuthError,
} from "firebase/auth";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function mapAuthError(error: unknown): string {
  const code = (error as AuthError)?.code;
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for this site and try again.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

export default function VaultLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/vault");
    } catch (err) {
      setError(mapAuthError(err));
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/vault");
    } catch (err) {
      setError(mapAuthError(err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 68%)" }}
      />
      <div
        className="pointer-events-none fixed left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 68%)" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <img src="/rare-3.png" alt="Rarecoin" className="h-10 w-auto" />
          <span className="font-heading text-lg font-bold text-white">Rarecoin</span>
          <span className="mt-1 rounded-full bg-[#D4AF37]/12 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            Vault Access
          </span>
        </div>

        <div className="rounded-3xl bg-[#111318] border border-white/6 p-8">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon />
            {loading ? "Signing in…" : "Continue with Google"}
          </button>

          <div className="relative my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-xs text-white/25">or sign in with email</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          {error && <p className="mt-4 text-center text-xs text-red-400">{error}</p>}
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Restricted access. Authorised personnel only.
        </p>
      </div>
    </div>
  );
}
