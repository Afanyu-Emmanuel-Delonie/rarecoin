"use client";

import { useActionState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, MessageCircle, Mail, Check } from "lucide-react";
import { submitContactForm } from "@/app/actions/sendNotification";
import { initialContactFormState } from "@/app/actions/types";
import { trackEvent } from "@/lib/analytics";
import PageHero from "@/components/page-hero";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: X,             label: "X / Twitter", handle: "@TherealRarecoin",   href: "https://x.com/TherealRarecoin" },
  { icon: MessageCircle, label: "Telegram",     handle: "Join the chat",      href: "https://t.me/Therealrarecoin" },
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
    <div ref={pageRef} className="bg-[#08090D]">

      <PageHero>
        <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="page-hero-word block">Get in touch</span>
          <span className="page-hero-word block text-[#D4AF37]">with the team.</span>
        </h1>
        <p className="page-hero-sub max-w-sm text-sm leading-relaxed text-white/45 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
          For partnerships, press, or general questions. Community support is best handled in our public channels.
        </p>
      </PageHero>

      {/* Form + Socials */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Form */}
          <div className="contact-block flex flex-col gap-6 rounded-3xl bg-[#111318] border border-white/6 p-8 md:p-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Send a message</span>
              <h2 className="font-heading text-2xl font-bold text-white">We read every message.</h2>
            </div>

            {state.status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <Check size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">Message sent!</h3>
                <p className="max-w-xs text-sm text-white/40">We&rsquo;ll get back to you as soon as we can.</p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" action={formAction}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Name</label>
                    <input type="text" name="name" required placeholder="Your name"
                      className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Email</label>
                    <input type="email" name="email" required placeholder="your@email.com"
                      className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Subject</label>
                  <input type="text" name="subject" placeholder="Partnership / Press / General"
                    className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Message</label>
                  <textarea required name="message" rows={5} placeholder="What's on your mind?"
                    className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#D4AF37]/40 focus:ring-2 focus:ring-[#D4AF37]/8 transition-all resize-none" />
                </div>
                {state.status === "error" && state.message && (
                  <p role="alert" className="text-sm text-red-400">{state.message}</p>
                )}
                <button type="submit" disabled={pending}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60">
                  {pending ? "Sending…" : "Send Message"}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            <div className="contact-block flex flex-col gap-5 rounded-3xl bg-[#111318] border border-white/6 p-8 md:p-10">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Community channels</span>
                <h2 className="font-heading text-2xl font-bold text-white">Find us online.</h2>
                <p className="text-sm leading-relaxed text-white/40">The fastest way to reach the community is through our public channels.</p>
              </div>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackEvent("social_click", { network: label })}
                    className="contact-social group flex items-center gap-4 rounded-2xl bg-white/4 px-5 py-4 transition-all hover:bg-white/8">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/6 transition-colors group-hover:bg-[#D4AF37]/15">
                      <Icon size={18} className="text-white/40 transition-colors group-hover:text-[#D4AF37]" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-white/25 uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-semibold text-white">{handle}</span>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 transition-all group-hover:text-[#D4AF37] group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-block rounded-3xl border border-white/6 bg-[#111318] p-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Response time</span>
                <p className="text-sm leading-relaxed text-white/45">
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
