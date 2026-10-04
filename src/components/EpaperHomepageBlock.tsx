'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Calendar, Sparkles } from 'lucide-react';

export default function EpaperHomepageBlock() {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `===================================================\n` +
      `       कामगार टाइम्स (KAMGAR TIMES HINDI DATED 24 SEPT 2026)\n` +
      `       RNI Registration No: MAHMAR/2006/19485\n` +
      `       Editor & Publisher: Shri Mahendra Shende\n` +
      `===================================================\n\n` +
      `आज की प्रमुख खबरें:\n` +
      `1. कामगारों के लिए बड़ी खुशखबरी: न्यूनतम दैनिक मजदूरी में 15% बढ़ोतरी की घोषणा।\n` +
      `2. EPFO का बड़ा अपडेट: EPS-95 पेंशनभोगी अब घर बैठे डिजिटल जीवन प्रमाण पत्र जमा कर सकेंगे।\n` +
      `3. नागपुर मेट्रो फेज-2 का काम तेज: हिंगना और वाडी रूट पर जल्द ट्रायल रन।\n` +
      `4. रेलवे भर्ती बोर्ड: 45,000 से अधिक ग्रुप D और तकनीशियन पदों पर आवेदन शुरू।\n\n` +
      `कामगार टाइम्स डिजिटल ई-पेपर पढ़ने के लिए धन्यवाद!`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `KamgarTimes_EPaper_24Sept2026.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-red-800/80 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Info Column */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-red-900/90 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full border border-amber-400/30 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>दैनिक ई-पेपर (Print Edition in PDF)</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight leading-snug">
            कामगार टाइम्स ई-पेपर: आज का संपूर्ण समाचार पत्र डिजिटल रूप में पढ़ें
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            नागपुर, विदर्भ और महाराष्ट्र का प्रामाणिक दैनिक समाचार पत्र। अब अपने मोबाइल, टैबलेट या कंप्यूटर पर उच्च गुणवत्ता में पृष्ठ-दर-पृष्ठ पढ़ें एवं निःशुल्क PDF डाउनलोड करें।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/epaper"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>ई-पेपर ऑनलाइन पढ़ें (Full Screen)</span>
            </Link>

            <button
              suppressHydrationWarning
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition border border-red-500 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>आज का PDF संस्करण डाउनलोड करें</span>
            </button>
          </div>
        </div>

        {/* Right E-Paper Thumbnail Card */}
        <div className="shrink-0 relative group">
          <div className="w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-zinc-900 transition transform group-hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
              alt="Kamgar Times Epaper Front Page"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-center space-y-1">
              <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block">
                24 सितम्बर 2026
              </span>
              <p className="text-[11px] text-amber-300 font-bold">नागपुर मुख्य संस्करण</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
