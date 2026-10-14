import type { Metadata } from "next";
import { FrevoHeader } from "@/components/frevo/FrevoHeader";
import { FrevoHero } from "@/components/frevo/FrevoHero";
import { CategoryMarquee } from "@/components/frevo/CategoryMarquee";
import { RightFit } from "@/components/frevo/RightFit";
import { FeaturedTalent } from "@/components/frevo/FeaturedTalent";
import { FrevoProcess } from "@/components/frevo/FrevoProcess";
import { PlatformCapabilities } from "@/components/frevo/PlatformCapabilities";
import { FrevoFAQ } from "@/components/frevo/FrevoFAQ";
import { FrevoFooter } from "@/components/frevo/FrevoFooter";

/**
 * FREVO homepage — synchronous Server Component.
 * All content comes from static lib/frevo.ts; no CMS fetchers are called.
 * The Creative Monk CMS data (lib/cms.ts) and agency components are untouched
 * and continue to serve other routes (/about, /services, /work, etc.).
 *
 * SEO: metadata below overrides the root layout's Creative Monk defaults for
 * this route only. canonical and ogUrl are omitted intentionally until the
 * FREVO domain is confirmed — adding metadataBase pointing to an unconfirmed
 * domain would produce misleading structured data.
 *
 * JSON-LD: A minimal FREVO WebSite schema is injected inline (see below).
 * The root layout's organizationSchema / websiteSchema (lib/seo.ts) remain
 * unchanged and continue to describe Creative Monk on all other routes.
 */
export const metadata: Metadata = {
  title: "FREVO — Where Freelancers Evolve",
  description:
    "Find creative freelancers and small teams that fit your project. Branding, video, photography, copywriting and more.",
  openGraph: {
    title: "FREVO — Where Freelancers Evolve",
    description:
      "Find creative freelancers and small teams that fit your project. Branding, video, photography, copywriting and more.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FREVO — Where Freelancers Evolve",
    description:
      "Find creative freelancers and small teams that fit your project.",
  },
};

/** Minimal FREVO WebSite schema — isolated, does not touch lib/seo.ts. */
const frevoSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FREVO",
  description:
    "Creative freelancer marketplace connecting businesses with the right creative talent for project-based work.",
};

export default function HomePage() {
  return (
    <>
      {/* Isolated FREVO structured data — CM schemas in root layout are unaffected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(frevoSchema) }}
      />
      {/* "Back to top" anchor target */}
      <span id="top" className="absolute top-0" aria-hidden />
      <FrevoHeader />
      <main className="bg-dark">
        <FrevoHero />
        <CategoryMarquee />
        <RightFit />
        <FeaturedTalent />
        <FrevoProcess />
        <PlatformCapabilities />
        <FrevoFAQ />
      </main>
      <FrevoFooter />
    </>
  );
}
