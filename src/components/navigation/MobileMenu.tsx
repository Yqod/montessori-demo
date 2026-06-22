"use client";

/**
 * MobileMenu – a full-height slide-in panel for < xl screens.
 *
 * Nested entries become expandable accordions (recursively), so the whole
 * navigation tree – including Verein › Vereinsstruktur › … – is reachable on
 * touch devices. Body scroll is locked while open.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navigation, socialLinks, type NavNode } from "@/lib/navigation";
import {
  ChevronDown,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/Icons";
import { Sprout, Underline } from "@/components/decorations/Doodles";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-forest/35 backdrop-blur-[2px] xl:hidden"
          />

          {/* panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,420px)] flex-col bg-sand shadow-warm-lg xl:hidden"
            aria-label="Hauptmenü"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-beige/70 px-6 py-5">
              <span className="font-display text-lg text-forest">
                Menü
                <Underline className="mt-0.5 h-2 w-16 text-clay" />
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Menü schließen"
                className="grid h-10 w-10 place-items-center rounded-full bg-cream text-forest shadow-warm-sm transition-colors hover:bg-beige"
              >
                <CloseIcon />
              </button>
            </div>

            {/* scrollable nav tree */}
            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <MobileNode key={item.label} node={item} onNavigate={onClose} />
                ))}
              </ul>
            </nav>

            {/* footer with socials */}
            <div className="flex items-center gap-3 border-t border-beige/70 px-6 py-5">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream text-forest shadow-warm-sm transition-colors hover:bg-sage hover:text-cream"
              >
                <FacebookIcon />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream text-forest shadow-warm-sm transition-colors hover:bg-sage hover:text-cream"
              >
                <InstagramIcon />
              </a>
              <span className="ml-auto font-display text-sm italic text-forest-soft">
                Hilf mir, es selbst zu tun.
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------------------------- recursive accordion - */

function MobileNode({
  node,
  depth = 0,
  onNavigate,
}: {
  node: NavNode;
  depth?: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!node.children?.length;
  const isSale = node.emphasis === "sale";

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={node.href ?? "#"}
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
            isSale
              ? "font-semibold text-clay"
              : "text-forest/85 hover:bg-cream"
          } ${depth > 0 ? "pl-4 text-[14.5px]" : "font-medium"}`}
        >
          {depth > 0 && (
            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
          )}
          {node.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-stretch">
        {/* The group label still links to its overview page. */}
        <Link
          href={node.href ?? "#"}
          onClick={onNavigate}
          className={`flex-1 rounded-xl px-3 py-2.5 text-[15px] transition-colors hover:bg-cream ${
            depth === 0
              ? "font-display text-[17px] font-medium text-forest"
              : "pl-4 text-forest/85"
          }`}
        >
          {node.label}
        </Link>
        <button
          type="button"
          aria-label={`${node.label} ${expanded ? "einklappen" : "ausklappen"}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="grid w-11 place-items-center rounded-xl text-forest/70 transition-colors hover:bg-cream"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180 text-clay" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <li className="ml-3 mt-1 flex items-center gap-2 border-l-2 border-beige pl-3">
              <Sprout className="h-3.5 w-3.5 text-sage-dark" />
              <span className="font-display text-xs italic text-forest-soft">
                {node.label}
              </span>
            </li>
            <div className="ml-3 border-l-2 border-beige pl-1.5">
              {node.children!.map((child) => (
                <MobileNode
                  key={child.label}
                  node={child}
                  depth={depth + 1}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
