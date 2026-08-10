"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Small delay so all components have mounted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── 1. Universal fade-up reveal ─────────────────────────────────────
        // Any element with data-reveal will animate in
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? "0");
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ── 2. Stagger children reveal ──────────────────────────────────────
        // Parent with data-stagger, children animate in sequence
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
          const children = gsap.utils.toArray<HTMLElement>(
            parent.children as unknown as HTMLElement[]
          );
          gsap.fromTo(
            children,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ── 3. Section heading line wipe ────────────────────────────────────
        // Any element with data-heading gets a clip-path wipe
        gsap.utils.toArray<HTMLElement>("[data-heading]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ── 4. Parallax on elements with data-parallax ──────────────────────
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "0.15");
          gsap.to(el, {
            yPercent: speed * -100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // ── 5. Scale-in cards ───────────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ── 6. Horizontal slide-in (left / right) ───────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-slide-left]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-slide-right]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
