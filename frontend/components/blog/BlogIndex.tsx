"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { Post } from "@/lib/agency";
import { cn } from "@/lib/utils";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

function Meta({ post }: { post: Post }) {
  return (
    <span className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
      <span className="text-orange">{post.category}</span>
      <span aria-hidden>·</span>
      <span>{fmtDate(post.date)}</span>
      <span aria-hidden>·</span>
      <span>{post.read}</span>
    </span>
  );
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function BlogIndex({ posts }: { posts: Post[] }) {
  // newest article first (by article date, not insertion order)
  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
    [posts],
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(sorted.map((p) => p.category)))],
    [sorted],
  );
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (active === "All" ? sorted : sorted.filter((p) => p.category === active)),
    [sorted, active],
  );

  // Pagination calculation:
  // Page 1: 1 Featured banner + 9 cards = 10 articles
  // Pages 2+: 9 cards
  const totalPages = Math.max(1, 1 + Math.ceil(Math.max(0, filtered.length - 10) / 9));

  const { featured, rest } = useMemo(() => {
    if (page === 1) {
      return {
        featured: filtered[0] || null,
        rest: filtered.slice(1, 10),
      };
    }
    const start = 10 + (page - 2) * 9;
    return {
      featured: null,
      rest: filtered.slice(start, start + 9),
    };
  }, [filtered, page]);

  const scrollToPostsTop = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById("posts-container");
      if (typeof window !== "undefined") {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: object) => void } }).__lenis;
        if (lenis && el) {
          lenis.scrollTo(el, {
            offset: -100,
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 350, behavior: "smooth" });
        }
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    scrollToPostsTop();
  };

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setPage(1);
    scrollToPostsTop();
  };

  return (
    <>
      <div id="posts-container" className="scroll-mt-28" />

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleCategoryChange(c)}
            aria-pressed={active === c}
            className={cn(
              "label rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200",
              active === c
                ? "border-orange bg-orange text-on-orange"
                : "border-line-invert text-on-ink-2 hover:border-on-ink-3 hover:text-on-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mono text-on-ink-3">No articles found in this category.</p>
        </div>
      ) : (
        <motion.div
          key={`${active}-${page}`}
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid12 gap-y-[var(--col-gap)] will-change-transform"
        >
          {featured && (
            <motion.div variants={item} className="col-span-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50 md:grid-cols-2"
              >
                {/* image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-3 md:aspect-auto md:min-h-[26rem]">
                  {featured.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  )}
                  {/* blend the image into the card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-dark-2" />
                  <span className="mono absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-on-ink/15 bg-dark/50 px-3 py-1.5 text-xs text-on-ink backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-orange" />
                    Featured
                  </span>
                </div>
                {/* text */}
                <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                  <Meta post={featured} />
                  <h2 className="display text-[length:var(--text-h2)] leading-[0.95] text-on-ink transition-colors duration-200 group-hover:text-orange">
                    {featured.title}
                  </h2>
                  <p className="line-clamp-3 max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                    {featured.excerpt}
                  </p>
                  <span className="label inline-flex items-center gap-2 text-on-ink">
                    Read article
                    <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {rest.map((p) => (
            <motion.div key={p.slug} variants={item} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50"
              >
                {p.cover ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-dark-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-dark-3 to-dark-2" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <Meta post={p} />
                  <h3 className="display mt-4 text-[length:var(--text-h3)] leading-[1.08] text-on-ink transition-colors duration-200 group-hover:text-orange">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-on-ink-2">{p.excerpt}</p>
                  <span className="label mt-6 inline-flex items-center gap-2 text-on-ink">
                    Read
                    <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-invert pt-8"
        >
          <span className="mono text-xs text-on-ink-3">
            Page <span className="text-orange">{page}</span> of {totalPages} · {filtered.length} articles
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Prev button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className={cn(
                "mono inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs transition-colors",
                page === 1
                  ? "pointer-events-none opacity-25 border-line-invert text-on-ink-3"
                  : "border-line-invert text-on-ink-2 hover:border-orange hover:text-orange",
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page number buttons */}
            {getPageNumbers(page, totalPages).map((p, idx) => {
              if (p === "...") {
                return (
                  <span key={`dots-${idx}`} className="mono px-1.5 text-on-ink-3">
                    …
                  </span>
                );
              }
              const isCurrent = p === page;
              return (
                <button
                  key={`page-${p}`}
                  type="button"
                  onClick={() => handlePageChange(Number(p))}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "mono flex size-9 items-center justify-center rounded-lg border text-xs transition-all duration-200",
                    isCurrent
                      ? "border-orange bg-orange text-on-orange font-bold shadow-[0_0_12px_rgba(255,107,0,0.35)]"
                      : "border-line-invert text-on-ink-2 hover:border-on-ink-3 hover:text-on-ink",
                  )}
                >
                  {p}
                </button>
              );
            })}

            {/* Next button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={cn(
                "mono inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs transition-colors",
                page === totalPages
                  ? "pointer-events-none opacity-25 border-line-invert text-on-ink-3"
                  : "border-line-invert text-on-ink-2 hover:border-orange hover:text-orange",
              )}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
