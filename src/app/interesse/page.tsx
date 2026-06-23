import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/Footer";
import { InteresseForm } from "@/components/interesse/InteresseForm";
import { Underline, Sparkle } from "@/components/decorations/Doodles";

export const metadata: Metadata = {
  title: "Interesse bekunden",
  description:
    "Sie interessieren sich für unser Kinderhaus, die Freie Schule oder die Montessori-Pädagogik? Hinterlassen Sie hier unverbindlich Ihre Daten – wir melden uns persönlich bei Ihnen.",
};

export default function InteressePage() {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="flex-1">
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:pt-32 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sage-deep">
                Unverbindlich & in Ruhe
              </span>
              <h1 className="relative mt-4 font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
                Lernen Sie uns{" "}
                <span className="relative inline-block text-clay">
                  kennen
                  <Underline className="absolute -bottom-2 left-0 h-3 w-full text-sage" />
                  <Sparkle className="absolute -right-7 -top-4 hidden h-6 w-6 text-clay sm:block" />
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-forest-soft">
                Ob Kinderhaus, Freie Schule oder die Montessori-Ausbildung –
                hinterlassen Sie hier Ihre Daten. Wir melden uns persönlich,
                beantworten Ihre Fragen und laden Sie zum Kennenlernen ein.
              </p>
            </header>

            <div className="mt-10">
              <InteresseForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
