"use client";

/**
 * Hero – the editorial opening.
 *
 * Deliberately asymmetric: an oversized left-aligned headline, an organic
 * illustration that bleeds into an arch on the right, and a few overlapping,
 * slightly rotated cards. Background blobs drift at different parallax speeds.
 */
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { FloatLayer, Parallax } from "@/components/motion/Motion";
import { HeroCollage } from "@/components/decorations/Illustrations";
import {
  Blob,
  CurlyArrow,
  Leaf,
  Sparkle,
  StarBurst,
  Underline,
} from "@/components/decorations/Doodles";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pb-28 lg:pb-32 lg:pt-36">
      {/* ---- drifting background blobs (parallax) ------------------------- */}
      <FloatLayer
        speed={70}
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[26rem] w-[26rem]"
      >
        <Blob className="h-full w-full animate-drift-slow text-sage/35" />
      </FloatLayer>
      <FloatLayer
        speed={130}
        className="pointer-events-none absolute -right-24 top-48 -z-10 h-[22rem] w-[22rem]"
      >
        <Blob className="h-full w-full animate-drift text-clay/15" />
      </FloatLayer>
      <FloatLayer
        speed={40}
        className="pointer-events-none absolute right-1/3 -top-6 -z-10 h-40 w-40"
      >
        <Blob className="h-full w-full text-beige/60" />
      </FloatLayer>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        {/* ---- copy column (asymmetric, wider) -------------------------- */}
        <div className="relative lg:col-span-7 lg:pr-6">
          {/* headline */}
          <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] text-forest sm:text-6xl lg:text-[4.6rem]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="relative block text-[0.5em] font-medium tracking-wide text-forest-soft"
            >
              Herzlich willkommen im
              <Sparkle className="absolute -right-6 -top-3 hidden h-6 w-6 text-clay sm:block" />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-1 block"
            >
              Montessori Zentrum
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mt-1 inline-block text-clay"
            >
              Magdeburg
              <Underline className="absolute -bottom-3 left-0 h-4 w-full text-sage-dark" />
            </motion.span>
          </h1>

          {/* subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 max-w-xl text-lg leading-relaxed text-forest-soft"
          >
            Einblicke in unser{" "}
            <strong className="font-semibold text-forest">Kinderhaus</strong>, die{" "}
            <strong className="font-semibold text-forest">Freie Schule</strong>{" "}
            und den{" "}
            <strong className="font-semibold text-forest">Diplomkurs</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Button href="#angebote" variant="solid">
              Das Zentrum entdecken
            </Button>

            <span className="relative inline-flex items-center">
              <a
                href="/termine"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-forest underline-offset-4 hover:underline"
              >
                Termine ansehen
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <CurlyArrow className="absolute -right-14 top-2 hidden h-10 w-12 -scale-x-100 text-clay/70 lg:block" />
            </span>
          </motion.div>

          {/* tiny meta chips, slightly rotated for the handmade feel */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {[
              { label: "Kinderhaus", rot: "-rotate-2" },
              { label: "Freie Schule", rot: "rotate-1" },
              { label: "Bildungszentrum", rot: "-rotate-1" },
            ].map((chip) => (
              <span
                key={chip.label}
                className={`rounded-2xl border border-beige bg-cream px-4 py-2 text-sm font-medium text-forest-soft shadow-warm-sm ${chip.rot}`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* ---- illustration column (offset, overlapping) ---------------- */}
        <div className="relative lg:col-span-5">
          <Parallax speed={reduce ? 0 : 28} className="relative">
            {/* organic arch frame behind the art */}
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-x-6 -top-6 bottom-10 -z-10 rounded-t-[48%] rounded-b-[40px] bg-sand-deep" />
              <div className="absolute -left-4 top-16 -z-10 h-64 w-64 blob bg-sage/30" />

              <HeroCollage className="relative z-10 h-auto w-full drop-shadow-[0_30px_50px_rgba(95,74,48,0.18)]" />

              {/* floating leaf accent */}
              <Leaf className="absolute -left-6 top-6 h-12 w-12 animate-sway text-sage-dark" />
              <StarBurst className="absolute right-2 top-2 h-8 w-8 text-clay/80" />
            </div>
          </Parallax>

          {/* overlapping quote card – breaks the boundary on purpose */}
          <motion.figure
            initial={{ opacity: 0, y: 28, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -left-2 z-20 max-w-[16rem] rounded-[26px] border border-beige/70 bg-cream p-5 shadow-warm-lg sm:-left-8 lg:-left-16"
          >
            <blockquote className="font-display text-lg italic leading-snug text-forest">
              „Hilf mir, es selbst zu tun.“
            </blockquote>
            <figcaption className="mt-2 text-sm text-forest-soft">
              — Maria Montessori
            </figcaption>
          </motion.figure>

          {/* small rotated badge */}
          <div className="absolute -right-1 top-2 z-20 hidden rotate-[10deg] rounded-2xl bg-sage-dark px-3.5 py-2 text-center text-cream shadow-warm sm:block">
            <span className="block font-display text-xl font-semibold leading-none">
              0–18
            </span>
            <span className="text-[11px] uppercase tracking-wider">Jahre</span>
          </div>
        </div>
      </div>
    </section>
  );
}
