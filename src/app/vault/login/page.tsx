"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const ADMIN_EMAIL    = "admin@rarecoin.io";
const ADMIN_PASSWORD = "rarecoin2025";

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



export default function VaultLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("vault_auth", "1");
        router.push("/vault");
      } else {
        setError("Incorrect email or password.");
        setLoading(false);
      }
    }, 600);
  };

  const handleOAuth = (provider: string) => {
    // TODO: wire to NextAuth or your OAuth provider
    alert(`OAuth with ${provider} — wire up NextAuth or similar.`);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center px-6 py-16">
      {/* Ambient spots — same as about/community hero */}
      <div
        className="pointer-events-none fixed right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
      />
      <div
        className="pointer-events-none fixed left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
      />

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <img src="/rarecoin.svg" alt="Rarecoin" className="h-8 w-auto" />
          <span className="font-heading text-lg font-bold text-[#0b0c12]">Rarecoin</span>
          <span className="mt-1 rounded-full bg-[#3355ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
            Vault Access
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#0b0c12]/6">

          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { label: "Continue with Google", icon: <GoogleIcon />, onClick: () => handleOAuth("Google") },
            ].map(({ label, icon, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="flex w-full items-center gap-3 rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-4 py-3 text-sm font-semibold text-[#0b0c12] transition-all hover:border-[#0b0c12]/20 hover:bg-[#0b0c12]/4"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#0b0c12]/8" />
            <span className="text-xs text-[#0b0c12]/30">or sign in with email</span>
            <div className="h-px flex-1 bg-[#0b0c12]/8" />
          </div>

          {/* Email + password form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your@email.com"
                className={`w-full rounded-xl border bg-[#F4F6FB] px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/25 outline-none transition-all ${
                  error ? "border-red-400/60" : "border-[#0b0c12]/10 focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-[#F4F6FB] px-4 py-3 pr-11 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/25 outline-none transition-all ${
                    error ? "border-red-400/60" : "border-[#0b0c12]/10 focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0b0c12]/30 hover:text-[#0b0c12]/60 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3 disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Sign In"}
              {!loading && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#0b0c12]/30">
          Restricted access. Authorised personnel only.
        </p>
      </div>
    </div>
  );
}
