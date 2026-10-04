'use client';

import React, { useState } from 'react';
import { Search, X, Plus, Minus, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
}

const LOCATIONS = [
  { state: 'महाराष्ट्र', cities: ['नागपुर', 'मुंबई', 'पुणे', 'नाशिक', 'औरंगाबाद'] },
  { state: 'उत्तर प्रदेश', cities: ['लखनऊ', 'कानपुर', 'वाराणसी', 'आगरा', 'नोएडा'] },
  { state: 'मध्य प्रदेश', cities: ['भोपाल', 'इंदौर', 'जबलपुर', 'ग्वालियर', 'उज्जैन'] },
  { state: 'दिल्ली', cities: ['नई दिल्ली', 'दक्षिण दिल्ली', 'पूर्वी दिल्ली'] },
  { state: 'राजस्थान', cities: ['जयपुर', 'जोधपुर', 'उदयपुर', 'कोटा'] },
  { state: 'बिहार', cities: ['पटना', 'गया', 'भागलपुर', 'मुजफ्फरपुर'] },
];

export default function CitySelectorModal({ isOpen, onClose, selectedCity }: CitySelectorModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedState, setExpandedState] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCityClick = (city: string) => {
    onClose();
    // Use encodeURIComponent to handle Hindi characters in URLs
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  const filteredLocations = LOCATIONS.map(loc => {
    const filteredCities = loc.cities.filter(city => city.includes(searchQuery));
    return { ...loc, cities: filteredCities };
  }).filter(loc => loc.cities.length > 0 || loc.state.includes(searchQuery));

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-start pt-10 sm:pt-20 px-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 relative bg-white dark:bg-zinc-900 z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          
          <div className="relative mt-2 mb-4 pr-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="शहर चुनें" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 focus:border-red-600 dark:focus:border-red-600 outline-none text-lg font-medium text-zinc-900 dark:text-white transition-colors"
            />
          </div>

          {/* Current Selected City Pill */}
          <div className="flex items-center gap-2">
            <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800 transition">
              <MapPin className="w-3.5 h-3.5" />
              {selectedCity}
            </span>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">राज्य & शहर चुनें</h3>
          
          {filteredLocations.map((loc) => (
            <div key={loc.state} className="border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
              <button 
                onClick={() => setExpandedState(expandedState === loc.state ? null : loc.state)}
                className="w-full flex items-center justify-between py-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition"
              >
                {loc.state}
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  {expandedState === loc.state ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {/* Cities list when expanded */}
              {expandedState === loc.state && (
                <div className="pl-4 py-2 grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-200">
                  {loc.cities.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCityClick(city)}
                      className="text-left px-3 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors text-sm font-medium"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              कोई शहर या राज्य नहीं मिला।
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
