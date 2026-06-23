import { AdminDashboard } from "@/components/admin/AdminDashboard";

/**
 * Internes Backend – Übersicht aller Interessenanfragen mit Ampelsystem.
 * Die eigentliche Logik liegt im Client-Component `AdminDashboard`, da der
 * Demo-Bestand im Browser (localStorage) gehalten wird.
 */
export default function AdminPage() {
  return <AdminDashboard />;
}
