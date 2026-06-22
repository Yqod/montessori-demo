"use client";

/**
 * DesktopNav – the horizontal menu for ≥ xl screens.
 *
 * Supports three depths:
 *   level 0  top-level links (hover / click to open)
 *   level 1  dropdown panel
 *   level 2  fly-out sub-menu (Verein › Vereinsstruktur › …)
 *
 * Open state is tracked explicitly so it works with hover, click and keyboard
 * (Escape closes, outside-click closes, arrow-less but fully focusable).
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navigation, type NavNode } from "@/lib/navigation";
import { ChevronDown, ChevronRight } from "@/components/ui/Icons";
import { Leaf, Sprout } from "@/components/decorations/Doodles";

export function DesktopNav() {
  const [openTop, setOpenTop] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Close on outside click + Escape.
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenTop(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenTop(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <ul ref={navRef} className="flex items-center gap-0.5">
      {navigation.map((item) => (
        <TopItem
          key={item.label}
          item={item}
          open={openTop === item.label}
          onOpen={() => setOpenTop(item.label)}
          onClose={() => setOpenTop(null)}
          onToggle={() =>
            setOpenTop((cur) => (cur === item.label ? null : item.label))
          }
        />
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- TopItem -- */

function TopItem({
  item,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const hasChildren = !!item.children?.length;

  // Plain link, no dropdown.
  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href ?? "#"}
          className="relative inline-flex items-center rounded-full px-3.5 py-2 text-[15px] font-medium text-forest/85 transition-colors hover:text-forest"
        >
          <span className="relative">
            {item.label}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-clay transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
          open ? "text-forest" : "text-forest/85 hover:text-forest"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180 text-clay" : "text-forest/55"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-[calc(100%+10px)] z-50"
          >
            <DropdownPanel item={item} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ---------------------------------------------------------- DropdownPanel -- */

function DropdownPanel({ item }: { item: NavNode }) {
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <div className="relative min-w-[244px] rounded-[26px] border border-beige/70 bg-cream p-2.5 shadow-warm-lg">
      {/* little decorative leaf peeking from the corner */}
      <Leaf className="pointer-events-none absolute -right-2 -top-3 h-6 w-6 -rotate-12 text-sage/70" />

      {/* a soft header strip with the section name */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-1">
        <Sprout className="h-4 w-4 text-sage-dark" />
        <span className="font-display text-sm italic text-forest-soft">
          {item.label}
        </span>
      </div>

      <ul className="space-y-0.5">
        {item.children!.map((child) => {
          const nested = !!child.children?.length;
          if (!nested) {
            return (
              <li key={child.label}>
                <NavLink node={child} />
              </li>
            );
          }
          // Entry with its own fly-out (e.g. Vereinsstruktur).
          return (
            <li
              key={child.label}
              className="relative"
              onMouseEnter={() => setOpenSub(child.label)}
              onMouseLeave={() => setOpenSub(null)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openSub === child.label}
                onClick={() =>
                  setOpenSub((c) => (c === child.label ? null : child.label))
                }
                className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left text-[15px] transition-colors ${
                  openSub === child.label
                    ? "bg-sand text-forest"
                    : "text-forest/80 hover:bg-sand hover:text-forest"
                }`}
              >
                {child.label}
                <ChevronRight className="h-4 w-4 text-clay" />
              </button>

              <AnimatePresence>
                {openSub === child.label && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-[calc(100%+8px)] top-[-6px] z-50 min-w-[232px] rounded-[24px] border border-beige/70 bg-cream p-2.5 shadow-warm-lg"
                  >
                    <p className="px-3 pb-1.5 pt-1 font-display text-xs uppercase tracking-[0.14em] text-forest-soft/70">
                      {child.label}
                    </p>
                    <ul className="space-y-0.5">
                      {child.children!.map((leaf) => (
                        <li key={leaf.label}>
                          <NavLink node={leaf} />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------------- NavLink - */

function NavLink({ node }: { node: NavNode }) {
  const isSale = node.emphasis === "sale";
  return (
    <Link
      href={node.href ?? "#"}
      className={`group flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-[15px] transition-colors ${
        isSale
          ? "font-semibold text-clay hover:bg-clay hover:text-cream"
          : "text-forest/80 hover:bg-sand hover:text-forest"
      }`}
    >
      <span className="flex items-center gap-2">
        {isSale && (
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay group-hover:bg-cream" />
        )}
        {node.label}
      </span>
      <span className="translate-x-1 text-clay opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
