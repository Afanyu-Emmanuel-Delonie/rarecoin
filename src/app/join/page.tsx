"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { submitWaitlistForm } from "@/app/actions/waitlist";
import { initialWaitlistFormState } from "@/app/actions/types";

export default function JoinPage() {
  const [state, formAction, pending] = useActionState(submitWaitlistForm, initialWaitlistFormState);

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col">

      {/* Ambient blobs */}
      <div
        className="pointer-events-none fixed right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
      />
      <div
        className="pointer-events-none fixed left-0 bottom-0 h-[440px] w-[440px] -translate-x-1/3 translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.05) 0%, transparent 68%)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-md flex flex-col gap-10">

          {state.status === "success" ? (
            <div className="flex flex-col gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f3f93]/10">
                <Check size={24} className="text-[#0f3f93]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-heading text-3xl font-bold text-[#0b0c12]">You're on the list.</h1>
                <p className="text-sm leading-relaxed text-[#0b0c12]/50">
                  We'll notify you the moment RARE goes live. Keep an eye on{" "}
                  <a href="https://x.com/TherealRarecoin" target="_blank" className="text-[#0f3f93] hover:underline">
                    @TherealRarecoin
                  </a>{" "}
                  for real-time updates.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0b0c12]/15 px-6 py-3 text-sm font-semibold text-[#0b0c12]/60 transition-all hover:border-[#0b0c12]/30 hover:text-[#0b0c12]"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="font-heading text-4xl font-bold leading-tight text-[#0b0c12] md:text-5xl">
                  Be first when<br />RARE launches.
                </h1>
                <p className="text-sm leading-relaxed text-[#0b0c12]/50">
                  One email. One launch notification. No spam, no noise just the signal that matters.
                </p>
              </div>

              <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3.5 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/25 outline-none focus:border-[#0f3f93]/50 focus:ring-2 focus:ring-[#0f3f93]/8 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3.5 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/25 outline-none focus:border-[#0f3f93]/50 focus:ring-2 focus:ring-[#0f3f93]/8 transition-all"
                  />
                </div>

                {state.status === "error" && state.message && (
                  <p role="alert" className="text-sm text-red-600">{state.message}</p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pending ? "Submitting…" : "Notify Me at Launch"}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                <p className="text-center text-xs text-[#0b0c12]/25">
                  No spam. Unsubscribe any time.
                </p>
              </form>

              {/* Social proof nudge */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#0b0c12]/8 bg-white px-5 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0f3f93]/10">
                  <img src="/rarecoin.svg" alt="" className="h-4 w-auto" />
                </div>
                <p className="text-xs leading-relaxed text-[#0b0c12]/40">
                  Follow{" "}
                  <a href="https://x.com/TherealRarecoin" target="_blank" className="text-[#0b0c12]/60 hover:text-[#0f3f93] transition-colors">
                    @TherealRarecoin
                  </a>{" "}
                  on X for live updates and community announcements.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
