"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function EarlySignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to your email provider (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
  };

  return (
    <section className="bg-[#F4F6FB] px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
       
          
      

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Early Access
            </span>

            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              Be first when RARE launches.
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Drop your email and we'll notify you the moment RARE goes live on the bonding curve. No spam — one email, one launch.
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white">
                <Check size={16} />
                You're on the list — we'll be in touch.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full bg-white/15 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:bg-white/90 hover:gap-3"
                >
                  Notify Me
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}

            <p className="text-xs text-white/35">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
