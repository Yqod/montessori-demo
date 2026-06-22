/**
 * Central navigation model for the Montessori Zentrum Magdeburg site.
 *
 * The structure is recursive so it can describe:
 *   – top-level links (Startseite, Termine …)
 *   – dropdown menus (Kinderhaus, Freie Schule …)
 *   – nested fly-out sub-menus (Verein › Vereinsstruktur › Vorstand …)
 *
 * Only the homepage is built for now, so every deeper route points to a
 * placeholder path. Those pages do not exist yet – the links are intentionally
 * "dead" (they resolve to a route that can be filled in later).
 */

export type NavNode = {
  /** Visible label. */
  label: string;
  /** Target route. Optional for pure grouping labels. */
  href?: string;
  /** Optional short helper line shown inside rich dropdowns. */
  hint?: string;
  /** Nested entries (dropdown or fly-out). */
  children?: NavNode[];
  /** Visually flags the entry (e.g. the "Sale!" item). */
  emphasis?: "sale";
};

export const navigation: NavNode[] = [
  { label: "Startseite", href: "/" },

  {
    label: "Verein",
    href: "/verein",
    children: [
      { label: "Termine", href: "/verein/termine" },
      {
        label: "Vereinsstruktur",
        href: "/verein/struktur",
        // This entry opens a second-level fly-out.
        children: [
          { label: "Mitgliedschaft", href: "/verein/struktur/mitgliedschaft" },
          { label: "Aufsichtsrat", href: "/verein/struktur/aufsichtsrat" },
          { label: "Vorstand", href: "/verein/struktur/vorstand" },
          { label: "Arbeitsgruppen", href: "/verein/struktur/arbeitsgruppen" },
          { label: "Patenschaften", href: "/verein/struktur/patenschaften" },
          { label: "Betriebsrat", href: "/verein/struktur/betriebsrat" },
          {
            label: "Technischer Bereich",
            href: "/verein/struktur/technischer-bereich",
          },
        ],
      },
      { label: "Stellenangebote", href: "/verein/stellenangebote" },
      { label: "Projekte", href: "/verein/projekte" },
    ],
  },

  {
    label: "Kinderhaus",
    href: "/kinderhaus",
    children: [
      { label: "Termine", href: "/kinderhaus/termine" },
      { label: "Anmeldung", href: "/kinderhaus/anmeldung" },
      { label: "Konzept", href: "/kinderhaus/konzept" },
      { label: "Alltag", href: "/kinderhaus/alltag" },
      { label: "Projekte", href: "/kinderhaus/projekte" },
      { label: "Team", href: "/kinderhaus/team" },
      { label: "Eltern", href: "/kinderhaus/eltern" },
    ],
  },

  {
    label: "Freie Schule",
    href: "/freie-schule",
    children: [
      { label: "Termine", href: "/freie-schule/termine" },
      { label: "Anmeldung", href: "/freie-schule/anmeldung" },
      { label: "FAQs", href: "/freie-schule/faqs" },
      { label: "Konzept und Alltag", href: "/freie-schule/konzept-alltag" },
      { label: "Angebote", href: "/freie-schule/angebote" },
      { label: "Team", href: "/freie-schule/team" },
      { label: "Eltern", href: "/freie-schule/eltern" },
    ],
  },

  {
    label: "Montessori-Bildungszentrum",
    href: "/bildungszentrum",
    children: [
      { label: "Diplomkurs", href: "/bildungszentrum/diplomkurs" },
      {
        label: "Weiterbildungen und Kurse",
        href: "/bildungszentrum/weiterbildungen",
      },
      { label: "Montessori-Tag", href: "/bildungszentrum/montessori-tag" },
    ],
  },

  {
    label: "Marketplace",
    href: "/marketplace",
    children: [
      { label: "T-Shirts", href: "/marketplace/t-shirts" },
      { label: "Longsleeves", href: "/marketplace/longsleeves" },
      { label: "Hoodies", href: "/marketplace/hoodies" },
      { label: "Das kleine Etwas", href: "/marketplace/das-kleine-etwas" },
      { label: "Sale!", href: "/marketplace/sale", emphasis: "sale" },
    ],
  },

  { label: "Termine", href: "/termine" },
  { label: "Downloads", href: "/downloads" },
  { label: "Kontakte", href: "/kontakte" },
];

/** Social + utility links surfaced in the navbar and footer. */
export const socialLinks = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};
