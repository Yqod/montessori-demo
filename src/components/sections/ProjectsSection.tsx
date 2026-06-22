import { Reveal } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Button";
import { Blob, HeartLine, Sparkle } from "@/components/decorations/Doodles";
import { HeartIcon } from "@/components/ui/Icons";

/**
 * ProjectsSection ("Projekte & Förderer").
 *
 * A warm appeal – "Große Projekte brauchen Unterstützung!" – with a CTA and a
 * gently scrolling wall of partner logos. The partner names are placeholders
 * (no real third-party trademarks) rendered as simple wordmark chips.
 */
const partners = [
  "Bürgerstiftung Magdeburg",
  "Stiftung Wachsen",
  "Aktion Kinderträume",
  "ElternHand e. V.",
  "GrünRaum gGmbH",
  "Lokal & Fair",
  "KulturFonds Sachsen-Anhalt",
  "Werkstatt Holzwurm",
];

export function ProjectsSection() {
  return (
    <section className="relative px-5 py-20 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-[1300px] overflow-hidden rounded-[40px] border border-beige/70 bg-gradient-to-br from-sand-deep via-beige-soft to-beige px-6 py-14 shadow-warm sm:px-12 lg:py-16">
        {/* decorative drifting blobs inside the card */}
        <Blob className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-drift-slow text-sage/25" />
        <Blob className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 animate-drift text-clay/15" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* appeal copy */}
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/70 px-3.5 py-1.5 text-sm font-semibold text-clay shadow-warm-sm backdrop-blur">
                <HeartIcon className="h-4 w-4" />
                Gemeinsam mehr möglich machen
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
                Große Projekte brauchen Unterstützung!
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-forest-soft">
                Vom neuen Schulgarten bis zur Ausstattung unserer Werkstätten –
                vieles entsteht nur, weil Menschen und Partner mit anpacken. Ob
                Spende, Patenschaft oder helfende Hände: Jeder Beitrag wächst bei
                uns weiter.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/verein/projekte" variant="solid">
                  Projekte unterstützen
                </Button>
                <a
                  href="/verein/struktur/patenschaften"
                  className="group inline-flex items-center gap-2 font-semibold text-forest underline-offset-4 hover:underline"
                >
                  Patenschaft übernehmen
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* small stat card, overlapping & rotated */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-xs rotate-2 rounded-[28px] border border-cream/70 bg-cream p-7 text-center shadow-warm-lg">
                <Sparkle className="absolute -right-3 -top-3 h-7 w-7 text-clay" />
                <p className="font-display text-6xl font-semibold text-sage-deep">
                  100%
                </p>
                <p className="mt-2 leading-relaxed text-forest-soft">
                  deiner Spende fließt direkt in die Projekte unserer Kinder und
                  Jugendlichen.
                </p>
                <div className="mt-5 flex items-center justify-center">
                  <HeartLine className="h-5 w-28 text-clay/70" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* partner logo wall – gentle marquee */}
        <div className="relative mt-14">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-forest-soft/80">
            Gefördert &amp; unterstützt von
          </p>

          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-beige-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-beige to-transparent" />

          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-4">
              {[...partners, ...partners].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-forest/10 bg-cream/80 px-5 py-3 text-forest-soft shadow-warm-sm"
                >
                  <PartnerGlyph index={i} />
                  <span className="whitespace-nowrap font-display text-[15px] font-medium">
                    {name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A tiny abstract logo glyph that varies per partner (purely decorative). */
function PartnerGlyph({ index }: { index: number }) {
  const variant = index % 4;
  const cls = "h-6 w-6 text-sage-dark";
  if (variant === 0)
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    );
  if (variant === 1)
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path d="M12 3l8 14H4L12 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  if (variant === 2)
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden>
      <path
        d="M12 21S4 15 4 9.5A4 4 0 0 1 12 7a4 4 0 0 1 8 2.5C20 15 12 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}
