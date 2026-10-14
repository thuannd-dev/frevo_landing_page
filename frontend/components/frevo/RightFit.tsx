import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { Spotlight } from "@/components/fx/Spotlight";
import { FREVO_DIFFERENTIATORS } from "@/lib/frevo";

const glass =
  "rounded-2xl border border-on-ink/10 bg-on-ink/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange/40";


/**
 * Explains the matching problem and positions FREVO's approach for both audiences.
 * Server component — all children (Reveal, Aurora, Spotlight) support SSR.
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
            <Spotlight className={`${glass} flex h-full flex-col p-7`}>
              <span className="label text-orange">For Businesses</span>
              <h3 className="display mt-4 text-[length:var(--text-h3)] leading-tight text-on-ink">
                Define clearly. Find precisely.
              </h3>
              <p className="mt-4 text-on-ink-2 leading-snug">
                Describe what you need — goal, deliverables, budget and timeline. Then evaluate
                freelancers by relevant work and skills, not just impressive portfolios that may not
                fit your project.
              </p>
            </Spotlight>
          </Reveal>

          <Reveal delay={0.14}>
            <Spotlight className={`${glass} flex h-full flex-col p-7`}>
              <span className="label text-orange">For Freelancers</span>
              <h3 className="display mt-4 text-[length:var(--text-h3)] leading-tight text-on-ink">
                Understand before you commit.
              </h3>
              <p className="mt-4 text-on-ink-2 leading-snug">
                Know exactly what a project requires before applying. Find work that fits your
                skills and working style. Build a reputation through real, completed projects.
              </p>
            </Spotlight>
          </Reveal>
        </div>

        {/* Differentiators grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FREVO_DIFFERENTIATORS.map((c, i) => (
            <Reveal key={c.title} delay={0.08 + i * 0.06}>
              <div className={`${glass} relative flex h-full flex-col overflow-hidden p-6`}>
                <span className="absolute left-0 top-0 h-0.5 w-8 bg-orange transition-all duration-500 group-hover:w-full" />
                <span className="mono text-[length:var(--text-mono)] text-orange">{c.index}</span>
                <h4 className="display mt-4 text-[length:var(--text-h3)] leading-tight text-on-ink">
                  {c.title}
                </h4>
                <p className="mt-3 text-sm leading-snug text-on-ink-2">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Honest AI note */}
        <Reveal delay={0.1}>
          <p className="mono mt-8 text-on-ink-3">
            Smart matching based on project requirements is planned for a future release.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
