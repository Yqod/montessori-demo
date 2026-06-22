"use client";

/**
 * Navbar – sticky top navigation.
 *
 * • Transparent over the hero, then gently tints to a frosted cream band once
 *   the page is scrolled (subtle, not abrupt).
 * • Desktop dropdowns on ≥ xl, burger menu below.
 * • Search overlay, Facebook & Instagram links.
 */
import { useEffect, useState } from "react";
import { socialLinks } from "@/lib/navigation";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import {
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/ui/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-beige/60 bg-sand/85 shadow-warm-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Logo />

          {/* Desktop navigation */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden xl:block"
          >
            <DesktopNav />
          </nav>

          {/* Action cluster */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Suche öffnen"
              className="grid h-10 w-10 place-items-center rounded-full text-forest/80 transition-colors hover:bg-cream hover:text-forest"
            >
              <SearchIcon />
            </button>

            <span className="mx-1 hidden h-6 w-px bg-beige sm:block" aria-hidden />

            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hidden h-10 w-10 place-items-center rounded-full text-forest/80 transition-colors hover:bg-cream hover:text-sage-deep sm:grid"
            >
              <FacebookIcon />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 place-items-center rounded-full text-forest/80 transition-colors hover:bg-cream hover:text-clay sm:grid"
            >
              <InstagramIcon />
            </a>

            {/* Burger (below xl) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
              className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-forest text-cream shadow-warm-sm transition-transform hover:scale-105 xl:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
