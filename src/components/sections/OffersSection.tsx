import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import {
  KinderhausScene,
  FreieSchuleScene,
  BildungszentrumScene,
} from "@/components/decorations/Illustrations";
import { DottedPath, Sprout, Underline } from "@/components/decorations/Doodles";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { ComponentType, SVGProps } from "react";

/**
 * OffersSection ("Unsere Angebote").
 *
 * Three offers, intentionally NOT a tidy equal grid: each card sits at a
 * different vertical offset and a different rotation, with a dashed hand-drawn
 * path weaving behind them. Each has its own accent colour.
 */
type Offer = {
  index: string;
  title: string;
  text: string;
  href: string;
  Art: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;
  tint: string; // background tint behind the illustration
  badge: string; // small kicker
  // layout quirks
  offset: string;
  rotate: string;
};

const offers: Offer[] = [
  {
    index: "01",
    title: "Montessori Kinderhaus",
    text: "Ein geborgener Ort zum Ankommen, Spielen und Entdecken. Kinder von 1 bis 6 Jahren wachsen hier in altersgemischten Gruppen in ihrem eigenen Tempo.",
    href: "/kinderhaus",
    Art: KinderhausScene,
    tint: "bg-sage/20",
    badge: "1–6 Jahre",
    offset: "lg:mt-0",
    rotate: "lg:-rotate-[1.5deg]",
  },
  {
    index: "02",
    title: "Freie Schule",
    text: "Lernen ohne Notendruck: Kinder und Jugendliche gestalten ihren Bildungsweg selbst – begleitet, vorbereitet und mit viel Raum für eigene Fragen.",
    href: "/freie-schule",
    Art: FreieSchuleScene,
    tint: "bg-clay/15",
    badge: "Klasse 1–10",
    offset: "lg:mt-20",
    rotate: "lg:rotate-[1.5deg]",
  },
  {
    index: "03",
    title: "Montessori-Bildungszentrum",
    text: "Fundierte Montessori-Ausbildung für Erwachsene: vom mehrteiligen Diplomkurs bis zu Weiterbildungen, Kursen und dem offenen Montessori-Tag.",
    href: "/bildungszentrum",
    Art: BildungszentrumScene,
    tint: "bg-beige",
    badge: "Für Erwachsene",
    offset: "lg:mt-8",
    rotate: "lg:-rotate-[1deg]",
  },
];

export function OffersSection() {
  return (
    <section
      id="angebote"
      className="relative scroll-mt-24 px-5 py-20 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* asymmetric header: text left, doodle pushed right */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sage-deep">
              <Sprout className="h-4 w-4" />
              Unsere Angebote
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
              Drei Wege,{" "}
              <span className="relative inline-block text-clay">
                ein Gedanke
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-sage" />
              </span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="up" delay={0.1}>
            <p className="text-lg leading-relaxed text-forest-soft lg:pb-2">
              Kinderhaus, Freie Schule und Bildungszentrum gehen ineinander über
              – vom ersten Tag im Kinderhaus bis zur Ausbildung von Pädagog:innen.
              Such dir aus, wohin du schauen möchtest.
            </p>
          </Reveal>
        </div>

        {/* dashed path weaving behind the cards (desktop only) */}
        <div className="relative mt-16">
          <DottedPath
            className="pointer-events-none absolute inset-x-10 -top-6 hidden h-24 w-[calc(100%-5rem)] text-sage/50 lg:block"
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
            {offers.map((offer, i) => (
              <Reveal
                key={offer.title}
                direction="up"
                delay={i * 0.12}
                className={`${offer.offset}`}
              >
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const { Art } = offer;
  return (
    <Link
      href={offer.href}
      className={`group relative block h-full overflow-hidden rounded-[34px] border border-beige/70 bg-cream p-7 shadow-warm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-warm-lg ${offer.rotate} hover:rotate-0`}
    >
      {/* big faded index number, top-right */}
      <span className="pointer-events-none absolute -right-1 -top-3 font-display text-7xl font-semibold text-forest/5">
        {offer.index}
      </span>

      {/* illustration in a soft tinted blob */}
      <div className="relative mb-6 inline-flex">
        <span
          className={`absolute inset-0 -m-2 blob ${offer.tint} transition-transform duration-500 group-hover:scale-110`}
        />
        <Art className="relative h-28 w-28" />
      </div>

      <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest-soft">
        {offer.badge}
      </span>

      <h3 className="mt-4 font-display text-2xl font-semibold text-forest">
        {offer.title}
      </h3>
      <p className="mt-3 leading-relaxed text-forest-soft">{offer.text}</p>

      <span className="mt-6 inline-flex items-center gap-2 font-semibold text-clay">
        Mehr erfahren
        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
