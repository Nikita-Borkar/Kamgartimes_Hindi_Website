'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HardHat, Briefcase, Trophy, ChevronRight, Eye, Clock, Flame, 
  ShieldAlert, FileText, Sparkles, MapPin, Landmark, Film, Image as ImageIcon 
} from 'lucide-react';
import { ARTICLES, CATEGORIES } from '@/data/newsData';
import NewsAudioButton from '@/components/NewsAudioButton';

interface CategoryNewsGridProps {
  selectedCategory?: string;
}

export default function CategoryNewsGrid({ selectedCategory = 'all' }: CategoryNewsGridProps) {
  const laborArticles = ARTICLES.filter(a => a.category === 'labor');
  const localArticles = ARTICLES.filter(a => a.category === 'local');
  const crimeArticles = ARTICLES.filter(a => a.category === 'crime');
  const editorialArticles = ARTICLES.filter(a => a.category === 'editorial');
  const focusArticles = ARTICLES.filter(a => a.category === 'focus');
  const jobArticles = ARTICLES.filter(a => a.category === 'jobs');
  const politicsArticles = ARTICLES.filter(a => a.category === 'politics');
  const sportsEntertainment = ARTICLES.filter(a => a.category === 'sports' || a.category === 'entertainment');

  // Single Category View when user selects specific tab in navbar
  if (selectedCategory !== 'all') {
    const categoryArticles = ARTICLES.filter(a => a.category === selectedCategory);
    const displayArticles = categoryArticles.length > 0 ? categoryArticles : ARTICLES.slice(0, 6);
    const activeCategoryObj = CATEGORIES.find(c => c.slug === selectedCategory) || { slug: selectedCategory, label: selectedCategory };

    return (
      <div className="space-y-6 py-2">
        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-red-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-xl text-zinc-900 dark:text-white font-serif">
                  {activeCategoryObj.label} बुलेटिन
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {activeCategoryObj.label} श्रेणी की सभी प्रमुख ताज़ा खबरें और अपडेट्स
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 px-3 py-1 rounded-full border border-red-200 dark:border-red-900">
              {displayArticles.length} खबरें पाई गईं
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {displayArticles.map((article) => (
              <article key={article.id} className="group flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-red-500/50 transition">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <span className="bg-red-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow">
                        {article.categoryLabel}
                      </span>
                      <NewsAudioButton 
                        title={article.title} 
                        summary={article.summary} 
                        variant="badge" 
                      />
                    </div>
                  </div>
                  <Link href={`/news/${article.id}`}>
                    <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">{article.author?.name || "विशेष रिपोर्टर"}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Multi-Section Rich Homepage View when 'all' is selected
  return (
    <div className="space-y-6 md:space-y-10 py-2">
      
      {/* SECTION 1: LABOR & WORKER SPECIAL (कामगार & श्रमिक अधिकार) */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shadow">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-zinc-900 dark:text-white font-serif">
                कामगार & श्रमिक अधिकार (Labor Welfare)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">न्यूनतम वेतन, ई-श्रम, ईपीएफओ और श्रमिक सुरक्षा</p>
            </div>
          </div>
          <Link href="/category/labor" className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
            और देखें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {laborArticles.map((article) => (
            <article key={article.id} className="group flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-red-500/50 transition">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span className="bg-amber-500 text-zinc-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow">
                      विशेष रिपोर्ट
                    </span>
                    <NewsAudioButton 
                      title={article.title} 
                      summary={article.summary} 
                      variant="badge" 
                    />
                  </div>
                </div>
                <Link href={`/news/${article.id}`}>
                  <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 leading-snug line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{article.author?.name || "महेंद्र शेंडे"}</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Eye className="w-3.5 h-3.5" />
                  {article.views.toLocaleString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2: LOCAL NAGPUR & REGIONAL NEWS (नागपुर व विदर्भ बुलेटिन) */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-red-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-zinc-900 dark:text-white font-serif">
                नागपुर व विदर्भ स्थानिक बुलेटिन (Local News)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">नागपुर, कलमेश्वर, सावनेर व विदर्भ क्षेत्र की प्रमुख खबरें</p>
            </div>
          </div>
          <Link href="/category/local" className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
            और देखें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {localArticles.map((article) => (
            <article key={article.id} className="group flex gap-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900">
                    {article.city} बुलेटिन
                  </span>
                  <NewsAudioButton 
                    title={article.title} 
                    summary={article.summary} 
                    variant="icon" 
                    className="!p-1"
                  />
                </div>
                <Link href={`/news/${article.id}`}>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: CRIME & LAW (गुन्हेवार्ता & क्राइम अपडेट्स) */}
      <section className="bg-zinc-950 text-white rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-zinc-800 shadow-2xl space-y-3 md:space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-white font-serif">
                गुन्हेवार्ता (Crime & Law Desk)
              </h3>
              <p className="text-xs text-zinc-400">पुलिस अपडेट्स, अपराध जांच और सतर्कता समाचार</p>
            </div>
          </div>
          <Link href="/category/crime" className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1">
            सभी खबरें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
          {crimeArticles.map((article) => (
            <article key={article.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex gap-4 hover:border-red-500/60 transition group">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-800">
                    क्राइम अलर्ट
                  </span>
                  <NewsAudioButton 
                    title={article.title} 
                    summary={article.summary} 
                    variant="icon" 
                    className="!p-1.5"
                  />
                </div>
                <Link href={`/news/${article.id}`}>
                  <h4 className="font-extrabold text-sm text-zinc-100 group-hover:text-red-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 pt-1">
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{article.views.toLocaleString()} व्यूज</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4: EDITORIAL & OPINION (मुख्य संपादकीय - महेंद्र शेंडे) */}
      <section className="bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 text-white rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-amber-500/40 shadow-2xl space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shadow">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-white font-serif">
                संपादकीय & विचारमंच (Editorial Desk)
              </h3>
              <p className="text-xs text-amber-200/80">प्रधान संपादक महेंद्र शेंडे का विशेष संपादकीय दृष्टिकोण</p>
            </div>
          </div>
          <Link href="/category/editorial" className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1">
            और पढ़ें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {editorialArticles.map((article) => (
            <div key={article.id} className="bg-zinc-900/90 border border-amber-500/20 rounded-2xl p-5 space-y-3 hover:border-amber-400/60 transition">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-xs font-bold font-serif flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  मुख्य अग्रलेख
                </span>
                <NewsAudioButton title={article.title} summary={article.summary} variant="badge" />
              </div>
              <Link href={`/news/${article.id}`}>
                <h4 className="font-black text-lg text-white hover:text-amber-300 font-serif leading-snug">
                  {article.title}
                </h4>
              </Link>
              <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
              <div className="pt-2 border-t border-zinc-800 text-xs text-amber-300/90 font-semibold">
                लेखक: {article.author?.name} ({article.author?.role})
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SARKARI JOBS & SCHEMES (सरकारी नौकरी & योजनाएं) */}
      <section className="bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-950 text-white rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-emerald-900/50 shadow-xl space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-white font-serif">
                सरकारी नौकरी & योजना अलर्ट 2026
              </h3>
              <p className="text-xs text-emerald-200/80">रेलवे, एसएससी, राज्य भर्ती और जनकल्याणकारी योजनाएं</p>
            </div>
          </div>
          <Link href="/category/jobs" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
            सभी वैकेंसियां <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {jobArticles.map((job) => (
            <div key={job.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4.5 flex gap-4 hover:border-emerald-500/60 transition group">
              <img
                src={job.imageUrl}
                alt={job.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-800 inline-block">
                    भर्ती भर्ती 2026
                  </span>
                  <NewsAudioButton 
                    title={job.title} 
                    summary={job.summary} 
                    variant="icon" 
                    className="!p-1.5"
                  />
                </div>
                <Link href={`/news/${job.id}`}>
                  <h4 className="font-extrabold text-sm text-zinc-100 group-hover:text-emerald-400 line-clamp-2 leading-snug">
                    {job.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 pt-1">
                  <span>{job.readTime}</span>
                  <span>•</span>
                  <span className="text-amber-400 font-bold">{job.views} आवेदन प्राप्त</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FOCUS & SPECIAL REPORTS (लक्षवेधी) */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-red-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-xl text-zinc-900 dark:text-white font-serif">
                लक्षवेधी विशेष कवरेज (Special Focus Desk)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">समाज सरोकार व जनहितैषी विशेष खोजी रिपोर्ट</p>
            </div>
          </div>
          <Link href="/category/focus" className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
            और देखें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {focusArticles.map((article) => (
            <article key={article.id} className="group flex gap-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                    {article.categoryLabel}
                  </span>
                  <NewsAudioButton 
                    title={article.title} 
                    summary={article.summary} 
                    variant="icon" 
                    className="!p-1"
                  />
                </div>
                <Link href={`/news/${article.id}`}>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 7: SPORTS & ENTERTAINMENT (खेल और मनोरंजन) */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-3 md:space-y-6">
        <div className="flex items-center justify-between pb-4 border-b-2 border-red-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-black text-xl text-zinc-900 dark:text-white font-serif">
              खेल एवं मनोरंजन जगत (Sports & Cinema)
            </h3>
          </div>
          <Link href="/category/sports" className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
            और देखें <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sportsEntertainment.map((article) => (
            <article key={article.id} className="group flex gap-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-32 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                    {article.categoryLabel}
                  </span>
                  <NewsAudioButton 
                    title={article.title} 
                    summary={article.summary} 
                    variant="icon" 
                    className="!p-1"
                  />
                </div>
                <Link href={`/news/${article.id}`}>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
