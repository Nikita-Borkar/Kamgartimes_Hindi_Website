'use client';

import React, { useState } from 'react';
import { PlaySquare, PlayCircle } from 'lucide-react';
import { ARTICLES } from '@/data/newsData';

export default function YouTubeVideoSlider() {
  const [isHovered, setIsHovered] = useState(false);
  const videos = ARTICLES.slice(0, 6);

  return (
    <div className="bg-zinc-950 py-8 border-y border-red-900/30 overflow-hidden my-8 shadow-inner relative">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg">
            <PlaySquare className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
            Kamgar Times <span className="text-red-500">YouTube</span> Live & Specials
          </h2>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-1.5 rounded-full transition shadow-lg shadow-red-600/20 hidden sm:block">
          SUBSCRIBE NOW
        </button>
      </div>

      <div 
        className="w-full flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex whitespace-nowrap animate-marquee items-center gap-6 px-4"
          style={{ animationPlayState: isHovered ? 'paused' : 'running', animationDuration: '45s' }}
        >
          {videos.concat(videos).map((video, idx) => (
            <div 
              key={`${video.id}-${idx}`} 
              className="flex-shrink-0 w-[300px] sm:w-[380px] bg-zinc-900 rounded-xl overflow-hidden shadow-xl border border-zinc-800 group cursor-pointer hover:border-red-500/50 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden bg-black">
                <img 
                  src={video.imageUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-red-500 transition-colors drop-shadow-lg" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  12:45
                </div>
              </div>
              <div className="p-4 whitespace-normal">
                <h3 className="text-sm font-bold text-zinc-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Kamgar Times Official
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
