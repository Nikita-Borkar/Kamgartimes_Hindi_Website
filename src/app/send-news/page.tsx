'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Send, Upload, CheckCircle2, ShieldCheck, Camera, FileVideo, HardHat } from 'lucide-react';
import { WhatsappIcon } from '@/components/SocialIcons';

export default function SendNewsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'नागपुर',
    newsTitle: '',
    newsDetails: '',
    file: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `*कामगार टाइम्स सिटीज़न जर्नलिज्म न्यूज़ रिपोर्ट*\n\n` +
    `*नाम:* ${formData.name || 'नागरिक'}\n` +
    `*शहर:* ${formData.city}\n` +
    `*शीर्षक:* ${formData.newsTitle}\n` +
    `*विवरण:* ${formData.newsDetails}\n\n` +
    `_फोटो/वीडियो संदेश में अटैच करें_`
  );

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity="नागपुर"
        onCitySelect={() => {}}
        currentLang="hi"
        onLangToggle={() => {}}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-600">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-950/60 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Camera className="w-4 h-4" />
              <span>सिटीज़न जर्नलिज्म (Citizen Journalism)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
              अपनी ख़बर, फोटो या वीडियो हमें भेजें! 🎥
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              क्या आपके क्षेत्र में कोई समस्या, कामगारों का आंदोलन या विशेष घटना हुई है? कामगार टाइम्स के साथ रिपोर्टर बनें।
            </p>
          </div>

          <a
            href={`https://api.whatsapp.com/send?phone=919876543210&text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-950 font-black px-5 py-3.5 rounded-2xl shadow-xl hover:bg-emerald-50 transition shrink-0"
          >
            <WhatsappIcon className="w-5 h-5 text-emerald-600 fill-current" />
            <span>1-क्लिक WhatsApp न्यूज़ डेस्क</span>
          </a>
        </div>

        {/* Upload Form Box */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <Send className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="font-extrabold text-xl text-zinc-900 dark:text-white font-serif">
              ऑनलाइन समाचार सबमिशन फॉर्म
            </h2>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 p-8 rounded-2xl text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-800 dark:text-emerald-300">
                आपकी खबर सफलतापूर्वक न्यूज़ डेस्क तक पहुंच गई है!
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                हमारी संपादकीय टीम तथ्यों की पुष्टि करने के बाद आपकी खबर को प्रमुखता से कामगार टाइम्स पोर्टल पर प्रकाशित करेगी।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition mt-2"
              >
                दूसरी खबर भेजें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">आपका नाम *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा: राजेश कुमार"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">मोबाइल / WhatsApp नंबर *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="उदा: 9876543210"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">शहर / जिला *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="उदा: नागपुर, महाराष्ट्र"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">खबर का मुख्य शीर्षक *</label>
                <input
                  type="text"
                  required
                  value={formData.newsTitle}
                  onChange={(e) => setFormData({ ...formData, newsTitle: e.target.value })}
                  placeholder="संक्षिप्त शीर्षक दर्ज करें..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">घटना का पूरा विवरण (News Content) *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.newsDetails}
                  onChange={(e) => setFormData({ ...formData, newsDetails: e.target.value })}
                  placeholder="कब, कहाँ और क्या हुआ - विस्तार से लिखें..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Photo/Video Attachment Box */}
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-6 text-center space-y-2 bg-zinc-50 dark:bg-zinc-800/40">
                <Upload className="w-8 h-8 text-red-600 mx-auto" />
                <p className="font-bold text-zinc-700 dark:text-zinc-300">
                  फोटो / वीडियो संलग्न करें (Max 50MB)
                </p>
                <p className="text-[11px] text-zinc-400">JPG, PNG, MP4 स्वरूप मान्य हैं</p>
                <input type="file" className="hidden" id="news-file" />
                <label
                  htmlFor="news-file"
                  className="inline-block bg-zinc-200 dark:bg-zinc-700 hover:bg-red-600 hover:text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition"
                >
                  फाइल चुनें
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition"
                >
                  संपादक मंडल को खबर भेजें
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Confidentiality Pledge */}
        <div className="bg-zinc-900 text-zinc-300 p-6 rounded-2xl border border-zinc-800 flex items-start gap-4 text-xs">
          <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">गोपनीयता और सुरक्षा का आश्वासन:</h4>
            <p className="text-zinc-400 leading-relaxed">
              कामगार टाइम्स व्हिसलब्लोअर्स और संवेदनहीन मुद्दों पर खबर देने वाले नागरिकों की पहचान 100% गुप्त रखता है। आपकी सहमति के बिना आपकी व्यक्तिगत जानकारी साझा नहीं की जाएगी।
            </p>
          </div>
        </div>

      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
