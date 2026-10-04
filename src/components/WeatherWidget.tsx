'use client';

import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, Wind, Droplets, MapPin, Sparkles, Sunrise, Sunset, Eye } from 'lucide-react';

interface CityWeather {
  cityKey: string;
  name: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiStatus: string;
  sunrise: string;
  sunset: string;
  icon: React.ElementType;
  forecast: { day: string; icon: React.ElementType; high: number; low: number }[];
}

const CITIES_DATA: CityWeather[] = [
  {
    cityKey: 'nagpur',
    name: 'नागपुर',
    temp: 31,
    condition: 'धूप व सुहाना मौसम ☀️',
    humidity: 64,
    windSpeed: 12,
    aqi: 45,
    aqiStatus: 'उत्तम (Good)',
    sunrise: '06:12 AM',
    sunset: '06:24 PM',
    icon: CloudSun,
    forecast: [
      { day: 'सोम', icon: Sun, high: 33, low: 24 },
      { day: 'मंगल', icon: CloudSun, high: 34, low: 25 },
      { day: 'बुध', icon: CloudRain, high: 30, low: 23 },
      { day: 'गुरु', icon: CloudRain, high: 29, low: 22 },
      { day: 'शुक्र', icon: CloudSun, high: 32, low: 24 },
      { day: 'शनि', icon: Sun, high: 35, low: 25 },
      { day: 'रवि', icon: Sun, high: 35, low: 26 },
    ]
  },
  {
    cityKey: 'mumbai',
    name: 'मुंबई',
    temp: 29,
    condition: 'आंशिक बादल व नमी ⛅',
    humidity: 82,
    windSpeed: 18,
    aqi: 68,
    aqiStatus: 'मध्यम (Moderate)',
    sunrise: '06:28 AM',
    sunset: '06:40 PM',
    icon: Cloud,
    forecast: [
      { day: 'सोम', icon: CloudRain, high: 30, low: 25 },
      { day: 'मंगल', icon: Cloud, high: 31, low: 26 },
      { day: 'बुध', icon: CloudSun, high: 32, low: 26 },
      { day: 'गुरु', icon: Sun, high: 33, low: 27 },
      { day: 'शुक्र', icon: CloudSun, high: 32, low: 26 },
      { day: 'शनि', icon: CloudRain, high: 30, low: 25 },
      { day: 'रवि', icon: Cloud, high: 31, low: 26 },
    ]
  },
  {
    cityKey: 'delhi',
    name: 'दिल्ली',
    temp: 28,
    condition: 'साफ़ आसमान 🌤️',
    humidity: 52,
    windSpeed: 10,
    aqi: 110,
    aqiStatus: 'सामान्य (Fair)',
    sunrise: '06:14 AM',
    sunset: '06:22 PM',
    icon: Sun,
    forecast: [
      { day: 'सोम', icon: Sun, high: 35, low: 22 },
      { day: 'मंगल', icon: Sun, high: 36, low: 23 },
      { day: 'बुध', icon: CloudSun, high: 34, low: 24 },
      { day: 'गुरु', icon: CloudSun, high: 33, low: 22 },
      { day: 'शुक्र', icon: Sun, high: 36, low: 24 },
      { day: 'शनि', icon: Sun, high: 37, low: 25 },
      { day: 'रवि', icon: Sun, high: 36, low: 24 },
    ]
  },
  {
    cityKey: 'pune',
    name: 'पुणे',
    temp: 27,
    condition: 'हल्की सुहानी हवाएं 🍃',
    humidity: 68,
    windSpeed: 15,
    aqi: 38,
    aqiStatus: 'उत्तम (Good)',
    sunrise: '06:22 AM',
    sunset: '06:34 PM',
    icon: CloudSun,
    forecast: [
      { day: 'सोम', icon: CloudSun, high: 29, low: 20 },
      { day: 'मंगल', icon: Sun, high: 30, low: 21 },
      { day: 'बुध', icon: CloudRain, high: 28, low: 19 },
      { day: 'गुरु', icon: CloudSun, high: 29, low: 20 },
      { day: 'शुक्र', icon: Sun, high: 31, low: 21 },
      { day: 'शनि', icon: Sun, high: 31, low: 22 },
      { day: 'रवि', icon: CloudSun, high: 30, low: 21 },
    ]
  }
];

export default function WeatherWidget() {
  const [selectedCityKey, setSelectedCityKey] = useState<string>('nagpur');

  const currentWeather = CITIES_DATA.find(c => c.cityKey === selectedCityKey) || CITIES_DATA[0];
  const MainIcon = currentWeather.icon;

  return (
    <div className="bg-gradient-to-br from-sky-400/10 via-white to-blue-500/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-sky-950/50 text-zinc-900 dark:text-zinc-100 rounded-3xl p-4 sm:p-6 shadow-xl border border-sky-200/80 dark:border-zinc-800 relative overflow-hidden select-none transition-all duration-300 backdrop-blur-md">
      
      {/* Cool Glowing Orbs Background */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Quick City Selection Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-sky-200/60 dark:border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/20 shrink-0">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/50">
                लाइव मौसम
              </span>
            </div>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white font-serif mt-0.5">मौसम व हवा का मिज़ाज</h4>
          </div>
        </div>

        {/* Quick City Switcher Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 sm:pt-0">
          {CITIES_DATA.map((c) => {
            const isActive = c.cityKey === selectedCityKey;
            return (
              <button
                key={c.cityKey}
                suppressHydrationWarning
                onClick={() => setSelectedCityKey(c.cityKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105' 
                    : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-zinc-700 border border-sky-100 dark:border-zinc-700'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isActive ? 'text-white' : 'text-sky-500'}`} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Temperature Hero Card */}
      <div className="bg-white/90 dark:bg-zinc-950/80 p-4 sm:p-5 rounded-2xl border border-sky-200/60 dark:border-zinc-800/80 shadow-sm mb-4 relative z-10 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Temperature Big Display (Left) */}
          <div className="sm:col-span-7 flex items-center gap-4 min-w-0">
            <div className="p-3 bg-gradient-to-br from-amber-100 via-sky-100 to-amber-50 dark:from-sky-950 dark:to-amber-950 rounded-2xl border border-amber-200 dark:border-sky-800/50 shadow-inner shrink-0">
              <MainIcon className="w-12 h-12 text-amber-500 dark:text-amber-400 animate-bounce" />
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white font-serif">{currentWeather.temp}</span>
                <span className="text-2xl font-black text-sky-500">°C</span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-zinc-700 dark:text-zinc-200 mt-1 truncate">
                {currentWeather.condition}
              </p>
            </div>
          </div>

          {/* Cool Environmental Metrics (Right) */}
          <div className="sm:col-span-5 grid grid-cols-2 gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-sky-100 dark:border-zinc-800/80 sm:pl-4">
            
            <div className="bg-sky-50/70 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-sky-100 dark:border-zinc-800 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">आर्द्रता</p>
                <p className="text-xs font-black text-zinc-900 dark:text-white">{currentWeather.humidity}%</p>
              </div>
            </div>

            <div className="bg-emerald-50/70 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-800 flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">हवा गति</p>
                <p className="text-xs font-black text-zinc-900 dark:text-white">{currentWeather.windSpeed} km/h</p>
              </div>
            </div>

            <div className="bg-amber-50/70 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-amber-100 dark:border-zinc-800 flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">सूर्योदय</p>
                <p className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">{currentWeather.sunrise}</p>
              </div>
            </div>

            <div className="bg-purple-50/70 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-purple-100 dark:border-zinc-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">AQI इंडेक्स</p>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 truncate">{currentWeather.aqi} • {currentWeather.aqiStatus.split(' ')[0]}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 7-Day Interactive Forecast Cards */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            7-दिवसीय मौसम पूर्वानुमान
          </p>
          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-full">
            सप्ताह आउटलुक
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:grid sm:grid-cols-7">
          {currentWeather.forecast.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-zinc-950/70 hover:bg-sky-50/80 dark:hover:bg-zinc-800/80 min-w-[58px] sm:min-w-0 p-2.5 rounded-2xl border border-sky-100 dark:border-zinc-800 shadow-2xs transition duration-200 transform hover:scale-105 flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <span className="text-[10px] sm:text-[11px] font-extrabold text-zinc-700 dark:text-zinc-300">{item.day}</span>
                <IconComp className="w-5 h-5 text-amber-500 dark:text-amber-400 my-1 group-hover:rotate-12 transition-transform" />
                <div className="text-[10px] sm:text-[11px] font-black leading-tight text-center">
                  <span className="text-red-500 dark:text-red-400 block">{item.high}°</span>
                  <span className="text-sky-500 dark:text-sky-400 text-[9px] opacity-80 block">{item.low}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
