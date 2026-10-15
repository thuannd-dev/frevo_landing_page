import type { Metadata } from "next";
import { getPosts } from "@/lib/cms";
import { FrevoHeader } from "@/components/frevo/FrevoHeader";
import { FrevoFooter } from "@/components/frevo/FrevoFooter";
import { PageHero } from "@/components/agency/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "FREVO Journal — Insights & Perspectives on Creative Craft",
  description:
    "Perspectives on branding, design systems, visual craft, and freelance pod collaboration from FREVO.",
};

export default async function BlogPage() {
  const POSTS = await getPosts();

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <FrevoHeader />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ Journal"
          kicker="FREVO Journal"
          titleLines={["Insights & Notes", "on Creative Craft"]}
          lede="Practical perspectives on creative craft, branding, design systems, and freelance pod collaboration."
          meta={`${POSTS.length} articles`}
        />

        {/* ── Posts list ── */}
        <section className="bg-dark pb-[var(--section-pad)]">
          <div className="shell">
            <BlogIndex posts={POSTS} />
          </div>
        </section>
      </main>
      <FrevoFooter />
    </>
  );
}
