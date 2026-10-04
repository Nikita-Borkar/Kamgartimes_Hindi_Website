'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Clock, MessageSquare, TrendingUp, Sparkles, ChevronRight, HardHat, Flame, MapPin } from 'lucide-react';
import { ARTICLES } from '@/data/newsData';
import NewsAudioButton from '@/components/NewsAudioButton';

interface HeroSectionProps {
  selectedCity?: string;
  selectedCategory?: string;
}

export default function HeroSection({ selectedCity = 'नागपुर', selectedCategory = 'all' }: HeroSectionProps) {
  // Filter articles based on city or category if specified
  const filtered = ARTICLES.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesCategory;
  });

  const displayArticles = filtered.length > 0 ? filtered : ARTICLES;
  
  // Find main hero article
  const heroMain = displayArticles[0] || ARTICLES[0];
  const heroSecondary = displayArticles.slice(1, 4);
  const trendingArticles = ARTICLES.slice(2, 7);

  return (
    <section className="py-2 px-0">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Active Filter Indicator Tag */}
        {selectedCity && (
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200 font-bold bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>मुख्य बुलेटिन: {selectedCity} व महाराष्ट्र क्षेत्र</span>
            </span>
            <span className="text-[11px] text-zinc-400 hidden sm:inline font-medium">24x7 ताज़ा अपडेट्स</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* LEFT 8 COLUMNS: MAIN HERO & SECONDARY CARDS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* MAIN HERO FEATURED STORY */}
            {heroMain && (
              <article className="group relative rounded-3xl overflow-hidden shadow-xl bg-zinc-950 border border-zinc-800 text-white transition-transform duration-300 hover:shadow-2xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={heroMain.imageUrl}
                    alt={heroMain.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
                  
                  {/* Category & Live Tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <HardHat className="w-3.5 h-3.5 text-amber-300" />
                        {heroMain.categoryLabel}
                      </span>
                      {heroMain.isBreaking && (
                        <span className="bg-amber-400 text-zinc-950 font-black text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider animate-pulse">
                          <Flame className="w-3.5 h-3.5 text-red-600" />
                          मुख्य खबर
                        </span>
                      )}
                    </div>
                    
                    {/* Audio Reader Icon Button */}
                    <NewsAudioButton 
                      title={heroMain.title} 
                      summary={heroMain.summary} 
                      variant="badge" 
                    />
                  </div>
                </div>

                {/* Main Hero Card Content Overlay */}
                <div className="p-5 sm:p-7 relative z-10 -mt-20 sm:-mt-28">
                  <div className="bg-zinc-950/95 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-zinc-800/90 shadow-2xl space-y-3">
                    <Link href={`/news/${heroMain.id}`}>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-red-400 transition-colors leading-snug font-serif">
                        {heroMain.title}
                      </h2>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed hidden sm:block font-sans">
                      {heroMain.summary}
                    </p>

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-zinc-200">{heroMain.author?.name || 'विशेष संवाददाता'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-red-400" />
                          {heroMain.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <Eye className="w-3.5 h-3.5" />
                          {heroMain.views.toLocaleString()} पाठकों द्वारा देखा गया
                        </span>
                        <span className="flex items-center gap-1 text-blue-400">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {heroMain.commentsCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* SECONDARY 3 HERO STORIES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {heroSecondary.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                        <span className="bg-zinc-900/90 text-zinc-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                          {article.categoryLabel}
                        </span>
                        <NewsAudioButton 
                          title={article.title} 
                          summary={article.summary} 
                          variant="icon" 
                          className="!p-1.5"
                        />
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <Link href={`/news/${article.id}`}>
                        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 pb-3.5 pt-0 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      {article.readTime}
                    </span>
                    <Link href={`/news/${article.id}`} className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold hover:underline">
                      पूरी खबर <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: TRENDING NOW / MOST READ SIDEBAR WIDGET */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-lg sticky top-24 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
                    <TrendingUp className="w-4 h-4 text-amber-300" />
                  </div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white font-serif">
                    ट्रेंडिंग खबरें (Most Read)
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              {/* Trending List */}
              <div className="space-y-4">
                {trendingArticles.map((item, index) => (
                  <article key={item.id} className="group flex gap-3.5 items-start pb-4 border-b border-zinc-100 dark:border-zinc-800/80 last:border-0 last:pb-0">
                    <span className="font-black text-2xl font-serif text-red-600 dark:text-red-500 opacity-90 group-hover:opacity-100 w-7 shrink-0 text-center">
                      0{index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                        {item.categoryLabel}
                      </span>
                      <Link href={`/news/${item.id}`}>
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                      </Link>
                      <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400 pt-1">
                        <div className="flex items-center gap-3">
                          <span>{item.readTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </span>
                        </div>
                        <NewsAudioButton 
                          title={item.title} 
                          summary={item.summary} 
                          variant="icon" 
                          className="!p-1" 
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* View All Trending CTA */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <Link
                  href="/category/labor"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-red-600 dark:text-red-400 hover:text-red-700 transition"
                >
                  <span>सभी प्रमुख ट्रेंडिंग बुलेटिन देखें</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
