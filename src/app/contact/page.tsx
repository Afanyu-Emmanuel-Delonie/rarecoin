"use client";

import { useActionState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, MessageCircle, Mail, Check } from "lucide-react";
import { submitContactForm } from "@/app/actions/sendNotification";
import { initialContactFormState } from "@/app/actions/types";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: X,             label: "X / Twitter", handle: "@TherealRarecoin",   href: "https://x.com/TherealRarecoin" },
  { icon: MessageCircle, label: "Telegram",     handle: "Join the chat",      href: "#" },
  { icon: Mail,          label: "Email",        handle: "hello@rarecoin.io",  href: "mailto:hello@rarecoin.io" },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(submitContactForm, initialContactFormState);

  useEffect(() => {
    if (state.status === "success") trackEvent("contact_submit");
  }, [state.status]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".contact-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".contact-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      gsap.fromTo(".contact-block",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-block", start: "top 85%" } }
      );
      gsap.fromTo(".contact-social",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-social", start: "top 88%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20 bg-[#F4F6FB]">

      {/* ── Hero — matches about/community structure ── */}
      <section className="relative min-h-[70vh] overflow-hidden bg-[#F4F6FB] flex flex-col justify-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{ background: "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-105 w-105 translate-x-1/4 -translate-y-1/4 rounded-full sm:h-150 sm:w-150 xl:h-190 xl:w-190"
          style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }}
        />
        <div
          className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full sm:h-110 sm:w-110 xl:h-140 xl:w-140"
          style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-16 text-center sm:gap-6 sm:px-6 sm:py-20 md:py-28 lg:gap-7 lg:px-10 lg:py-32 xl:px-16 xl:py-40">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0b0c12] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="contact-word block">Get in touch</span>
            <span className="contact-word block text-[#0f3f93]">with the team.</span>
          </h1>
          <p className="contact-sub max-w-sm text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl lg:max-w-2xl">
            For partnerships, press, or general questions. Community support is best handled in our public channels.
          </p>
        </div>
      </section>

      {/* ── Form + Socials ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Form */}
          <div className="contact-block flex flex-col gap-6 rounded-3xl bg-white p-8 md:p-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Send a message</span>
              <h2 className="font-heading text-2xl font-bold text-[#0b0c12]">We read every message.</h2>
            </div>

            {state.status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3355ff]/10">
                  <Check size={24} className="text-[#3355ff]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#0b0c12]">Message sent!</h3>
                <p className="max-w-xs text-sm text-[#0b0c12]/50">We'll get back to you as soon as we can.</p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" action={formAction}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Name</label>
                    <input type="text" name="name" required placeholder="Your name"
                      className="rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Email</label>
                    <input type="email" name="email" required placeholder="your@email.com"
                      className="rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Subject</label>
                  <input type="text" name="subject" placeholder="Partnership / Press / General"
                    className="rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#0b0c12]/40">Message</label>
                  <textarea required name="message" rows={5} placeholder="What's on your mind?"
                    className="rounded-xl border border-[#0b0c12]/10 bg-[#F4F6FB] px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/40 focus:ring-2 focus:ring-[#3355ff]/8 transition-all resize-none" />
                </div>
                {state.status === "error" && state.message && (
                  <p role="alert" className="text-sm text-red-600">{state.message}</p>
                )}
                <button type="submit" disabled={pending}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60">
                  {pending ? "Sending…" : "Send Message"}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Social channels */}
            <div className="contact-block flex flex-col gap-5 rounded-3xl bg-[#0b0c12] p-8 md:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Community channels</span>
                <h2 className="font-heading text-2xl font-bold text-white">Find us online.</h2>
                <p className="text-sm leading-relaxed text-white/40">The fastest way to reach the community is through our public channels.</p>
              </div>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackEvent("social_click", { network: label })}
                    className="contact-social group flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 transition-all hover:bg-white/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/8 transition-colors group-hover:bg-[#3355ff]/20">
                      <Icon size={18} className="text-white/50 transition-colors group-hover:text-[#3355ff]" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-white/30 uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-semibold text-white">{handle}</span>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 transition-all group-hover:text-[#3355ff] group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response note */}
            <div className="contact-block rounded-3xl border border-[#0b0c12]/8 bg-white p-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Response time</span>
                <p className="text-sm leading-relaxed text-[#0b0c12]/55">
                  We aim to respond to all messages within 48 hours. For urgent community matters, Telegram is the fastest channel.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
