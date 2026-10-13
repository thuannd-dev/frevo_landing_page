import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/fx/Tilt";

const PRINCIPLES = [
  {
    index: "01",
    title: "Clear Project Scope",
    body: "Both parties agree on deliverables, timeline and acceptance criteria before work begins. No surprises, no moving goalposts.",
  },
  {
    index: "02",
    title: "Relevant Portfolio Evidence",
    body: "Evaluate work that matches the project type you're hiring for. Not just impressive — comparable.",
  },
  {
    index: "03",
    title: "Agreed Milestones",
    body: "Structured progress checkpoints reduce late surprises and give both parties clear signals on when to proceed.",
  },
];

/**
 * Trust section — 3 trust-principle cards. No fake ratings, no fabricated testimonials.
 * Honest note about reviews at bottom.
 * Server component.
 */
export function TrustSection() {
  return (
    <section className="bg-dark text-on-ink section">
      <div className="shell">
        <Reveal>
          <Eyebrow index="07" invert>
            Built on Clarity
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display mt-6 max-w-[22ch] text-[length:var(--text-h2)] text-on-ink">
            Better work starts with{" "}
            <span className="text-orange">clearer expectations.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-[length:var(--text-body)] leading-snug text-on-ink-2">
            Mismatched expectations are the root cause of most failed creative projects. FREVO is
            built to surface and resolve them before work begins.
          </p>
        </Reveal>

        {/* Principle cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={0.06 + i * 0.07}>
              <Tilt className="h-full" max={5}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-on-ink/10 bg-on-ink/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange/40">
                  <span className="absolute left-0 top-0 h-0.5 w-8 bg-orange transition-all duration-500 group-hover:w-full" />
                  <span className="mono text-[length:var(--text-mono)] text-orange">{p.index}</span>
                  <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-snug text-on-ink-2">{p.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* Honest note — no reviews yet */}
        <Reveal delay={0.1}>
          <p className="mono mt-12 text-on-ink-3">
            Verified project reviews will appear here once the platform launches. Be among the first
            to build your reputation on FREVO.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
