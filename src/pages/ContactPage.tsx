import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, X } from 'lucide-react';
import { CAMPUS_FAQS } from '../data/schoolData';
import { ContactPrefill } from '../types/school';

interface ContactSectionProps {
  prefill?: ContactPrefill | null;
  onClearPrefill?: () => void;
}

interface FormValues {
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  enquiryType: string;
  applyingClass: string;
  locality: string;
  message: string;
}

interface FormErrors {
  parentName?: string;
  studentName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const ENQUIRY_TYPES = [
  'Online Admission Registration (2027–28)',
  'Fee Schedule & Sibling Concession Query',
  'School Bus / Transport Route Enquiry',
  'PTM / Academic Query for Teacher',
  'SLC / Transfer Certificate (TC) / General Query',
];

const CLASS_OPTIONS = [
  'Pre-School (Nursery)',
  'Pre-Primary (KG)',
  'Primary Wing (Class I – V)',
  'Middle Wing (Class VI – VIII)',
  'Secondary Wing (Class IX – X)',
];

const LOCALITIES = [
  'Krishan Nagar / Tehsil Camp',
  'Ram Nagar / Fatehpuri Chowk',
  'Desraj Colony / Kutani Road',
  'Model Town / Sector 11–12',
  'Sector 13–17 / HUDA Sectors',
  'Sanoli Road / GT Road / Other Panipat Area',
];

export const ContactPage: React.FC<ContactSectionProps> = ({ prefill, onClearPrefill }) => {
  const [values, setValues] = useState<FormValues>({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    enquiryType: prefill?.enquiryType || ENQUIRY_TYPES[0],
    applyingClass: prefill?.applyingClass || CLASS_OPTIONS[0],
    locality: LOCALITIES[0],
    message: prefill?.initialMessage || '',
  });

  const [activeContextLabel, setActiveContextLabel] = useState<string | undefined>(
    prefill?.subjectContext
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    parentName: string;
    studentName: string;
    applyingClass: string;
    phone: string;
    enquiryType: string;
  } | null>(null);

  useEffect(() => {
    if (prefill) {
      setValues((prev) => ({
        ...prev,
        enquiryType: prefill.enquiryType || prev.enquiryType,
        applyingClass: prefill.applyingClass || prev.applyingClass,
        message: prefill.initialMessage || prev.message,
      }));
      setActiveContextLabel(prefill.subjectContext);
      setSubmittedReceipt(null);
    }
  }, [prefill]);

  const validate = (form: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (form.parentName.trim().length < 2) {
      next.parentName = 'Please enter Father’s or Mother’s full name.';
    }
    if (form.studentName.trim().length < 2) {
      next.studentName = 'Please enter the child’s full name.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      next.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (form.email.trim().length > 0) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email.trim())) {
        next.email = 'Please enter a valid email address or leave optional.';
      }
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please add a brief note (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const refNumber = `VPS-2027-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowFormatted = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date());

    setSubmittedReceipt({
      referenceId: refNumber,
      submittedAt: nowFormatted,
      parentName: values.parentName.trim(),
      studentName: values.studentName.trim(),
      applyingClass: values.applyingClass,
      phone: values.phone.trim(),
      enquiryType: values.enquiryType,
    });
    onClearPrefill?.();
  };

  const updateField = <K extends keyof FormValues>(field: K, val: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50/85 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
            Online Registration & Contact Us · Krishan Nagar, Tehsil Camp, Panipat
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 headline-balance">
            Register online or visit our Panipat school office.
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            Submit your 2027–28 Online Registration Enquiry below or contact Victor Public School directly at Krishan Nagar, Tehsil Camp, Panipat, Haryana – 132103.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Online Registration & Parent Enquiry Form */}
          <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="pb-5 mb-6 border-b border-slate-200">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Online Registration & Parent Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill in the details below to generate your Registration Reference Number for school office verification.
              </p>
            </div>

            {activeContextLabel && !submittedReceipt && (
              <div className="mb-6 p-3.5 rounded-md bg-slate-50 border border-slate-300 flex items-center justify-between gap-3 text-xs text-slate-800">
                <span>
                  <strong>Selected Reference:</strong> {activeContextLabel}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveContextLabel(undefined);
                    onClearPrefill?.();
                  }}
                  aria-label="Clear selected reference"
                  className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {submittedReceipt ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Registration Enquiry Recorded
                    </p>
                    <h4 className="font-serif text-2xl font-bold text-slate-900">
                      Namaste, {submittedReceipt.parentName}.
                    </h4>
                  </div>
                </div>

                <dl className="divide-y divide-slate-200 border-y border-slate-200 text-xs sm:text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-600">VPS Registration Ref. No.</dt>
                    <dd className="font-mono tabular-nums font-bold text-[#1E3A8A]">
                      {submittedReceipt.referenceId}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-600">Student Name & Class</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {submittedReceipt.studentName} ({submittedReceipt.applyingClass})
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-600">Enquiry Category</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {submittedReceipt.enquiryType}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-600">Registered Mobile & Date</dt>
                    <dd className="font-mono tabular-nums text-slate-700 text-right">
                      {submittedReceipt.phone} · {submittedReceipt.submittedAt}
                    </dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Admission Desk at Krishan Nagar, Tehsil Camp, Panipat will contact you shortly. You may also call{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    +91-8375908693
                  </span>{' '}
                  or{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    0180-2639151
                  </span>{' '}
                  with Ref. No. <strong>{submittedReceipt.referenceId}</strong>.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setActiveContextLabel(undefined);
                    setValues((prev) => ({ ...prev, studentName: '', message: '' }));
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors cursor-pointer"
                >
                  Register Another Child / New Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="vps-parent-name"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Father’s / Mother’s Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="vps-parent-name"
                      type="text"
                      value={values.parentName}
                      onChange={(e) => updateField('parentName', e.target.value)}
                      aria-invalid={Boolean(errors.parentName)}
                      placeholder="e.g., Sh. Manoj Kumar"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md focus:outline-none ${
                        errors.parentName
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-slate-300 focus:border-[#1E3A8A]'
                      }`}
                    />
                    {errors.parentName && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.parentName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="vps-student-name"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Student’s Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="vps-student-name"
                      type="text"
                      value={values.studentName}
                      onChange={(e) => updateField('studentName', e.target.value)}
                      aria-invalid={Boolean(errors.studentName)}
                      placeholder="e.g., Aaradhya Sharma"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md focus:outline-none ${
                        errors.studentName
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-slate-300 focus:border-[#1E3A8A]'
                      }`}
                    />
                    {errors.studentName && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.studentName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="vps-phone"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      10-Digit Mobile Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="vps-phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      placeholder="+91 98120 XXXXX"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md focus:outline-none font-mono tabular-nums ${
                        errors.phone
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-slate-300 focus:border-[#1E3A8A]'
                      }`}
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="vps-email"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="vps-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="parent@email.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md focus:outline-none ${
                        errors.email
                          ? 'border-red-600 focus:border-red-700'
                          : 'border-slate-300 focus:border-[#1E3A8A]'
                      }`}
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="vps-class"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Class Applying For
                    </label>
                    <select
                      id="vps-class"
                      value={values.applyingClass}
                      onChange={(e) => updateField('applyingClass', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {CLASS_OPTIONS.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="vps-locality"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Residential Area (Panipat)
                    </label>
                    <select
                      id="vps-locality"
                      value={values.locality}
                      onChange={(e) => updateField('locality', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="vps-enquiry-type"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Purpose
                    </label>
                    <select
                      id="vps-enquiry-type"
                      value={values.enquiryType}
                      onChange={(e) => updateField('enquiryType', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vps-message"
                    className="block text-xs font-semibold text-slate-800 mb-1.5"
                  >
                    Child’s Date of Birth / Specific Query <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="vps-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Mention child’s Date of Birth, sibling details (if any), or question regarding admission / transport..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-md focus:outline-none leading-relaxed ${
                      errors.message
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-slate-300 focus:border-[#1E3A8A]'
                    }`}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Submit Online Registration / Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Official Panipat School Office, Directions & FAQs */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                  Official School Contact Details
                </p>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                  Victor Public School, Panipat
                </h3>
              </div>

              <dl className="divide-y divide-slate-200 text-xs sm:text-sm">
                <div className="py-3 space-y-1">
                  <dt className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    School Campus Address
                  </dt>
                  <dd className="text-slate-900 font-medium leading-relaxed">
                    Krishan Nagar, Tehsil Camp, Panipat, Haryana – 132103
                  </dd>
                </div>
                <div className="py-3 space-y-1">
                  <dt className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Telephone & Admission Helpline
                  </dt>
                  <dd className="font-mono tabular-nums text-slate-900 font-semibold space-y-0.5">
                    <div>+91-8375908693</div>
                    <div>0180-2639151</div>
                  </dd>
                </div>
                <div className="py-3 space-y-1">
                  <dt className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Official Email & Website
                  </dt>
                  <dd className="text-[#1E3A8A] font-medium space-y-0.5">
                    <div>info@victorpublicschool.org.in</div>
                    <div className="text-slate-600">www.victorpublicschool.org.in</div>
                  </dd>
                </div>
                <div className="py-3 space-y-1">
                  <dt className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Office & Registration Counter Hours
                  </dt>
                  <dd className="text-slate-700">
                    Monday to Saturday: <span className="font-mono tabular-nums">8:30 AM – 1:30 PM</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
                How to Reach Campus
              </p>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Minutes from Fatehpuri Chowk & GT Road (NH-44)
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li>
                  <strong className="text-slate-900">Rail & Bus Connectivity:</strong> Located in{' '}
                  <strong>Krishan Nagar, Tehsil Camp</strong>, approx. <span className="font-mono tabular-nums">2.5 km</span> from Panipat Junction Railway Station and Panipat Bus Stand.
                </li>
                <li>
                  <strong className="text-slate-900">Nearby Connected Localities:</strong> Direct school transport & easy approach from Fatehpuri Chowk, Ram Nagar, Desraj Colony, Kutani Road, Model Town, Sector 11–12, and Sanoli Road.
                </li>
              </ul>
            </div>

            {/* FAQs Accordion */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Parent FAQs
              </h3>
              <div className="divide-y divide-slate-200">
                {CAMPUS_FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={faq.question} className="py-3.5 first:pt-1 last:pb-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-start justify-between gap-3 text-left text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#1E3A8A] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 mt-0.5 text-slate-500 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
