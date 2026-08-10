"use client";

import { ArrowRight, X, MessageCircle, Globe } from "lucide-react";

const socials = [
  { icon: X,             label: "X / Twitter", handle: "@TherealRarecoin", href: "https://x.com/TherealRarecoin" },
  { icon: MessageCircle, label: "Telegram",     handle: "Join the chat",    href: "#" },
  { icon: Globe,         label: "Website",      handle: "rarecoin.io",      href: "#" },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F4F6FB] pt-20">
      <div className="bg-[#0b0c12] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Contact</span>
          <h1 className="mt-3 font-heading text-5xl font-bold text-white md:text-6xl">Get in touch<br />with the team.</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <p className="text-sm leading-relaxed text-[#0b0c12]/50">
              For partnership enquiries, press, or general questions. Community support is best handled in our public channels.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Name</label>
                <input type="text" placeholder="Your name"
                  className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Email</label>
                <input type="email" placeholder="your@email.com"
                  className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Message</label>
              <textarea rows={6} placeholder="What's on your mind?"
                className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all resize-none" />
            </div>
            <button type="submit"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3355ff] hover:gap-3">
              Send Message
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Socials + info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-[#0b0c12]">Find us on</h2>
              <p className="text-sm text-[#0b0c12]/50">The fastest way to reach the community is through our public channels.</p>
            </div>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, label, handle, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#0b0c12]/10 bg-white px-6 py-5 transition-all hover:border-[#3355ff]/40 hover:bg-[#3355ff]/4">
                  <Icon size={20} className="text-[#0b0c12]/30 transition-colors group-hover:text-[#3355ff]" strokeWidth={1.75} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#0b0c12]/35 uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-semibold text-[#0b0c12]">{handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
