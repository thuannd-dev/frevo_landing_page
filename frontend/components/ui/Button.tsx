"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Swiss flat button. Sharp geometry, one orange, crisp 200ms hover invert.
 * No gradients, no magnetic drift, precision over flourish.
 */
const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-sm)] font-medium tracking-tight transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-orange text-on-orange hover:bg-orange-press",
        dark: "bg-ink text-on-ink hover:bg-orange hover:text-on-orange",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-on-ink",
        invert:
          "border border-on-ink/30 text-on-ink hover:bg-on-ink hover:text-ink",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  target?: string;
  rel?: string;
} & VariantProps<typeof button>;

export function Button({
  href,
  children,
  className,
  variant,
  size,
  arrow = true,
  target,
  rel,
}: ButtonProps) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const external = /^https?:\/\//i.test(href);
  const cls = cn(button({ variant, size }), className);

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-[1.05em] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (internal && !target) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  const resolvedTarget = target ?? (external ? "_blank" : undefined);
  const resolvedRel =
    rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <a
      href={href}
      className={cls}
      target={resolvedTarget}
      rel={resolvedRel}
    >
      {content}
    </a>
  );
}
