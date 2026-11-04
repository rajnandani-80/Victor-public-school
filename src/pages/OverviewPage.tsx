import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CAMPUS_FACILITIES,
  LEADERSHIP_MESSAGES,
  PANCHMUKHI_PILLARS,
  VPS_IMAGES,
} from '../data/schoolData';
import { EditorialImage } from '../components/EditorialImage';
import { SectionId } from '../types/school';

interface OverviewSectionProps {
  onScrollTo: (section: SectionId) => void;
}

export const OverviewPage: React.FC<OverviewSectionProps> = ({ onScrollTo }) => {
  const [activeLeaderTab, setActiveLeaderTab] = useState<'chairman' | 'manager' | 'principal'>(
    'chairman'
  );

  const selectedLeader =
    LEADERSHIP_MESSAGES.find((m) => m.id === activeLeaderTab) || LEADERSHIP_MESSAGES[0];

  return (
    <div id="top" className="scroll-mt-16">
      {/* Official Statutory & Contact Utility Strip */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-semibold text-slate-800">Affiliated to C.B.S.E., New Delhi</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1996</span>
            <span aria-hidden="true">·</span>
            <span>Krishan Nagar, Tehsil Camp, Panipat – 132103</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">+91-8375908693, 0180-2639151</span>
          </div>
          <button
            type="button"
            onClick={() => onScrollTo(SectionId.Admissions)}
            className="font-semibold text-[#1E3A8A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            2027–28 Admissions Open ↓
          </button>
        </div>
      </div>

      {/* Hero Section — 2-Column Stretched Split */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-14 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                Established 1996 · English-Medium Co-Educational CBSE School
              </p>

              <h1 className="font-serif text-[clamp(2.25rem,3.8vw,3.35rem)] leading-[1.12] font-bold text-slate-900 headline-balance">
                Holistic CBSE education guided by Panchmukhi Shiksha.
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-prose">
                Located at Krishan Nagar, Tehsil Camp, Panipat, Victor Public School blends strict NCERT and C.B.S.E. academic rigor with our five-fold <em>Panchmukhi Shiksha</em> philosophy—nurturing every child intellectually, physically, emotionally, morally, and spiritually.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => onScrollTo(SectionId.Contact)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <span>Apply Online (2027–28)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onScrollTo(SectionId.About)}
                className="text-sm font-semibold text-slate-800 hover:text-[#1E3A8A] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Facilities & Vision
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[430px] overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
              <img
                src={VPS_IMAGES.campusHero}
                alt="Victor Public School Krishan Nagar Tehsil Camp Panipat campus courtyard with Indian flag and students in neat uniforms"
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2.5">
              Earthquake-resistant, CCTV-secured school campus at Krishan Nagar, Tehsil Camp, Panipat – 132103.
            </p>
          </div>
        </div>

        {/* Full-Width 4-Column School Proof Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-mono tabular-nums text-3xl font-semibold text-[#1E3A8A]">1996</p>
            <p className="text-sm font-semibold text-slate-900 mt-1.5">30 Years of Trust</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Serving families across Krishan Nagar, Tehsil Camp, Model Town & Panipat since 1996.
            </p>
          </div>
          <div>
            <p className="font-mono tabular-nums text-3xl font-semibold text-[#1E3A8A]">5-Fold</p>
            <p className="text-sm font-semibold text-slate-900 mt-1.5">Panchmukhi Shiksha</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Balanced intellectual, physical, emotional, moral, and spiritual character building.
            </p>
          </div>
          <div>
            <p className="font-mono tabular-nums text-3xl font-semibold text-[#1E3A8A]">100%</p>
            <p className="text-sm font-semibold text-slate-900 mt-1.5">Smart Class & Lab Learning</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ventilated Smart Classrooms, Physics/Chemistry/Biology, Maths & Computer Labs.
            </p>
          </div>
          <div>
            <p className="font-mono tabular-nums text-3xl font-semibold text-[#1E3A8A]">24×7</p>
            <p className="text-sm font-semibold text-slate-900 mt-1.5">Safe & Caring Campus</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              CCTV surveillance, earthquake-resistant structure, fire safety, Infirmary & Transport.
            </p>
          </div>
        </div>
      </section>

      {/* About Us, Panchmukhi Shiksha & Facilities Section */}
      <section
        id="about"
        className="scroll-mt-16 border-t border-slate-200 bg-slate-50/85 py-20"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Panchmukhi Shiksha + Smart Classroom Split */}
          <div>
            <div className="max-w-2xl mb-12">
              <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                About Victor Public School · Our Educational Philosophy
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 headline-balance">
                ‘Panchmukhi Shiksha’ with strict NCERT & CBSE standards.
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Recognised and affiliated with C.B.S.E., New Delhi, Victor Public School goes beyond textbook memorization through our five-pillar holistic education model.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
                {PANCHMUKHI_PILLARS.map((pillar) => (
                  <div key={pillar.index} className="py-5 space-y-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-900">
                      <span className="font-mono tabular-nums text-[#B45309] mr-2.5">
                        {pillar.index}.
                      </span>
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed pl-8 max-w-prose">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <EditorialImage
                  src={VPS_IMAGES.smartClass}
                  alt="Interactive Smart Classroom lesson in progress at Victor Public School"
                  caption="Well-ventilated Smart Classrooms bring NCERT Science, Mathematics, and Languages alive through interactive visual modules."
                  aspectClass="aspect-[4/3]"
                />

                <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[#1E3A8A] font-semibold">
                    Campus Infrastructure Highlights
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {CAMPUS_FACILITIES.map((fac) => (
                      <div key={fac.title} className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900">{fac.title}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{fac.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Leadership Messages (Chairman, Manager, Principal) */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                  Vision & Governance
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5">
                  Messages from Our School Leadership
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Leadership Messages"
                className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg self-start"
              >
                {LEADERSHIP_MESSAGES.map((item) => {
                  const active = activeLeaderTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveLeaderTab(item.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1E3A8A] text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.roleLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
                <p className="text-xs uppercase tracking-widest text-[#1E3A8A] font-semibold">
                  {selectedLeader.roleLabel}
                </p>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {selectedLeader.name}
                </h3>
                {selectedLeader.qualification && (
                  <p className="text-xs text-slate-500">{selectedLeader.qualification}</p>
                )}
                <p className="text-xs text-slate-500 pt-2">
                  Victor Public School · Krishan Nagar, Tehsil Camp, Panipat
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <p className="font-serif italic text-xl text-slate-900 leading-snug">
                  “{selectedLeader.headline}”
                </p>
                {selectedLeader.message.map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed max-w-prose">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Attributable Panipat Parent Testimonial */}
          <blockquote className="border-y border-slate-200 py-10 text-center space-y-5 max-w-4xl mx-auto">
            <p className="font-serif italic text-xl sm:text-2xl text-slate-800 leading-relaxed headline-balance">
              “Both our children started in Victor Public School’s Pre-School Toy Room and are now excelling in Secondary classes. The Smart Class teaching, disciplined values, affordable fees, and safe campus right here in Krishan Nagar, Tehsil Camp, Panipat give our family complete peace of mind.”
            </p>
            <footer className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-2">
              <span className="font-semibold text-slate-900">Mr. Sanjay & Mrs. Kavita Bansal</span>
              <span aria-hidden="true">·</span>
              <span>Parents of Harshita (Class IX) & Aarav (Class V)</span>
              <span aria-hidden="true">·</span>
              <span>Krishan Nagar, Tehsil Camp, Panipat</span>
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};
