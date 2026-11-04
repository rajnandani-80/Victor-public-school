import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, Share2, Check, ArrowRight } from 'lucide-react';
import { MANDATORY_DISCLOSURE_ROWS, NEWS_ARTICLES } from '../data/schoolData';
import { EditorialImage } from '../components/EditorialImage';
import { NewsArticle, NewsCategory } from '../types/school';

const CATEGORY_TABS: NewsCategory[] = [
  NewsCategory.All,
  NewsCategory.Admissions,
  NewsCategory.Academics,
  NewsCategory.Cultural,
  NewsCategory.Sports,
];

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>(NewsCategory.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveArticle(null);
      }
    };
    if (activeArticle) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  const isDefaultBroadsheet = selectedCategory === NewsCategory.All && !searchQuery.trim();

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return NEWS_ARTICLES.filter((article) => {
      const matchesCat =
        selectedCategory === NewsCategory.All || article.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;

      const haystack = [
        article.title,
        article.deck,
        article.circularNo,
        article.author,
        article.category,
        ...article.bodyParagraphs,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  const leadStory = NEWS_ARTICLES.find((a) => a.tier === 1) || NEWS_ARTICLES[0];
  const secondaryStories = NEWS_ARTICLES.filter((a) => a.tier === 2);
  const archiveStories = NEWS_ARTICLES.filter((a) => a.tier === 3);

  const handleCopyCircularRef = (article: NewsArticle) => {
    const refText = `[${article.circularNo}] ${article.title} — Victor Public School, Krishan Nagar, Tehsil Camp, Panipat (${article.publishedDate})`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(refText).catch(() => {});
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2200);
  };

  return (
    <section id="news" className="scroll-mt-16 border-t border-slate-200 bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header + Filter Toolbar */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
              School Notice Board · Events & Statutory Disclosure
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2 headline-balance">
              Latest circulars, campus events & public disclosure.
            </h2>
            <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
              Official notices for parents regarding Nursery to Class IX admissions, Science & Maths exhibitions, PTM dates, uniform guidelines, and district sports achievements.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div
              role="tablist"
              aria-label="Filter notices by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-lg"
            >
              {CATEGORY_TABS.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
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
                placeholder="Search PTM, circular, sports..."
                aria-label="Search school notices"
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>
          </div>
        </div>

        {/* 3-Tier Editorial Broadsheet View OR Filtered Results */}
        {isDefaultBroadsheet ? (
          <div className="space-y-14">
            {/* Tier 1: Lead Notice */}
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 border-b border-slate-200">
              <div className="lg:col-span-7">
                <EditorialImage
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  caption={leadStory.imageCaption}
                  aspectClass="aspect-[4/3]"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-5 pt-1">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#1E3A8A]">{leadStory.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{leadStory.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{leadStory.circularNo}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-[1.18] headline-balance">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(leadStory)}
                      className="text-left hover:text-[#1E3A8A] transition-colors cursor-pointer"
                    >
                      {leadStory.title}
                    </button>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {leadStory.deck}
                  </p>

                  <p className="text-xs text-slate-500">
                    Issued by <span className="font-medium text-slate-800">{leadStory.author}</span> ·{' '}
                    {leadStory.authorRole}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(leadStory)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Read Full Admission Circular</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>

            {/* Tier 2: Secondary Event Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-14 border-b border-slate-200">
              {secondaryStories.map((story) => (
                <article key={story.id} className="flex flex-col justify-between space-y-4 group">
                  <div className="space-y-3.5">
                    <EditorialImage
                      src={story.imageUrl}
                      alt={story.title}
                      caption={story.imageCaption}
                      aspectClass="aspect-[4/3]"
                    />
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
                      <span className="font-medium text-[#1E3A8A]">{story.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{story.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{story.circularNo}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-[#1E3A8A] transition-colors">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(story)}
                        className="text-left cursor-pointer"
                      >
                        {story.title}
                      </button>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{story.deck}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {story.author} · {story.authorRole}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(story)}
                      className="font-semibold text-slate-900 group-hover:text-[#1E3A8A] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Read Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Tier 3: Recent Parent Circulars & Zonal Sports */}
            <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden">
              {archiveStories.map((story) => (
                <article
                  key={story.id}
                  className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="md:w-52 shrink-0 space-y-1">
                    <p className="font-mono tabular-nums text-xs font-semibold text-slate-700">
                      {story.circularNo}
                    </p>
                    <p className="font-mono tabular-nums text-xs text-slate-500">
                      {story.publishedDate} · {story.category}
                    </p>
                  </div>

                  <div className="flex-1 max-w-2xl space-y-1.5">
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(story)}
                        className="text-left hover:text-[#1E3A8A] transition-colors cursor-pointer"
                      >
                        {story.title}
                      </button>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{story.deck}</p>
                  </div>

                  <div className="md:w-32 shrink-0 md:text-right">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(story)}
                      className="text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Open Notice →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Notices View */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <p>
                Showing{' '}
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {filteredArticles.length}
                </span>{' '}
                matching {filteredArticles.length === 1 ? 'notice' : 'notices'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(NewsCategory.All);
                  setSearchQuery('');
                }}
                className="font-semibold text-[#1E3A8A] hover:underline underline-offset-4 cursor-pointer"
              >
                Show All Notices
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-10 text-center space-y-3">
                <p className="font-serif text-lg text-slate-800">
                  No circulars or updates match your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(NewsCategory.All);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {filteredArticles.map((story) => (
                  <article
                    key={story.id}
                    className="p-6 flex flex-col md:flex-row gap-6 justify-between"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-[#1E3A8A]">{story.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{story.publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{story.circularNo}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        <button
                          type="button"
                          onClick={() => setActiveArticle(story)}
                          className="text-left hover:text-[#1E3A8A] transition-colors cursor-pointer"
                        >
                          {story.title}
                        </button>
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{story.deck}</p>
                    </div>

                    <div className="self-start md:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(story)}
                        className="px-4 py-2 text-xs font-semibold text-slate-900 border border-slate-300 rounded-md hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Read Notice →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CBSE Mandatory Public Disclosure Summary Table */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
              Statutory Information
            </p>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Mandatory Public Disclosure Summary
            </h3>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 divide-y divide-slate-200 border-t border-slate-200 text-xs sm:text-sm">
            {MANDATORY_DISCLOSURE_ROWS.map((row) => (
              <div key={row.label} className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-slate-600 font-medium">{row.label}</dt>
                <dd className="font-mono tabular-nums text-right text-slate-900 font-semibold">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Circular & Event Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vps-circular-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-[1px]"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white border border-slate-200 p-6 sm:p-10 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="uppercase tracking-widest font-semibold text-[#1E3A8A]">
                  {activeArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeArticle.circularNo}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeArticle.publishedDate}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close notice reader"
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <article className="py-8 max-w-2xl mx-auto space-y-6">
              <header className="space-y-4">
                <h2
                  id="vps-circular-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-[1.16] headline-balance"
                >
                  {activeArticle.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">{activeArticle.deck}</p>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-3 text-xs text-slate-600">
                  <span>
                    Issued by <strong className="text-slate-900">{activeArticle.author}</strong> ·{' '}
                    {activeArticle.authorRole}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCircularRef(activeArticle)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedCitation ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Reference Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Circular No.</span>
                      </>
                    )}
                  </button>
                </div>
              </header>

              {activeArticle.imageUrl && (
                <EditorialImage
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  caption={activeArticle.imageCaption}
                  aspectClass="aspect-[16/10]"
                />
              )}

              <div className="space-y-5 text-base text-slate-700 leading-[1.8]">
                {activeArticle.bodyParagraphs.map((paragraph, idx) => (
                  <React.Fragment key={idx}>
                    <p
                      className={
                        idx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1E3A8A] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                          : ''
                      }
                    >
                      {paragraph}
                    </p>
                    {idx === 0 && activeArticle.pullQuote && (
                      <blockquote className="my-8 py-6 border-y border-slate-200 space-y-2">
                        <p className="font-serif italic text-xl text-slate-900 leading-relaxed">
                          “{activeArticle.pullQuote.text}”
                        </p>
                        <footer className="text-xs text-slate-500">
                          — {activeArticle.pullQuote.attribution}
                        </footer>
                      </blockquote>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </article>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Victor Public School · Krishan Nagar, Tehsil Camp, Panipat – 132103
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172554] transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
