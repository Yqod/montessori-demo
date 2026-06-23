"use client";

/**
 * InteresseForm – öffentliches Interesseformular.
 *
 * Interessierte wählen zunächst einen der drei Bereiche (Kinderhaus, Freie
 * Schule oder Pädagogik) und hinterlassen anschließend ihre Kontaktdaten. Die
 * Anfrage landet im selben Demo-Speicher, aus dem das interne Backend liest –
 * sie taucht dort sofort in der Spalte „Bitte anrufen“ auf.
 */

import { useId, useState } from "react";
import Link from "next/link";
import { PROGRAM_ORDER, PROGRAMS, type Program } from "@/lib/leads";
import { useLeads } from "@/lib/useLeads";
import { CheckIcon, ArrowRight } from "@/components/ui/Icons";
import { Sprout } from "@/components/decorations/Doodles";

const fieldClass =
  "w-full rounded-2xl border border-beige bg-cream px-4 py-3 text-forest placeholder:text-forest-soft/50 shadow-warm-sm transition-colors focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/40";

const labelClass = "mb-1.5 block text-sm font-semibold text-forest";

export function InteresseForm() {
  const { addLead } = useLeads();
  const uid = useId();

  const [program, setProgram] = useState<Program | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childBirthYear, setChildBirthYear] = useState("");
  const [preferredStart, setPreferredStart] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const wantsChild = program ? PROGRAMS[program].forChild : false;

  function resetForm() {
    setProgram(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setChildName("");
    setChildBirthYear("");
    setPreferredStart("");
    setMessage("");
    setConsent(false);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!program) {
      setError("Bitte wählen Sie zuerst einen Bereich aus.");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError("Bitte geben Sie Vor- und Nachnamen an.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Bitte hinterlassen Sie eine E-Mail-Adresse oder Telefonnummer.");
      return;
    }
    if (!consent) {
      setError("Bitte bestätigen Sie die Hinweise zum Datenschutz.");
      return;
    }

    const year = Number.parseInt(childBirthYear, 10);
    addLead({
      firstName,
      lastName,
      email,
      phone,
      program,
      childName: wantsChild ? childName : undefined,
      childBirthYear: wantsChild && !Number.isNaN(year) ? year : undefined,
      preferredStart,
      message,
    });

    setDone(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* ---- Erfolgs-Ansicht --------------------------------------------------- */
  if (done) {
    return (
      <div className="rounded-[2rem] border border-sage/40 bg-cream p-8 text-center shadow-warm sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/25 text-sage-deep">
          <CheckIcon width={32} height={32} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-forest">
          Vielen Dank!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-forest-soft">
          Ihre Anfrage ist bei uns eingegangen. Wir melden uns in den nächsten
          Tagen persönlich bei Ihnen – telefonisch oder per E-Mail.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setDone(false);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-warm transition-colors hover:bg-clay-700"
          >
            Weitere Anfrage stellen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-forest/20 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/50 hover:bg-cream"
          >
            Zurück zur Startseite
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-md rounded-2xl bg-sand-deep/70 px-4 py-3 text-sm text-forest-soft">
          <strong className="font-semibold text-forest">Demo-Hinweis:</strong>{" "}
          Diese Anfrage erscheint jetzt im internen Backend unter{" "}
          <Link href="/admin" className="font-semibold text-clay underline">
            /admin
          </Link>{" "}
          in der Spalte „Bitte anrufen“.
        </p>
      </div>
    );
  }

  /* ---- Formular ---------------------------------------------------------- */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2rem] border border-beige bg-sand-deep/40 p-6 shadow-warm sm:p-9"
    >
      {/* 1 – Bereich wählen */}
      <fieldset>
        <legend className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">
          <Sprout className="h-4 w-4" />
          1 · Wofür interessieren Sie sich?
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PROGRAM_ORDER.map((key) => {
            const meta = PROGRAMS[key];
            const active = program === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setProgram(key)}
                aria-pressed={active}
                className={`group relative flex h-full flex-col rounded-2xl border-2 bg-cream p-4 text-left transition-all duration-200 ${
                  active
                    ? "shadow-warm"
                    : "border-beige hover:-translate-y-0.5 hover:shadow-warm-sm"
                }`}
                style={
                  active
                    ? { borderColor: meta.accent, backgroundColor: meta.soft }
                    : undefined
                }
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-cream"
                  style={{ backgroundColor: meta.accent }}
                  aria-hidden
                >
                  {active ? <CheckIcon width={18} height={18} /> : <Sprout className="h-4 w-4" />}
                </span>
                <span className="mt-3 font-display text-lg font-semibold leading-tight text-forest">
                  {meta.label}
                </span>
                <span className="mt-1 text-sm text-forest-soft">
                  {meta.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 2 – Kontaktdaten */}
      <fieldset className="mt-9">
        <legend className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">
          <Sprout className="h-4 w-4" />
          2 · Ihre Kontaktdaten
        </legend>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-first`} className={labelClass}>
              Vorname <span className="text-clay">*</span>
            </label>
            <input
              id={`${uid}-first`}
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={fieldClass}
              placeholder="Maria"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-last`} className={labelClass}>
              Nachname <span className="text-clay">*</span>
            </label>
            <input
              id={`${uid}-last`}
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={fieldClass}
              placeholder="Musterfrau"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={labelClass}>
              E-Mail
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              placeholder="maria@example.de"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className={labelClass}>
              Telefon
            </label>
            <input
              id={`${uid}-phone`}
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
              placeholder="0151 0000000"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-forest-soft">
          Mindestens eine Kontaktmöglichkeit (E-Mail oder Telefon) genügt.
        </p>
      </fieldset>

      {/* 3 – Details (kontextabhängig) */}
      <fieldset className="mt-9">
        <legend className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">
          <Sprout className="h-4 w-4" />
          3 · Ihr Anliegen
        </legend>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {wantsChild && (
            <>
              <div>
                <label htmlFor={`${uid}-childname`} className={labelClass}>
                  Name des Kindes
                </label>
                <input
                  id={`${uid}-childname`}
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className={fieldClass}
                  placeholder="z. B. Mila"
                />
              </div>
              <div>
                <label htmlFor={`${uid}-birthyear`} className={labelClass}>
                  Geburtsjahr des Kindes
                </label>
                <input
                  id={`${uid}-birthyear`}
                  type="number"
                  inputMode="numeric"
                  min={2005}
                  max={2030}
                  value={childBirthYear}
                  onChange={(e) => setChildBirthYear(e.target.value)}
                  className={fieldClass}
                  placeholder="2023"
                />
              </div>
            </>
          )}
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-start`} className={labelClass}>
              {wantsChild ? "Gewünschter Start" : "Gewünschter Kurs / Start"}
            </label>
            <input
              id={`${uid}-start`}
              type="text"
              value={preferredStart}
              onChange={(e) => setPreferredStart(e.target.value)}
              className={fieldClass}
              placeholder={
                wantsChild ? "z. B. August 2026" : "z. B. Diplomkurs Herbst 2026"
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-message`} className={labelClass}>
              Nachricht
            </label>
            <textarea
              id={`${uid}-message`}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-y`}
              placeholder="Erzählen Sie uns kurz, was Sie sich wünschen oder welche Fragen Sie haben …"
            />
          </div>
        </div>
      </fieldset>

      {/* Datenschutz */}
      <label className="mt-7 flex items-start gap-3 rounded-2xl bg-cream/70 p-4 text-sm text-forest-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-sage-dark"
        />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
          Anfrage gespeichert und verarbeitet werden. (Demo – es werden keine
          echten Daten übertragen.) <span className="text-clay">*</span>
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-2xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm font-medium text-clay-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-clay px-8 py-4 text-base font-semibold text-cream shadow-warm transition-all duration-300 hover:bg-clay-700 hover:shadow-warm-lg sm:w-auto"
      >
        Anfrage absenden
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight width={20} height={20} />
        </span>
      </button>
    </form>
  );
}
