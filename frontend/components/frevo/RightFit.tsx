import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { Spotlight } from "@/components/fx/Spotlight";
import { Tilt } from "@/components/fx/Tilt";
import { FREVO_DIFFERENTIATORS } from "@/lib/frevo";

const glass =
  "rounded-2xl border border-line-invert bg-on-ink/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40";

/**
 * Explains the matching problem and positions FREVO's approach for both audiences.
 * Reuses the Creative Monk agency/Process.tsx card styling (watermark, tilt, easing, typography).
 * Server component — all children (Reveal, Aurora, Spotlight, Tilt) support SSR.
 */
export function RightFit() {
  return (
    <section
      id="right-fit"
      className="scroll-mt-20 relative isolate overflow-hidden bg-dark section text-on-ink"
    >
      <Aurora className="opacity-40" />
      <div className="shell relative z-10">
        {/* Header */}
        <Reveal>
          <Eyebrow index="02" invert>
            The Right Fit
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-tight mt-6 max-w-[22ch] text-[length:var(--text-h2)] leading-[1.04] text-on-ink">
            Finding a freelancer shouldn&apos;t feel like a{" "}
            <span className="text-orange">gamble.</span>
          </h2>
        </Reveal>

        {/* Two-audience cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal delay={0.1}>
            <Tilt className="h-full" max={4}>
              <Spotlight className={`${glass} flex h-full flex-col p-7`}>
                <span className="label text-orange">For Businesses</span>
                <h3 className="display mt-4 text-[length:var(--text-h3)] leading-tight text-on-ink">
                  Define clearly. Find precisely.
                </h3>
                <p className="mt-4 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                  Describe what you need — goal, deliverables, budget and timeline. Then evaluate
                  freelancers by relevant work and skills, not just impressive portfolios that may not
                  fit your project.
                </p>
              </Spotlight>
            </Tilt>
          </Reveal>

          <Reveal delay={0.14}>
            <Tilt className="h-full" max={4}>
              <Spotlight className={`${glass} flex h-full flex-col p-7`}>
                <span className="label text-orange">For Freelancers</span>
                <h3 className="display mt-4 text-[length:var(--text-h3)] leading-tight text-on-ink">
                  Understand before you commit.
                </h3>
                <p className="mt-4 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                  Know exactly what a project requires before applying. Find work that fits your
                  skills and working style. Build a reputation through real, completed projects.
                </p>
              </Spotlight>
            </Tilt>
          </Reveal>
        </div>

        {/* Differentiators grid — 1:1 match with Creative Monk Process.tsx */}
        <div className="grid12 mt-8 gap-4">
          {FREVO_DIFFERENTIATORS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={0.08 + i * 0.06}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <Tilt className="h-full" max={5}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert bg-on-ink/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40">
                  {/* Watermark step */}
                  <span
                    aria-hidden
                    className="display pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] leading-none text-on-ink/[0.04]"
                  >
                    {c.index}
                  </span>

                  {/* Top accent line */}
                  <span className="absolute left-0 top-0 h-0.5 w-10 bg-orange transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />

                  {/* Display step number in orange */}
                  <span className="display text-[length:var(--text-h3)] leading-none text-orange">
                    {c.index}
                  </span>

                  {/* Title */}
                  <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                    {c.title}
                  </h3>

                  {/* Body description */}
                  <p className="mt-3 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                    {c.body}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
