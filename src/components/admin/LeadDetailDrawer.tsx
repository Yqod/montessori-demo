"use client";

/**
 * LeadDetailDrawer – Detailansicht eines Eintrags als Slide-over.
 *
 * Hier passiert die eigentliche Sachbearbeitung: Ampelstatus setzen, Anruf
 * dokumentieren, Notizen festhalten und – falls nötig – den Eintrag löschen.
 * Ein-/Ausblendung läuft über AnimatePresence; das Notiz-Eingabefeld wird per
 * `key` (Lead-ID) automatisch zurückgesetzt, ohne State-Effekte.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type Lead,
  type LeadNote,
  type LeadStatus,
  PROGRAMS,
  STATUS_ORDER,
  STATUSES,
  fullName,
  initials,
  formatDate,
  formatDateTime,
  relativeDays,
} from "@/lib/leads";
import {
  CloseIcon,
  PhoneIcon,
  MailIcon,
  CheckIcon,
  TrashIcon,
  ClockIcon,
  PlusIcon,
} from "@/components/ui/Icons";

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSetStatus: (id: string, status: LeadStatus) => void;
  onAddNote: (id: string, text: string) => void;
  onMarkContacted: (id: string) => void;
  onDelete: (id: string) => void;
};

type DrawerBodyProps = {
  lead: Lead;
  onClose: () => void;
  onSetStatus: (id: string, status: LeadStatus) => void;
  onAddNote: (id: string, text: string) => void;
  onMarkContacted: (id: string) => void;
  onDelete: (id: string) => void;
};

export function LeadDetailDrawer({
  lead,
  onClose,
  onSetStatus,
  onAddNote,
  onMarkContacted,
  onDelete,
}: Props) {
  const reduce = useReducedMotion();
  const open = lead != null;

  // Schließen mit Escape + Scroll des Hintergrunds sperren, solange offen.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const panelVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : { hidden: { x: "100%" }, visible: { x: 0 }, exit: { x: "100%" } };

  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          key="overlay"
          onClick={onClose}
          aria-hidden
          className="fixed inset-0 z-40 bg-forest-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
      {lead && (
        <motion.aside
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label={`Eintrag von ${fullName(lead)}`}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-sand shadow-warm-lg sm:max-w-lg"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <DrawerBody
            lead={lead}
            onClose={onClose}
            onSetStatus={onSetStatus}
            onAddNote={onAddNote}
            onMarkContacted={onMarkContacted}
            onDelete={onDelete}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function DrawerBody({
  lead,
  onClose,
  onSetStatus,
  onAddNote,
  onMarkContacted,
  onDelete,
}: DrawerBodyProps) {
  const data = lead; // Alias – der Inhalt unten nutzt weiterhin `data`.
  const programMeta = PROGRAMS[data.program];
  const statusMeta = STATUSES[data.status];

  const childAge =
    data.childBirthYear != null
      ? new Date().getFullYear() - data.childBirthYear
      : null;

  function handleDelete() {
    const ok = window.confirm(
      `Eintrag von ${fullName(data)} wirklich löschen? Das kann nicht rückgängig gemacht werden.`,
    );
    if (ok) onDelete(data.id);
  }

  return (
    <>
      {/* Kopf */}
      <header
        className="relative shrink-0 px-6 pb-5 pt-6"
        style={{ backgroundColor: programMeta.soft }}
      >
              <button
                type="button"
                onClick={onClose}
                aria-label="Schließen"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream/70 text-forest transition-colors hover:bg-cream"
              >
                <CloseIcon width={18} height={18} />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-lg font-semibold text-cream"
                  style={{ backgroundColor: programMeta.accent }}
                >
                  {initials(data)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-2xl font-semibold text-forest">
                    {fullName(data)}
                  </h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-cream"
                      style={{ backgroundColor: programMeta.accent }}
                    >
                      {programMeta.short}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: statusMeta.soft,
                        color: statusMeta.ink,
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: statusMeta.color }}
                      />
                      {statusMeta.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schnellkontakt */}
              <div className="mt-5 flex flex-wrap gap-2">
                {data.phone && (
                  <a
                    href={`tel:${data.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest shadow-warm-sm transition-colors hover:bg-cream/70"
                  >
                    <PhoneIcon width={16} height={16} />
                    {data.phone}
                  </a>
                )}
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest shadow-warm-sm transition-colors hover:bg-cream/70"
                  >
                    <MailIcon width={16} height={16} />
                    E-Mail
                  </a>
                )}
              </div>
            </header>

            {/* Scrollbarer Inhalt */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Ampel setzen */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-soft">
                  Status / Ampel
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {STATUS_ORDER.map((key) => {
                    const meta = STATUSES[key];
                    const active = data.status === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => onSetStatus(data.id, key)}
                        aria-pressed={active}
                        className={`flex items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                          active ? "shadow-warm-sm" : "border-transparent bg-cream hover:bg-cream/60"
                        }`}
                        style={
                          active
                            ? {
                                backgroundColor: meta.soft,
                                borderColor: meta.color,
                                color: meta.ink,
                              }
                            : { color: "var(--color-forest-soft)" }
                        }
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="leading-tight">{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Anruf-Tracking */}
              <section className="mt-6 rounded-2xl border border-beige bg-cream p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-forest-soft">
                    <ClockIcon width={18} height={18} />
                    {data.lastContactedAt ? (
                      <span>
                        Zuletzt kontaktiert:{" "}
                        <strong className="font-semibold text-forest">
                          {formatDate(data.lastContactedAt)}
                        </strong>{" "}
                        ({relativeDays(data.lastContactedAt)})
                      </span>
                    ) : (
                      <span>Noch nicht kontaktiert</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onMarkContacted(data.id)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-sage-dark px-4 py-2 text-sm font-semibold text-cream shadow-warm-sm transition-colors hover:bg-sage-deep"
                >
                  <CheckIcon width={16} height={16} />
                  Als heute kontaktiert markieren
                </button>
              </section>

              {/* Eckdaten */}
              <section className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-soft">
                  Eckdaten
                </h3>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <Row label="Angebot" value={programMeta.label} />
                  <Row label="Eingegangen" value={`${formatDate(data.createdAt)} · ${relativeDays(data.createdAt)}`} />
                  {data.preferredStart && (
                    <Row label="Wunschstart" value={data.preferredStart} />
                  )}
                  {data.childName && (
                    <Row
                      label="Kind"
                      value={
                        childAge != null
                          ? `${data.childName} · Jg. ${data.childBirthYear} (ca. ${childAge} J.)`
                          : data.childName
                      }
                    />
                  )}
                </dl>

                {data.message && (
                  <blockquote className="mt-4 rounded-2xl bg-sand-deep/70 px-4 py-3 text-sm italic leading-relaxed text-forest-soft">
                    „{data.message}“
                  </blockquote>
                )}
              </section>

              {/* Notizen – eigener, per Lead-ID zurückgesetzter Teilbaum */}
              <LeadNotes
                key={data.id}
                notes={data.notes}
                onAddNote={(text) => onAddNote(data.id, text)}
              />

              {/* Löschen */}
              <div className="mt-8 border-t border-beige pt-5">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay/10"
                >
                  <TrashIcon width={16} height={16} />
                  Eintrag löschen
                </button>
              </div>
            </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-28 shrink-0 text-forest-soft">{label}</dt>
      <dd className="font-medium text-forest">{value}</dd>
    </div>
  );
}

function LeadNotes({
  notes,
  onAddNote,
}: {
  notes: LeadNote[];
  onAddNote: (text: string) => void;
}) {
  const [noteText, setNoteText] = useState("");

  function submitNote(event: React.FormEvent) {
    event.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(noteText);
    setNoteText("");
  }

  return (
    <section className="mt-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-soft">
        Notizen ({notes.length})
      </h3>

      <form onSubmit={submitNote} className="mt-3">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={3}
          placeholder="Gesprächsnotiz, nächster Schritt, Vereinbarung …"
          className="w-full resize-y rounded-2xl border border-beige bg-cream px-4 py-3 text-sm text-forest placeholder:text-forest-soft/50 shadow-warm-sm focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/40"
        />
        <button
          type="submit"
          disabled={!noteText.trim()}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-cream shadow-warm-sm transition-colors hover:bg-clay-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <PlusIcon width={16} height={16} />
          Notiz hinzufügen
        </button>
      </form>

      <ul className="mt-4 space-y-3">
        {notes.length === 0 && (
          <li className="rounded-2xl border border-dashed border-beige px-4 py-5 text-center text-sm text-forest-soft">
            Noch keine Notizen vorhanden.
          </li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-2xl border border-beige bg-cream px-4 py-3"
          >
            <p className="text-sm leading-relaxed text-forest">{note.text}</p>
            <p className="mt-2 text-xs text-forest-soft">
              {note.author} · {formatDateTime(note.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
