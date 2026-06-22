/**
 * Illustrations – bespoke, semi-abstract SVG scenes drawn specifically for
 * this site in the brand palette. They replace the usual interchangeable
 * undraw/Lottie art so the page keeps its own handmade character.
 *
 * Colours are pulled from CSS custom properties (the Tailwind theme) so the
 * art always stays in sync with the palette.
 */
import type { SVGProps } from "react";

const C = {
  sand: "var(--color-sand)",
  sandDeep: "var(--color-sand-deep)",
  beige: "var(--color-beige)",
  sage: "var(--color-sage)",
  sageDark: "var(--color-sage-dark)",
  sageDeep: "var(--color-sage-deep)",
  clay: "var(--color-clay)",
  forest: "var(--color-forest)",
  cream: "var(--color-cream)",
};

type Props = SVGProps<SVGSVGElement> & { title?: string };

/* -------------------------------------------------------------------------
   Hero collage – an arch "window onto growing up": a warm sun-arch, a child
   reading under a tree, building blocks and floating leaves. Asymmetric on
   purpose; meant to bleed past its container.
   ------------------------------------------------------------------------- */
export function HeroCollage({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 520 560"
      role="img"
      aria-label={title ?? "Kind liest unter einem Baum im Montessori Zentrum"}
      {...props}
    >
      {/* warm arch backdrop */}
      <path
        d="M60 300C60 170 150 70 260 70s200 100 200 230v230H60V300Z"
        fill={C.beige}
      />
      <path
        d="M96 305C96 196 168 112 260 112s164 84 164 193v225H96V305Z"
        fill={C.sand}
      />

      {/* sun */}
      <circle cx="260" cy="190" r="58" fill={C.clay} opacity="0.92" />
      <g stroke={C.clay} strokeWidth="7" strokeLinecap="round" opacity="0.55">
        <path d="M260 96v-26" />
        <path d="M338 132l18-18" />
        <path d="M182 132l-18-18" />
        <path d="M356 210h26" />
        <path d="M138 210h-26" />
      </g>

      {/* tree canopy */}
      <path
        d="M150 360c-34-6-58-34-52-66 5-27 33-44 62-38 4-30 32-52 64-48 30 4 52 30 50 58 26 6 44 32 38 60-6 30-37 49-70 44-2 0-90-8-92-10Z"
        fill={C.sage}
      />
      <path
        d="M168 348c-22-4-36-22-32-42"
        stroke={C.cream}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
      />
      {/* trunk */}
      <path d="M196 360c4 40 2 80-6 118h26c-4-40-4-80 2-118h-22Z" fill={C.clay} />

      {/* child reading, simple rounded figure */}
      <g>
        <path
          d="M286 470c0-40 30-70 70-70s66 30 66 70v18h-136v-18Z"
          fill={C.sageDeep}
        />
        <circle cx="356" cy="392" r="34" fill={C.clay} />
        <path
          d="M324 388c0-20 16-34 34-34 16 0 30 10 33 26-12-4-24-2-33 6-10 8-22 10-34 2Z"
          fill={C.forest}
        />
        {/* open book */}
        <path
          d="M300 470c18-14 40-14 56 0 16-14 38-14 56 0-18-10-38-8-56 4-18-12-38-14-56-4Z"
          fill={C.cream}
        />
        <path d="M356 474v-12" stroke={C.beige} strokeWidth="4" />
      </g>

      {/* building blocks bottom-left */}
      <g>
        <rect x="96" y="452" width="58" height="46" rx="10" fill={C.clay} />
        <rect x="104" y="408" width="42" height="44" rx="9" fill={C.sageDark} />
        <rect x="150" y="466" width="46" height="32" rx="8" fill={C.beige} />
        <circle cx="125" cy="430" r="9" fill={C.cream} />
      </g>

      {/* floating leaves */}
      <path
        d="M404 150c14-10 32-8 44 4-14 8-32 8-44-4Z"
        fill={C.sageDark}
        opacity="0.85"
      />
      <path
        d="M120 168c-12-8-28-6-38 4 12 7 28 7 38-4Z"
        fill={C.sage}
        opacity="0.85"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Kinderhaus – a cosy little house with a heart window and a small plant.
   ------------------------------------------------------------------------- */
export function KinderhausScene({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={title ?? "Montessori Kinderhaus"}
      {...props}
    >
      <ellipse cx="100" cy="168" rx="74" ry="14" fill={C.sage} opacity="0.35" />
      {/* body */}
      <path d="M52 96l48-40 48 40v74H52V96Z" fill={C.cream} />
      {/* roof */}
      <path d="M40 100L100 50l60 50-10 12-50-40-50 40-10-12Z" fill={C.clay} />
      {/* heart window */}
      <path
        d="M100 108c-7-9-22-6-22 6 0 9 12 16 22 24 10-8 22-15 22-24 0-12-15-15-22-6Z"
        fill={C.sageDark}
      />
      {/* door */}
      <path d="M86 170v-26c0-8 6-14 14-14s14 6 14 14v26H86Z" fill={C.sageDeep} />
      <circle cx="108" cy="152" r="2.6" fill={C.cream} />
      {/* little plant */}
      <path d="M146 170v-20" stroke={C.sageDeep} strokeWidth="4" strokeLinecap="round" />
      <path d="M146 156c8-2 14-8 14-16-8 0-14 6-14 16Z" fill={C.sage} />
      <path d="M146 162c-7-1-12-6-12-12 7 0 12 5 12 12Z" fill={C.sageDark} />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Freie Schule – an open book with a sprout growing from its pages.
   ------------------------------------------------------------------------- */
export function FreieSchuleScene({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={title ?? "Freie Schule"}
      {...props}
    >
      <ellipse cx="100" cy="170" rx="76" ry="14" fill={C.sage} opacity="0.35" />
      {/* sprout */}
      <path d="M100 120V70" stroke={C.sageDeep} strokeWidth="5" strokeLinecap="round" />
      <path d="M100 92c-12-4-26-2-32-16 14-6 30 0 32 16Z" fill={C.sage} />
      <path d="M100 80c10-8 26-8 32-22-14-6-30 2-32 22Z" fill={C.sageDark} />
      <circle cx="100" cy="66" r="6" fill={C.clay} />
      {/* book */}
      <path d="M100 132c-20-16-44-16-64-6v40c20-10 44-10 64 6V132Z" fill={C.cream} />
      <path d="M100 132c20-16 44-16 64-6v40c-20-10-44-10-64 6V132Z" fill={C.sand} />
      <path d="M100 132v40" stroke={C.beige} strokeWidth="5" />
      <path
        d="M52 140c12-5 26-5 38 1M148 140c-12-5-26-5-38 1"
        stroke={C.beige}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Bildungszentrum – the iconic Montessori "pink tower" of stacked cubes
   abstracted into a learning/qualification motif, topped with a star.
   ------------------------------------------------------------------------- */
export function BildungszentrumScene({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={title ?? "Montessori-Bildungszentrum"}
      {...props}
    >
      <ellipse cx="100" cy="172" rx="74" ry="14" fill={C.sage} opacity="0.35" />
      {/* stacked cubes / tower of competence */}
      <rect x="58" y="138" width="84" height="30" rx="8" fill={C.clay} />
      <rect x="68" y="110" width="64" height="28" rx="8" fill={C.sageDark} />
      <rect x="78" y="84" width="44" height="26" rx="7" fill={C.beige} />
      <rect x="88" y="60" width="24" height="24" rx="6" fill={C.sage} />
      {/* star on top */}
      <path
        d="M100 30c2.6 9 6 12.4 15 15-9 2.6-12.4 6-15 15-2.6-9-6-12.4-15-15 9-2.6 12.4-6 15-15Z"
        fill={C.clay}
      />
      {/* sparkle */}
      <circle cx="142" cy="74" r="4" fill={C.sageDeep} />
    </svg>
  );
}
