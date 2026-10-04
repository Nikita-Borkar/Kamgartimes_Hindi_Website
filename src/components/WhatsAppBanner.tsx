'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Bell, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { WhatsappIcon, TelegramIcon } from '@/components/SocialIcons';

const COMMUNITY_SLIDES = [
  {
    id: 1,
    badge: 'आधिकारिक व्हाट्सऐप चैनल',
    badgeIcon: ShieldCheck,
    title: 'कामगार टाइम्स WhatsApp चैनल से जुड़ें! 📲',
    description: 'पाएं कामगार कल्याण, सरकारी नौकरी भर्ती, न्यूनतम वेतन और देश-प्रदेश की हर बड़ी ब्रेकिंग न्यूज़ सीधे अपने फोन पर — 100% फ्री!',
    primaryBtnText: 'WhatsApp चैनल फॉलो करें',
    primaryLink: 'https://whatsapp.com',
    primaryIcon: WhatsappIcon,
    secondaryBtnText: 'Telegram चैनल',
    secondaryLink: 'https://t.me',
    secondaryIcon: TelegramIcon,
    bgGradient: 'from-emerald-700 via-teal-700 to-emerald-800',
    borderColor: 'border-emerald-600',
  },
  {
    id: 2,
    badge: 'टेलीग्राम कम्युनिटी हब',
    badgeIcon: Zap,
    title: 'कामगार टाइम्स Telegram चैनल से जुड़ें! ✈️',
    description: '1 लाख से अधिक श्रमिकों और कर्मचारियों का सबसे सक्रिय न्यूज़ नेटवर्क। पाएं तुरंत PDF डाउनलोड्स, जी.आर और नोटिफिकेशन अलर्ट।',
    primaryBtnText: 'Telegram ग्रुप ज्वाइन करें',
    primaryLink: 'https://t.me',
    primaryIcon: TelegramIcon,
    secondaryBtnText: 'WhatsApp चैनल',
    secondaryLink: 'https://whatsapp.com',
    secondaryIcon: WhatsappIcon,
    bgGradient: 'from-cyan-800 via-blue-800 to-indigo-900',
    borderColor: 'border-cyan-600',
  },
  {
    id: 3,
    badge: 'मुफ्त न्यूज़ नोटिफिकेशन',
    badgeIcon: Bell,
    title: 'सरकारी योजनाओं की पल-पल की ताज़ा खबर! 🔔',
    description: 'मजदूरों, असंगठित कामगारों और पेंशनभोगियों के लिए विशेष सहायता योजनाएं व भर्ती अलर्ट्स बिना किसी शुल्क के प्राप्त करें।',
    primaryBtnText: 'WhatsApp कम्युनिटी ज्वाइन करें',
    primaryLink: 'https://whatsapp.com',
    primaryIcon: WhatsappIcon,
    secondaryBtnText: 'Telegram चैनल',
    secondaryLink: 'https://t.me',
    secondaryIcon: TelegramIcon,
    bgGradient: 'from-amber-700 via-orange-700 to-red-800',
    borderColor: 'border-amber-600',
  },
];

export default function WhatsAppBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = COMMUNITY_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const currentSlide = COMMUNITY_SLIDES[currentIndex];
  const BadgeIcon = currentSlide.badgeIcon;
  const PrimaryIcon = currentSlide.primaryIcon;
  const SecondaryIcon = currentSlide.secondaryIcon;

  return (
    <div
      className={`bg-gradient-to-r ${currentSlide.bgGradient} text-white rounded-3xl p-4 sm:p-6 lg:p-8 my-4 md:my-8 shadow-2xl relative overflow-hidden border ${currentSlide.borderColor} transition-all duration-700 select-none group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Accent Glow */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Slide Navigation Buttons */}
      <button
        suppressHydrationWarning
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        suppressHydrationWarning
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6">
        <div className="space-y-2.5 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-xs font-bold border border-white/20">
            <BadgeIcon className="w-4 h-4 text-amber-300" />
            <span>{currentSlide.badge}</span>
            <span className="text-[10px] opacity-75">({currentIndex + 1}/{totalSlides})</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight leading-tight">
            {currentSlide.title}
          </h3>

          <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
            {currentSlide.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href={currentSlide.primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-zinc-950 font-black px-6 py-3.5 rounded-2xl text-sm shadow-xl hover:bg-zinc-100 hover:scale-105 transition-all duration-200 group/btn"
          >
            <PrimaryIcon className="w-5 h-5 text-emerald-600 shrink-0 group-hover/btn:rotate-12 transition-transform" />
            <span>{currentSlide.primaryBtnText}</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </a>

          <a
            href={currentSlide.secondaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 text-white font-bold px-5 py-3.5 rounded-2xl text-sm border border-white/30 transition"
          >
            <SecondaryIcon className="w-4.5 h-4.5 text-cyan-300 shrink-0" />
            <span>{currentSlide.secondaryBtnText}</span>
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-2 mt-5 relative z-10">
        {COMMUNITY_SLIDES.map((_, idx) => (
          <button
            suppressHydrationWarning
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? 'w-6 bg-white shadow-md' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
