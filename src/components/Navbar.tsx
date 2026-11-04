import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types/school';

interface NavbarProps {
  activeSection: SectionId;
  onScrollTo: (section: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: SectionId.About, label: 'About & Facilities' },
  { id: SectionId.Admissions, label: 'Admissions' },
  { id: SectionId.Faculty, label: 'Faculty' },
  { id: SectionId.News, label: 'News & Notices' },
  { id: SectionId.Contact, label: 'Contact Us' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: SectionId) => {
    setMobileMenuOpen(false);
    onScrollTo(section);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelect(SectionId.Top)}
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] cursor-pointer"
        >
          Victor Public School
        </button>

        {/* Zone 2: 5 concise single-line smooth-scroll navigation links */}
        <nav
          aria-label="Primary Single-Page Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-[#1E3A8A] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[#1E3A8A]'
                    : 'hover:text-slate-900 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-slate-300 after:opacity-0 hover:after:opacity-100 after:transition-opacity'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect(SectionId.Contact)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            Online Registration
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-800 rounded-md hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`text-left py-2 text-base font-medium border-b border-slate-100 transition-colors ${
                    isActive ? 'text-[#1E3A8A] font-semibold' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => handleSelect(SectionId.Contact)}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors"
          >
            Online Registration
          </button>
        </div>
      )}
    </header>
  );
};
