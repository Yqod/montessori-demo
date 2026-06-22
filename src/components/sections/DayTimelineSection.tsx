import { Reveal } from "@/components/motion/Motion";
import {
  DottedPath,
  Leaf,
  Sparkle,
  Sprout,
  StarBurst,
  Underline,
} from "@/components/decorations/Doodles";
import type { ComponentType, SVGProps } from "react";

/**
 * DayTimelineSection ("Ein Tag bei uns").
 *
 * A warm, editorial day-in-the-life timeline. On desktop the stops sit in a
 * row connected by a hand-drawn dashed path, each at a slightly different
 * height and rotation so it reads like pinned notes rather than a rigid grid.
 * On mobile it folds into a vertical list with a soft connecting line.
 */
type Stop = {
  time: string;
  title: string;
  text: string;
  Glyph: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
  iconColor: string;
  offset: string;
  rotate: string;
};

const stops: Stop[] = [
  {
    time: "07:30",
    title: "Ankommen",
    text: "In Ruhe im Tag ankommen – mit einer offenen Tür und einem freundlichen Morgen.",
    Glyph: Sparkle,
    accent: "bg-clay/15",
    iconColor: "text-clay",
    offset: "lg:mt-0",
    rotate: "lg:-rotate-2",
  },
  {
    time: "09:00",
    title: "Freiarbeit",
    text: "Die große Freiarbeit: Jedes Kind wählt selbst, woran es heute arbeiten möchte.",
    Glyph: Sprout,
    accent: "bg-sage/25",
    iconColor: "text-sage-deep",
    offset: "lg:mt-10",
    rotate: "lg:rotate-1",
  },
  {
    time: "12:00",
    title: "Gemeinsam essen",
    text: "Frisch gekocht und zusammen am Tisch – Zeit für Gespräche und kleine Rituale.",
    Glyph: Leaf,
    accent: "bg-beige",
    iconColor: "text-forest",
    offset: "lg:mt-2",
    rotate: "lg:-rotate-1",
  },
  {
    time: "14:00",
    title: "Draußen & Projekte",
    text: "Garten, Werkstatt und Bewegung – lernen mit allen Sinnen und viel frischer Luft.",
    Glyph: StarBurst,
    accent: "bg-sage/25",
    iconColor: "text-sage-deep",
    offset: "lg:mt-12",
    rotate: "lg:rotate-2",
  },
  {
    time: "16:00",
    title: "Ausklang",
    text: "Vorlesen, aufräumen, verabschieden – der Tag findet einen ruhigen Abschluss.",
    Glyph: Sparkle,
    accent: "bg-clay/15",
    iconColor: "text-clay",
    offset: "lg:mt-4",
    rotate: "lg:-rotate-1",
  },
];

export function DayTimelineSection() {
  return (
    <section className="relative isolate overflow-hidden bg-sand-deep px-5 py-20 sm:py-24 lg:px-8 lg:py-28">
      {/* faint oversized doodle watermark */}
      <Sprout className="pointer-events-none absolute -right-6 top-12 h-44 w-44 rotate-12 text-sage/20" />

      <div className="mx-auto max-w-[1400px]">
        {/* asymmetric header */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-clay">
              <Sparkle className="h-4 w-4" />
              Ein Tag bei uns
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
              Vom Ankommen bis zum{" "}
              <span className="relative inline-block">
                Ausklang
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-sage-dark" />
              </span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="up" delay={0.1}>
            <p className="text-lg leading-relaxed text-forest-soft lg:pb-2">
              Kein Stundenplan im Minutentakt, sondern ein verlässlicher Rhythmus,
              der Halt gibt und gleichzeitig Raum lässt. So fühlt sich ein
              gewöhnlicher Tag im Zentrum an.
            </p>
          </Reveal>
        </div>

        {/* the timeline */}
        <div className="relative mt-16">
          {/* dashed path weaving behind the stops (desktop only) */}
          <DottedPath
            className="pointer-events-none absolute inset-x-12 top-8 hidden h-24 w-[calc(100%-6rem)] text-clay/40 lg:block"
            aria-hidden
          />

          <ol className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
            {stops.map((stop, i) => (
              <Reveal
                as="li"
                key={stop.time}
                direction="up"
                delay={i * 0.1}
                className={stop.offset}
              >
                <article
                  className={`group relative h-full rounded-[28px] border border-beige/70 bg-cream p-6 shadow-warm-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-warm hover:rotate-0 ${stop.rotate}`}
                >
                  <div className="flex items-center justify-between">
                    {/* time chip */}
                    <span className="rounded-full bg-forest px-3 py-1 font-display text-sm font-semibold text-cream">
                      {stop.time}
                    </span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-2xl ${stop.accent} ${stop.iconColor}`}
                    >
                      <stop.Glyph className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    {stop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-soft">
                    {stop.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
