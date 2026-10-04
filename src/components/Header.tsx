'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun, Moon, Search, Menu, X, FileText, Send, Calendar,
  CloudSun, ChevronDown, ChevronRight, MapPin, Globe, Sparkles, Check
} from 'lucide-react';
import { CATEGORIES, CITIES } from '@/data/newsData';
import KamgarTimesLogo from '@/components/KamgarTimesLogo';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon, WhatsappIcon } from '@/components/SocialIcons';
import { LANGUAGES, setPageLanguage, SupportedLanguage } from '@/utils/language';
import CitySelectorModal from '@/components/CitySelectorModal';

interface HeaderProps {
  onSearchOpen: () => void;
  selectedCity: string;
  onCitySelect: (city: string) => void;
  currentLang: string;
  onLangToggle: () => void;
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
  hideTrendingBar?: boolean;
}

export default function Header({
  onSearchOpen,
  selectedCity,
  onCitySelect,
  currentLang,
  onLangToggle,
  activeCategory = 'all',
  onCategorySelect,
  hideTrendingBar = false
}: HeaderProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Synchronize active category with pathname or prop
  let currentCategorySlug = activeCategory;
  if (pathname === '/') {
    currentCategorySlug = activeCategory || 'all';
  } else if (pathname?.startsWith('/category/')) {
    currentCategorySlug = pathname.replace('/category/', '');
  } else if (pathname === '/epaper') {
    currentCategorySlug = 'epaper';
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Dynamic real-time clock update
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('hi-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const dateStr = now.toLocaleDateString('hi-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentTime(`${dateStr} | ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFontSize = (size: 'sm' | 'base' | 'lg') => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSize', size);
      const root = document.documentElement;
      if (size === 'sm') {
        root.style.fontSize = '14px';
        document.body.style.fontSize = '14px';
      } else if (size === 'lg') {
        root.style.fontSize = '19px';
        document.body.style.fontSize = '19px';
      } else {
        root.style.fontSize = '16px';
        document.body.style.fontSize = '16px';
      }
    }
  };

  useEffect(() => {
    // Sync dark mode state on mount
    const isDark = document.documentElement.classList.contains('dark');
    setTimeout(() => setIsDarkMode(isDark), 0);

    // Sync saved font size preference
    const savedFont = localStorage.getItem('fontSize') as 'sm' | 'base' | 'lg';
    if (savedFont) {
      setTimeout(() => handleFontSize(savedFont), 0);
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };



  // Submenu items for categories matching kamgartimes.com
  const categorySubmenus: Record<string, { label: string; href: string }[]> = {
    all: [
      { label: 'मुख्य पृष्ठ (Home)', href: '/' },
      { label: 'कामगार कल्याण 2026', href: '/category/labor' },
      { label: 'नागपुर व विदर्भ बुलेटिन', href: '/category/local' },
      { label: 'दैनिक ई-पेपर (PDF)', href: '/epaper' },
      { label: 'अपनी खबर भेजें', href: '/send-news' },
    ],
    labor: [
      { label: 'ब्रह्मांड', href: '/category/world' },
      { label: 'लोकल न्यूज़', href: '/category/local' },
      { label: 'दिल्ली', href: '/category/labor?sub=delhi' },
      { label: 'महाराष्ट्र', href: '/category/labor?sub=maharashtra' },
      { label: 'मध्य प्रदेश', href: '/category/labor?sub=mp' },
      { label: 'तेलंगाना', href: '/category/labor?sub=telangana' },
      { label: 'कर्नाटक', href: '/category/labor?sub=karnataka' },
      { label: 'छत्तीसगढ़', href: '/category/labor?sub=chhattisgarh' },
      { label: 'राजस्थान', href: '/category/labor?sub=rajasthan' },
      { label: 'उत्तर प्रदेश', href: '/category/labor?sub=up' },
      { label: 'गुजरात', href: '/category/labor?sub=gujarat' },
      { label: 'बिहार', href: '/category/labor?sub=bihar' },
      { label: 'न्यूनतम वेतन 2026', href: '/category/labor?sub=wage' },
      { label: 'ई-श्रम कार्ड व पेंशन', href: '/category/labor?sub=eshram' },
    ],
    local: [
      { label: 'नागपुर', href: '/category/local?sub=nagpur' },
      { label: 'विदर्भ बुलेटिन', href: '/category/local?sub=vidarbha' },
      { label: 'मुंबई-ठाणे', href: '/category/local?sub=mumbai' },
      { label: 'पुणे', href: '/category/local?sub=pune' },
      { label: 'नाशिक', href: '/category/local?sub=nashik' },
      { label: 'संभाजीनगर', href: '/category/local?sub=sambhajinagar' },
      { label: 'अमरावती', href: '/category/local?sub=amravati' },
      { label: 'वर्धा', href: '/category/local?sub=wardha' },
    ],
    latest: [
      { label: 'ब्रेकिंग न्यूज़ 24x7', href: '/category/latest?sub=breaking' },
      { label: 'प्रमुख घडामोडी', href: '/category/latest?sub=top' },
      { label: 'सरकारी योजना 2026', href: '/category/latest?sub=yojana' },
      { label: 'ट्रेंडिंग भारत', href: '/category/latest?sub=trending' },
    ],
    crime: [
      { label: 'भ्रष्टाचार व घोटाळे', href: '/category/crime?sub=corruption' },
      { label: 'स्थानिक गुन्हेवार्ता', href: '/category/crime?sub=local' },
      { label: 'महाराष्ट्र क्राईम', href: '/category/crime?sub=state' },
      { label: 'सायबर फसवणूक', href: '/category/crime?sub=cyber' },
      { label: 'राष्ट्रीय गुन्हे', href: '/category/crime?sub=national' },
    ],
    editorial: [
      { label: 'मुख्य संपादकीय (महेंद्र शेंडे)', href: '/category/editorial?sub=chief' },
      { label: 'कामगार हक्क व कायदे', href: '/category/editorial?sub=rights' },
      { label: 'विशेष विश्लेषण', href: '/category/editorial?sub=analysis' },
      { label: 'अग्रलेख व मते', href: '/category/editorial?sub=opinion' },
    ],
    focus: [
      { label: 'विशेष रिपोर्ट', href: '/category/focus?sub=special' },
      { label: 'कामगार लढा', href: '/category/focus?sub=struggle' },
      { label: 'जनहित समस्या', href: '/category/focus?sub=issues' },
    ],
    jobs: [
      { label: 'रेलवे भर्ती 45,000 पद', href: '/category/jobs?sub=railway' },
      { label: 'महाराष्ट्र शासन भर्ती', href: '/category/jobs?sub=maha' },
      { label: 'SSC & बैंक भर्ती', href: '/category/jobs?sub=bank' },
      { label: 'पुलिस भर्ती 2026', href: '/category/jobs?sub=police' },
    ],
    entertainment: [
      { label: 'मराठी चित्रपट', href: '/category/entertainment?sub=marathi' },
      { label: 'बॉलीवूड अपडेट्स', href: '/category/entertainment?sub=bollywood' },
      { label: 'ओटीटी वेब सिरीज', href: '/category/entertainment?sub=ott' },
    ],
    politics: [
      { label: 'महाराष्ट्र राजकारण', href: '/category/politics?sub=state' },
      { label: 'संसद व केंद्रीय कायदे', href: '/category/politics?sub=center' },
      { label: 'निवडणूक अपडेट्स', href: '/category/politics?sub=elections' },
    ],
    sports: [
      { label: 'क्रिकेट व IND vs AUS', href: '/category/sports?sub=cricket' },
      { label: 'आयपीएल 2026', href: '/category/sports?sub=ipl' },
      { label: 'स्थानिक क्रीडा स्पर्धा', href: '/category/sports?sub=local' },
    ],
    world: [
      { label: 'ब्रह्मांड मुख्य खबरें', href: '/category/world?sub=global' },
      { label: 'ग्लोबल इकॉनॉमी & लेबर', href: '/category/world?sub=economy' },
      { label: 'आंतरराष्ट्रीय घडामोडी', href: '/category/world?sub=news' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveNavDropdown(null);
      setIsLangDropdownOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 bg-white dark:bg-zinc-950 shadow-lg transition-colors border-b border-zinc-200 dark:border-zinc-800 max-w-full">

      {/* 1. TOP UTILITY BAR */}
      <div suppressHydrationWarning className="bg-zinc-900 dark:bg-black text-zinc-200 text-xs py-2 px-2 sm:px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          {/* Left: Dynamic Clock & Weather */}
          <div className="flex w-full sm:w-auto items-center justify-center sm:justify-start gap-3">
            <span suppressHydrationWarning className="flex items-center gap-1.5 text-zinc-300 font-medium text-[11px] sm:text-xs text-center">
              <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{currentTime || 'शुक्रवार, 25 सितम्बर 2026'}</span>
            </span>
            <div className="hidden xl:flex items-center gap-1 text-amber-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60 text-[11px]">
              <CloudSun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{selectedCity} 31°C ⛅ धूप और बादल</span>
            </div>
          </div>

          {/* Right: Controls, Language, E-Paper, Citizen News, Day/Night */}
          <div suppressHydrationWarning className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-2 sm:gap-2.5">
            {/* Font Size Adjuster */}
            <div suppressHydrationWarning className="hidden md:flex items-center bg-zinc-800 rounded-lg px-2 py-0.5 text-[10px] sm:text-[11px] gap-1 border border-zinc-700">
              <span className="text-zinc-400 font-medium">फ़ॉन्ट:</span>
              <button
                suppressHydrationWarning
                onClick={() => handleFontSize('sm')}
                className={`px-1.5 rounded transition font-bold ${fontSize === 'sm' ? 'bg-red-600 text-white' : 'hover:text-white text-zinc-300'}`}
                title="छोटा आकार"
              >
                अ-
              </button>
              <button
                suppressHydrationWarning
                onClick={() => handleFontSize('base')}
                className={`px-1.5 rounded transition font-bold ${fontSize === 'base' ? 'bg-red-600 text-white' : 'hover:text-white text-zinc-300'}`}
                title="सामान्य आकार"
              >
                अ
              </button>
              <button
                suppressHydrationWarning
                onClick={() => handleFontSize('lg')}
                className={`px-1.5 rounded transition font-bold ${fontSize === 'lg' ? 'bg-red-600 text-white' : 'hover:text-white text-zinc-300'}`}
                title="बड़ा आकार"
              >
                अ+
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                }}
                className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs border border-zinc-700 transition cursor-pointer"
                title="भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-bold">
                  {currentLang === 'hi' ? 'हिंदी' : currentLang === 'mr' ? 'मराठी' : 'English'}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mt-2 w-48 bg-zinc-900 text-zinc-100 rounded-xl shadow-2xl border border-zinc-700 z-50 py-1.5 text-xs animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-1 font-bold text-[10px] text-zinc-400 border-b border-zinc-800 uppercase tracking-wider">
                    भाषा चुनें (Select Language):
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        suppressHydrationWarning
                        key={lang.code}
                        onClick={() => {
                          if (currentLang !== lang.code) {
                            onLangToggle();
                          }
                          setPageLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-zinc-800 flex items-center justify-between font-medium cursor-pointer ${isSelected ? 'text-amber-400 font-bold bg-zinc-800/80' : 'text-zinc-200'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Day / Night Mode Toggle Switch */}
            <button
              suppressHydrationWarning
              onClick={toggleDarkMode}
              className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold border transition duration-200 shadow-sm cursor-pointer ${isDarkMode
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 hover:bg-amber-300'
                  : 'bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700'
                }`}
              title="दिन और रात मोड बदलें"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-zinc-950 fill-current shrink-0" />
                  <span className="hidden xs:inline">दिन मोड</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                  <span className="hidden xs:inline">रात मोड</span>
                </>
              )}
            </button>

            {/* E-Paper Link */}
            <Link
              href="/epaper"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold bg-red-950/90 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-red-800/90 text-[11px] sm:text-xs shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>ई-पेपर</span>
            </Link>

            {/* Citizen News Button */}
            <Link
              href="/send-news"
              className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-3 py-1 rounded-lg text-xs hover:brightness-110 transition shadow-sm shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>अपनी ख़बर भेजें</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND LOGO & SOCIAL MEDIA HEADER */}
      <div className="py-3 sm:py-4 px-3 sm:px-4 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4">

          {/* Main Authentic Newspaper Logo */}
          <Link href="/" className="hover:opacity-95 transition shrink-0 max-w-full transform scale-95 sm:scale-100">
            <KamgarTimesLogo size="md" showTagline={true} />
          </Link>

          {/* Quick Engagement Actions & Red Circular Social Media Icons */}
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-4 shrink-0 px-2 sm:px-0">

            {/* City Location Filter Dropdown */}
            <div className="relative shrink-0">
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.preventDefault();
                  setIsCityModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>शहर चुनें</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </button>

              <CitySelectorModal 
                isOpen={isCityModalOpen} 
                onClose={() => setIsCityModalOpen(false)} 
                selectedCity={selectedCity}
              />
            </div>

            {/* Red Circular Social Media Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 hover:scale-110 transition duration-200"
                title="WhatsApp चैनल"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition duration-200"
                title="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition duration-200"
                title="X / Twitter"
              >
                <TwitterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition duration-200"
                title="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition duration-200"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION MENU BAR */}
      <nav className="bg-red-700 dark:bg-red-900 text-white border-b-2 border-red-800 transition-all duration-300 relative z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-1 xl:gap-2 relative z-50">

          {/* Desktop Categories Menu Bar (Visible dropdown popovers without overflow clipping) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 py-1 flex-1 relative z-50">
            {CATEGORIES.map((cat) => {
              const hasSubmenu = !!categorySubmenus[cat.slug];
              const isCatActive = currentCategorySlug === cat.slug;
              const isOpen = activeNavDropdown === cat.slug;

              return (
                <div
                  key={cat.slug}
                  className="relative group/nav"
                  onMouseEnter={() => hasSubmenu && setActiveNavDropdown(cat.slug)}
                  onMouseLeave={() => setActiveNavDropdown(null)}
                >
                  <Link
                    href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                    onClick={() => {
                      if (onCategorySelect) onCategorySelect(cat.slug);
                      setActiveNavDropdown(null);
                    }}
                    className={`px-1.5 xl:px-2.5 py-1.5 text-[11px] lg:text-xs xl:text-sm font-bold tracking-tight transition-all duration-150 flex items-center gap-1 rounded-lg relative whitespace-nowrap cursor-pointer ${isCatActive || isOpen
                        ? 'bg-red-950 text-amber-300 shadow-md font-extrabold ring-1 ring-amber-400/50'
                        : 'hover:bg-red-800 text-white'
                      }`}
                  >
                    <span>{cat.label}</span>
                    {hasSubmenu && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-300' : 'text-white/80'}`} />
                    )}

                    {/* Active Underline Pill Indicator */}
                    {isCatActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-amber-400 rounded-full shadow-md"></span>
                    )}
                  </Link>

                  {/* Dropdown Sub-menu Box (Floats cleanly over page with high z-index) */}
                  {hasSubmenu && isOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-60 max-h-80 overflow-y-auto no-scrollbar bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl border-2 border-red-600/40 z-[100] py-2 px-1 text-xs transition-all duration-200 animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-3 py-1.5 text-[11px] font-black text-red-600 dark:text-red-400 border-b border-zinc-100 dark:border-zinc-800/80 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>{cat.label} सब-मेन्यू</span>
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                      </div>
                      {categorySubmenus[cat.slug].map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          onClick={() => {
                            if (onCategorySelect) onCategorySelect(cat.slug);
                            setActiveNavDropdown(null);
                          }}
                          className="flex items-center justify-between px-3.5 py-2 hover:bg-zinc-800 hover:text-white dark:hover:bg-red-600 dark:hover:text-white font-bold text-zinc-800 dark:text-zinc-200 transition-colors rounded-xl group/item my-0.5"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover/item:bg-amber-300 shrink-0 transition-colors"></span>
                            <span>{sub.label}</span>
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/epaper"
              className={`px-1.5 xl:px-2 py-1.5 text-[11px] lg:text-xs xl:text-sm font-bold transition rounded-lg shrink-0 whitespace-nowrap ${currentCategorySlug === 'epaper' ? 'bg-red-950 text-amber-300 font-extrabold ring-1 ring-amber-400/40' : 'text-amber-300 hover:bg-red-800'
                }`}
            >
              ई-पेपर
            </Link>
          </div>

          {/* Right Search Action & Mobile Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto shrink-0 py-1.5">

            {/* Mobile Menu Open Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-1.5 hover:bg-red-800 rounded-lg transition text-white cursor-pointer"
                aria-label="मेनू खोलें"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <span className="font-bold text-sm tracking-wide text-white">मुख्य मेनू</span>
            </div>

            {/* Search Trigger Button */}
            <button
              suppressHydrationWarning
              onClick={onSearchOpen}
              className="flex items-center justify-center bg-red-900 hover:bg-zinc-950 text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-red-500/40 shadow-md transition transform hover:scale-105 cursor-pointer shrink-0"
              title="समाचार खोजें"
            >
              <Search className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 text-white border-t border-zinc-800 px-4 py-4 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => {
                const isCatActive = currentCategorySlug === cat.slug;
                const hasSub = !!categorySubmenus[cat.slug];
                const isOpenMobile = activeNavDropdown === cat.slug;

                return (
                  <div key={cat.slug} className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Link
                        href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                        onClick={() => {
                          if (onCategorySelect) onCategorySelect(cat.slug);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex-1 px-3 py-2 text-xs font-bold rounded-xl transition flex items-center justify-between border ${isCatActive
                            ? 'bg-red-600 text-white border-red-500 shadow-md font-extrabold'
                            : 'bg-zinc-900 hover:bg-red-700 text-zinc-200 hover:text-white border-zinc-800'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isCatActive ? 'bg-amber-300' : 'bg-red-500'}`}></span>
                          <span>{cat.label}</span>
                        </span>
                      </Link>

                      {hasSub && (
                        <button
                          suppressHydrationWarning
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNavDropdown(isOpenMobile ? null : cat.slug);
                          }}
                          className="p-2 bg-zinc-900 hover:bg-red-700 rounded-xl border border-zinc-800 text-amber-300"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpenMobile ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu Items Accordion */}
                    {hasSub && isOpenMobile && (
                      <div className="pl-4 pr-1 py-1 space-y-1 bg-zinc-900/60 rounded-xl border border-zinc-800">
                        {categorySubmenus[cat.slug].map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => {
                              if (onCategorySelect) onCategorySelect(cat.slug);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-300 hover:text-amber-300 font-medium hover:bg-zinc-800 rounded-lg"
                          >
                            <span className="text-red-500 font-bold">›</span>
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              <Link
                href="/epaper"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 shadow"
              >
                <FileText className="w-4 h-4" />
                दैनिक ई-पेपर (PDF संस्करण)
              </Link>
              <Link
                href="/send-news"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4" />
                अपनी खबर / फोटो / वीडियो भेजें
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer removed as header is naturally sticky */}

      {/* 4. QUICK TRENDING TAGS BAR */}
      {!hideTrendingBar && (
        <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs py-1.5 px-4 hidden sm:block overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="font-extrabold text-red-600 dark:text-red-400 whitespace-nowrap flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              ट्रेंडिंग विषय:
            </span>
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap shrink-0">
              <Link href="/category/labor" className="hover:text-red-600 hover:underline">#न्यूनतमवेतन2026</Link>
              <span>•</span>
              <Link href="/category/labor" className="hover:text-red-600 hover:underline">#EPFOडिजिटलप्रमाणपत्र</Link>
              <span>•</span>
              <Link href="/category/latest" className="hover:text-red-600 hover:underline">#रेलवे45000भर्ती</Link>
              <span>•</span>
              <Link href="/category/local" className="hover:text-red-600 hover:underline">#नागपुरमेट्रोफेज2</Link>
              <span>•</span>
              <Link href="/category/sports" className="hover:text-red-600 hover:underline">#INDvsAUS</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

