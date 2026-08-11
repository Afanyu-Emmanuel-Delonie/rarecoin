"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── 1. Universal fade-up reveal ─────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? "0");
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1, y: 0, duration: 0.8, delay,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });

        // ── 2. Stagger children reveal ──────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
          const children = gsap.utils.toArray<HTMLElement>(parent.children as unknown as HTMLElement[]);
          gsap.fromTo(
            children,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: parent, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });

        // ── 3. Section heading line wipe ────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-heading]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.9, ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });

        // ── 4. Scale-in cards ───────────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1, scale: 1, duration: 0.75, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });

        // ── 5. Count-up / count-down numbers ───────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = parseFloat(el.dataset.counter ?? "0");
          const from   = parseFloat(el.dataset.counterFrom ?? "0");
          const suffix = el.dataset.counterSuffix ?? "";
          const obj    = { val: from };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: target === 0 ? "power2.in" : "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          });
        });

        // ── 6. Desktop-only transforms (parallax, slide, hero-exit, blobs) ──
        // All of these apply x/y/scale transforms that can cause horizontal
        // overflow on narrow viewports — gate them behind min-width: 768px.
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {

          // Parallax
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = parseFloat(el.dataset.parallax ?? "0.15");
            gsap.to(el, {
              yPercent: speed * -100,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
            });
          });

          // Horizontal slide-in left
          gsap.utils.toArray<HTMLElement>("[data-slide-left]").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: -60 },
              {
                opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
              }
            );
          });

          // Horizontal slide-in right
          gsap.utils.toArray<HTMLElement>("[data-slide-right]").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, x: 60 },
              {
                opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
              }
            );
          });

          // Hero exit — content scales + fades as you scroll away
          gsap.utils.toArray<HTMLElement>("[data-hero-exit]").forEach((el) => {
            gsap.to(el, {
              scale: 0.92, opacity: 0, y: -60, ease: "none",
              scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
            });
          });

          // Blob rotate — ambient gradient blobs rotate on scroll
          gsap.utils.toArray<HTMLElement>("[data-blob-rotate]").forEach((el) => {
            const deg = parseFloat(el.dataset.blobRotate ?? "30");
            gsap.to(el, {
              rotation: deg, scale: 1.15, ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 2 },
            });
          });

          // Scrub marquee
          gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
            const speed = parseFloat(el.dataset.marquee || "1");
            gsap.to(el, {
              xPercent: -50 * speed, ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
            });
          });

        });

      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
