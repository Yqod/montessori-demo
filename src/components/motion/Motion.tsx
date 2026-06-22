"use client";

/**
 * Motion helpers built on Framer Motion (the `motion` package).
 *
 * They centralise our scroll-in animations and parallax so individual sections
 * stay declarative. Everything respects `prefers-reduced-motion` automatically
 * because Framer Motion reads the user setting and we keep transforms subtle.
 */
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

/* ---- Reveal: fade + slide in once, when scrolled into view --------------- */

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const from = reduce ? {} : offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/* ---- Stagger: a parent that reveals its <Reveal> children in sequence ---- */

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.12 }}
      // amount kept for API symmetry with future tuning
      data-stagger-amount={amount}
    >
      {children}
    </motion.div>
  );
}

/* ---- Parallax: translate an element on scroll at a custom speed ---------- */

export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  /** Positive moves up as you scroll down; larger = stronger. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---- FloatLayer: an absolutely-positioned blob that drifts on scroll ----- */

export function FloatLayer({
  children,
  speed = 80,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, -speed]);

  return (
    <motion.div
      aria-hidden
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
