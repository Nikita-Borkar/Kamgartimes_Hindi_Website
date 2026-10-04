'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/newsData';

export default function VerticalNewsTicker() {
  const [isHovered, setIsHovered] = useState(false);
  const tickerNews = ARTICLES.slice(0, 10); // Take 10 news items

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="bg-[#cc0000] text-white px-4 py-2 font-bold text-sm tracking-wide flex items-center justify-between">
        <span>ताज़ा खबरे (Latest News)</span>
        <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
      </div>

      {/* Scrolling Area */}
      <div 
        className="relative h-[600px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex flex-col animate-marquee-vertical"
          style={{ animationPlayState: isHovered ? 'paused' : 'running', animationDuration: '40s' }}
        >
          {tickerNews.concat(tickerNews).map((news, idx) => (
            <Link 
              key={`${news.id}-${idx}`}
              href={`/news/${news.id}`}
              className="block p-4 border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
            >
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-3">
                {news.title}
              </h4>
              <div className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                {news.publishedAt || '14:30'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
