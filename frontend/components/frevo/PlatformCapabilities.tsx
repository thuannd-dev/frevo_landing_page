"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FREVO_CAPABILITIES } from "@/lib/frevo";

/**
 * PlatformCapabilities — mirrors HorizontalShowcase.tsx (Section 03 "The growth system").
 * Pinned horizontal-scroll deck on desktop (GSAP ScrollTrigger pin + scrub).
 * Degrades to a vertical stack on mobile or when prefers-reduced-motion is enabled.
 */
export function PlatformCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const amount = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="scroll-mt-20 relative bg-dark-2 text-on-ink md:h-screen md:overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:h-screen md:w-max md:flex-row md:items-stretch"
      >
        {/* Intro panel */}
        <div className="flex w-full shrink-0 flex-col justify-center px-6 py-16 sm:px-12 md:h-screen md:w-[42vw] md:py-0">
          <Eyebrow index="06" invert>
            Built for Better Collaboration
          </Eyebrow>
          <h2 className="display-tight mt-6 text-h2 leading-[1.02] text-on-ink">
            A platform built
            <br />
            around how creative
            <br />
            work actually happens.
          </h2>
          <p className="mt-6 max-w-sm text-on-ink-2">
            Every feature is designed to close the gap between a business&apos;s
            need and a freelancer&apos;s capability — before, during, and after
            the work.
          </p>
          <span className="mono mt-8 hidden items-center gap-2 text-on-ink-3 md:flex">
            Scroll to explore
            <ArrowRight className="size-4 text-orange" />
          </span>
        </div>

        {/* Capability panels (6 MVP + 2 Planned AI) */}
        {FREVO_CAPABILITIES.map((cap) => {
          const isPlanned = cap.status === "planned";
          return (
            <article
              key={cap.id}
              className="flex w-full shrink-0 flex-col justify-center border-t border-line-invert px-6 py-16 sm:px-12 md:h-screen md:w-[60vw] md:border-l md:border-t-0 md:py-0 md:pr-[6vw]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[clamp(3rem,7vw,6.5rem)] leading-none text-on-ink/10">
                  {cap.index}
                </span>
                {isPlanned && (
                  <span className="mono text-mono text-on-ink-3">
                    [Coming later]
                  </span>
                )}
              </div>

              <h3
                className={`display-tight -mt-4 break-words text-[clamp(2.25rem,4.2vw,4.5rem)] leading-[0.95] ${
                  isPlanned ? "text-on-ink/80" : "text-on-ink"
                }`}
              >
                {cap.title}
              </h3>

              <p className="label mt-4 text-orange">{cap.tagline}</p>

              <p className="mt-5 max-w-xl text-lead leading-snug text-on-ink-2">
                {cap.benefit}
              </p>

              {cap.pills.length ? (
                <ul className="mt-7 flex max-w-xl flex-wrap gap-2">
                  {cap.pills.map((pill) => (
                    <li
                      key={pill}
                      className="mono rounded-full border border-line-invert px-3 py-1.5 text-mono text-on-ink-2"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
              ) : null}

              {isPlanned ? (
                <span className="mono mt-8 inline-flex items-center gap-2 text-on-ink-3">
                  [Coming later · Planned for a future release]
                </span>
              ) : (
                <Link
                  href="#how-it-works"
                  className="group label mt-8 inline-flex items-center gap-2 text-on-ink transition-colors hover:text-orange"
                >
                  Explore workflow
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </article>
          );
        })}

        {/* Trailing gutter so the last panel isn't flush to the viewport edge */}
        <div
          aria-hidden
          className="hidden shrink-0 md:block md:h-screen md:w-[12vw]"
        />
      </div>

      {/* Horizontal progress bar (desktop) */}
      <div className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-line-invert md:block">
        <span
          ref={barRef}
          className="block h-full origin-left scale-x-0 bg-orange"
        />
      </div>
    </section>
  );
}
