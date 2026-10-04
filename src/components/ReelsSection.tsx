'use client';

import React, { useState } from 'react';
import { Play, Eye, Film, X, Share2, Heart, Volume2, VolumeX } from 'lucide-react';
import { REELS_DATA } from '@/data/newsData';
import { VideoReel } from '@/types/news';
import NewsAudioButton from '@/components/NewsAudioButton';

export default function ReelsSection() {
  const [activeReel, setActiveReel] = useState<VideoReel | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="bg-zinc-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 my-4 md:my-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-lg">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
                Kamgar Times YouTube Shorts
              </h3>
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                OFFICIAL 📺
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              कामगार टाइम्स के ऑफिशियल यूट्यूब चैनल से सीधी ख़बरें
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Video Cards Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        {REELS_DATA.map((reel) => (
          <div
            key={reel.id}
            onClick={() => setActiveReel(reel)}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail Image */}
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </div>
            </div>

            {/* Category & Duration */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="bg-zinc-950/80 backdrop-blur-md text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">
                {reel.category}
              </span>
              <span className="bg-black/60 backdrop-blur-md text-zinc-200 text-[10px] font-mono px-2 py-0.5 rounded">
                {reel.duration}
              </span>
            </div>

            {/* Title & Views */}
            <div className="absolute bottom-3 left-3 right-3 space-y-1">
              <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug drop-shadow-md">
                {reel.title}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-medium">
                <Eye className="w-3 h-3 text-pink-400" />
                <span>{reel.views} व्यूज</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN RESPONSIVE REEL MODAL */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-[390px] h-[88vh] max-h-[720px] bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col justify-between select-none">
            
            {/* Top Bar Controls */}
            <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-9 h-9 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/60 text-white flex items-center justify-center hover:bg-zinc-800 transition cursor-pointer"
                  title={isMuted ? "साउंड चालू करें" : "म्यूट करें"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
                
                {/* News Audio Reader Button */}
                <NewsAudioButton 
                  title={activeReel.title} 
                  summary={`${activeReel.category} बुलेटिन. कामगार टाइम्स विशेष शॉर्ट वीडियो.`} 
                  variant="badge" 
                />
              </div>

              <button
                onClick={() => setActiveReel(null)}
                className="w-9 h-9 rounded-full bg-red-600/90 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer shadow-lg"
                title="बंद करें"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Background & Player Container */}
            <div className="relative w-full h-full bg-zinc-900 overflow-hidden flex items-center justify-center">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="w-full h-full object-cover brightness-95 scale-105 animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/40"></div>

              {/* Reel Play Accent Graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-red-600/30 border-2 border-red-500/80 text-white flex items-center justify-center backdrop-blur-md animate-ping"></div>
                <div className="absolute w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl">
                  <Play className="w-7 h-7 ml-1 fill-current" />
                </div>
              </div>

              {/* Next/Prev Reel Nav Buttons */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = REELS_DATA.findIndex(r => r.id === activeReel.id);
                    const prevIndex = (currentIndex - 1 + REELS_DATA.length) % REELS_DATA.length;
                    setActiveReel(REELS_DATA[prevIndex]);
                  }}
                  className="pointer-events-auto bg-zinc-950/60 hover:bg-zinc-900 text-white p-2 rounded-full border border-white/20 transition cursor-pointer"
                  title="पिछली रील"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = REELS_DATA.findIndex(r => r.id === activeReel.id);
                    const nextIndex = (currentIndex + 1) % REELS_DATA.length;
                    setActiveReel(REELS_DATA[nextIndex]);
                  }}
                  className="pointer-events-auto bg-zinc-950/60 hover:bg-zinc-900 text-white p-2 rounded-full border border-white/20 transition cursor-pointer"
                  title="अगली रील"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Video Overlay Bottom Content Info */}
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent z-30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-red-600 text-white font-extrabold px-3 py-1 rounded-full shadow">
                  {activeReel.category}
                </span>
                <span className="text-zinc-300 font-mono flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                  {activeReel.views} दर्शको द्वारा देखा गया
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white leading-snug font-serif">
                {activeReel.title}
              </h3>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs">
                <button 
                  onClick={() => alert('धन्यवाद! आपने यह रील पसंद की।')}
                  className="flex items-center gap-1.5 text-white hover:text-rose-400 font-bold transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current text-rose-500" />
                  <span>लाइक करें</span>
                </button>

                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activeReel.title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('रील्स लिंक कॉपी हो गया!');
                    }
                  }}
                  className="flex items-center gap-1.5 text-white hover:text-emerald-400 font-bold transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>शेयर करें</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
