'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX } from 'lucide-react';
import { ARTICLES } from '@/data/newsData';

export default function HorizontalNewsSlider() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // We'll take the top 8 news items for the slider
  const sliderNews = ARTICLES.slice(0, 8);

  const handleListen = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      
      window.speechSynthesis.speak(utterance);
      setPlayingId(id);
    }
  };

  // Stop playing if component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900/50 py-6 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div 
        className="w-full flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex whitespace-nowrap animate-marquee items-center gap-4 px-2"
          style={{ animationPlayState: playingId || isHovered ? 'paused' : 'running', animationDuration: '30s' }}
        >
          {sliderNews.concat(sliderNews).map((news, idx) => (
            <div 
              key={`${news.id}-${idx}`} 
              className="flex-shrink-0 w-[300px] sm:w-[320px] bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-3 flex gap-3 hover:shadow-md transition-shadow whitespace-normal"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden relative shadow-sm border border-zinc-100 dark:border-zinc-800">
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=60';
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <Link href={`/news/${news.id}`} className="block group/link">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 group-hover/link:text-red-600 dark:group-hover/link:text-red-400 transition-colors">
                      {news.title}
                    </h3>
                  </Link>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                    {news.publishedAt || '14:30:00'}
                  </div>
                </div>
                
                <button 
                  suppressHydrationWarning
                  onClick={() => handleListen(news.id, news.title)}
                  className={`mt-2 self-start flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-xs font-bold text-white rounded-md transition-all shadow-sm active:scale-95 ${
                    playingId === news.id 
                      ? 'bg-amber-500 hover:bg-amber-600 animate-pulse' 
                      : 'bg-[#e60000] hover:bg-red-700'
                  }`}
                >
                  {playingId === news.id ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>STOP</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>LISTEN</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
