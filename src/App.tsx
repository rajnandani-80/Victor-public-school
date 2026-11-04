/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FacultyPage } from './pages/FacultyPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { ContactPrefill, SectionId } from './types/school';

const TRACKED_SECTIONS: SectionId[] = [
  SectionId.About,
  SectionId.Admissions,
  SectionId.Faculty,
  SectionId.News,
  SectionId.Contact,
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Top);
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null);

  const scrollToSection = useCallback((section: SectionId) => {
    setActiveSection(section);
    if (section === SectionId.Top) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 320) {
        setActiveSection(SectionId.Top);
        return;
      }

      let current: SectionId = SectionId.About;
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateWithInquiry = useCallback(
    (prefill: ContactPrefill) => {
      setContactPrefill(prefill);
      scrollToSection(SectionId.Contact);
    },
    [scrollToSection]
  );

  const clearContactPrefill = useCallback(() => {
    setContactPrefill(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#1E3A8A]/15 selection:text-[#1E3A8A]">
      <Navbar activeSection={activeSection} onScrollTo={scrollToSection} />

      <main className="flex-1">
        <OverviewPage onScrollTo={scrollToSection} />
        <AdmissionsPage onNavigateWithInquiry={handleNavigateWithInquiry} />
        <FacultyPage onNavigateWithInquiry={handleNavigateWithInquiry} />
        <NewsPage />
        <ContactPage prefill={contactPrefill} onClearPrefill={clearContactPrefill} />
      </main>

      <Footer onScrollTo={scrollToSection} />
    </div>
  );
}
