"use client";

import { FREVO_CATEGORIES } from "@/lib/frevo";

/**
 * Creative categories marquee — mirrors components/agency/Tools.tsx 1:1
 * (text-2xl md:text-3xl text-on-ink-2, solid orange square bullets, edge fade mask).
 */
export function CategoryMarquee() {
  // Repeat the 6 categories twice per half-track (12 items) to match TOOLS length
  // so each half-track is wider than ultrawide viewports for a seamless -50% loop.
  const list = [...FREVO_CATEGORIES, ...FREVO_CATEGORIES];

  const items = list.map((category, i) => (
    <span key={`${category}-${i}`} className="flex items-center">
      <span className="display text-2xl md:text-3xl text-on-ink-2">
        {category}
      </span>
      <span
        aria-hidden
        className="mx-[clamp(1.25rem,3vw,2.75rem)] inline-block size-2 shrink-0 bg-orange"
      />
    </span>
  ));

  return (
    <section className="overflow-hidden bg-dark-2 py-8 md:py-10">
      <div className="shell">
        <p className="label mb-6 text-on-ink-3">Creative categories</p>
      </div>

      {/* Full-bleed marquee with edge fade */}
      <div className="cm-tools-mask group">
        <div className="cm-tools-track flex w-max items-center group-hover:[animation-play-state:paused]">
          {/* Two identical copies → seamless 0 → -50% loop */}
          <div className="flex shrink-0 items-center" aria-hidden={false}>
            {items}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden>
            {items}
          </div>
        </div>
      </div>

      <style>{`
        .cm-tools-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );
        }
        @keyframes cm-tools-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .cm-tools-track {
          animation: cm-tools-marquee 32s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .cm-tools-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
