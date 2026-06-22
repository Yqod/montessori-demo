import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

/**
 * Display serif for headlines – warm, characterful, slightly editorial.
 * Fraunces ships an "opsz" + "wght" variable axis, perfect for large titles.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

/** Friendly, highly legible grotesque for body copy and UI. */
const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://montessori-magdeburg.example"),
  title: {
    default: "Montessori Zentrum Magdeburg – Kinderhaus, Freie Schule & Diplomkurs",
    template: "%s · Montessori Zentrum Magdeburg",
  },
  description:
    "Herzlich willkommen im Montessori Zentrum Magdeburg. Einblicke in unser Kinderhaus, die Freie Schule und das Montessori-Bildungszentrum – getragen vom Elternverein „Initiative zur Förderung aktiver und freier Pädagogik“ e. V.",
  keywords: [
    "Montessori",
    "Magdeburg",
    "Kinderhaus",
    "Freie Schule",
    "Diplomkurs",
    "freie Pädagogik",
  ],
  openGraph: {
    title: "Montessori Zentrum Magdeburg",
    description:
      "Hier darf jedes Kind individuell wachsen, lernen und seinen eigenen Weg finden.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand text-forest">
        {children}
      </body>
    </html>
  );
}
