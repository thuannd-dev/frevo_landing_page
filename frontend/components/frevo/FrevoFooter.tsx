"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowRight, Check } from "lucide-react";
import { FREVO_SITE, FREVO_FOOTER_GROUPS, FREVO_SOCIALS } from "@/lib/frevo";
import { APP_URL } from "@/lib/site";
import { IMG } from "@/lib/media";
import { FrevoLogo } from "@/components/frevo/FrevoLogo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FrevoNewsletterForm — client component embedded directly inside FrevoFooter.
 */
function FrevoNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <p className="mt-6 flex max-w-xs items-center gap-2 border border-line-invert px-4 py-3 text-sm text-on-ink">
        <Check className="size-4 text-orange" /> You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex max-w-xs items-center border border-line-invert focus-within:border-orange transition-colors"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for platform drops"
        aria-label="Email for platform drops"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-on-ink placeholder:text-on-ink-3 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center bg-orange text-on-orange transition-colors hover:bg-orange-press"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

/**
 * FREVO footer.
 * - BigCTA-inspired background with centered layout and orange accent on "creative connection?".
 * - Brand + Tagline + Newsletter + Socials.
 * - Fitted Wordmark "FREVO" in massive display typography (text-[clamp(2.5rem,13vw,12rem)]).
 * - Bottom bar with copyright, privacy, terms, and Back to top.
 */
export function FrevoFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const getHref = (href: string) => (isHome && href.startsWith("/#") ? href.slice(1) : href);

  return (
    <footer className="bg-dark text-on-ink">
      {/* CTA band — scroll target for #post-project with atmospheric studio background */}
      <section
        id="post-project"
        className="scroll-mt-20 relative isolate overflow-hidden border-t border-line-invert bg-dark text-on-ink"
      >
        {/* Atmosphere: creative studio background dimmed under scrim for contrast */}
        <img
          src={IMG.bigCta}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-dark/70" />

        <div className="shell section relative z-10 text-center">
          <Reveal>
            <Eyebrow invert>Get started</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display-tight mx-auto mt-6 max-w-4xl text-[length:var(--text-h2)] leading-[1.04] text-on-ink">
              Ready to find your next{" "}
              <span className="text-orange">creative connection?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md text-[length:var(--text-lead)] leading-snug text-on-ink-2">
              We&apos;re building FREVO. Be among the first to use the platform.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`${APP_URL}/register?role=business`}
                className="group label inline-flex h-12 items-center gap-2 bg-orange px-8 text-on-orange transition-colors duration-200 hover:bg-orange-press"
              >
                Post a Project
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`${APP_URL}/register?role=freelancer`}
                className="group label inline-flex h-12 items-center gap-2 border border-line-invert px-8 text-on-ink transition-colors duration-200 hover:border-orange/60 hover:text-orange"
              >
                Join FREVO as a Freelancer
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mono mt-8 text-on-ink-3">{FREVO_SITE.email}</p>
          </Reveal>
        </div>
      </section>

      {/* Nav columns */}
      <div className="shell border-t border-line-invert py-14">
        <div className="grid12 gap-y-10">
          {/* Brand + Mission + Newsletter + Socials */}
          <div className="col-span-12 md:col-span-5">
            <FrevoLogo />
            <p className="mono mt-3 text-on-ink-3">{FREVO_SITE.tagline}</p>
            <p className="mt-4 max-w-sm text-sm text-on-ink-2 leading-relaxed">
              The curated marketplace connecting businesses with verified creative freelancers and collaborative pods.
            </p>

            {/* Newsletter form */}
            <FrevoNewsletter />

            {/* Social links */}
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {FREVO_SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-xs text-on-ink-3 transition-colors hover:text-orange"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav groups */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {FREVO_FOOTER_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="label text-on-ink-3">{group.title}</p>
                  <ul className="mt-5 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={getHref(link.href)}
                          className="text-sm text-on-ink-2 transition-colors hover:text-orange"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Fitted wordmark "FREVO" (Massive display typography) ── */}
      <div
        aria-hidden
        className="pointer-events-none relative flex w-full select-none justify-center overflow-hidden px-4"
      >
        <span className="display-tight whitespace-nowrap text-center text-[clamp(2.5rem,13vw,12rem)] leading-[0.85] tracking-[-0.04em] text-on-ink/[0.06]">
          FREVO
        </span>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line-invert">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="mono text-on-ink-3">
            © {new Date().getFullYear()} FREVO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="mono text-on-ink-3 hover:text-orange transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="mono text-on-ink-3 hover:text-orange transition-colors">
              Terms
            </Link>
            <a
              href="#top"
              className="group mono inline-flex items-center gap-2 text-on-ink-3 transition-colors hover:text-orange"
            >
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
