"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Search,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
} from "lucide-react";
import { FREVO_PROCESS } from "@/lib/frevo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { EASE, DUR } from "@/lib/motion";

const ICON_MAP = {
  FileText,
  Search,
  Layers,
  CheckCircle2,
} as const;

export function FrevoProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = FREVO_PROCESS[activeStep];

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Auto-scroll active tab into center view on mobile/tablet
  useEffect(() => {
    const activeTabEl = tabRefs.current[activeStep];
    if (activeTabEl && tabsContainerRef.current) {
      activeTabEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeStep]);

  // Touch Swipe Gesture Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Trigger swipe only when horizontal gesture is dominant and exceeds 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        // Swiped left -> advance to next phase
        setActiveStep((prev) => Math.min(FREVO_PROCESS.length - 1, prev + 1));
      } else {
        // Swiped right -> return to previous phase
        setActiveStep((prev) => Math.max(0, prev - 1));
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 relative isolate overflow-hidden bg-dark text-on-ink section"
    >
      <Aurora className="opacity-40" />

      <div className="shell relative z-10">
        {/* Header */}
        <Reveal>
          <Eyebrow index="05" invert>
            How FREVO Works
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
            From brief to <span className="text-orange">delivered.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-[length:var(--text-body)] leading-relaxed text-on-ink-2">
            A structured workflow designed to eliminate friction at every stage of the project —
            from initial brief definition to milestone-backed delivery and full IP handover.
          </p>
        </Reveal>

        {/* Stepper Navigation Tabs with Gradient Mask */}
        <div className="mt-8 sm:mt-12 lg:mt-16 relative">
          <div
            ref={tabsContainerRef}
            className="flex border-b border-line-invert overflow-x-auto no-scrollbar scroll-smooth"
          >
            {FREVO_PROCESS.map((p, i) => {
              const Icon = ICON_MAP[p.icon as keyof typeof ICON_MAP] || FileText;
              const isActive = activeStep === i;

              return (
                <button
                  key={p.step}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`group relative flex items-center gap-2 sm:gap-3.5 px-3.5 sm:px-5 py-3 sm:py-4 text-left transition-all duration-300 shrink-0 md:flex-1 ${
                    isActive ? "text-on-ink" : "text-on-ink-2 hover:text-on-ink"
                  }`}
                >
                  {/* Step icon pill */}
                  <span
                    className={`flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "border-orange bg-orange text-ink font-semibold"
                        : "border-line-invert bg-on-ink/[0.04] text-on-ink-3 group-hover:text-on-ink"
                    }`}
                  >
                    <Icon className="size-3.5 sm:size-4" strokeWidth={isActive ? 2.2 : 1.8} />
                  </span>

                  {/* Step Label */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`mono text-[0.62rem] sm:text-[0.7rem] uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? "text-orange" : "text-on-ink-3"
                      }`}
                    >
                      Phase {p.step}
                    </span>
                    <span className="display text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                      {/* Short name on mobile, full name on tablet/desktop */}
                      <span className="sm:hidden">{p.phase}</span>
                      <span className="hidden sm:inline">{p.title}</span>
                    </span>
                  </div>

                  {/* Rock-solid active indicator line (fixed directly to tab, no layoutId scroll desync) */}
                  <span
                    className={`absolute inset-x-0 -bottom-[1px] h-[2px] transition-colors duration-300 ${
                      isActive ? "bg-orange" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right edge fade hint on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark to-transparent md:hidden" />
        </div>

        {/* Showcase Stage Deck (Single Large Hero Window with Touch Swipe) */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-line-invert bg-on-ink/[0.025] backdrop-blur-md p-4 sm:p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Subtle stage background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-orange/5 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: DUR.medium, ease: EASE.outQuart }}
              className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 lg:items-center relative z-10"
            >
              {/* Left Column: Stage Details & Deliverables */}
              <div className="w-full flex flex-col lg:col-span-6">
                <div className="flex items-center gap-2">
                  <span className="mono text-[0.68rem] sm:text-xs font-semibold uppercase tracking-wider text-orange">
                    Phase {current.step} · {current.phase}
                  </span>
                </div>

                <h3 className="display mt-1.5 sm:mt-3 text-xl sm:text-2xl lg:text-3xl xl:text-[2.2rem] leading-tight text-on-ink max-w-[20ch]">
                  {current.subtitle}
                </h3>

                <p className="mt-2.5 sm:mt-4 text-sm sm:text-base leading-relaxed text-on-ink-2 max-w-xl">
                  {current.body}
                </p>

                {/* Deliverable checkpoints: clean 2-column grid */}
                <div className="mt-5 sm:mt-6">
                  <span className="mono text-[0.65rem] sm:text-xs uppercase tracking-wider text-on-ink-3 block mb-2 sm:mb-3">
                    Stage Deliverables & Verification
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {current.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-on-ink/[0.07] bg-on-ink/[0.03] px-2.5 py-2 sm:px-3.5 sm:py-2.5 min-w-0"
                      >
                        <span className="flex size-3.5 sm:size-4 shrink-0 items-center justify-center rounded-full bg-orange/20 text-orange">
                          <Check className="size-2 sm:size-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-[0.72rem] sm:text-xs font-medium text-on-ink leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive UI Mockup / Visual Artifact */}
              <div className="w-full lg:col-span-6">
                <div className="rounded-xl sm:rounded-2xl border border-line-invert bg-dark-2/90 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                  {/* Mockup Header bar */}
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-line-invert gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span className="size-2 sm:size-2.5 shrink-0 rounded-full bg-on-ink/20" />
                      <span className="size-2 sm:size-2.5 shrink-0 rounded-full bg-on-ink/20" />
                      <span className="size-2 sm:size-2.5 shrink-0 rounded-full bg-on-ink/20" />
                      <span className="mono text-[0.65rem] sm:text-[0.7rem] text-on-ink-3 ml-1 sm:ml-2">
                        <span className="hidden sm:inline">frevo.co / workspace / </span>phase-{current.step}
                      </span>
                    </div>
                    <span className="mono shrink-0 rounded-full bg-orange/15 px-2.5 py-0.5 text-[0.65rem] sm:text-[0.7rem] text-orange border border-orange/20 max-w-[60%] truncate text-right">
                      {current.preview.badge}
                    </span>
                  </div>

                  {/* Mockup Body — conditional based on phase type */}
                  <div className="pt-4 sm:pt-6">
                    {current.preview.type === "brief" && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3.5 sm:p-4">
                          <span className="mono text-[0.65rem] sm:text-[0.7rem] uppercase text-on-ink-3">Project Title</span>
                          <p className="display text-sm sm:text-base text-on-ink mt-1 font-semibold leading-snug">
                            {current.preview.projectTitle}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3 sm:p-3.5">
                            <span className="mono text-[0.65rem] sm:text-[0.68rem] uppercase text-on-ink-3">Scope Format</span>
                            <p className="text-xs text-on-ink mt-1 font-medium leading-relaxed">{current.preview.scope}</p>
                          </div>
                          <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3 sm:p-3.5">
                            <span className="mono text-[0.65rem] sm:text-[0.68rem] uppercase text-on-ink-3">Timeline</span>
                            <p className="text-xs text-on-ink mt-1 font-medium">{current.preview.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-orange/30 bg-orange/10 px-3.5 sm:px-4 py-2.5 sm:py-3">
                          <span className="mono text-xs text-orange">Estimated Budget</span>
                          <span className="mono text-xs sm:text-sm font-semibold text-orange">{current.preview.budget}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "match" && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3 sm:p-4 gap-2">
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-orange text-ink font-semibold text-xs sm:text-sm">
                              MS
                            </div>
                            <div className="min-w-0">
                              <p className="display text-xs sm:text-sm font-semibold text-on-ink truncate">
                                {current.preview.creatorName}
                              </p>
                              <span className="mono text-[0.65rem] sm:text-[0.7rem] text-on-ink-3 block">
                                {current.preview.discipline}
                              </span>
                            </div>
                          </div>
                          <span className="mono shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[0.65rem] sm:text-[0.7rem] font-medium text-emerald-400">
                            {current.preview.matchScore}
                          </span>
                        </div>
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3 sm:p-3.5">
                          <span className="mono text-[0.65rem] sm:text-[0.68rem] uppercase text-on-ink-3">Comparable Deliverables</span>
                          <p className="text-xs text-on-ink mt-1 leading-relaxed">{current.preview.pastWork}</p>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line-invert bg-on-ink/[0.02] px-3.5 sm:px-4 py-2.5 sm:py-3">
                          <span className="text-xs text-on-ink-2">Escrow Agreement</span>
                          <span className="mono text-xs font-semibold text-on-ink">{current.preview.rate}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "escrow" && (
                      <div className="space-y-2.5 sm:space-y-3">
                        {current.preview.milestones.map((m, idx) => (
                          <div
                            key={m.name}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-2.5 sm:p-3.5 gap-1 sm:gap-2 transition-all ${
                              m.active
                                ? "border-orange/50 bg-orange/10"
                                : "border-on-ink/10 bg-on-ink/[0.02]"
                            }`}
                          >
                            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                              <span
                                className={`flex size-4 sm:size-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] sm:text-[0.65rem] font-semibold ${
                                  m.active
                                    ? "bg-orange text-ink"
                                    : "bg-on-ink/15 text-on-ink-2"
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <span className="text-xs font-medium text-on-ink truncate">{m.name}</span>
                            </div>
                            <span
                              className={`mono text-[0.68rem] sm:text-[0.7rem] shrink-0 pl-6 sm:pl-0 ${
                                m.active ? "text-orange font-semibold" : "text-on-ink-3"
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 rounded-xl border border-line-invert bg-on-ink/[0.02] p-2.5 sm:p-3 text-[0.72rem] sm:text-[0.75rem] text-on-ink-2">
                          <ShieldCheck className="size-4 shrink-0 text-orange" />
                          <span>{current.preview.protectionNote}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "deliver" && (
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 sm:p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-300">
                              {current.preview.ipStatus}
                            </span>
                          </div>
                          <Lock className="size-3.5 shrink-0 text-emerald-400" />
                        </div>
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3 sm:p-3.5">
                          <span className="mono text-[0.65rem] sm:text-[0.68rem] uppercase text-on-ink-3 block mb-2">
                            Transferred Source Assets
                          </span>
                          <div className="space-y-1.5">
                            {current.preview.files.map((f) => (
                              <div
                                key={f}
                                className="flex items-center justify-between text-xs text-on-ink-2 bg-on-ink/[0.03] px-2.5 py-1.5 rounded-lg border border-on-ink/[0.05] gap-2 min-w-0"
                              >
                                <span className="mono text-[0.68rem] sm:text-[0.72rem] text-on-ink truncate">{f}</span>
                                <div className="flex items-center gap-1 shrink-0 text-emerald-400">
                                  <Check className="size-3" strokeWidth={2.5} />
                                  <span className="mono text-[0.62rem] sm:text-[0.68rem] hidden sm:inline text-orange">Verified Sign-off</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <span className="text-on-ink-3">Escrow Balance</span>
                          <span className="mono text-on-ink font-semibold">
                            {current.preview.escrowStatus}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Unified Full-Width Navigation Footer (Desktop + Mobile) */}
              <div className="w-full lg:col-span-12 mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-line-invert flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: Step info + visual dot indicators */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="mono text-xs sm:text-sm text-on-ink-3 whitespace-nowrap">
                    Phase 0{activeStep + 1} of 0{FREVO_PROCESS.length} · <span className="text-on-ink-2 font-medium">{current.phase}</span>
                  </span>

                  <div className="flex items-center gap-1.5 ml-2" role="tablist" aria-label="Process steps">
                    {FREVO_PROCESS.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveStep(dotIdx)}
                        aria-label={`Go to phase ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === activeStep ? "w-6 bg-orange" : "w-1.5 bg-on-ink/20 hover:bg-on-ink/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Touch/Click Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {activeStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-md border border-line-invert bg-on-ink/[0.04] text-xs sm:text-sm font-medium text-on-ink hover:bg-on-ink/[0.08] active:scale-98 transition-all"
                    >
                      ← Prev Phase
                    </button>
                  )}
                  {activeStep < FREVO_PROCESS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep((prev) => prev + 1)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md bg-orange text-xs sm:text-sm font-semibold text-ink hover:bg-orange-press active:scale-98 transition-all shadow-md"
                    >
                      Next: {FREVO_PROCESS[activeStep + 1].phase} <ArrowRight className="size-3.5 sm:size-4" />
                    </button>
                  ) : (
                    <a
                      href="#post-project"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md bg-orange text-xs sm:text-sm font-semibold text-ink hover:bg-orange-press active:scale-98 transition-all shadow-md"
                    >
                      Post a Project <ArrowRight className="size-3.5 sm:size-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
