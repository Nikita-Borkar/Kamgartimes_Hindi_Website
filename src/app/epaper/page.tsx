'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { EPAPER_DATA } from '@/data/newsData';
import { FileText, Download, Calendar, ZoomIn, ChevronLeft, ChevronRight, X, Printer } from 'lucide-react';

export default function EpaperPage() {
  const [selectedEdition, setSelectedEdition] = useState(EPAPER_DATA[0]);
  const [activePage, setActivePage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const handleDownloadPdf = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>कामगार टाइम्स ई-पेपर - ${selectedEdition.date}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #fff; color: #111; max-width: 900px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 4px double #dc2626; padding-bottom: 15px; margin-bottom: 25px; }
    .header h1 { font-size: 42px; color: #dc2626; margin: 0; font-family: Georgia, serif; }
    .header p { font-size: 14px; color: #555; margin-top: 6px; font-weight: bold; }
    .meta { display: flex; justify-content: space-between; background: #f8fafc; padding: 12px 20px; border: 1px solid #e2e8f0; font-weight: bold; font-size: 13px; margin-bottom: 30px; border-radius: 8px; }
    .article { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px border #e2e8f0; }
    .article h2 { color: #000; font-size: 22px; margin: 0 0 10px 0; font-family: Georgia, serif; }
    .article p { font-size: 14px; line-height: 1.6; color: #333; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; border-top: 2px solid #dc2626; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>कामगार टाइम्स (KAMGAR TIMES)</h1>
    <p>जनसामान्यांचा बुलंद आवाज • भारत का अग्रणी श्रम हितैषी दैनिक समाचार पत्र</p>
  </div>
  <div class="meta">
    <span>संस्करण तिथि: ${selectedEdition.date}</span>
    <span>नागपुर / विदर्भ / महाराष्ट्र संस्करण</span>
    <span>कुल पृष्ठ: ${selectedEdition.totalPages}</span>
  </div>
  <div class="article">
    <h2>1. कामगारों के लिए बड़ी खुशखबरी: न्यूनतम दैनिक मजदूरी में 15% बढ़ोतरी की घोषणा</h2>
    <p>केंद्रीय श्रम एवं रोजगार मंत्रालय ने असंगठित क्षेत्र और कारखाने में कार्यरत लाखों श्रमिकों को राहत दी। 1 अक्टूबर से प्रभावी होंगी नई दरें। निर्माण कार्य, खनन, कृषि, स्वच्छता सेवा और औद्योगिक कारखानों में लगे सभी पंजीकृत श्रमिकों को इसका प्रत्यक्ष लाभ मिलेगा।</p>
  </div>
  <div class="article">
    <h2>2. EPFO का बड़ा अपडेट: EPS-95 पेंशनभोगी अब घर बैठे मोबाइल ऐप से जमा कर सकेंगे डिजिटल जीवन प्रमाण पत्र</h2>
    <p>कर्मचारी भविष्य निधि संगठन (EPFO) ने देश के 78 लाख से अधिक पेंशनभोगियों के लिए फेस ऑथेंटिकेशन टेक्नोलॉजी आधारित जीवन प्रमाण पत्र सेवा को और सुगम बना दिया है।</p>
  </div>
  <div class="article">
    <h2>3. रेलवे भर्ती बोर्ड (RRB) ने जारी किया नोटिफिकेशन: 45,000 से ज्यादा पदों पर आवेदन शुरू</h2>
    <p>भारतीय रेलवे में ग्रुप D, तकनीशियन और सहायकों के पदों के लिए 10वीं पास युवाओं हेतु आवेदन प्रक्रिया चालू कर दी गई है।</p>
  </div>
  <div class="footer">
    © 2026 कामगार टाइम्स डिजिटल ई-पेपर • सर्वाधिकार सुरक्षित • www.kamgartimes.com
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kamgar_Times_Epaper_${selectedEdition.date.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity="नागपुर"
        onCitySelect={() => {}}
        currentLang="hi"
        onLangToggle={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* E-Paper Banner Header */}
        <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-900 rounded-3xl p-6 sm:p-8 border border-red-900/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-900/60 px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-red-700/50">
              <FileText className="w-4 h-4" />
              <span>कामगार टाइम्स ई-पेपर संस्करण</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              दैनिक समाचार पत्र ई-पेपर (E-Paper PDF)
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              अखबार की तरह पृष्ठ दर पृष्ठ डिजिटल प्रिंट पढ़ें और डायरेक्ट PDF संस्करण डाउनलोड करें।
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>PDF / डिजिटल ई-पेपर डाउनलोड करें</span>
          </button>
        </div>

        {/* Edition Date Selector */}
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>संस्करण तिथि चुनें:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {EPAPER_DATA.map((edition) => (
              <button
                key={edition.id}
                onClick={() => {
                  setSelectedEdition(edition);
                  setActivePage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  selectedEdition.id === edition.id
                    ? 'bg-red-600 border-red-500 text-white shadow-lg'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {edition.date}
              </button>
            ))}
          </div>
        </div>

        {/* E-Paper Viewer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Paper Reader View */}
          <div className="lg:col-span-8 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-3">
              <span className="font-bold text-zinc-200">
                {selectedEdition.title} (पेज {activePage} / {selectedEdition.totalPages})
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={activePage <= 1}
                  onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-amber-400 font-bold">{activePage}</span>
                <button
                  disabled={activePage >= selectedEdition.totalPages}
                  onClick={() => setActivePage(prev => Math.min(selectedEdition.totalPages, prev + 1))}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mock Paper Page Image Container */}
            <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800 group">
              <img
                src={selectedEdition.thumbnail}
                alt={`Page ${activePage}`}
                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="bg-red-600 text-white font-serif font-black text-sm px-3 py-1 rounded shadow">
                    कामगार टाइम्स • पृष्ठ {activePage}
                  </span>
                  <span className="bg-zinc-950/80 text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded">
                    {selectedEdition.date}
                  </span>
                </div>

                <div className="bg-zinc-950/90 backdrop-blur-md p-4 rounded-xl border border-zinc-800 text-center space-y-3">
                  <p className="text-xs text-zinc-300 font-medium">
                    उच्च गुणवत्ता में पूरा ई-पेपर पृष्ठ देखने और ज़ूम करने के लिए नीचे बटन दबाएं।
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setIsZoomModalOpen(true)}
                      className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>पृष्ठ ज़ूम करें (Zoom Page)</span>
                    </button>

                    <button
                      onClick={handleDownloadPdf}
                      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>डाउनलोड ई-पेपर</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Thumbnails Selector Grid */}
          <div className="lg:col-span-4 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-4">
            <h3 className="font-extrabold text-lg text-white font-serif border-b border-zinc-800 pb-3">
              सभी पृष्ठ सूची ({selectedEdition.totalPages} कुल पृष्ठ)
            </h3>

            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
              {Array.from({ length: selectedEdition.totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setActivePage(pageNum)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      activePage === pageNum ? 'border-red-500 ring-2 ring-red-500/40' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={selectedEdition.thumbnail}
                      alt={`Page ${pageNum}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-center py-1 text-[11px] font-bold text-zinc-200">
                      पेज {pageNum}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* FULL-SCREEN HIGH-RES PAGE ZOOM MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[90vh] bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col justify-between">
            {/* Modal Header */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  कामगार टाइम्स ई-पेपर ज़ूम व्यू
                </span>
                <span className="text-xs text-zinc-300 font-mono">
                  {selectedEdition.date} • पृष्ठ {activePage}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>प्रिंट करें</span>
                </button>
                <button
                  onClick={() => setIsZoomModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zoom Image Viewer Container */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-zinc-950">
              <img
                src={selectedEdition.thumbnail}
                alt={`Zoom Page ${activePage}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-zinc-800"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
              <button
                disabled={activePage <= 1}
                onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
                className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला पृष्ठ</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>यह पृष्ठ डाउनलोड करें</span>
              </button>

              <button
                disabled={activePage >= selectedEdition.totalPages}
                onClick={() => setActivePage(prev => Math.min(selectedEdition.totalPages, prev + 1))}
                className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <span>अगला पृष्ठ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

