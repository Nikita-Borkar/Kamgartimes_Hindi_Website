'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BreakingTicker from '@/components/BreakingTicker';
import HeroSection from '@/components/HeroSection';
import LiveBlogWidget from '@/components/LiveBlogWidget';
import CategoryNewsGrid from '@/components/CategoryNewsGrid';
import PhotoGallerySection from '@/components/PhotoGallerySection';
import ReelsSection from '@/components/ReelsSection';
import EpaperHomepageBlock from '@/components/EpaperHomepageBlock';
import PollWidget from '@/components/PollWidget';
import HoroscopeWidget from '@/components/HoroscopeWidget';
import WeatherWidget from '@/components/WeatherWidget';
import StockMarketWidget from '@/components/StockMarketWidget';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import CategoryFilterBar from '@/components/CategoryFilterBar';
import GoogleTranslateScript from '@/components/GoogleTranslateScript';
import VerticalNewsTicker from '@/components/VerticalNewsTicker';
import VerticalYouTubeTicker from '@/components/VerticalYouTubeTicker';
import YouTubeVideoSlider from '@/components/YouTubeVideoSlider';
import HorizontalNewsSlider from '@/components/HorizontalNewsSlider';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');
  const [currentLang, setCurrentLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('userLanguage') as 'hi' | 'mr' | 'en';
      if (savedLang) {
        setCurrentLang(savedLang);
      }
    }
  }, []);

  const handleLangToggle = () => {
    setCurrentLang(prev => (prev === 'hi' ? 'mr' : prev === 'mr' ? 'en' : 'hi'));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <GoogleTranslateScript />
      {/* 1. Sticky Navigation Header */}
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        currentLang={currentLang}
        onLangToggle={handleLangToggle}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      {/* 2. Red Animated Breaking News Ticker */}
      <BreakingTicker />

      {/* 3. Main Body Container with Massive Content Layout */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3 md:py-8 space-y-4 md:space-y-12">
        
        {/* Top Header Ad Multi-Banner Slider */}
        <AdBanner slot="header-banner" />

        {/* Synchronized Category Switcher Tabs Bar */}
        <CategoryFilterBar
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        {/* Hero Top Featured Stories & Trending Top 10 Sidebar */}
        <HeroSection selectedCity={selectedCity} selectedCategory={activeCategory} />

        {/* Horizontal Scroll Slider */}
        <HorizontalNewsSlider />

        {/* NEW: YouTube Full Videos Horizontal Scroll Slider */}
        <YouTubeVideoSlider />

        {/* Weather Forecast & Live Stock Market Twin Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <WeatherWidget />
          <StockMarketWidget />
        </div>

        {/* Live News Stream Timeline */}
        <LiveBlogWidget />

        {/* Mid-Content Sponsored Ad Banner */}
        <AdBanner slot="mid-content" />

        {/* Comprehensive Multi-Desk News Grid (Labor, Local, Crime, Editorial, Jobs, Focus, Sports/Cinema) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Main Left 8 Cols */}
          <div className="lg:col-span-8 space-y-4 md:space-y-10">
            <CategoryNewsGrid selectedCategory={activeCategory} />
          </div>

          {/* Sidebar 4 Cols (Full Height) */}
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-8 h-full">
            <HoroscopeWidget />
            <PollWidget />
            <AdBanner slot="sidebar" />
            
            {/* Vertical Auto-Scrolling Ticker */}
            <VerticalNewsTicker />
            
            <AdBanner slot="sidebar-2" />

            {/* Vertical Generic YouTube Videos Ticker (Stretches to fill remaining space) */}
            <div className="flex-1 flex flex-col min-h-0">
              <VerticalYouTubeTicker isFullHeight />
            </div>
          </div>
        </div>

        {/* Photo Stories & Visual News Gallery Carousel */}
        <PhotoGallerySection />

        {/* Sponsored Ad Banner */}
        <AdBanner slot="gallery-banner" />

        {/* Short Video News Reels Section (Now Branded as Kamgar Times Shorts) */}
        <ReelsSection />

        {/* Digital E-Paper Front Page Block & PDF Download */}
        <EpaperHomepageBlock />

        {/* WhatsApp & Telegram Community CTA Carousel */}
        <WhatsAppBanner />

      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
