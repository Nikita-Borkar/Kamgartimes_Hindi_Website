'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Pause, Play, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { BREAKING_NEWS_TICKER } from '@/data/newsData';

export default function BreakingTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const currentHeadline = BREAKING_NEWS_TICKER[currentIndex];
      const utterance = new SpeechSynthesisUtterance(`ब्रेकिंग न्यूज़: ${currentHeadline}`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-indigo-900/50 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        
        <div className="bg-amber-400 text-black font-black px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base uppercase tracking-widest flex items-center gap-2.5 shrink-0 border-r-[3px] border-amber-500 z-10 shadow-[4px_0_15px_rgba(0,0,0,0.5)]">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 animate-pulse" />
          <span className="hidden xs:inline">ब्रेकिंग</span> न्यूज़
        </div>

        {/* Marquee Ticker Content Container */}
        <div 
          className="flex-1 overflow-hidden py-2.5 px-5 text-sm sm:text-base font-extrabold relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex whitespace-nowrap items-center gap-14 ${isPaused || isSpeaking ? '' : 'animate-marquee'}`}>
            {BREAKING_NEWS_TICKER.concat(BREAKING_NEWS_TICKER).map((item, idx) => (
              <Link 
                key={idx} 
                href="/news/labor-wage-hike-2026"
                className="flex items-center gap-3 text-amber-100 hover:text-amber-400 transition-colors duration-300 drop-shadow-md tracking-wide"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)] inline-block shrink-0"></span>
                <span>{item}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Audio Listen & Pause Controls */}
        <div className="flex items-center shrink-0 bg-slate-900/50 border-l border-indigo-800/50 backdrop-blur-sm">
          {/* Read Aloud Speech Button */}
          <button
            suppressHydrationWarning
            onClick={toggleSpeech}
            className={`px-4 py-2.5 text-xs font-black flex items-center gap-1.5 transition-all duration-300 ${
              isSpeaking ? 'bg-amber-400 text-zinc-950 animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'hover:bg-indigo-900 text-emerald-300 hover:text-emerald-200'
            }`}
            title={isSpeaking ? "ऑडियो बंद करें" : "ब्रेकिंग खबर सुनें"}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline uppercase tracking-wider">{isSpeaking ? 'रोके' : 'सुनें'}</span>
          </button>

          {/* Pause / Play marquee button */}
          <button
            suppressHydrationWarning
            onClick={() => setIsPaused(!isPaused)}
            className="px-4 py-2.5 text-indigo-200 hover:text-white bg-indigo-950/60 hover:bg-indigo-800 transition-colors duration-300"
            title={isPaused ? "प्ले करें" : "पॉज करें"}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current text-emerald-400" /> : <Pause className="w-4 h-4 text-rose-400" />}
          </button>
        </div>

      </div>
    </div>
  );
}
