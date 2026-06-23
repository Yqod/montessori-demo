import type { Metadata } from "next";
import Link from "next/link";
import { Sprout } from "@/components/decorations/Doodles";
import { LockIcon, ArrowLeft, NoteIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Interessenten-Verwaltung (Intern)",
  description:
    "Internes Demo-Backend zur Bearbeitung eingegangener Interessenanfragen.",
  // Internes Werkzeug – nicht für Suchmaschinen.
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="sticky top-0 z-30 border-b border-beige bg-sand/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-dark text-cream">
              <Sprout className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-semibold text-forest">
                  Interessenten-Verwaltung
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest-soft">
                  <LockIcon width={12} height={12} />
                  Intern
                </span>
              </div>
              <p className="text-xs text-forest-soft">
                Montessori Zentrum Magdeburg · Demo-Backend
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/interesse"
              className="inline-flex items-center gap-2 rounded-full border border-beige bg-cream px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-sand-deep"
            >
              <NoteIcon width={16} height={16} />
              Interesseformular
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-beige bg-cream px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-sand-deep"
            >
              <ArrowLeft width={16} height={16} />
              Zur Website
            </Link>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
