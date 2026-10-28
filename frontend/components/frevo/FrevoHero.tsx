"use client";

import { motion, useReducedMotion } from "motion/react";
import { FREVO_HERO } from "@/lib/frevo";
import { VIDEO } from "@/lib/media";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/fx/Magnetic";
import { AutoVideo } from "@/components/agency/AutoVideo";

/**
 * FREVO hero section. Reuses the line-clip stagger animation pattern from
 * agency/Hero.tsx. Background video from /public/video/hero.mp4 (dark cinematic).
 * AutoVideo already guards on prefers-reduced-motion — shows poster only.
 */
export function FrevoHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-dark pb-8 pt-[clamp(7rem,16vh,10rem)] text-on-ink">
      {/* Ambient background video */}
      <div className="absolute inset-0">
        <AutoVideo
          src={VIDEO.hero}
          poster={VIDEO.heroPoster}
          className="opacity-60"
        />
      </div>
      {/* Legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/20" />

      {/* Top eyebrow row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE.outQuart, delay: 0.1 }}
        className="shell relative z-10 flex items-center justify-between"
      >
        <span className="label flex items-center gap-2.5 text-on-ink-2">
          <span className="size-2 animate-pulse rounded-full bg-orange" />
          {FREVO_HERO.eyebrow}
        </span>
      </motion.div>

      {/* Headline + CTAs */}
      <div className="shell relative z-10">
        <h1 className="display-tight text-[clamp(2.6rem,6vw+1rem,6.5rem)] leading-[0.94] text-on-ink">
          {FREVO_HERO.headline.map((line, i) => {
            // Accent "right" in orange on each line
            const parts = line.split("right");
            return (
              <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: EASE.outQuart,
                    delay: 0.2 + i * 0.1,
                  }}
                >
                  {parts.length > 1 ? (
                    <>
                      {parts[0]}
                      <span className="text-orange">right</span>
                      {parts[1]}
                    </>
                  ) : (
                    line
                  )}
                  {i === FREVO_HERO.headline.length - 1 && (
                    <span
                      aria-hidden
                      className="ml-[0.1em] inline-block aspect-square w-[0.5em] translate-y-[0.02em] bg-orange align-baseline"
                    />
                  )}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.outQuart, delay: 0.7 }}
          className="mt-9 max-w-2xl"
        >
          <p className="text-[length:var(--text-lead)] leading-snug text-on-ink-2">
            {FREVO_HERO.sub}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <Button
                href={FREVO_HERO.ctaPrimary.href}
                variant="primary"
                size="lg"
                target="_self"
              >
                {FREVO_HERO.ctaPrimary.label}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href={FREVO_HERO.ctaSecondary.href}
                variant="invert"
                size="lg"
                arrow={false}
              >
                {FREVO_HERO.ctaSecondary.label}
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Bottom spacer — keeps layout proportional, no stat bar */}
      <div className="shell relative z-10 mt-12 border-t border-line-invert pt-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE.outQuart, delay: 1 }}
          className="mono text-on-ink-3"
        >
          Creative freelancers · Project-based work · Clear collaboration
        </motion.p>
      </div>
    </section>
  );
}
