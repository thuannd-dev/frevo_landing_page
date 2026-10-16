"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { FREVO_PROFILES } from "@/lib/frevo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/fx/Tilt";
import { cn } from "@/lib/utils";

/**
 * Featured Creative Work — transforms cards into authentic Creative Freelancer
 * & Creative Pod Profiles while showcasing real Creative Monk case studies as proof.
 * Uses smooth inertia programmatic snapping without jarring CSS-snap teleports.
 */
export function FeaturedTalent() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const startCardIndexRef = useRef(0);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to get all card elements
  const getCards = useCallback(() => {
    if (!railRef.current) return [];
    return Array.from(railRef.current.children) as HTMLElement[];
  }, []);

  // Update bounds when rail scrolls
  const updateScrollBounds = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateScrollBounds();
    el.addEventListener("scroll", updateScrollBounds, { passive: true });
    window.addEventListener("resize", updateScrollBounds);
    return () => {
      el.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [updateScrollBounds]);

  // Helper to find the closest card index based on current scroll position
  const getClosestCardIndex = useCallback(() => {
    const el = railRef.current;
    if (!el) return 0;
    const cards = getCards();
    if (!cards.length) return 0;

    let closest = 0;
    let minDiff = Infinity;
    const currentScroll = el.scrollLeft;
    const baseOffset = cards[0].offsetLeft;

    cards.forEach((card, i) => {
      const cardScrollPos = card.offsetLeft - baseOffset;
      const diff = Math.abs(currentScroll - cardScrollPos);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    return closest;
  }, [getCards]);

  // Smoothly glide to a specific card index with cushioning (no CSS snap fighting)
  const scrollToCard = useCallback(
    (targetIndex: number) => {
      const el = railRef.current;
      if (!el) return;
      const cards = getCards();
      if (!cards.length) return;

      const clampedIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
      const baseOffset = cards[0].offsetLeft;
      const targetScrollLeft = cards[clampedIndex].offsetLeft - baseOffset;

      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }

      // Temporarily disable CSS snap so smooth scrolling eases naturally without sudden jerks
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "smooth";
      el.scrollTo({ left: targetScrollLeft });

      // Restore snap state after the smooth glide has landed
      snapTimeoutRef.current = setTimeout(() => {
        if (el) {
          el.style.scrollSnapType = "";
          el.style.scrollBehavior = "";
          updateScrollBounds();
        }
      }, 500);
    },
    [getCards, updateScrollBounds]
  );

  // Prev / Next button handlers
  const handlePrev = () => {
    const currentIndex = getClosestCardIndex();
    scrollToCard(currentIndex - 1);
  };

  const handleNext = () => {
    const currentIndex = getClosestCardIndex();
    scrollToCard(currentIndex + 1);
  };

  // Mouse Drag-to-Scroll with Window listeners and Momentum calculation
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Primary click only
    const el = railRef.current;
    if (!el) return;

    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }

    // Immediately stop smooth behavior for 1:1 direct hand tracking
    el.style.scrollBehavior = "auto";
    el.style.scrollSnapType = "none";

    isDownRef.current = true;
    startXRef.current = e.pageX;
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    startScrollLeftRef.current = el.scrollLeft;
    startCardIndexRef.current = getClosestCardIndex();

    setIsDragging(true);

    const onWindowMouseMove = (moveEvent: MouseEvent) => {
      if (!isDownRef.current || !railRef.current) return;
      const now = Date.now();
      const dt = now - lastTimeRef.current || 16;
      const dx = moveEvent.pageX - lastXRef.current;
      velocityRef.current = dx / dt;
      lastXRef.current = moveEvent.pageX;
      lastTimeRef.current = now;

      const totalDelta = moveEvent.pageX - startXRef.current;
      railRef.current.scrollLeft = startScrollLeftRef.current - totalDelta;
    };

    const onWindowMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);

      if (!isDownRef.current || !railRef.current) return;
      isDownRef.current = false;
      setIsDragging(false);

      const totalDelta = upEvent.pageX - startXRef.current;
      const velocity = velocityRef.current;
      const cards = getCards();
      const startIndex = startCardIndexRef.current;

      // Calculate target card based on drag distance and release velocity
      let targetIndex = startIndex;
      if (velocity < -0.25 || totalDelta < -50) {
        // Flicked or dragged left -> advance to next card (or closest if multi-card drag)
        targetIndex = Math.min(cards.length - 1, Math.max(startIndex + 1, getClosestCardIndex()));
      } else if (velocity > 0.25 || totalDelta > 50) {
        // Flicked or dragged right -> retreat to previous card
        targetIndex = Math.max(0, Math.min(startIndex - 1, getClosestCardIndex()));
      } else {
        // Dragged < 50px without flick velocity -> cushion back to closest card
        targetIndex = getClosestCardIndex();
      }

      scrollToCard(targetIndex);
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  return (
    <section id="talent" className="scroll-mt-20 bg-dark-2 text-on-ink section">
      <div className="shell">
        {/* Header row */}
        <div className="grid12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <Eyebrow index="04" invert>
                Featured Creative Work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05} className="mt-6">
              <h2 className="display max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
                Discover creative talent.
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.1}
            className="col-span-12 lg:col-span-4 lg:justify-self-end"
          >
            <div className="flex items-center gap-4">
              <span className="mono inline-flex items-center gap-2 text-on-ink-3 text-xs sm:text-sm select-none">
                Drag to explore
                <MoveRight className="size-3.5" aria-hidden />
              </span>
              <div className="flex items-center gap-1.5 pl-3 border-l border-line-invert">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={!canScrollLeft}
                  aria-label="Previous card"
                  className="grid size-9 place-items-center rounded-full border border-line-invert text-on-ink-2 transition-all hover:border-orange hover:text-orange hover:bg-orange/10 disabled:opacity-25 disabled:pointer-events-none active:scale-95"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canScrollRight}
                  aria-label="Next card"
                  className="grid size-9 place-items-center rounded-full border border-line-invert text-on-ink-2 transition-all hover:border-orange hover:text-orange hover:bg-orange/10 disabled:opacity-25 disabled:pointer-events-none active:scale-95"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll card rail with inertia smooth snapping */}
        <div
          ref={railRef}
          onMouseDown={onMouseDown}
          className={cn(
            "mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
        >
          {FREVO_PROFILES.map((profile, i) => (
            <Tilt
              key={profile.id}
              className="group w-[84vw] shrink-0 snap-start sm:w-[48vw] lg:w-[32vw]"
            >
              <article className="flex h-full flex-col border border-line-invert-2 bg-dark transition-colors duration-300 group-hover:border-orange/40">
                {/* Featured project artwork — main visual */}
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-3 pointer-events-none">
                  <Image
                    src={profile.featuredWork.cover}
                    alt={`${profile.name} — ${profile.featuredWork.title}`}
                    fill
                    priority={i === 0}
                    loading={i < 2 ? "eager" : "lazy"}
                    draggable={false}
                    className="object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
                  {/* Discipline badge */}
                  <span className="label absolute left-4 top-4 text-on-ink-2">
                    {profile.discipline}
                  </span>
                  {/* Watermark index */}
                  <span
                    className="display absolute bottom-2 right-5 text-6xl leading-none text-on-ink/10 select-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Profile Card body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Profile identity: Avatar + Name + Role */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line-invert-2 bg-dark-2 pointer-events-none">
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        fill
                        sizes="40px"
                        draggable={false}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="display text-lg leading-tight text-on-ink truncate">
                        {profile.name}
                      </h3>
                      <p className="mono text-xs text-on-ink-3 truncate mt-0.5">
                        {profile.role}
                      </p>
                    </div>
                  </div>

                  {/* Client & Project highlight */}
                  <div className="mt-5 border-t border-line-invert pt-4">
                    <span className="label text-orange">
                      {profile.featuredWork.client}
                    </span>
                    <p className="display mt-1 text-h3 text-on-ink leading-snug">
                      {profile.featuredWork.title}
                    </p>
                    {/* Metric row */}
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="display text-2xl leading-none text-orange [overflow-wrap:anywhere]">
                        {profile.featuredWork.metric.value}
                      </span>
                      <span className="label text-on-ink-3">
                        {profile.featuredWork.metric.label}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="mono border border-line-invert px-2 py-0.5 text-xs text-on-ink-2 select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Tilt>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="#how-it-works"
            className="group label inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
          >
            See how matching works
            <MoveRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
