"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Search,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
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
  const CurrentIcon = ICON_MAP[current.icon as keyof typeof ICON_MAP] || FileText;

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
          <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-snug text-on-ink-2">
            A structured workflow designed to eliminate friction at every stage of the project —
            from initial brief definition to milestone-backed delivery and full IP handover.
          </p>
        </Reveal>

        {/* Stepper Navigation Tabs */}
        <div className="mt-12 lg:mt-16">
          <div className="flex border-b border-line-invert overflow-x-auto no-scrollbar">
            {FREVO_PROCESS.map((p, i) => {
              const Icon = ICON_MAP[p.icon as keyof typeof ICON_MAP] || FileText;
              const isActive = activeStep === i;

              return (
                <button
                  key={p.step}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`group relative flex items-center gap-3.5 px-5 py-4 text-left transition-all duration-300 shrink-0 md:flex-1 ${
                    isActive ? "text-on-ink" : "text-on-ink-2 hover:text-on-ink"
                  }`}
                >
                  {/* Step icon pill */}
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "border-orange bg-orange text-ink"
                        : "border-line-invert bg-on-ink/[0.04] text-on-ink-3 group-hover:text-on-ink"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={isActive ? 2.2 : 1.8} />
                  </span>

                  {/* Step Label */}
                  <div className="flex flex-col">
                    <span
                      className={`mono text-[0.7rem] uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? "text-orange" : "text-on-ink-3"
                      }`}
                    >
                      Phase {p.step}
                    </span>
                    <span className="display text-sm font-semibold tracking-tight whitespace-nowrap">
                      {p.title}
                    </span>
                  </div>

                  {/* Active sliding indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="processActiveBar"
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-orange"
                      transition={{ duration: DUR.medium, ease: EASE.outQuart }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Stage Deck (Single Large Hero Window) */}
        <div className="mt-8 rounded-3xl border border-line-invert bg-on-ink/[0.025] backdrop-blur-md p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle stage background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-orange/5 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: DUR.medium, ease: EASE.outQuart }}
              className="grid gap-10 lg:grid-cols-12 lg:items-center relative z-10"
            >
              {/* Left Column: Stage Details & Deliverables */}
              <div className="flex flex-col lg:col-span-6">
                <div className="flex items-center gap-2.5">
                  <span className="mono text-xs font-semibold uppercase tracking-wider text-orange">
                    Phase {current.step} · {current.phase}
                  </span>
                </div>

                <h3 className="display mt-3 text-[length:var(--text-h2)] leading-tight text-on-ink">
                  {current.subtitle}
                </h3>

                <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-on-ink-2 max-w-xl">
                  {current.body}
                </p>

                {/* Deliverable checkpoints */}
                <div className="mt-8">
                  <span className="mono text-xs uppercase tracking-wider text-on-ink-3 block mb-3">
                    Stage Deliverables & Verification
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl border border-on-ink/[0.07] bg-on-ink/[0.03] px-3.5 py-2.5"
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-orange/20 text-orange">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-xs font-medium text-on-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick CTA to relevant action */}
                <div className="mt-8 pt-6 border-t border-line-invert flex items-center justify-between">
                  <span className="mono text-xs text-on-ink-3">
                    Step {activeStep + 1} of {FREVO_PROCESS.length}
                  </span>
                  <div className="flex items-center gap-3">
                    {activeStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        className="mono text-xs text-on-ink-2 hover:text-on-ink transition-colors"
                      >
                        ← Prev
                      </button>
                    )}
                    {activeStep < FREVO_PROCESS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-orange px-4 py-2 text-xs font-medium text-ink hover:bg-orange-press transition-colors"
                      >
                        Next Step <ArrowRight className="size-3.5" />
                      </button>
                    ) : (
                      <a
                        href="#post-project"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-orange px-4 py-2 text-xs font-medium text-ink hover:bg-orange-press transition-colors"
                      >
                        Post a Project <ArrowRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive UI Mockup / Visual Artifact */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-line-invert bg-dark-2/90 p-6 shadow-2xl relative overflow-hidden">
                  {/* Mockup Header bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-line-invert">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-on-ink/20" />
                      <span className="size-2.5 rounded-full bg-on-ink/20" />
                      <span className="size-2.5 rounded-full bg-on-ink/20" />
                      <span className="mono text-[0.7rem] text-on-ink-3 ml-2">
                        frevo.co / workspace / phase-{current.step}
                      </span>
                    </div>
                    <span className="mono rounded-full bg-orange/15 px-2.5 py-0.5 text-[0.7rem] text-orange border border-orange/20">
                      {current.preview.badge}
                    </span>
                  </div>

                  {/* Mockup Body — conditional based on phase type */}
                  <div className="pt-6">
                    {current.preview.type === "brief" && (
                      <div className="space-y-4">
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-4">
                          <span className="mono text-[0.7rem] uppercase text-on-ink-3">Project Title</span>
                          <p className="display text-base text-on-ink mt-1 font-semibold">
                            {current.preview.projectTitle}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3.5">
                            <span className="mono text-[0.68rem] uppercase text-on-ink-3">Scope Format</span>
                            <p className="text-xs text-on-ink mt-1 font-medium">{current.preview.scope}</p>
                          </div>
                          <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3.5">
                            <span className="mono text-[0.68rem] uppercase text-on-ink-3">Timeline</span>
                            <p className="text-xs text-on-ink mt-1 font-medium">{current.preview.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-orange/30 bg-orange/10 px-4 py-3">
                          <span className="mono text-xs text-orange">Estimated Budget</span>
                          <span className="mono text-sm font-semibold text-orange">{current.preview.budget}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "match" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-orange text-ink font-semibold text-sm">
                              MS
                            </div>
                            <div>
                              <p className="display text-sm font-semibold text-on-ink">
                                {current.preview.creatorName}
                              </p>
                              <span className="mono text-[0.7rem] text-on-ink-3">
                                {current.preview.discipline}
                              </span>
                            </div>
                          </div>
                          <span className="mono rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[0.7rem] font-medium text-emerald-400">
                            {current.preview.matchScore}
                          </span>
                        </div>
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3.5">
                          <span className="mono text-[0.68rem] uppercase text-on-ink-3">Comparable Deliverables</span>
                          <p className="text-xs text-on-ink mt-1">{current.preview.pastWork}</p>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-line-invert bg-on-ink/[0.02] px-4 py-3">
                          <span className="text-xs text-on-ink-2">Escrow Agreement</span>
                          <span className="mono text-xs font-semibold text-on-ink">{current.preview.rate}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "escrow" && (
                      <div className="space-y-3">
                        {current.preview.milestones.map((m, idx) => (
                          <div
                            key={m.name}
                            className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                              m.active
                                ? "border-orange/50 bg-orange/10"
                                : "border-on-ink/10 bg-on-ink/[0.02]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold ${
                                  m.active
                                    ? "bg-orange text-ink"
                                    : "bg-on-ink/15 text-on-ink-2"
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <span className="text-xs font-medium text-on-ink">{m.name}</span>
                            </div>
                            <span
                              className={`mono text-[0.7rem] ${
                                m.active ? "text-orange font-semibold" : "text-on-ink-3"
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 rounded-xl border border-line-invert bg-on-ink/[0.02] p-3 text-[0.75rem] text-on-ink-2">
                          <ShieldCheck className="size-4 shrink-0 text-orange" />
                          <span>{current.preview.protectionNote}</span>
                        </div>
                      </div>
                    )}

                    {current.preview.type === "deliver" && (
                      <div className="space-y-3">
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-300">
                              {current.preview.ipStatus}
                            </span>
                          </div>
                          <Lock className="size-3.5 text-emerald-400" />
                        </div>
                        <div className="rounded-xl border border-on-ink/10 bg-on-ink/[0.03] p-3.5">
                          <span className="mono text-[0.68rem] uppercase text-on-ink-3 block mb-2">
                            Transferred Source Assets
                          </span>
                          <div className="space-y-1.5">
                            {current.preview.files.map((f) => (
                              <div
                                key={f}
                                className="flex items-center justify-between text-xs text-on-ink-2 bg-on-ink/[0.03] px-2.5 py-1.5 rounded-lg border border-on-ink/[0.05]"
                              >
                                <span className="mono text-[0.72rem] text-on-ink">{f}</span>
                                <span className="mono text-[0.65rem] text-orange">Verified Sign-off</span>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
