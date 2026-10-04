'use client';

import React, { useState } from 'react';
import { PlaySquare, PlayCircle } from 'lucide-react';
import { ARTICLES } from '@/data/newsData';

export default function VerticalYouTubeTicker({ isFullHeight = false }: { isFullHeight?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const videos = ARTICLES.slice(0, 8); // Taking some generic articles to use as videos

  return (
    <div className={`bg-zinc-950 rounded-xl shadow-xl border border-zinc-800 overflow-hidden flex flex-col ${isFullHeight ? 'h-full' : ''}`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-3 font-bold text-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <PlaySquare className="w-4 h-4 text-white" />
          <span>Trending Videos</span>
        </div>
        <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
          WATCH NOW
        </span>
      </div>

      {/* Scrolling Area */}
      <div className={`relative ${isFullHeight ? 'flex-1 min-h-[400px] min-h-0' : 'h-[650px]'}`}>
        <div 
          className={`overflow-hidden ${isFullHeight ? 'absolute inset-0' : 'relative h-full'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        <div 
          className="flex flex-col animate-marquee-vertical"
          style={{ animationPlayState: isHovered ? 'paused' : 'running', animationDuration: '45s' }}
        >
          {videos.concat(videos).map((video, idx) => (
            <div 
              key={`${video.id}-${idx}`}
              className="block p-3 border-b border-zinc-800/60 hover:bg-zinc-900 transition-colors group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-black rounded-lg mb-2">
                <img 
                  src={video.imageUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-10 h-10 text-white/80 group-hover:text-red-500 transition-colors drop-shadow-md" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                  05:30
                </div>
              </div>
              <h4 className="text-xs font-bold text-zinc-200 leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                {video.title}
              </h4>
              <div className="text-[10px] text-zinc-500 mt-1.5 flex items-center justify-between">
                <span>{video.publishedAt}</span>
                <span className="text-zinc-600 font-medium">12K views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
