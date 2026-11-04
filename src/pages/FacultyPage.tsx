import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/schoolData';
import { EditorialImage } from '../components/EditorialImage';
import { ContactPrefill, Department, FacultyMember } from '../types/school';

interface FacultySectionProps {
  onNavigateWithInquiry: (prefill: ContactPrefill) => void;
}

const DEPARTMENT_TABS: Department[] = [
  Department.All,
  Department.ScienceMaths,
  Department.LanguagesSST,
  Department.ComputerSmart,
  Department.PrePrimaryArts,
];

export const FacultyPage: React.FC<FacultySectionProps> = ({ onNavigateWithInquiry }) => {
  const [selectedDept, setSelectedDept] = useState<Department>(Department.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaculty, setActiveFaculty] = useState<FacultyMember | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveFaculty(null);
      }
    };
    if (activeFaculty) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFaculty]);

  const featuredTeachers = useMemo(
    () => FACULTY_MEMBERS.filter((member) => member.isFeatured && member.portraitUrl),
    []
  );

  const filteredFaculty = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FACULTY_MEMBERS.filter((member) => {
      const matchesDept = selectedDept === Department.All || member.department === selectedDept;
      if (!matchesDept) return false;
      if (!q) return true;

      const haystack = [
        member.name,
        member.designation,
        member.department,
        member.specialization,
        ...member.qualifications,
        ...member.subjects.map((s) => `${s.code} ${s.title}`),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [selectedDept, searchQuery]);

  return (
    <section
      id="faculty"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50/85 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
            Our Educators · TGT, PRT & Pre-Primary Mentors
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 headline-balance">
            Experienced teachers committed to every child’s growth.
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Our qualified faculty members combine strong NCERT subject mastery with warm personal attention across Smart Classrooms, Science & Computer Labs, and the Pre-School Toy Wing.
          </p>
        </div>

        {/* Featured Principal & Senior Lab Coordinator Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredTeachers.map((teacher) => (
            <article
              key={teacher.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-6 rounded-lg border border-slate-200 bg-white p-6 items-start"
            >
              <div className="sm:col-span-5">
                <EditorialImage
                  src={teacher.portraitUrl}
                  alt={`Portrait of ${teacher.name}`}
                  caption={teacher.portraitCaption}
                  aspectClass="aspect-[3/4]"
                />
              </div>

              <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-[#1E3A8A]">{teacher.department}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{teacher.experienceYears} Yrs Exp.</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {teacher.designation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500">{teacher.qualifications.join(' · ')}</p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {teacher.biography}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveFaculty(teacher)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>View Teacher Profile & PTM Hours</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Filter & Search Faculty Directory */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter faculty by wing"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-lg"
            >
              {DEPARTMENT_TABS.map((dept) => {
                const active = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher or subject..."
                aria-label="Search faculty profiles"
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>
          </div>

          {filteredFaculty.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center space-y-3">
              <p className="font-serif text-lg text-slate-800">
                No faculty profiles match your current filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept(Department.All);
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors cursor-pointer"
              >
                Show All Faculty
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((member) => (
                <article
                  key={member.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-[#1E3A8A]/50 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-[#1E3A8A]">{member.department}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{member.experienceYears} Yrs</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        <button
                          type="button"
                          onClick={() => setActiveFaculty(member)}
                          className="text-left hover:text-[#1E3A8A] transition-colors cursor-pointer"
                        >
                          {member.name}
                        </button>
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {member.designation}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500">{member.qualifications[0]}</p>

                    <p className="text-sm text-slate-600 leading-relaxed">{member.biography}</p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono tabular-nums text-slate-500 truncate">
                      {member.subjects.map((s) => s.code).join(' / ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveFaculty(member)}
                      className="font-semibold text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Faculty Profile Modal */}
      {activeFaculty && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vps-faculty-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-[1px]"
          onClick={() => setActiveFaculty(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-lg bg-white border border-slate-200 p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                  {activeFaculty.department} ·{' '}
                  <span className="font-mono tabular-nums">
                    {activeFaculty.experienceYears} Years Teaching Experience
                  </span>
                </p>
                <h2
                  id="vps-faculty-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
                >
                  {activeFaculty.name}
                </h2>
                <p className="text-sm font-medium text-slate-600">{activeFaculty.designation}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFaculty(null)}
                aria-label="Close teacher profile"
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed">{activeFaculty.biography}</p>

              <dl className="divide-y divide-slate-200 border-y border-slate-200 text-sm">
                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Qualifications
                  </dt>
                  <dd className="sm:col-span-2 space-y-1 text-slate-800 text-xs sm:text-sm">
                    {activeFaculty.qualifications.map((deg) => (
                      <div key={deg}>{deg}</div>
                    ))}
                  </dd>
                </div>

                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Subjects & Classes
                  </dt>
                  <dd className="sm:col-span-2 space-y-2">
                    {activeFaculty.subjects.map((s) => (
                      <div
                        key={s.code}
                        className="flex items-baseline justify-between gap-2 text-xs sm:text-sm"
                      >
                        <span>
                          <strong className="font-mono tabular-nums font-medium text-[#1E3A8A] mr-2">
                            {s.code}
                          </strong>
                          <span className="text-slate-900">{s.title}</span>
                        </span>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {s.classesTaught}
                        </span>
                      </div>
                    ))}
                  </dd>
                </div>

                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Highlights
                  </dt>
                  <dd className="sm:col-span-2 text-slate-800 text-xs sm:text-sm">
                    {activeFaculty.achievementHighlight}
                  </dd>
                </div>

                <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    PTM & Wing Duty
                  </dt>
                  <dd className="sm:col-span-2 text-slate-700 text-xs space-y-1">
                    <div>
                      {activeFaculty.roomLocation} · {activeFaculty.ptmHours}
                    </div>
                    <div className="text-slate-500">{activeFaculty.coCurricularRole}</div>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveFaculty(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const member = activeFaculty;
                  setActiveFaculty(null);
                  onNavigateWithInquiry({
                    enquiryType: 'PTM / Academic Query for Teacher',
                    subjectContext: `Academic Query: ${member.name} (${member.department})`,
                    initialMessage: `Namaste Victor Public School Office, I would like to connect regarding ${member.name} (${member.designation}).`,
                  });
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request PTM Appointment ↓</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
