import React, { useEffect, useMemo, useState } from 'react';
import { Check, ArrowRight, RotateCcw } from 'lucide-react';
import { ADMISSIONS_CRITERIA, VPS_DOCUMENTS_REQUIRED } from '../data/schoolData';
import { ContactPrefill } from '../types/school';

interface AdmissionsSectionProps {
  onNavigateWithInquiry: (prefill: ContactPrefill) => void;
}

type CriteriaTab = 'nursery' | 'primary' | 'secondary';
type FeeSlab = 'preschool' | 'primary' | 'middle' | 'secondary';
type ConcessionKey = 'regular' | 'sibling' | 'alumni';
type TransportKey = 'none' | 'local' | 'extended';

const FEE_SLAB_CONFIG: Record<
  FeeSlab,
  { label: string; monthlyTuition: number; annualActivitySmart: number }
> = {
  preschool: {
    label: 'Pre-School (Nursery) & KG',
    monthlyTuition: 3350,
    annualActivitySmart: 4200,
  },
  primary: {
    label: 'Primary Wing (Class I – V)',
    monthlyTuition: 3650,
    annualActivitySmart: 4800,
  },
  middle: {
    label: 'Middle Wing (Class VI – VIII)',
    monthlyTuition: 3950,
    annualActivitySmart: 5400,
  },
  secondary: {
    label: 'Secondary Wing (Class IX – X)',
    monthlyTuition: 4250,
    annualActivitySmart: 6200,
  },
};

const CONCESSION_CONFIG: Record<
  ConcessionKey,
  { label: string; discountRate: number; note: string }
> = {
  regular: {
    label: 'General Category',
    discountRate: 0,
    note: 'Affordable fee schedule aligned with CBSE & Haryana norms; online & school office payment supported.',
  },
  sibling: {
    label: 'Sibling Studying in VPS (10% Tuition Concession)',
    discountRate: 0.1,
    note: '10% monthly tuition concession applicable for the second child studying simultaneously in VPS.',
  },
  alumni: {
    label: 'VPS Alumni / Merit Scholar (15% Tuition Concession)',
    discountRate: 0.15,
    note: '15% monthly tuition concession for VPS alumni wards and meritorious scholars.',
  },
};

const TRANSPORT_CONFIG: Record<TransportKey, { label: string; monthlyFee: number }> = {
  none: { label: 'Walking / Own Drop (Krishan Nagar & Tehsil Camp)', monthlyFee: 0 },
  local: {
    label: 'Zone 1: Tehsil Camp / Ram Nagar / Desraj Colony / Fatehpuri Chowk (₹950/mo)',
    monthlyFee: 950,
  },
  extended: {
    label: 'Zone 2: Model Town / Sector 11–12 / Sector 13–17 / Sanoli Road (₹1,300/mo)',
    monthlyFee: 1300,
  },
};

const STORAGE_KEY = 'vps_panipat_documents_checklist_v1';

export const AdmissionsPage: React.FC<AdmissionsSectionProps> = ({ onNavigateWithInquiry }) => {
  const [criteriaTab, setCriteriaTab] = useState<CriteriaTab>('nursery');

  const [checkedDocs, setCheckedDocs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['dob_aadhaar'];
    } catch {
      return ['dob_aadhaar'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedDocs));
    } catch {
      // Ignore storage error
    }
  }, [checkedDocs]);

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Realistic VPS Fee & Transport Estimator (₹ INR)
  const [feeSlab, setFeeSlab] = useState<FeeSlab>('preschool');
  const [concession, setConcession] = useState<ConcessionKey>('regular');
  const [transport, setTransport] = useState<TransportKey>('none');

  const feeSummary = useMemo(() => {
    const slab = FEE_SLAB_CONFIG[feeSlab];
    const conc = CONCESSION_CONFIG[concession];
    const trans = TRANSPORT_CONFIG[transport];

    const monthlyWaiver = Math.round(slab.monthlyTuition * conc.discountRate);
    const netMonthlyTuition = slab.monthlyTuition - monthlyWaiver;
    const totalMonthlyWithTransport = netMonthlyTuition + trans.monthlyFee;
    const estimatedAnnualTotal =
      netMonthlyTuition * 12 + slab.annualActivitySmart + trans.monthlyFee * 11;

    return {
      slabLabel: slab.label,
      monthlyTuition: slab.monthlyTuition,
      monthlyWaiver,
      netMonthlyTuition,
      monthlyTransport: trans.monthlyFee,
      totalMonthlyWithTransport,
      annualActivitySmart: slab.annualActivitySmart,
      estimatedAnnualTotal,
      concessionLabel: conc.label,
      note: conc.note,
    };
  }, [feeSlab, concession, transport]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const activeCriteria = ADMISSIONS_CRITERIA[criteriaTab];

  return (
    <section id="admissions" className="scroll-mt-16 border-t border-slate-200 bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header & Criteria Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
              Admissions 2027–28 · CBSE & NEP 2020 Guidelines
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 headline-balance">
              Simple, transparent admission process & documents checklist.
            </h2>
            <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
              Online Registration Forms and offline counter forms at Krishan Nagar, Tehsil Camp, Panipat are open for Pre-School (Nursery), KG, Primary, and Secondary classes.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select Admission Wing"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={criteriaTab === 'nursery'}
              onClick={() => {
                setCriteriaTab('nursery');
                setFeeSlab('preschool');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                criteriaTab === 'nursery'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pre-School / Nursery
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={criteriaTab === 'primary'}
              onClick={() => {
                setCriteriaTab('primary');
                setFeeSlab('primary');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                criteriaTab === 'primary'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Primary (Class I – V)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={criteriaTab === 'secondary'}
              onClick={() => {
                setCriteriaTab('secondary');
                setFeeSlab('secondary');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                criteriaTab === 'secondary'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Class VI – Class X
            </button>
          </div>
        </div>

        {/* Criteria + Official Documents Required Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 rounded-lg border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#1E3A8A] font-semibold">
                Selected Wing Guidelines
              </p>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                {activeCriteria.heading}
              </h3>
            </div>

            <dl className="divide-y divide-slate-200 border-y border-slate-200 text-sm">
              <div className="py-3.5 space-y-1">
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Age / Eligibility Requirement
                </dt>
                <dd className="text-slate-800 leading-relaxed">{activeCriteria.ageRule}</dd>
              </div>
              <div className="py-3.5 space-y-1">
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Selection & Interaction Criteria
                </dt>
                <dd className="text-slate-800 leading-relaxed">{activeCriteria.process}</dd>
              </div>
              <div className="py-3.5 space-y-1">
                <dt className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Regular School Hours
                </dt>
                <dd className="font-mono tabular-nums text-xs sm:text-sm text-slate-800">
                  {activeCriteria.timings}
                </dd>
              </div>
            </dl>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Pre-School Priority Weightage
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-md bg-white border border-slate-200">
                  <p className="font-mono tabular-nums text-lg font-bold text-[#1E3A8A]">60 Pts</p>
                  <p className="text-xs text-slate-600 mt-0.5">Neighbourhood (Panipat)</p>
                </div>
                <div className="p-3 rounded-md bg-white border border-slate-200">
                  <p className="font-mono tabular-nums text-lg font-bold text-[#1E3A8A]">20 Pts</p>
                  <p className="text-xs text-slate-600 mt-0.5">Sibling in VPS</p>
                </div>
                <div className="p-3 rounded-md bg-white border border-slate-200">
                  <p className="font-mono tabular-nums text-lg font-bold text-[#1E3A8A]">20 Pts</p>
                  <p className="text-xs text-slate-600 mt-0.5">Alumni / Girl Child</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Official Documents Required at Admission
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-mono tabular-nums">
                  {checkedDocs.length} of {VPS_DOCUMENTS_REQUIRED.length} documents ready
                </p>
              </div>
              {checkedDocs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCheckedDocs([])}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <ul className="divide-y divide-slate-200/80 mt-2">
              {VPS_DOCUMENTS_REQUIRED.map((doc) => {
                const checked = checkedDocs.includes(doc.id);
                return (
                  <li key={doc.id} className="py-3.5">
                    <label className="flex items-start gap-3.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDoc(doc.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          checked
                            ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                            : 'bg-white border-slate-400 group-hover:border-[#1E3A8A]'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </span>
                      <span className="space-y-1">
                        <span
                          className={`block text-sm font-medium transition-colors ${
                            checked ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {doc.title}
                        </span>
                        <span className="block text-xs text-slate-600 leading-relaxed">
                          {doc.detail}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Affordable Fee & Panipat Transport Calculator (₹ INR) */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
              Fee Schedule & Panipat Transport Estimator (₹ INR)
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5">
              Estimate Monthly & Annual School Fees
            </h3>
            <p className="text-sm text-slate-600 mt-1.5">
              Check approximate monthly tuition, Smart Class / Lab charges, sibling concession, and optional transport fees across Tehsil Camp, Model Town, and Panipat sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-white p-6 space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2.5">
                  1. Select Class Wing
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(FEE_SLAB_CONFIG) as FeeSlab[]).map((key) => {
                    const item = FEE_SLAB_CONFIG[key];
                    const active = feeSlab === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFeeSlab(key)}
                        className={`p-3.5 text-left border rounded-md transition-colors cursor-pointer ${
                          active
                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block font-mono tabular-nums text-xs text-slate-500 mt-0.5">
                          Tuition: {formatINR(item.monthlyTuition)} / month
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2.5">
                  2. Applicable Concession
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(CONCESSION_CONFIG) as ConcessionKey[]).map((key) => {
                    const item = CONCESSION_CONFIG[key];
                    const active = concession === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setConcession(key)}
                        className={`p-3 text-left border rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          active
                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 text-[#1E3A8A]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2.5">
                  3. Optional School Bus / Van Service (Panipat Routes)
                </label>
                <div className="space-y-2">
                  {(Object.keys(TRANSPORT_CONFIG) as TransportKey[]).map((key) => {
                    const item = TRANSPORT_CONFIG[key];
                    const active = transport === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTransport(key)}
                        className={`w-full p-3 text-left border rounded-md text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 text-slate-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#1E3A8A] font-semibold border-b border-slate-200 pb-3">
                  Estimated Fee Summary ({feeSummary.slabLabel})
                </p>

                <dl className="divide-y divide-slate-200 text-sm">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-600">Standard Monthly Tuition</dt>
                    <dd className="font-mono tabular-nums font-medium text-slate-900">
                      {formatINR(feeSummary.monthlyTuition)}
                    </dd>
                  </div>
                  {feeSummary.monthlyWaiver > 0 && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-emerald-800 font-medium">Monthly Concession</dt>
                      <dd className="font-mono tabular-nums font-semibold text-emerald-700">
                        − {formatINR(feeSummary.monthlyWaiver)}
                      </dd>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-600">Monthly Transport (Optional)</dt>
                    <dd className="font-mono tabular-nums font-medium text-slate-900">
                      {feeSummary.monthlyTransport > 0
                        ? `+ ${formatINR(feeSummary.monthlyTransport)}`
                        : '₹0'}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="font-semibold text-slate-900">Net Monthly Payable</dt>
                    <dd className="font-mono tabular-nums text-2xl font-bold text-[#1E3A8A]">
                      {formatINR(feeSummary.totalMonthlyWithTransport)}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4 text-xs">
                    <dt className="text-slate-500">
                      Approx. Full-Year Total (incl. Smart Class & Labs)
                    </dt>
                    <dd className="font-mono tabular-nums font-semibold text-slate-800">
                      {formatINR(feeSummary.estimatedAnnualTotal)} / yr
                    </dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-500 leading-relaxed">{feeSummary.note}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() =>
                    onNavigateWithInquiry({
                      enquiryType: 'Online Admission Registration (2027–28)',
                      applyingClass: feeSummary.slabLabel,
                      subjectContext: `Fee Estimate: ${feeSummary.slabLabel} (${formatINR(
                        feeSummary.totalMonthlyWithTransport
                      )}/mo)`,
                      initialMessage: `Namaste Victor Public School Office (Krishan Nagar, Tehsil Camp, Panipat), I checked the fee estimate for ${
                        feeSummary.slabLabel
                      } (${formatINR(
                        feeSummary.totalMonthlyWithTransport
                      )}/month) and would like to register my child for 2027–28 admission.`,
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Proceed to Online Registration Form ↓</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
