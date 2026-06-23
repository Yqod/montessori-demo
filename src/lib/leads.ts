/**
 * Demo-Datenmodell für die Interessent:innen-Verwaltung.
 *
 * Dieses Modul ist bewusst frei von React/Browser-APIs, damit es sowohl im
 * öffentlichen Interesseformular als auch im internen Backend genutzt werden
 * kann. Die eigentliche Persistenz (localStorage) liegt in `useLeads.ts`.
 *
 * Es bildet einen typischen Erstkontakt-Workflow eines freien Trägers ab:
 * Eltern bzw. Interessierte hinterlassen über das Formular ihre Daten, das
 * Team ordnet sie anschließend per Ampelsystem und hält Notizen fest.
 */

/* ========================================================================
   Angebote – die drei Bereiche, für die man sich melden kann
   ======================================================================== */

export const PROGRAM_ORDER = [
  "kinderhaus",
  "freie-schule",
  "paedagogik",
] as const;

export type Program = (typeof PROGRAM_ORDER)[number];

export type ProgramMeta = {
  /** Voller Name des Angebots. */
  label: string;
  /** Kurzform für enge Badges. */
  short: string;
  /** Erläuternde Zeile im Formular. */
  tagline: string;
  /** Markenakzent (Hex) – wird per Inline-Style gesetzt. */
  accent: string;
  /** Sehr helle Tönung für Flächen (Hex). */
  soft: string;
  /** Betrifft das Angebot Kinder (→ Kind-Felder im Formular)? */
  forChild: boolean;
};

export const PROGRAMS: Record<Program, ProgramMeta> = {
  kinderhaus: {
    label: "Montessori Kinderhaus",
    short: "Kinderhaus",
    tagline: "Krippe & Kita · 1–6 Jahre",
    accent: "#8aa17e",
    soft: "#e8efe1",
    forChild: true,
  },
  "freie-schule": {
    label: "Freie Schule",
    short: "Freie Schule",
    tagline: "Klasse 1–10 · ohne Notendruck",
    accent: "#c98a6b",
    soft: "#f4e7dd",
    forChild: true,
  },
  paedagogik: {
    label: "Montessori-Pädagogik",
    short: "Pädagogik",
    tagline: "Diplomkurs & Weiterbildungen für Erwachsene",
    accent: "#6e8765",
    soft: "#e3ebde",
    forChild: false,
  },
};

/* ========================================================================
   Ampelsystem – Bearbeitungsstatus eines Eintrags
   ======================================================================== */

export const STATUS_ORDER = [
  "neu",
  "kontaktiert",
  "termin",
  "abgesagt",
] as const;

export type LeadStatus = (typeof STATUS_ORDER)[number];

export type StatusMeta = {
  /** Kurzes Label für Badges. */
  label: string;
  /** Spaltentitel im Board. */
  column: string;
  /** Handlungshinweis fürs Team. */
  hint: string;
  /** Ampelfarbe (Hex). */
  color: string;
  /** Helle Tönung der Ampelfarbe (Hex). */
  soft: string;
  /** Gut lesbarer Text auf der hellen Tönung (Hex). */
  ink: string;
};

export const STATUSES: Record<LeadStatus, StatusMeta> = {
  neu: {
    label: "Offen",
    column: "Bitte anrufen",
    hint: "Noch nicht kontaktiert",
    color: "#d0584c",
    soft: "#f8e3df",
    ink: "#8f3329",
  },
  kontaktiert: {
    label: "In Kontakt",
    column: "Rückruf / wartet",
    hint: "Schon kontaktiert – am Ball bleiben",
    color: "#e0a52e",
    soft: "#f8edd1",
    ink: "#8a6212",
  },
  termin: {
    label: "Termin steht",
    column: "Erledigt",
    hint: "Hospitation oder Termin vereinbart",
    color: "#5f9b6b",
    soft: "#e1eedd",
    ink: "#3c6b46",
  },
  abgesagt: {
    label: "Abgesagt",
    column: "Kein Interesse",
    hint: "Abgeschlossen – kein weiterer Kontakt",
    color: "#9a9488",
    soft: "#eae6df",
    ink: "#5f5a51",
  },
};

/* ========================================================================
   Datentypen
   ======================================================================== */

export type LeadNote = {
  id: string;
  text: string;
  /** ISO-Zeitstempel. */
  createdAt: string;
  /** Wer die Notiz hinterlassen hat. */
  author: string;
};

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: Program;
  /** Nur bei kinderhaus / freie-schule relevant. */
  childName?: string;
  childBirthYear?: number;
  /** Wunschstart, z. B. „August 2026“. */
  preferredStart?: string;
  message?: string;
  status: LeadStatus;
  /** ISO-Zeitstempel des Eingangs. */
  createdAt: string;
  /** ISO-Zeitstempel des letzten Kontakts oder null. */
  lastContactedAt: string | null;
  notes: LeadNote[];
};

/** Eingabe aus dem Interesseformular (ohne verwaltete Felder). */
export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: Program;
  childName?: string;
  childBirthYear?: number;
  preferredStart?: string;
  message?: string;
};

/* ========================================================================
   Hilfsfunktionen
   ======================================================================== */

/** Kollisionsarme ID – nutzt `crypto.randomUUID`, fällt sonst zurück. */
export function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

/** Baut aus einer Formulareingabe einen vollständigen, neuen Lead. */
export function makeLead(input: LeadInput): Lead {
  return {
    id: createId(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    program: input.program,
    childName: input.childName?.trim() || undefined,
    childBirthYear: input.childBirthYear,
    preferredStart: input.preferredStart?.trim() || undefined,
    message: input.message?.trim() || undefined,
    status: "neu",
    createdAt: new Date().toISOString(),
    lastContactedAt: null,
    notes: [],
  };
}

export function fullName(lead: Pick<Lead, "firstName" | "lastName">): string {
  return `${lead.firstName} ${lead.lastName}`.trim();
}

export function initials(lead: Pick<Lead, "firstName" | "lastName">): string {
  const a = lead.firstName.charAt(0);
  const b = lead.lastName.charAt(0);
  return `${a}${b}`.toUpperCase() || "?";
}

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}

/** Ganze Tage seit dem Zeitstempel (0 = heute). */
export function daysSince(iso: string): number {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  return Math.max(0, Math.floor(diff / 86_400_000));
}

/** Menschlich lesbarer Abstand, z. B. „heute“, „vor 3 Tagen“. */
export function relativeDays(iso: string): string {
  const d = daysSince(iso);
  if (d <= 0) return "heute";
  if (d === 1) return "gestern";
  if (d < 7) return `vor ${d} Tagen`;
  if (d < 14) return "vor 1 Woche";
  if (d < 31) return `vor ${Math.floor(d / 7)} Wochen`;
  return `vor ${Math.floor(d / 30)} Monaten`;
}

/* ========================================================================
   Statistik
   ======================================================================== */

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byProgram: Record<Program, number>;
  /** In den letzten 7 Tagen eingegangen. */
  thisWeek: number;
};

export function computeStats(leads: Lead[]): LeadStats {
  const byStatus = {
    neu: 0,
    kontaktiert: 0,
    termin: 0,
    abgesagt: 0,
  } as Record<LeadStatus, number>;
  const byProgram = {
    kinderhaus: 0,
    "freie-schule": 0,
    paedagogik: 0,
  } as Record<Program, number>;
  let thisWeek = 0;

  for (const lead of leads) {
    byStatus[lead.status] += 1;
    byProgram[lead.program] += 1;
    if (daysSince(lead.createdAt) < 7) thisWeek += 1;
  }

  return { total: leads.length, byStatus, byProgram, thisWeek };
}

/* ========================================================================
   Dummy-Daten
   ======================================================================== */

/** ISO-Zeitstempel vor `n` Tagen (optional Stunde des Tages). */
function daysAgo(n: number, hour = 10): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, Math.floor(Math.random() * 50), 0, 0);
  return d.toISOString();
}

/**
 * Realistischer Demo-Bestand: gemischte Angebote, Status und Notizen.
 * Wird beim ersten Laden des Backends als Startbestand gesetzt.
 */
export const seedLeads: Lead[] = [
  {
    id: "seed-anna-bergmann",
    firstName: "Anna",
    lastName: "Bergmann",
    email: "anna.bergmann@example.de",
    phone: "0151 2345678",
    program: "kinderhaus",
    childName: "Mila",
    childBirthYear: 2023,
    preferredStart: "August 2026",
    message:
      "Wir wünschen uns für Mila einen sanften Einstieg in einer altersgemischten Gruppe.",
    status: "neu",
    createdAt: daysAgo(1, 9),
    lastContactedAt: null,
    notes: [],
  },
  {
    id: "seed-familie-koch",
    firstName: "Tobias",
    lastName: "Koch",
    email: "t.koch@example.de",
    phone: "0170 9988776",
    program: "kinderhaus",
    childName: "Jonas",
    childBirthYear: 2022,
    preferredStart: "ab sofort",
    message: "Berufsbedingter Umzug nach Magdeburg, suchen kurzfristig Platz.",
    status: "neu",
    createdAt: daysAgo(2, 14),
    lastContactedAt: null,
    notes: [],
  },
  {
    id: "seed-sophie-winkler",
    firstName: "Sophie",
    lastName: "Winkler",
    email: "sophie.winkler@example.de",
    phone: "0160 1122334",
    program: "freie-schule",
    childName: "Emilia",
    childBirthYear: 2019,
    preferredStart: "Schuljahr 2026/27",
    message: "Emilia kommt nächstes Jahr in die 1. Klasse.",
    status: "neu",
    createdAt: daysAgo(4, 16),
    lastContactedAt: null,
    notes: [
      {
        id: "n-sw-1",
        text: "Über das Sommerfest auf uns aufmerksam geworden.",
        createdAt: daysAgo(4, 16),
        author: "Formular",
      },
    ],
  },
  {
    id: "seed-marco-lehmann",
    firstName: "Marco",
    lastName: "Lehmann",
    email: "marco.lehmann@example.de",
    phone: "0151 7766554",
    program: "freie-schule",
    childName: "Theo",
    childBirthYear: 2016,
    preferredStart: "Schuljahr 2026/27",
    message: "Theo soll von einer Regelschule zur 5. Klasse wechseln.",
    status: "kontaktiert",
    createdAt: daysAgo(9, 11),
    lastContactedAt: daysAgo(6, 13),
    notes: [
      {
        id: "n-ml-1",
        text: "Erstgespräch geführt. Wünscht Unterlagen zum Quereinstieg per Mail.",
        createdAt: daysAgo(6, 13),
        author: "Frau Habicht",
      },
      {
        id: "n-ml-2",
        text: "Infomaterial verschickt. Rückmeldung bis Ende der Woche erbeten.",
        createdAt: daysAgo(6, 14),
        author: "Frau Habicht",
      },
    ],
  },
  {
    id: "seed-julia-schreiber",
    firstName: "Julia",
    lastName: "Schreiber",
    email: "j.schreiber@example.de",
    phone: "0176 5544332",
    program: "kinderhaus",
    childName: "Ben",
    childBirthYear: 2024,
    preferredStart: "Januar 2027",
    message: "",
    status: "kontaktiert",
    createdAt: daysAgo(12, 10),
    lastContactedAt: daysAgo(3, 9),
    notes: [
      {
        id: "n-js-1",
        text: "Telefonisch erreicht. Möchte gern zu einem Schnuppervormittag kommen.",
        createdAt: daysAgo(3, 9),
        author: "Herr Voß",
      },
    ],
  },
  {
    id: "seed-david-frenzel",
    firstName: "David",
    lastName: "Frenzel",
    email: "david.frenzel@example.de",
    phone: "0151 3344556",
    program: "paedagogik",
    preferredStart: "Diplomkurs Herbst 2026",
    message:
      "Erzieher, möchte die Montessori-Diplomausbildung berufsbegleitend machen.",
    status: "kontaktiert",
    createdAt: daysAgo(15, 15),
    lastContactedAt: daysAgo(5, 11),
    notes: [
      {
        id: "n-df-1",
        text: "Kursübersicht und Termine zugeschickt. Klärt Finanzierung über Bildungsprämie.",
        createdAt: daysAgo(5, 11),
        author: "Frau Habicht",
      },
    ],
  },
  {
    id: "seed-petra-amann",
    firstName: "Petra",
    lastName: "Amann",
    email: "petra.amann@example.de",
    phone: "0162 7788990",
    program: "freie-schule",
    childName: "Lina",
    childBirthYear: 2015,
    preferredStart: "Schuljahr 2026/27",
    message: "Lina ist hochsensibel, wir suchen ein ruhigeres Lernumfeld.",
    status: "termin",
    createdAt: daysAgo(20, 9),
    lastContactedAt: daysAgo(8, 16),
    notes: [
      {
        id: "n-pa-1",
        text: "Hospitationstermin am Vormittag vereinbart.",
        createdAt: daysAgo(8, 16),
        author: "Herr Voß",
      },
      {
        id: "n-pa-2",
        text: "Termin bestätigt – kommt gemeinsam mit Lina.",
        createdAt: daysAgo(7, 10),
        author: "Herr Voß",
      },
    ],
  },
  {
    id: "seed-familie-okafor",
    firstName: "Grace",
    lastName: "Okafor",
    email: "grace.okafor@example.de",
    phone: "0157 2211334",
    program: "kinderhaus",
    childName: "Chidi",
    childBirthYear: 2023,
    preferredStart: "August 2026",
    message: "Zweisprachige Familie (Deutsch/Englisch).",
    status: "termin",
    createdAt: daysAgo(24, 13),
    lastContactedAt: daysAgo(10, 14),
    notes: [
      {
        id: "n-go-1",
        text: "Kennenlerntermin im Kinderhaus vereinbart, Platz ab August vorgemerkt.",
        createdAt: daysAgo(10, 14),
        author: "Frau Habicht",
      },
    ],
  },
  {
    id: "seed-stefan-richter",
    firstName: "Stefan",
    lastName: "Richter",
    email: "s.richter@example.de",
    phone: "0151 9090909",
    program: "paedagogik",
    preferredStart: "Wochenend-Weiterbildung",
    message: "Interesse an einzelnen Wochenendkursen, nicht am ganzen Diplom.",
    status: "abgesagt",
    createdAt: daysAgo(30, 12),
    lastContactedAt: daysAgo(18, 10),
    notes: [
      {
        id: "n-sr-1",
        text: "Gewünschter Kurs ist bereits ausgebucht. Auf Warteliste für nächstes Halbjahr gesetzt.",
        createdAt: daysAgo(18, 10),
        author: "Herr Voß",
      },
    ],
  },
  {
    id: "seed-laura-vogt",
    firstName: "Laura",
    lastName: "Vogt",
    email: "laura.vogt@example.de",
    phone: "0176 1212343",
    program: "freie-schule",
    childName: "Mats",
    childBirthYear: 2017,
    preferredStart: "unklar",
    message: "Erste Information, noch ganz am Anfang der Überlegungen.",
    status: "abgesagt",
    createdAt: daysAgo(34, 9),
    lastContactedAt: daysAgo(22, 15),
    notes: [
      {
        id: "n-lv-1",
        text: "Hat sich für eine Schule näher am Wohnort entschieden. Eintrag geschlossen.",
        createdAt: daysAgo(22, 15),
        author: "Frau Habicht",
      },
    ],
  },
  {
    id: "seed-miriam-kraus",
    firstName: "Miriam",
    lastName: "Kraus",
    email: "miriam.kraus@example.de",
    phone: "0151 4455667",
    program: "kinderhaus",
    childName: "Frieda",
    childBirthYear: 2022,
    preferredStart: "September 2026",
    message: "Empfehlung von befreundeter Familie aus dem Kinderhaus.",
    status: "neu",
    createdAt: daysAgo(3, 18),
    lastContactedAt: null,
    notes: [],
  },
];
