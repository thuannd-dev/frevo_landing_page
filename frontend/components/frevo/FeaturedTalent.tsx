import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FREVO_PROFILES } from "@/lib/frevo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tilt } from "@/components/fx/Tilt";

/**
 * Featured Creative Work — transforms cards into authentic Creative Freelancer
 * & Creative Pod Profiles while showcasing real Creative Monk case studies as proof.
 * Server component — Tilt and Reveal are client components but work as children.
 */
export function FeaturedTalent() {
  return (
    <section id="talent" className="scroll-mt-20 bg-dark-2 text-on-ink section">
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
              <h2 className="display max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
                Discover creative talent.
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.1}
            className="col-span-12 lg:col-span-3 lg:justify-self-end"
          >
            <span className="mono inline-flex items-center gap-2 text-on-ink-3">
              Drag to explore
              <MoveRight className="size-4" aria-hidden />
            </span>
          </Reveal>
        </div>

        {/* Scroll-snap card rail */}
        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FREVO_PROFILES.map((profile, i) => (
            <Tilt
              key={profile.id}
              className="group w-[84vw] shrink-0 snap-start sm:w-[48vw] lg:w-[32vw]"
            >
              <article className="flex h-full flex-col border border-line-invert-2 bg-dark transition-colors duration-300 group-hover:border-orange/40">
                {/* Featured project artwork — main visual */}
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-3">
                  <Image
                    src={profile.featuredWork.cover}
                    alt={`${profile.name} — ${profile.featuredWork.title}`}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 84vw"
                    priority={i < 2}
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
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line-invert-2 bg-dark-2">
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        fill
                        sizes="40px"
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

                  {/* Skills tags — connected right below metric with clean, balanced spacing */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="mono border border-line-invert px-2 py-0.5 text-xs text-on-ink-2"
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
