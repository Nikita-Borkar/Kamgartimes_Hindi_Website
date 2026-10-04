'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart2, DollarSign, ShieldCheck, Zap } from 'lucide-react';

interface MarketItem {
  name: string;
  category: 'indices' | 'commodities' | 'stocks';
  value: string;
  change: string;
  percent: string;
  isUp: boolean;
  high?: string;
  low?: string;
}

const MARKET_ITEMS: MarketItem[] = [
  { name: 'NIFTY 50', category: 'indices', value: '25,480.20', change: '+165.40', percent: '+0.65%', isUp: true, high: '25,520', low: '25,310' },
  { name: 'SENSEX', category: 'indices', value: '83,120.45', change: '+478.20', percent: '+0.58%', isUp: true, high: '83,290', low: '82,800' },
  { name: 'BANK NIFTY', category: 'indices', value: '52,340.10', change: '+310.80', percent: '+0.60%', isUp: true, high: '52,490', low: '52,100' },
  { name: 'गोल्ड (24K / 10g)', category: 'commodities', value: '₹74,850', change: '+240.00', percent: '+0.32%', isUp: true },
  { name: 'चांदी (1kg)', category: 'commodities', value: '₹88,400', change: '+520.00', percent: '+0.59%', isUp: true },
  { name: 'USD / INR', category: 'commodities', value: '₹83.85', change: '-0.08', percent: '-0.10%', isUp: false },
  { name: 'TATA STEEL', category: 'stocks', value: '₹154.20', change: '+3.60', percent: '+2.40%', isUp: true },
  { name: 'RELIANCE', category: 'stocks', value: '₹2,980.50', change: '+52.40', percent: '+1.80%', isUp: true },
  { name: 'COAL INDIA', category: 'stocks', value: '₹485.10', change: '+7.15', percent: '+1.50%', isUp: true },
];

export default function StockMarketWidget() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'indices' | 'commodities' | 'stocks'>('all');

  const filteredItems = activeCategory === 'all' 
    ? MARKET_ITEMS.slice(0, 6) 
    : MARKET_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="bg-gradient-to-br from-emerald-400/10 via-white to-teal-500/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-emerald-950/50 text-zinc-900 dark:text-zinc-100 rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-200/80 dark:border-zinc-800 relative overflow-hidden select-none transition-all duration-300 backdrop-blur-md">
      
      {/* Decorative Glowing Accent Orbs */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Market Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200/60 dark:border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                लाइव मार्केट
              </span>
            </div>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white font-serif mt-0.5">शेयर बाज़ार व कमोडिटी दरें</h4>
          </div>
        </div>

        {/* Category Switcher Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 sm:pt-0">
          {[
            { id: 'all', label: 'सभी' },
            { id: 'indices', label: 'इंडेक्स' },
            { id: 'commodities', label: 'सोना/चांदी' },
            { id: 'stocks', label: 'शेयर्स' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as 'all' | 'indices' | 'commodities' | 'stocks')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 scale-105'
                    : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-zinc-700 border border-emerald-100 dark:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Grid of Market Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4 relative z-10">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 dark:bg-zinc-950/80 hover:bg-emerald-50/80 dark:hover:bg-zinc-800/80 p-3.5 rounded-2xl border border-emerald-200/60 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition duration-200 min-w-0 transform hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-1.5 min-w-0">
              <span className="text-[11px] font-extrabold text-zinc-600 dark:text-zinc-300 truncate">{item.name}</span>
              {item.isUp ? (
                <div className="p-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1 bg-rose-100 dark:bg-rose-950/80 rounded-lg text-rose-600 dark:text-rose-400 shrink-0">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="text-sm sm:text-base font-black text-zinc-900 dark:text-white tracking-tight truncate font-serif">
              {item.value}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-bold mt-1.5 flex-wrap">
              <span className={item.isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                {item.change}
              </span>
              <span className={`px-1.5 py-0.5 rounded-md font-extrabold text-[9px] ${
                item.isUp 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50' 
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
              }`}>
                {item.percent}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cool Live Top Gainers Marquee Stream */}
      <div className="bg-white/90 dark:bg-zinc-950/80 p-2.5 sm:p-3 rounded-2xl border border-emerald-200/60 dark:border-zinc-800/80 shadow-xs flex items-center gap-3 overflow-x-auto no-scrollbar relative z-10 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 shrink-0 border-r border-emerald-200 dark:border-zinc-800 pr-3">
          <Zap className="w-3.5 h-3.5 fill-current text-amber-500 animate-bounce" />
          <span className="text-[11px] uppercase tracking-wider">टॉप गेनर्स:</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {[
            { symbol: 'TATA STEEL', price: '₹154.20', change: '+2.4%', isUp: true },
            { symbol: 'RELIANCE', price: '₹2,980.50', change: '+1.8%', isUp: true },
            { symbol: 'COAL INDIA', price: '₹485.10', change: '+1.5%', isUp: true },
            { symbol: 'GOLD 24K', price: '₹74,850', change: '+0.32%', isUp: true },
            { symbol: 'SILVER 1kg', price: '₹88,400', change: '+0.59%', isUp: true },
          ].map((stock, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold shrink-0 bg-emerald-50/60 dark:bg-zinc-900/60 px-2.5 py-1 rounded-xl border border-emerald-100 dark:border-zinc-800">
              <span className="text-zinc-700 dark:text-zinc-300">{stock.symbol}</span>
              <span className="text-zinc-900 dark:text-white font-serif">{stock.price}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">
                ({stock.change})
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
