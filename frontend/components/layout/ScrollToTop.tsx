"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUp } from "lucide-react";
import { EASE } from "@/lib/motion";

/** Floating back-to-top button that appears after scrolling. */
export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 900));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.25, ease: EASE.outQuart }}
          className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex size-10 sm:size-11 items-center justify-center rounded-md border border-black/15 bg-orange text-on-orange shadow-[0_8px_24px_-4px_rgba(251,74,10,0.45)] transition-all hover:bg-orange-press active:scale-95"
        >
          <ArrowUp className="size-4 sm:size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
