import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FREVO_TALENT } from "@/lib/frevo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/fx/Tilt";

/**
 * Horizontal scroll-snap rail of demo talent/project cards.
 * Server component — Tilt and Reveal are client components but work as children.
 * Cards use project artwork as the main visual; avatar is secondary.
 */
export function FeaturedTalent() {
  return (
    <section
      id="talent"
      className="scroll-mt-20 bg-dark-2 text-on-ink section"
    >
      <div className="shell">
        {/* Header row */}
        <div className="grid12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-9">
            <Reveal>
              <Eyebrow index="04" invert>
                Featured Creative Work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05} className="mt-6">
              <h2 className="display max-w-[14ch] text-[length:var(--text-h2)] text-on-ink">
                Discover creative talent.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-3 lg:justify-self-end">
            <span className="mono inline-flex items-center gap-2 text-on-ink-3">
              Drag to explore
              <MoveRight className="size-4" aria-hidden />
            </span>
          </Reveal>
        </div>

        {/* Scroll-snap card rail */}
        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FREVO_TALENT.map((card, i) => (
            <Tilt
              key={card.id}
              className="group w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[31vw]"
            >
              <article className="flex h-full flex-col border border-line-invert-2 bg-dark transition-colors duration-300 group-hover:border-orange/40">
                {/* Project artwork — main visual */}
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-3">
                  <Image
                    src={card.projectImage}
                    alt={`Demo project — ${card.discipline}`}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                    className="object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                  {/* Discipline badge */}
                  <span className="label absolute left-4 top-4 text-on-ink-2">
                    {card.discipline}
                  </span>
                  <span
                    className="display absolute bottom-2 right-5 text-6xl leading-none text-on-ink/10 select-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Name row — mirrors CaseStudies client label */}
                  <span className="label text-on-ink-3">{card.discipline}</span>

                  {/* Discipline title — mirrors CaseStudies h3 */}
                  <h3 className="display mt-2 text-[length:var(--text-h3)] text-on-ink">
                    {card.name}
                  </h3>

                  {/* Avatar row — mirrors CaseStudies metric row */}
                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-full">
                      <Image src={card.avatar} alt="" fill className="object-cover" />
                    </div>
                    <span className="mono text-sm text-on-ink-3">[Demo Profile]</span>
                  </div>

                  {/* Skill tags — push to bottom like category tags in CaseStudies */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="mono border border-line-invert px-2.5 py-1 text-on-ink-2"
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
