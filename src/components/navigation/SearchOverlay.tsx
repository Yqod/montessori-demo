"use client";

/**
 * SearchOverlay – a calm, on-brand search modal.
 *
 * The backend search isn't wired up yet (only the homepage exists), so this
 * captures a query and shows a friendly placeholder. It demonstrates the
 * intended interaction and keeps the search icon fully functional.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { Sparkle } from "@/components/decorations/Doodles";

const suggestions = [
  "Anmeldung Kinderhaus",
  "Termine",
  "Diplomkurs",
  "Konzept Freie Schule",
  "Stellenangebote",
];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-forest/40 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-[28px] border border-beige/70 bg-cream p-2 shadow-warm-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Suche"
          >
            <Sparkle className="pointer-events-none absolute -right-3 -top-3 h-7 w-7 text-clay/70" />

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-3 rounded-[22px] bg-sand px-5 py-4"
            >
              <SearchIcon className="h-6 w-6 shrink-0 text-sage-dark" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wonach suchst du?"
                className="w-full bg-transparent text-lg text-forest placeholder:text-forest-soft/60 focus:outline-none"
                aria-label="Suchbegriff"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Suche schließen"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-forest/60 transition-colors hover:bg-beige hover:text-forest"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </form>

            <div className="px-5 py-4">
              <p className="font-display text-sm italic text-forest-soft">
                Beliebte Suchen
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-beige bg-sand px-3.5 py-1.5 text-sm text-forest/80 transition-colors hover:border-sage hover:bg-sage/15 hover:text-forest"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
              {query.trim() && (
                <p className="mt-5 rounded-2xl bg-sand px-4 py-3 text-sm text-forest-soft">
                  Die Volltextsuche wird mit den Unterseiten verknüpft. Dein
                  Suchbegriff{" "}
                  <span className="font-semibold text-forest">
                    „{query.trim()}“
                  </span>{" "}
                  wird dann hier durchsucht.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
