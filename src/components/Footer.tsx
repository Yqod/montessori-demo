import Link from "next/link";
import { socialLinks } from "@/lib/navigation";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "@/components/ui/Icons";
import { Sprout, WaveDivider } from "@/components/decorations/Doodles";

/**
 * Footer – deep forest band with a wavy top edge.
 *
 * Holds the brand blurb, three navigation columns, a contact block, the legal
 * links (Impressum / Datenschutz / Barrierefreiheit) and a back-to-top button.
 */
const columns: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Bereiche",
      links: [
        { label: "Montessori Kinderhaus", href: "/kinderhaus" },
        { label: "Freie Schule", href: "/freie-schule" },
        { label: "Bildungszentrum", href: "/bildungszentrum" },
        { label: "Verein", href: "/verein" },
        { label: "Marketplace", href: "/marketplace" },
      ],
    },
    {
      heading: "Service",
      links: [
        { label: "Termine", href: "/termine" },
        { label: "Downloads", href: "/downloads" },
        { label: "Internum", href: "/internum" },
        { label: "Stellenangebote", href: "/verein/stellenangebote" },
        { label: "Kontakte", href: "/kontakte" },
      ],
    },
  ];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-10 bg-forest text-sand">
      {/* wavy top edge rising from the sand section above */}
      <WaveDivider
        flip
        className="absolute inset-x-0 -top-px h-[60px] w-full text-forest"
        aria-hidden
      />

      <div className="mx-auto max-w-[1300px] px-5 pb-10 pt-24 lg:px-8 lg:pt-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-dark">
                <Sprout className="h-6 w-6 text-cream" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold text-cream">
                  Montessori Zentrum
                </span>
                <span className="block text-xs uppercase tracking-[0.28em] text-clay">
                  Magdeburg
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm leading-relaxed text-sand/70">
              Kinderhaus, Freie Schule und Bildungszentrum unter einem Dach –
              getragen vom Elternverein „Initiative zur Förderung aktiver und
              freier Pädagogik“ e.&nbsp;V.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-sage hover:text-forest"
              >
                <FacebookIcon />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-clay hover:text-cream"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-sage">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sand/75 transition-colors hover:text-clay"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* contact */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-sage">
              Kontakt
            </h2>
            <address className="mt-5 space-y-3 not-italic text-sand/75">
              <p>
                Montessori Zentrum Magdeburg
                <br />
                Musterstraße 1
                <br />
                39104 Magdeburg
              </p>
              <p>
                <a
                  href="tel:+493910000000"
                  className="inline-flex items-center gap-2 transition-colors hover:text-clay"
                >
                  <PhoneIcon className="h-4 w-4" />
                  0391 000 00 00
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@montessori-magdeburg.example"
                  className="transition-colors hover:text-clay"
                >
                  info@montessori-magdeburg.example
                </a>
              </p>
            </address>

            <p className="mt-6 font-display text-lg italic text-sand/90">
              „Hilf mir, es selbst zu tun.“
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-start gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-sand/60">
            © {year} Montessori Zentrum Magdeburg · Mit{" "}
            <span className="text-clay">♥</span> in Magdeburg gestaltet.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/impressum" className="text-sand/70 transition-colors hover:text-clay">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sand/70 transition-colors hover:text-clay">
              Datenschutz
            </Link>
            <Link
              href="/barrierefreiheit"
              className="text-sand/70 transition-colors hover:text-clay"
            >
              Barrierefreiheit
            </Link>
          </div>

          <ScrollTopButton />
        </div>
      </div>
    </footer>
  );
}
