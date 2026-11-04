import React from 'react';
import { SectionId } from '../types/school';

interface FooterProps {
  onScrollTo: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif text-xl font-bold text-white tracking-wide">
              Victor Public School
            </p>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Established in 1996. An English-Medium Co-Educational School affiliated to C.B.S.E., New Delhi, committed to holistic NCERT academics and five-fold <em>Panchmukhi Shiksha</em>.
            </p>
            <p className="text-xs text-slate-400 pt-1 leading-relaxed">
              Krishan Nagar, Tehsil Camp, Panipat, Haryana – 132103, India
              <br />
              Phone:{' '}
              <span className="font-mono tabular-nums text-slate-200">+91-8375908693</span> ·{' '}
              <span className="font-mono tabular-nums text-slate-200">0180-2639151</span>
              <br />
              Email: <span className="text-slate-200">info@victorpublicschool.org.in</span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Page Sections
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo(SectionId.About)}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  About & Panchmukhi Shiksha
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo(SectionId.Admissions)}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  Admissions & Fee Estimator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo(SectionId.Faculty)}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  Principal & Faculty Profiles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo(SectionId.News)}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  Circulars & Public Disclosure
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo(SectionId.Contact)}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  Online Registration & Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Statutory School Summary
            </h2>
            <dl className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <dt>Board Affiliation</dt>
                <dd className="text-slate-200">C.B.S.E., New Delhi</dd>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <dt>Location</dt>
                <dd className="text-slate-200">Tehsil Camp, Panipat</dd>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <dt>Established</dt>
                <dd className="font-mono tabular-nums text-slate-200">1996</dd>
              </div>
              <div className="flex justify-between pt-0.5">
                <dt>Official Portal</dt>
                <dd className="text-slate-200">victorpublicschool.org.in</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 Victor Public School, Krishan Nagar, Tehsil Camp, Panipat – 132103. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onScrollTo(SectionId.News)}
              className="hover:text-white cursor-pointer"
            >
              Mandatory Public Disclosure
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onScrollTo(SectionId.Contact)}
              className="hover:text-white cursor-pointer"
            >
              School Office Helpdesk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
