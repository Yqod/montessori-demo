import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import {
  CalendarIcon,
  LockIcon,
  PhoneIcon,
  DownloadIcon,
  ArrowUpRight,
} from "@/components/ui/Icons";
import { Sparkle } from "@/components/decorations/Doodles";
import type { ComponentType, SVGProps } from "react";

/**
 * QuickAccessSection ("Schnellzugriffe").
 *
 * Four compact cards as a slightly uneven row – each with its own accent and a
 * gentle rotation so it reads like pinned notes rather than a uniform grid.
 */
type Shortcut = {
  title: string;
  text: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string; // icon chip bg
  iconColor: string;
  rotate: string;
  offset: string;
};

const shortcuts: Shortcut[] = [
  {
    title: "Termine",
    text: "Feste, Ferien & Infoabende",
    href: "/termine",
    Icon: CalendarIcon,
    accent: "bg-sage/25",
    iconColor: "text-sage-deep",
    rotate: "sm:-rotate-2",
    offset: "sm:mt-0",
  },
  {
    title: "Internum",
    text: "Geschützter Eltern-Bereich",
    href: "/internum",
    Icon: LockIcon,
    accent: "bg-clay/15",
    iconColor: "text-clay",
    rotate: "sm:rotate-1",
    offset: "sm:mt-6",
  },
  {
    title: "Kontakte",
    text: "Ansprechpartner:innen finden",
    href: "/kontakte",
    Icon: PhoneIcon,
    accent: "bg-beige",
    iconColor: "text-forest",
    rotate: "sm:-rotate-1",
    offset: "sm:mt-2",
  },
  {
    title: "Downloads",
    text: "Formulare & Dokumente",
    href: "/downloads",
    Icon: DownloadIcon,
    accent: "bg-sage/25",
    iconColor: "text-sage-deep",
    rotate: "sm:rotate-2",
    offset: "sm:mt-8",
  },
];

export function QuickAccessSection() {
  return (
    <section className="relative px-5 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1300px]">
        <Reveal direction="up" className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
            Schnell gefunden
          </h2>
          <span className="hidden items-center gap-2 text-sm text-forest-soft sm:inline-flex">
            <Sparkle className="h-4 w-4 text-clay" />
            Die wichtigsten Wege auf einen Blick
          </span>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 0.1} className={s.offset}>
              <Link
                href={s.href}
                className={`group flex h-full flex-col rounded-[26px] border border-beige/70 bg-cream p-6 shadow-warm-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm hover:rotate-0 ${s.rotate}`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${s.accent} ${s.iconColor}`}
                >
                  <s.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-forest-soft">
                  {s.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
                  Öffnen
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
