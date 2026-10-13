"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { FREVO_NAV, FREVO_SITE } from "@/lib/frevo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/fx/Magnetic";
import { FrevoLogo } from "@/components/frevo/FrevoLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";


/**
 * FREVO-specific header. Standalone component — does not wrap or extend
 * the Creative Monk Header. Uses the same animation/scroll patterns but
 * has FREVO nav, no Services mega-menu, no BookingButton, no CMS calls.
 */
export function FrevoHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Escape closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? "bg-dark/90 shadow-[0_1px_0_0_var(--color-line-invert)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link href="/" aria-label="FREVO, home">
            <FrevoLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Main navigation">
            {FREVO_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="label group/nav relative inline-flex items-center gap-1 py-1 text-on-ink-2 transition-colors hover:text-on-ink"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:w-full" />
              </Link>
            ))}
            <ThemeToggle />
            <Magnetic strength={0.5}>
              <Link
                href="#post-project"
                className="group/cta label flex h-9 items-center gap-1.5 bg-orange px-4 text-on-orange transition-colors duration-200 hover:bg-orange-press"
              >
                Post a Project
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </Magnetic>
          </nav>

          {/* Mobile: ThemeToggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex size-10 items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="frevo-mobile-menu"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-6 bg-on-ink transition-all duration-300",
                    open && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-6 bg-on-ink transition-all duration-300",
                    open && "bottom-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll-progress bar */}
        {!reduce && (
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-0 top-16 h-0.5 origin-left bg-orange md:top-18",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="frevo-mobile-menu"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-dark md:hidden scrollbar-orange"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE.inOutQuart }}
          >
            <div className="flex min-h-full flex-col justify-center px-[var(--gutter)] py-10">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {FREVO_NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={reduce ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: reduce ? 0 : 0.1 + i * 0.05, ease: EASE.outQuart }}
                    className="border-t border-line-invert"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-center gap-3 py-4 text-3xl font-extrabold text-on-ink"
                    >
                      <span className="mono text-orange">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={reduce ? false : { y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.1 + FREVO_NAV.length * 0.05, ease: EASE.outQuart }}
                  className="border-t border-line-invert pt-4"
                >
                  <Link
                    href="#post-project"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 bg-orange px-6 py-3 label text-on-orange transition-colors hover:bg-orange-press"
                  >
                    Post a Project
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </nav>
              <div className="mono mt-10 flex flex-col gap-1 text-on-ink-3">
                <a href={`mailto:${FREVO_SITE.email}`}>{FREVO_SITE.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
