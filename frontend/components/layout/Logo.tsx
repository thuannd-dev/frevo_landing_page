import { FrevoLogo } from "@/components/frevo/FrevoLogo";

/**
 * Global Logo component — delegates to FrevoLogo.
 * Preserves compatibility with legacy layout/agency components.
 */
export function Logo({ className }: { className?: string; invert?: boolean }) {
  return <FrevoLogo className={className} />;
}
