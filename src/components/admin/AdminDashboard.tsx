"use client";

/**
 * AdminDashboard – internes Board zur Bearbeitung der Interessent:innen.
 *
 * Kernidee ist das Ampelsystem: Jede Spalte steht für einen Bearbeitungs-
 * status (offen → in Kontakt → Termin → abgesagt). Über die farbigen Punkte
 * auf jeder Karte lassen sich Einträge direkt umsortieren; ein Klick auf die
 * Karte öffnet die Detailansicht mit Notizen und Anruf-Tracking.
 */

import { useMemo, useState } from "react";
import {
  type Lead,
  type LeadStatus,
  type Program,
  PROGRAM_ORDER,
  PROGRAMS,
  STATUS_ORDER,
  STATUSES,
  computeStats,
  fullName,
  initials,
  relativeDays,
} from "@/lib/leads";
import { useLeads } from "@/lib/useLeads";
import { LeadDetailDrawer } from "@/components/admin/LeadDetailDrawer";
import {
  SearchIcon,
  PhoneIcon,
  NoteIcon,
  ClockIcon,
  ChevronDown,
} from "@/components/ui/Icons";

type SortKey = "neueste" | "aelteste" | "name";
type ProgramFilter = Program | "alle";

const SORT_LABEL: Record<SortKey, string> = {
  neueste: "Neueste zuerst",
  aelteste: "Älteste zuerst",
  name: "Name (A–Z)",
};

export function AdminDashboard() {
  const {
    leads,
    hydrated,
    setStatus,
    addNote,
    markContacted,
    deleteLead,
    resetDemo,
  } = useLeads();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState<ProgramFilter>("alle");
  const [sort, setSort] = useState<SortKey>("neueste");

  const stats = useMemo(() => computeStats(leads), [leads]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = leads.filter((lead) => {
      if (programFilter !== "alle" && lead.program !== programFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        fullName(lead),
        lead.email,
        lead.phone,
        lead.childName ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "name") return a.lastName.localeCompare(b.lastName, "de");
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "neueste" ? db - da : da - db;
    });
    return sorted;
  }, [leads, search, programFilter, sort]);

  const byStatus = useMemo(() => {
    const map: Record<LeadStatus, Lead[]> = {
      neu: [],
      kontaktiert: [],
      termin: [],
      abgesagt: [],
    };
    for (const lead of visible) map[lead.status].push(lead);
    return map;
  }, [visible]);

  const selectedLead = selectedId
    ? leads.find((lead) => lead.id === selectedId) ?? null
    : null;

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-16 text-center text-forest-soft lg:px-8">
        Lade Interessent:innen …
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
      {/* Statistik */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          label="Anfragen gesamt"
          value={stats.total}
          hint={`${stats.thisWeek} diese Woche`}
        />
        {STATUS_ORDER.map((key) => (
          <StatCard
            key={key}
            label={STATUSES[key].label}
            value={stats.byStatus[key]}
            hint={STATUSES[key].column}
            color={STATUSES[key].color}
          />
        ))}
      </section>

      {/* Toolbar */}
      <section className="mt-6 flex flex-col gap-3 rounded-2xl border border-beige bg-cream/70 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-soft">
            <SearchIcon width={18} height={18} />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche nach Name, E-Mail, Kind …"
            className="w-full rounded-full border border-beige bg-sand px-10 py-2.5 text-sm text-forest placeholder:text-forest-soft/60 focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Angebots-Filter */}
          <FilterChip
            label="Alle"
            active={programFilter === "alle"}
            onClick={() => setProgramFilter("alle")}
          />
          {PROGRAM_ORDER.map((key) => (
            <FilterChip
              key={key}
              label={PROGRAMS[key].short}
              active={programFilter === key}
              color={PROGRAMS[key].accent}
              onClick={() => setProgramFilter(key)}
            />
          ))}

          {/* Sortierung */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sortierung"
              className="appearance-none rounded-full border border-beige bg-sand py-2 pl-4 pr-9 text-sm font-medium text-forest focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage/30"
            >
              {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SORT_LABEL[key]}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-forest-soft">
              <ChevronDown width={16} height={16} />
            </span>
          </div>

          <button
            type="button"
            onClick={resetDemo}
            className="rounded-full border border-beige bg-sand px-4 py-2 text-sm font-medium text-forest-soft transition-colors hover:bg-sand-deep hover:text-forest"
          >
            Demo zurücksetzen
          </button>
        </div>
      </section>

      {/* Ampel-Board */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATUS_ORDER.map((status) => {
          const meta = STATUSES[status];
          const items = byStatus[status];
          return (
            <div
              key={status}
              className="flex flex-col rounded-2xl border border-beige bg-sand-deep/40"
            >
              <header
                className="flex items-center justify-between gap-2 rounded-t-2xl border-b-2 px-4 py-3"
                style={{ borderColor: meta.color, backgroundColor: meta.soft }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  <div>
                    <h2
                      className="font-display text-base font-semibold leading-none"
                      style={{ color: meta.ink }}
                    >
                      {meta.label}
                    </h2>
                    <p className="mt-1 text-xs" style={{ color: meta.ink }}>
                      {meta.column}
                    </p>
                  </div>
                </div>
                <span
                  className="grid h-7 min-w-7 place-items-center rounded-full px-2 text-sm font-semibold text-cream"
                  style={{ backgroundColor: meta.color }}
                >
                  {items.length}
                </span>
              </header>

              <div className="flex flex-1 flex-col gap-3 p-3">
                {items.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-beige px-3 py-8 text-center text-sm text-forest-soft">
                    Keine Einträge
                  </p>
                ) : (
                  items.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onOpen={() => setSelectedId(lead.id)}
                      onSetStatus={setStatus}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>

      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedId(null)}
        onSetStatus={setStatus}
        onAddNote={addNote}
        onMarkContacted={markContacted}
        onDelete={(id) => {
          deleteLead(id);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  hint,
  color,
}: {
  label: string;
  value: number;
  hint: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-beige bg-cream p-4 shadow-warm-sm">
      <div className="flex items-center gap-2">
        {color && (
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-forest-soft">
          {label}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-forest">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-forest-soft">{hint}</p>
    </div>
  );
}

function FilterChip({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-transparent text-cream"
          : "border-beige bg-sand text-forest-soft hover:text-forest"
      }`}
      style={active ? { backgroundColor: color ?? "var(--color-forest)" } : undefined}
    >
      {label}
    </button>
  );
}

function LeadCard({
  lead,
  onOpen,
  onSetStatus,
}: {
  lead: Lead;
  onOpen: () => void;
  onSetStatus: (id: string, status: LeadStatus) => void;
}) {
  const program = PROGRAMS[lead.program];

  return (
    <article
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group cursor-pointer rounded-xl border border-beige bg-cream p-3.5 text-left shadow-warm-sm transition-all hover:-translate-y-0.5 hover:shadow-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-cream"
          style={{ backgroundColor: program.accent }}
        >
          {initials(lead)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-forest">
            {fullName(lead)}
          </h3>
          <span
            className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: program.soft, color: program.accent }}
          >
            {program.short}
          </span>
        </div>
      </div>

      <dl className="mt-3 space-y-1 text-xs text-forest-soft">
        {lead.phone && (
          <div className="flex items-center gap-1.5">
            <PhoneIcon width={13} height={13} />
            <span className="truncate">{lead.phone}</span>
          </div>
        )}
        {lead.childName ? (
          <div className="truncate">
            Kind: {lead.childName}
            {lead.childBirthYear ? ` (Jg. ${lead.childBirthYear})` : ""}
          </div>
        ) : (
          lead.preferredStart && (
            <div className="truncate">Wunsch: {lead.preferredStart}</div>
          )
        )}
      </dl>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-beige pt-2.5">
        <div className="flex items-center gap-2.5 text-[11px] text-forest-soft">
          <span className="inline-flex items-center gap-1">
            <ClockIcon width={13} height={13} />
            {relativeDays(lead.createdAt)}
          </span>
          {lead.notes.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <NoteIcon width={13} height={13} />
              {lead.notes.length}
            </span>
          )}
        </div>

        {/* Ampel-Schnellwahl */}
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {STATUS_ORDER.map((key) => {
            const meta = STATUSES[key];
            const active = lead.status === key;
            return (
              <button
                key={key}
                type="button"
                title={`Auf „${meta.label}“ setzen`}
                aria-label={`Status auf ${meta.label} setzen`}
                onClick={() => onSetStatus(lead.id, key)}
                className={`h-4 w-4 rounded-full border transition-transform hover:scale-125 ${
                  active ? "border-forest/40" : "border-transparent"
                }`}
                style={{
                  backgroundColor: active ? meta.color : "transparent",
                  boxShadow: active ? "none" : `inset 0 0 0 2px ${meta.color}66`,
                }}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}
