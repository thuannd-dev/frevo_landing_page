import { cn } from "@/lib/utils";

/**
 * FREVO wordmark logo. Mirrors the pattern of components/layout/Logo.tsx.
 * Dark-surface version (white text) shown by default; light-surface (black text)
 * shown under [data-theme="light"] via CSS rules in globals.css.
 */
export function FrevoLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-frevo-dark.png"
        alt="FREVO"
        width={480}
        height={132}
        className="logo-frevo--dark h-7 w-auto shrink-0 object-contain md:h-8"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-frevo-light.png"
        alt=""
        aria-hidden
        width={480}
        height={132}
        className="logo-frevo--light h-7 w-auto shrink-0 object-contain md:h-8"
      />
    </span>
  );
}
