"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires Lenis inertial scrolling to GSAP's ticker so that ScrollTrigger and
 * Lenis share a single scroll source. Honours prefers-reduced-motion by
 * skipping smoothing entirely (native scroll remains fully functional).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // The admin dashboard uses native scroll (sheets, tables, sticky rails).
    if (isAdmin) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Keep ScrollTrigger in lockstep with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis for buttery in-page jumps.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#" || href === "/#") return;

      // If it's a "/#..." link and we're not on the root page, let Next.js navigate normally
      if (href.startsWith("/#") && window.location.pathname !== "/") {
        return;
      }

      const id = href.startsWith("/#") ? href.slice(1) : href;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    // If initial page loaded with a hash (e.g. arriving from /blog to /#talent), smooth scroll to it
    if (typeof window !== "undefined" && window.location.hash) {
      const initialEl = document.querySelector(window.location.hash);
      if (initialEl) {
        window.setTimeout(() => {
          lenis.scrollTo(initialEl as HTMLElement, { offset: -80, duration: 1.2 });
        }, 400);
      }
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 350);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, [isAdmin]);

  // Route change: reset scroll to top immediately (unless navigating to a hash anchor)
  useEffect(() => {
    if (isAdmin) return;
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        window.setTimeout(() => {
          lenisRef.current?.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    }

    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => window.clearTimeout(t);
  }, [pathname, isAdmin]);

  // Honour prefers-reduced-motion across all Framer Motion animations.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
