'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface BannerItem {
  id: number;
  image?: string;
  alt?: string;
  link: string;
  badge?: string;
  sponsor?: string;
  ctaText?: string;
  tag?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  gradient?: string;
  borderColor?: string;
  badgeColor?: string;
  buttonGradient?: string;
  bgGradient?: string;
  buttonBg?: string;
}

interface AdBannerProps {
  slot: 'header-banner' | 'in-article' | 'sidebar' | 'sidebar-2' | 'mid-content' | 'gallery-banner';
  autoPlayInterval?: number;
}

const HEADER_BANNERS: BannerItem[] = [
  {
    id: 1,
    image: '/header_ad_banner.jpg',
    alt: 'महाराष्ट्र कामगार कल्याण बोर्ड पेंशन योजना 2026',
    link: 'https://epfindia.gov.in',
    badge: 'महाराष्ट्र कामगार कल्याण बोर्ड - 50,000 मासिक पेंशन योजना',
    sponsor: 'सरकारी पंजीकृत प्रायोजक योजना',
    ctaText: 'अभी विवरण देखें',
  },
  {
    id: 2,
    image: '/ad_banner_eshram.jpg',
    alt: 'ई-श्रम डिजिटल कार्ड पंजीयन 2026',
    link: 'https://eshram.gov.in',
    badge: 'ई-श्रम डिजिटल पहचान पत्र 2026 - 100% निशुल्क पंजीकरण',
    sponsor: 'श्रम एवं रोजगार मंत्रालय (भारत सरकार)',
    ctaText: 'कार्ड के लिए आवेदन करें',
  },
  {
    id: 3,
    image: '/ad_banner_pension.jpg',
    alt: 'प्रधानमंत्री श्रम योगी मानधन योजना 2026',
    link: 'https://maandhan.in',
    badge: 'प्रधानमंत्री श्रम योगी मानधन योजना - ₹3,000 मासिक पेंशन',
    sponsor: 'असंगठित क्षेत्र कामगार सुरक्षा योजना',
    ctaText: 'योजना लाभ प्राप्त करें',
  },
];

const SIDEBAR_BANNERS: BannerItem[] = [
  {
    id: 1,
    image: '/ad_banner_eshram.jpg',
    alt: 'ई-श्रम डिजिटल कार्ड पंजीयन 2026',
    badge: 'स्पॉन्सर्ड विजेट',
    tag: 'सरकारी सेवा',
    title: 'ई-श्रम डिजिटल कार्ड पंजीयन 2026',
    description: '60 वर्ष पूर्ण होने पर ₹3,000 मासिक पेंशन एवं नि:शुल्क दुर्घटना बीमा योजना।',
    buttonText: 'निःशुल्क रजिस्ट्रेशन कराएं',
    link: 'https://eshram.gov.in',
    gradient: 'from-red-950 via-zinc-900 to-zinc-950',
    borderColor: 'border-red-900/60',
    badgeColor: 'bg-amber-400 text-zinc-950',
    buttonGradient: 'from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500',
  },
  {
    id: 2,
    badge: 'कल्याणकारी योजना',
    tag: 'सरकारी सहायता',
    title: 'महाराष्ट्र कामगार सुरक्षा कवच एवं छात्रवृत्ति',
    description: 'दुर्घटना बीमा ₹5 लाख एवं कामगार बच्चों की शिक्षा हेतु ₹10,000 वार्षिक छात्रवृत्ति हेतु तुरंत आवेदन करें।',
    buttonText: 'छात्रवृत्ति आवेदन करें',
    link: 'https://mahakamgar.gov.in',
    gradient: 'from-blue-950 via-zinc-900 to-slate-950',
    borderColor: 'border-blue-900/60',
    badgeColor: 'bg-blue-400 text-zinc-950',
    buttonGradient: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
  },
  {
    id: 3,
    image: '/ad_banner_pension.jpg',
    alt: 'EPFO UAN पासबुक एवं पासबुक बैलेंस',
    badge: 'डिजिटल पीएफ सुविधा',
    tag: 'EPFO पोर्टल',
    title: 'EPFO UAN पासबुक एवं पासबुक बैलेंस सेवा',
    description: 'अपने पीएफ (PF) खाते का बैलेंस 2 मिनट में ऑनलाइन चेक करें और ई-नॉमिनेशन प्रक्रिया तुरंत पूरी करें।',
    buttonText: 'PF बैलेंस जांचें',
    link: 'https://epfindia.gov.in',
    gradient: 'from-emerald-950 via-zinc-900 to-teal-950',
    borderColor: 'border-emerald-900/60',
    badgeColor: 'bg-emerald-400 text-zinc-950',
    buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  },
];

const IN_ARTICLE_BANNERS: BannerItem[] = [
  {
    id: 1,
    image: '/ad_banner_eshram.jpg',
    alt: 'ई-श्रम डिजिटल कार्ड पोर्टल - 2026 अपडेट',
    badge: 'विशेष प्रायोजित योजना',
    title: 'ई-श्रम डिजिटल कार्ड पोर्टल - 2026 अपडेट',
    description: 'दुर्घटना बीमा एवं स्वास्थ्य योजनाओं का 100% नि:शुल्क लाभ उठाएं।',
    buttonText: 'कार्ड अपडेट करें',
    link: 'https://eshram.gov.in',
    bgGradient: 'from-emerald-950 via-zinc-900 to-zinc-950',
    borderColor: 'border-emerald-900/60',
    badgeColor: 'bg-emerald-500 text-zinc-950',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500',
  },
  {
    id: 2,
    badge: 'मजदूरी दर संशोधन',
    title: 'न्यूनतम वेतन दर संशोधन 2026 - नई दर सूची जारी',
    description: 'अपने राज्य और श्रेणी अनुसार न्यूनतम मजदूरी दरों का आधिकारिक नोटिफिकेशन देखें।',
    buttonText: 'दरें डाउनलोड करें',
    link: 'https://clc.gov.in',
    bgGradient: 'from-amber-950 via-zinc-900 to-zinc-950',
    borderColor: 'border-amber-900/60',
    badgeColor: 'bg-amber-500 text-zinc-950',
    buttonBg: 'bg-amber-600 hover:bg-amber-500',
  },
  {
    id: 3,
    image: '/header_ad_banner.jpg',
    alt: 'आयुष्मान भारत डिजिटल कार्ड',
    badge: 'स्वास्थ्य सुरक्षा योजना',
    title: 'आयुष्मान भारत डिजिटल कार्ड - 5 लाख तक मुफ्त इलाज',
    description: 'परिवार के सभी सदस्यों का आयुष्मान भारत कार्ड बनाएं और कैशलेस अस्पताल सुविधाओं का लाभ पाएं।',
    buttonText: 'कार्ड बनाएं',
    link: 'https://pmjay.gov.in',
    bgGradient: 'from-rose-950 via-zinc-900 to-zinc-950',
    borderColor: 'border-rose-900/60',
    badgeColor: 'bg-rose-500 text-zinc-950',
    buttonBg: 'bg-rose-600 hover:bg-rose-500',
  },
];

export default function AdBanner({ slot, autoPlayInterval = 4500 }: AdBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const banners = slot === 'header-banner' 
    ? HEADER_BANNERS 
    : slot === 'sidebar' 
    ? SIDEBAR_BANNERS 
    : IN_ARTICLE_BANNERS;

  const totalBanners = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  }, [totalBanners]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  }, [totalBanners]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, isPaused]);

  // Touch navigation handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Header Banner Slider (100% Full Fit, Edge-to-Edge, Zero Blank Side Space)
  if (slot === 'header-banner') {
    return (
      <div 
        className="w-full my-6 select-none group relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl transition duration-300 hover:shadow-red-950/20">
          {/* Top Banner Status Bar */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
            <div className="bg-zinc-950/90 backdrop-blur-md text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>विज्ञापन / SPONSORED</span>
            </div>
            <button
              suppressHydrationWarning
              onClick={() => setIsPaused(!isPaused)}
              className="bg-zinc-950/90 backdrop-blur-md text-zinc-300 hover:text-white p-1.5 rounded-full border border-zinc-700/60 transition cursor-pointer"
              title={isPaused ? "ऑटो-स्क्रॉल चालू करें" : "ऑटो-स्क्रॉल रोकें"}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

          {/* Carousel Slide Track */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {HEADER_BANNERS.map((banner) => (
              <div key={banner.id} className="min-w-full w-full relative shrink-0">
                <a 
                  href={banner.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[16/9] sm:aspect-[16/9] bg-zinc-950 overflow-hidden group/slide"
                >
                  {/* Main Foreground Image: Fits 100% edge-to-edge without blank side spaces */}
                  {banner.image && (
                    <img
                      src={banner.image}
                      alt={banner.alt || banner.sponsor || 'Ad Banner'}
                      className="w-full h-full object-fill sm:object-cover transition-transform duration-700 group-hover/slide:scale-[1.01]"
                    />
                  )}

                  {/* Soft Gradient Overlay for Text Visibility at Bottom */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />

                  {/* Bottom Action Bar */}
                  <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between p-3 sm:p-5 text-white gap-3">
                    <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5 drop-shadow-md bg-zinc-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="line-clamp-1">{banner.sponsor}</span>
                    </span>
                    <span className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xl shrink-0 transition hover:scale-105 active:scale-95">
                      <span>{banner.ctaText}</span>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            suppressHydrationWarning
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-zinc-950/80 hover:bg-zinc-900 text-white p-2.5 rounded-full border border-zinc-700/60 shadow-xl opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-110 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            suppressHydrationWarning
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-zinc-950/80 hover:bg-zinc-900 text-white p-2.5 rounded-full border border-zinc-700/60 shadow-xl opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-110 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-zinc-950/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
            {HEADER_BANNERS.map((_, idx) => (
              <button
                suppressHydrationWarning
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-6 bg-red-500 shadow-md shadow-red-500/50' 
                    : 'w-2 bg-zinc-500/60 hover:bg-zinc-300'
                }`}
                aria-label={`Go to banner slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Top Timer Progress Line */}
          {!isPaused && (
            <div 
              key={currentIndex}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 z-40 animate-[bannerProgress_4.5s_linear]"
            />
          )}
        </div>
      </div>
    );
  }

  // Sidebar Banner Slider
  if (slot === 'sidebar') {
    const activeBanner = SIDEBAR_BANNERS[currentIndex];
    return (
      <div 
        className="w-full my-6 select-none group relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`bg-gradient-to-br ${activeBanner.gradient || 'from-zinc-950 via-zinc-900 to-zinc-950'} rounded-3xl p-5 border ${activeBanner.borderColor || 'border-zinc-800'} shadow-xl space-y-4 text-white relative overflow-hidden transition-all duration-500`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 z-20 relative">
            <span className={`${activeBanner.badgeColor || 'bg-amber-400 text-zinc-950'} text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
              {activeBanner.badge}
            </span>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold">
              <span>{currentIndex + 1} / {SIDEBAR_BANNERS.length}</span>
              <span>{activeBanner.tag || 'विज्ञापन'}</span>
            </div>
          </div>

          {/* Banner Content (Image OR Text Card) */}
          {activeBanner.image ? (
            <a
              href={activeBanner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 group/sb"
            >
              <img
                src={activeBanner.image}
                alt={activeBanner.title || 'Sidebar Banner'}
                className="w-full h-full object-fill transition duration-300 group-hover/sb:scale-102"
              />
            </a>
          ) : (
            <div className="space-y-2 min-h-[90px] flex flex-col justify-center">
              <h4 className="font-extrabold text-base text-amber-300 font-serif leading-snug">
                {activeBanner.title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeBanner.description}
              </p>
            </div>
          )}

          {/* Action Button & Carousel Dots */}
          <div className="pt-2 flex flex-col gap-3 relative z-20">
            <a
              href={activeBanner.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${activeBanner.buttonGradient || 'from-red-600 to-rose-600'} text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition duration-200 hover:scale-[1.02]`}
            >
              <span>{activeBanner.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Sidebar Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                {SIDEBAR_BANNERS.map((_, idx) => (
                  <button
                    suppressHydrationWarning
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-zinc-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  suppressHydrationWarning
                  onClick={prevSlide}
                  className="bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white p-1 rounded-lg border border-white/10 text-xs transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  suppressHydrationWarning
                  onClick={nextSlide}
                  className="bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white p-1 rounded-lg border border-white/10 text-xs transition cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In-Article Banner Slider
  const activeBanner = IN_ARTICLE_BANNERS[currentIndex];
  return (
    <div 
      className="w-full my-6 select-none group relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`bg-gradient-to-r ${activeBanner.bgGradient || 'from-emerald-950 via-zinc-900 to-zinc-950'} rounded-2xl p-5 border ${activeBanner.borderColor || 'border-emerald-900/60'} shadow-lg text-white relative overflow-hidden transition-all duration-500`}>
        {activeBanner.image ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className={`${activeBanner.badgeColor || 'bg-emerald-500 text-zinc-950'} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                {activeBanner.badge}
              </span>
              <span className="text-[10px] text-zinc-400">
                {currentIndex + 1} / {IN_ARTICLE_BANNERS.length}
              </span>
            </div>
            <a
              href={activeBanner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group/ib"
            >
              <img
                src={activeBanner.image}
                alt={activeBanner.title || 'In-Article Banner'}
                className="w-full h-full object-fill transition duration-300 group-hover/ib:scale-102"
              />
            </a>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`${activeBanner.badgeColor} text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1`}>
                  {activeBanner.badge}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {currentIndex + 1} / {IN_ARTICLE_BANNERS.length}
                </span>
              </div>
              <h5 className="text-sm sm:text-base font-extrabold text-white font-serif">
                {activeBanner.title}
              </h5>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeBanner.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={activeBanner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${activeBanner.buttonBg} text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow transition shrink-0 flex items-center gap-1.5 hover:scale-105`}
              >
                <span>{activeBanner.buttonText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white p-1.5 rounded-lg border border-white/10 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-black/40 hover:bg-black/70 text-zinc-300 hover:text-white p-1.5 rounded-lg border border-white/10 transition cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-white/10">
          {IN_ARTICLE_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-5 bg-emerald-400' : 'w-1.5 bg-zinc-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
