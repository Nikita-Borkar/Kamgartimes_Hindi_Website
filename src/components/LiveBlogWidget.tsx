'use client';

import React, { useState } from 'react';
import { Radio, Clock, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { LIVE_BLOG_UPDATES } from '@/data/newsData';

export default function LiveBlogWidget() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-4 sm:p-5 border border-zinc-800 shadow-xl my-2 md:my-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <Radio className="w-4 h-4" />
            लाइव अपडेट्स
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-white font-serif">
            श्रम एवं रोजगार आयोग लाइव बुलेटिन
          </h3>
        </div>

        <button
          suppressHydrationWarning
          onClick={handleManualRefresh}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 px-2.5 py-1 rounded border border-zinc-700 hover:bg-zinc-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>रिफ्रेश</span>
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="mt-4 relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-1.5 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
        {LIVE_BLOG_UPDATES.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-4 sm:-left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${item.isImportant ? 'bg-red-500 ring-4 ring-red-500/20' : 'bg-emerald-500'}`}></div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 hover:border-zinc-700 transition space-y-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1 font-bold text-emerald-400 font-mono">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
                {item.tag && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${item.isImportant ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-zinc-800 text-zinc-300'}`}>
                    {item.tag}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-sm text-zinc-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
