'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES, CATEGORIES } from '@/data/newsData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import AdBanner from '@/components/AdBanner';
import BreakingTicker from '@/components/BreakingTicker';
import CategoryFilterBar from '@/components/CategoryFilterBar';
import NewsAudioButton from '@/components/NewsAudioButton';
import HoroscopeWidget from '@/components/HoroscopeWidget';
import PollWidget from '@/components/PollWidget';
import { Eye, Clock, ChevronRight, HardHat, Sparkles, Tag } from 'lucide-react';

const SUB_LABELS: Record<string, string> = {
  delhi: 'दिल्ली',
  maharashtra: 'महाराष्ट्र',
  mp: 'मध्य प्रदेश',
  telangana: 'तेलंगाना',
  karnataka: 'कर्नाटक',
  chhattisgarh: 'छत्तीसगढ़',
  rajasthan: 'राजस्थान',
  up: 'उत्तर प्रदेश',
  gujarat: 'गुजरात',
  bihar: 'बिहार',
  wage: 'न्यूनतम वेतन 2026',
  eshram: 'ई-श्रम व पेंशन',
  nagpur: 'नागपुर',
  vidarbha: 'विदर्भ बुलेटिन',
  mumbai: 'मुंबई-ठाणे',
  pune: 'पुणे',
  nashik: 'नाशिक',
  sambhajinagar: 'संभाजीनगर',
  amravati: 'अमरावती',
  wardha: 'वर्धा',
  breaking: 'ब्रेकिंग न्यूज़ 24x7',
  top: 'प्रमुख घडामोडी',
  yojana: 'सरकारी योजना 2026',
  trending: 'ट्रेंडिंग भारत',
  corruption: 'भ्रष्टाचार व घोटाळे',
  local: 'स्थानिक गुन्हेवार्ता',
  state: 'महाराष्ट्र क्राईम',
  cyber: 'सायबर फसवणूक',
  national: 'राष्ट्रीय गुन्हे',
  chief: 'महेंद्र शेंडे विशेष',
  rights: 'कामगार हक्क व कायदे',
  analysis: 'विशेष विश्लेषण',
  opinion: 'अग्रलेख व मते',
  special: 'विशेष रिपोर्ट',
  struggle: 'कामगार लढा',
  issues: 'जनहित समस्या',
  railway: 'रेलवे भर्ती 45,000 पद',
  maha: 'महाराष्ट्र शासन भर्ती',
  bank: 'SSC & बैंक भर्ती',
  police: 'पुलिस भर्ती 2026',
  marathi: 'मराठी चित्रपट',
  bollywood: 'बॉलीवूड अपडेट्स',
  ott: 'ओटीटी वेब सिरीज',
  center: 'संसद व केंद्रीय कायदे',
  elections: 'निवडणूक अपडेट्स',
  cricket: 'क्रिकेट व IND vs AUS',
  ipl: 'आयपीएल 2026',
  global: 'ब्रह्मांड मुख्य खबरें',
  economy: 'ग्लोबल इकॉनॉमी & लेबर',
  news: 'आंतरराष्ट्रीय घडामोडी',
};

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || 'all';
  const sub = searchParams.get('sub');
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');

  const currentCategory = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[1];
  const activeSubTitle = sub ? (SUB_LABELS[sub] || sub) : null;
  const pageHeading = activeSubTitle || (currentCategory.slug === 'all' ? 'मुख्य पृष्ठ' : currentCategory.label);

  let displayArticles = ARTICLES.filter(a => slug === 'all' || a.category === slug);
  if (sub && SUB_LABELS[sub]) {
    const filterKeyword = SUB_LABELS[sub];
    const subMatched = ARTICLES.filter(a => 
      a.city === filterKeyword || 
      a.title.includes(filterKeyword) || 
      a.summary.includes(filterKeyword) ||
      a.tags?.includes(filterKeyword)
    );
    if (subMatched.length > 0) {
      displayArticles = subMatched;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* 1. Sticky Navigation Header (hideTrendingBar=true for clean navbar-to-title transition) */}
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        currentLang="hi"
        onLangToggle={() => {}}
        activeCategory={slug}
        hideTrendingBar={true}
      />

      {/* 2. Clean Large Centered Page Title directly under Header (matching kamgartimes.com 2nd reference image) */}
      <div className="bg-white dark:bg-zinc-950 py-6 sm:py-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black font-serif text-zinc-900 dark:text-white tracking-tight leading-tight">
            {pageHeading}
          </h1>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-2.5 rounded-full"></div>
        </div>
      </div>

      {/* 3. Main 3-Column News Card Grid directly under Title */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayArticles.map((article) => (
            <article key={article.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group">
              <div>
                {/* Article Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {/* Top Right Red Badge (e.g. "दिल्ली", "महाराष्ट्र", "नागपुर") */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-md shadow-md">
                      {activeSubTitle || article.city || article.categoryLabel}
                    </span>
                  </div>

                  {/* Audio Listen Button */}
                  <div className="absolute top-3 left-3 z-10">
                    <NewsAudioButton 
                      title={article.title} 
                      summary={article.summary} 
                      variant="badge" 
                    />
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <Link href={`/news/${article.id}`}>
                    <h2 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug font-serif">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5 pt-0 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 mt-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{article.readTime}</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span>{article.views.toLocaleString()} दर्शक</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-red-600">लोड हो रहा है...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
