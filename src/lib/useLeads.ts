"use client";

/**
 * useLeads – kleiner, localStorage-gestützter Demo-Store.
 *
 * Hält den Bestand an Interessent:innen im Browser vor, damit das Demo ganz
 * ohne echtes Backend auskommt: Das öffentliche Formular schreibt in denselben
 * Speicher, aus dem das interne Board liest. Änderungen überleben einen Reload
 * und werden dank `storage`-Event sogar zwischen offenen Tabs synchronisiert.
 *
 * Die Anbindung erfolgt über `useSyncExternalStore`: Das hält Server- und
 * Client-Render konsistent (auf dem Server wird ein leerer Stand gezeigt, der
 * echte Bestand erst nach dem Hydrieren geladen) und vermeidet `setState` in
 * Effekten.
 */

import { useSyncExternalStore } from "react";
import {
  type Lead,
  type LeadInput,
  type LeadStatus,
  makeLead,
  seedLeads,
} from "@/lib/leads";

const STORAGE_KEY = "mzm-demo-leads-v1";

/** Stabiler, leerer Server-Snapshot – verhindert Hydration-Mismatches. */
const EMPTY: Lead[] = [];

let current: Lead[] = seedLeads;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* Speicher evtl. gesperrt – im Demo unkritisch. */
  }
}

/** Einmalig den gespeicherten Stand laden (nur im Browser). */
function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) current = parsed as Lead[];
    }
  } catch {
    /* fehlerhaften Stand ignorieren – Seed bleibt bestehen */
  }
}

// Änderungen aus anderen Tabs übernehmen (einmalig registriert).
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || event.newValue == null) return;
    try {
      const parsed = JSON.parse(event.newValue) as unknown;
      if (Array.isArray(parsed)) {
        current = parsed as Lead[];
        emit();
      }
    } catch {
      /* ignorieren */
    }
  });
}

function subscribe(callback: () => void) {
  ensureLoaded();
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Lead[] {
  return current;
}

function getServerSnapshot(): Lead[] {
  return EMPTY;
}

function getLoaded(): boolean {
  return loaded;
}

function getLoadedServer(): boolean {
  return false;
}

function commit(next: Lead[]) {
  current = next;
  persist();
  emit();
}

/* ---- Mutationen (modulweit stabil) ------------------------------------- */

function addLead(input: LeadInput): Lead {
  const lead = makeLead(input);
  commit([lead, ...current]);
  return lead;
}

function setStatus(id: string, status: LeadStatus) {
  const now = new Date().toISOString();
  commit(
    current.map((lead) => {
      if (lead.id !== id) return lead;
      // Wer aus „offen“ herauswandert, gilt als kontaktiert.
      const lastContactedAt =
        status !== "neu" && lead.lastContactedAt == null
          ? now
          : lead.lastContactedAt;
      return { ...lead, status, lastContactedAt };
    }),
  );
}

function addNote(id: string, text: string, author = "Team") {
  const clean = text.trim();
  if (!clean) return;
  const now = new Date().toISOString();
  commit(
    current.map((lead) =>
      lead.id === id
        ? {
            ...lead,
            notes: [
              {
                id: `note-${now}-${Math.random().toString(36).slice(2, 7)}`,
                text: clean,
                createdAt: now,
                author,
              },
              ...lead.notes,
            ],
          }
        : lead,
    ),
  );
}

function markContacted(id: string) {
  const now = new Date().toISOString();
  commit(
    current.map((lead) =>
      lead.id === id
        ? {
            ...lead,
            lastContactedAt: now,
            status: lead.status === "neu" ? "kontaktiert" : lead.status,
          }
        : lead,
    ),
  );
}

function deleteLead(id: string) {
  commit(current.filter((lead) => lead.id !== id));
}

function resetDemo() {
  commit(seedLeads);
}

export type LeadsApi = {
  leads: Lead[];
  /** Erst nach dem Hydrieren aus dem Browser-Speicher `true`. */
  hydrated: boolean;
  addLead: (input: LeadInput) => Lead;
  setStatus: (id: string, status: LeadStatus) => void;
  addNote: (id: string, text: string, author?: string) => void;
  markContacted: (id: string) => void;
  deleteLead: (id: string) => void;
  resetDemo: () => void;
};

export function useLeads(): LeadsApi {
  const leads = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    getLoaded,
    getLoadedServer,
  );

  return {
    leads,
    hydrated,
    addLead,
    setStatus,
    addNote,
    markContacted,
    deleteLead,
    resetDemo,
  };
}
