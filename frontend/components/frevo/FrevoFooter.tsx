import Link from "next/link";
import { ArrowUp, ArrowRight } from "lucide-react";
import { FREVO_SITE, FREVO_FOOTER_GROUPS } from "@/lib/frevo";
import { FrevoLogo } from "@/components/frevo/FrevoLogo";

/**
 * FREVO footer. Standalone server component — no CMS fetch, no CM contact data,
 * no NewsletterForm, no PSEO directory.
 * CTA band has id="post-project" — anchor target from header/hero CTAs.
 * Buttons use mailto: with distinct subjects for Business vs Freelancer.
 * Footer nav uses only verified routes (/about, /blog, /privacy, /terms) + in-page anchors.
 */
export function FrevoFooter() {
  return (
    <footer className="bg-dark text-on-ink">
      {/* CTA band — scroll target for #post-project */}
      <section
        id="post-project"
        className="scroll-mt-20 border-t border-line-invert bg-dark-2"
      >
        <div className="shell section text-center">
          <p className="mono text-orange">Get started</p>
          <h2 className="display-tight mt-5 text-[length:var(--text-h2)] leading-[1.04] text-on-ink">
            Ready to find your next creative connection?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[length:var(--text-body)] text-on-ink-2">
            We&apos;re building FREVO. Be among the first to use the platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@frevo.co?subject=Post%20a%20Project"
              className="group label inline-flex h-12 items-center gap-2 bg-orange px-8 text-on-orange transition-colors duration-200 hover:bg-orange-press"
            >
              Post a Project
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:hello@frevo.co?subject=Join%20FREVO"
              className="group label inline-flex h-12 items-center gap-2 border border-line-invert px-8 text-on-ink transition-colors duration-200 hover:border-orange/60 hover:text-orange"
            >
              Join FREVO as a Freelancer
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mono mt-6 text-on-ink-3">{FREVO_SITE.email}</p>
        </div>
      </section>

      {/* Nav columns */}
      <div className="shell border-t border-line-invert py-14">
        <div className="grid12 gap-y-10">
          {/* Brand */}
          <div className="col-span-12 md:col-span-4">
            <FrevoLogo />
            <p className="mono mt-3 text-on-ink-3">{FREVO_SITE.tagline}</p>
          </div>

          {/* Nav groups */}
          {FREVO_FOOTER_GROUPS.map((group) => (
            <div key={group.title} className="col-span-6 md:col-span-2 md:col-start-auto">
              <p className="label text-on-ink-3">{group.title}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
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
