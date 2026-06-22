import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { OffersSection } from "@/components/sections/OffersSection";
import { DayTimelineSection } from "@/components/sections/DayTimelineSection";
import { LeitbildSection } from "@/components/sections/LeitbildSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Footer } from "@/components/Footer";

/**
 * Startseite – Montessori Zentrum Magdeburg.
 *
 * One-page hero landing. Section order:
 *   Hero → Angebote → Ein Tag bei uns → Leitbild → Stimmen →
 *   Schnellzugriffe → Projekte & Förderer → Footer
 * The fixed Navbar sits above everything; the Hero carries its own top padding.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="flex-1">
        <Hero />
        <OffersSection />
        <DayTimelineSection />
        <LeitbildSection />
        <TestimonialsSection />
        <QuickAccessSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
