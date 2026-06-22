/**
 * Doodles – a small kit of hand-drawn SVG accents.
 *
 * These are deliberately slightly irregular (wobbly paths, open strokes) so the
 * page reads as "drawn by hand" rather than vector-perfect. They are pure,
 * presentational SVG and inherit `currentColor` unless a colour is passed, so
 * they can be tinted with Tailwind text-* utilities.
 *
 * Everything here is decorative → `aria-hidden` and `focusable={false}`.
 */
import type { SVGProps } from "react";

type Doodle = SVGProps<SVGSVGElement>;

const base = (extra?: string) => ({
  "aria-hidden": true,
  focusable: false as const,
  className: extra,
});

/** A loose, hand-inked underline. Great under a single emphasised word. */
export function Underline({ className, ...props }: Doodle) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      {...base(className)}
      {...props}
    >
      <path
        d="M3 11.5C45 5.5 120 3.5 168 6.5c24 1.5 48 4 69 1.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M14 15.5c40-2.4 132-3.2 196-1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/** A scribbled circle, the kind you draw around something important. */
export function CircleScribble({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 220 120" fill="none" {...base(className)} {...props}>
      <path
        d="M150 9C95 1 38 11 19 38c-19 27-6 58 38 70 49 13 116 7 145-21 22-21 16-50-18-66C160 9 120 6 96 9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A single sprouting leaf – the recurring "growth" motif. */
export function Leaf({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...base(className)} {...props}>
      <path
        d="M10 54C10 30 28 12 56 10c2 26-14 46-46 44Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M16 48C26 36 38 26 50 20"
        stroke="var(--color-cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/** Two little leaves on a stem, used as a tiny growth flourish. */
export function Sprout({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 48 64" fill="none" {...base(className)} {...props}>
      <path
        d="M24 62V26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 34C18 30 9 31 5 24c8-4 17-2 19 6Z"
        fill="currentColor"
      />
      <path
        d="M24 28c5-5 14-5 18-13-8-3-17 1-18 9Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
    </svg>
  );
}

/** A gentle wave used as a section divider. Stretches to any width. */
export function WaveDivider({
  className,
  flip = false,
  ...props
}: Doodle & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      preserveAspectRatio="none"
      {...base(className)}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...props}
    >
      <path
        d="M0 64c160 48 320 56 540 22 220-34 380-58 600-22 140 23 220 30 300 18v140H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Three little orbiting dots / sparkle accent. */
export function Sparkle({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...base(className)} {...props}>
      <path
        d="M20 2c1.6 9.4 8.6 16.4 18 18-9.4 1.6-16.4 8.6-18 18-1.6-9.4-8.6-16.4-18-18C11.4 18.4 18.4 11.4 20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A hand-drawn looping arrow – nudges the eye toward a CTA. */
export function CurlyArrow({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 120 90" fill="none" {...base(className)} {...props}>
      <path
        d="M8 12c14 40 44 60 84 56-14-6-25-10-34-9 12-9 22-12 36-11"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M94 59c5-3 10-5 16-5-6 6-10 12-12 19"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A dashed, meandering path – the Montessori "own way" idea. */
export function DottedPath({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 320 80" fill="none" {...base(className)} {...props}>
      <path
        d="M4 60C60 12 110 12 160 44s100 28 156-28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 14"
      />
    </svg>
  );
}

/** A soft, irregular blob. Used for warm background shapes. */
export function Blob({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 200 200" {...base(className)} {...props}>
      <path
        fill="currentColor"
        d="M48.5 -64.1C61.9 -53.7 71.2 -38.6 74.8 -22.4C78.4 -6.2 76.3 11.1 69 25.6C61.7 40.1 49.2 51.8 34.8 60.2C20.4 68.6 4.1 73.7 -12.9 73.8C-29.9 73.9 -47.6 69 -60.1 57.8C-72.6 46.6 -79.9 29.1 -81.4 11.1C-82.9 -6.9 -78.6 -25.4 -68.2 -39.5C-57.8 -53.6 -41.3 -63.3 -25.3 -72.6C-9.3 -81.9 6.2 -90.8 20.6 -88.1C35 -85.4 35.1 -74.5 48.5 -64.1Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** A thin hand-drawn line with a small heart in the middle. */
export function HeartLine({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 120 24" fill="none" {...base(className)} {...props}>
      <path
        d="M4 14c14-4 30-4 44 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M72 14c14 4 30 4 44 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 19c-5-4-10-7-10-12 0-3 2-5 5-5 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 2 5 5 0 5-5 8-10 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A little hand-drawn star burst used near playful copy. */
export function StarBurst({ className, ...props }: Doodle) {
  return (
    <svg viewBox="0 0 60 60" fill="none" {...base(className)} {...props}>
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M30 6v12" />
        <path d="M30 42v12" />
        <path d="M6 30h12" />
        <path d="M42 30h12" />
        <path d="M13 13l8 8" />
        <path d="M39 39l8 8" />
        <path d="M47 13l-8 8" />
        <path d="M21 39l-8 8" />
      </g>
    </svg>
  );
}
