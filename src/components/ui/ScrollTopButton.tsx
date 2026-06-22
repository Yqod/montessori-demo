"use client";

import { ArrowUp } from "@/components/ui/Icons";

/**
 * ScrollTopButton – smooth-scrolls back to the top. Small client island so the
 * Footer itself can stay a server component.
 */
export function ScrollTopButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="group inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest"
    >
      Nach oben
      <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
