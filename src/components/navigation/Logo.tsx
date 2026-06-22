import Link from "next/link";

/**
 * Logo – a custom mark (a sprout inside a hand-rounded badge) plus a stacked
 * wordmark. Intentionally not a generic "icon + bold sans" lockup.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Montessori Zentrum Magdeburg – Startseite"
      className="group flex items-center gap-3"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        {/* wobbly badge */}
        <svg
          viewBox="0 0 64 64"
          className="absolute inset-0 h-full w-full text-sage-dark transition-transform duration-500 group-hover:rotate-[10deg]"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M32 3c9 0 14-2 21 5s5 12 5 24-1 16-8 22-12 7-18 7-13 0-20-7-7-13-7-22 0-17 6-24S23 3 32 3Z"
          />
        </svg>
        {/* sprout */}
        <svg viewBox="0 0 48 64" className="relative h-6 w-6" aria-hidden>
          <path
            d="M24 60V28"
            stroke="var(--color-cream)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M24 36c-7-4-17-2-22-10 9-5 19-2 22 10Z" fill="var(--color-cream)" />
          <path
            d="M24 30c5-6 16-6 21-15-9-4-19 2-21 15Z"
            fill="var(--color-cream)"
            fillOpacity="0.85"
          />
          <circle cx="24" cy="22" r="4" fill="var(--color-clay)" />
        </svg>
      </span>

      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[17px] font-semibold tracking-tight text-forest">
            Montessori Zentrum
          </span>
          <span className="mt-0.5 block text-[12.5px] font-medium uppercase tracking-[0.28em] text-clay">
            Magdeburg
          </span>
        </span>
      )}
    </Link>
  );
}
