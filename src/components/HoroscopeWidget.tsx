'use client';

import React, { useState } from 'react';
import { Sun, Moon, Compass, Sparkles, ChevronRight } from 'lucide-react';

const RASHI_LIST = [
  { name: 'मेष (Aries)', icon: '♈', prediction: 'कार्यक्षेत्र में नए अवसर और वित्तीय लाभ के योग।' },
  { name: 'वृषभ (Taurus)', icon: '♉', prediction: 'पारिवारिक जीवन में सुख-शांति बनी रहेगी।' },
  { name: 'मिथुन (Gemini)', icon: '♊', prediction: 'प्रतियोगी परीक्षा और साक्षात्कार में सफलता।' },
  { name: 'कर्क (Cancer)', icon: '♋', prediction: 'स्वास्थ्य का ध्यान रखें, यात्रा के योग।' },
  { name: 'सिंह (Leo)', icon: '♌', prediction: 'मान-सम्मान में वृद्धि और नया अनुबंध मिलेगा।' },
  { name: 'कन्या (Virgo)', icon: '♍', prediction: 'धन का संचय होगा, निवेश से फायदा।' },
  { name: 'तुला (Libra)', icon: '♎', prediction: 'मित्रों का सहयोग प्राप्त होगा, व्यापार में गति।' },
  { name: 'वृश्चिक (Scorpio)', icon: '♏', prediction: 'संतान पक्ष से हर्षदायक समाचार प्राप्त होगा।' },
  { name: 'धनु (Sagittarius)', icon: '♐', prediction: 'आध्यात्मिक रुचि बढ़ेगी, रुकी हुई योजना चालू।' },
  { name: 'मकर (Capricorn)', icon: '♑', prediction: 'मेहनत का पूर्ण फल मिलेगा, तरक्की संभव।' },
  { name: 'कुंभ (Aquarius)', icon: '♒', prediction: 'रचनात्मक कार्यों में सफलता और नया पद।' },
  { name: 'मीन (Pisces)', icon: '♓', prediction: 'वित्तीय स्थिति मजबूत होगी, शांति बनी रहेगी।' },
];

export default function HoroscopeWidget() {
  const [selectedRashi, setSelectedRashi] = useState(RASHI_LIST[0]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm my-2 md:my-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-serif">
              आज का राशिफल & पंचांग
            </h3>
            <span className="text-[10px] text-zinc-500">आश्विन कृष्ण द्वितीया | हस्त नक्षत्र</span>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-amber-500" />
      </div>

      {/* Rashi selector buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mb-4">
        {RASHI_LIST.map((rashi) => (
          <button
            suppressHydrationWarning
            key={rashi.name}
            onClick={() => setSelectedRashi(rashi)}
            className={`p-2 rounded-xl text-center border text-xs transition flex flex-col items-center justify-center gap-0.5 ${
              selectedRashi.name === rashi.name
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 font-bold text-amber-700 dark:text-amber-300'
                : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <span className="text-base">{rashi.icon}</span>
            <span className="text-[10px] truncate max-w-full">{rashi.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Horoscope Card Result */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-amber-800 dark:text-amber-300">
            {selectedRashi.icon} {selectedRashi.name}
          </span>
          <span className="text-[10px] bg-amber-500 text-zinc-950 font-black px-2 py-0.5 rounded">
            शुभ अंक: 7 | रंग: पीला
          </span>
        </div>
        <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed pt-1">
          {selectedRashi.prediction}
        </p>
      </div>
    </div>
  );
}
