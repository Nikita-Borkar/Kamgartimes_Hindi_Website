'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HorizontalNewsSlider from '@/components/HorizontalNewsSlider';
import CategoryNewsGrid from '@/components/CategoryNewsGrid';
import AdBanner from '@/components/AdBanner';
import SearchModal from '@/components/SearchModal';
import { MapPin, ArrowRight, Eye, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES } from '@/data/newsData';
import NewsAudioButton from '@/components/NewsAudioButton';

export default function CityPage() {
  const params = useParams();
  const cityName = decodeURIComponent(params.cityName as string);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cityName);
  const [currentLang, setCurrentLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [activeCategory, setActiveCategory] = useState('all');

  // Simulated admin panel flag for banners on city pages
  const hasAdminBanner = false;

  const handleLangToggle = () => {
    setCurrentLang(prev => (prev === 'hi' ? 'mr' : prev === 'mr' ? 'en' : 'hi'));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={(city) => {
          setSelectedCity(city);
          // Actual redirect happens in the modal now, but keeping this for state updates if needed
        }}
        currentLang={currentLang}
        onLangToggle={handleLangToggle}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        hideTrendingBar={true} // Hide global trending bar on specific city page
      />

      <main className="flex-grow pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb & City Header */}
          <div className="pt-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Link href="/" className="hover:text-red-600 transition">होम</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-zinc-900 dark:text-white font-bold">{cityName} की खबरें</span>
            </div>
          </div>

          <div className="pt-2 pb-4 text-center">
            <h1 className="text-5xl sm:text-6xl font-black font-serif text-black dark:text-white tracking-tight">
              {cityName}
            </h1>
            <div className="h-[3px] w-20 bg-[#e60000] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Ad Banner (Conditionally rendered based on Admin setting) */}
          {hasAdminBanner && <AdBanner slot="header-banner" />}

          {/* Top Trending News Horizontal Scroll for this City */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <h2 className="text-xl font-bold font-serif text-zinc-900 dark:text-white">
                {cityName} में ट्रेंडिंग (Trending in {cityName})
              </h2>
            </div>
            <HorizontalNewsSlider />
          </div>

          {/* City Blogs / News Grid */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6 px-2">
              <h2 className="text-2xl font-bold font-serif text-zinc-900 dark:text-white">
                लेटेस्ट न्यूज़ (Latest News)
              </h2>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARTICLES.slice(0, 6).map((article) => (
                <article key={article.id} className="group flex flex-col justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition duration-300">
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-16px)] z-10">
                        <span className="bg-red-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow">
                          {cityName} विशेष
                        </span>
                        <NewsAudioButton 
                          title={article.title} 
                          summary={article.summary} 
                          variant="badge" 
                        />
                      </div>
                    </div>
                    <Link href={`/news/${article.id}`}>
                      <h4 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
  
                  <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">{article.author?.name || "विशेष रिपोर्टर"}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-red-500" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Ad Banner (Conditionally rendered based on Admin setting) */}
          {hasAdminBanner && <AdBanner slot="mid-content" />}
          
        </div>
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
