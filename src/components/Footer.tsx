'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Send, Phone, MapPin, ShieldCheck, CheckCircle2, 
  MessageCircle, ArrowUp 
} from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from '@/components/SocialIcons';
import { CATEGORIES, BREAKING_NEWS_TICKER } from '@/data/newsData';
import KamgarTimesLogo from '@/components/KamgarTimesLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t-4 border-red-600 pt-12 pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TOP SECTION: NEWSLETTER SUBSCRIPTION */}
        <div className="bg-gradient-to-r from-red-950/80 via-zinc-900 to-zinc-900 border border-red-900/50 rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 md:mb-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4 text-red-500" />
              <span>मुफ्त दैनिक बुलेटिन</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              कामगार टाइम्स न्यूज़लेटर से जुड़ें!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              हर सुबह पाएं देश, कामगार कल्याण और सरकारी नौकरी की चुनिंदा खबरें सीधे अपने ईमेल पर।
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            {subscribed ? (
              <div className="bg-emerald-950 text-emerald-300 font-bold px-4 py-3 rounded-xl border border-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>धन्यवाद! आप सफलतापूर्वक न्यूज़लेटर से जुड़ गए हैं।</span>
              </div>
            ) : (
              <>
                <input
                  suppressHydrationWarning
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="अपना ईमेल पता दर्ज करें..."
                  required
                  className="bg-zinc-950 text-white placeholder:text-zinc-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-red-600 w-full sm:w-[280px]"
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition duration-200 shrink-0"
                >
                  सब्सक्राइब करें
                </button>
              </>
            )}
          </form>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 pb-8 lg:pb-10 border-b border-zinc-800">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="hover:opacity-95 transition inline-block">
              <KamgarTimesLogo size="sm" showTagline={true} variant="dark" />
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed pr-4">
              कामगार टाइम्स भारत का अग्रणी हिंदी समाचार एवं श्रम हितैषी डिजिटल पोर्टल है। हम मजदूरों, कर्मचारियों, युवाओं और आम जनता से जुड़ी खबरों को निष्पक्षता और सटीकता के साथ प्रस्तुत करते हैं।
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-zinc-300 block mb-2">सोशल मीडिया पर फॉलो करें:</span>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition">
                  <WhatsappIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white font-serif uppercase tracking-wider border-l-2 border-red-600 pl-2">
              मुख्य श्रेणियां
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(1, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-red-400 transition flex items-center gap-1.5">
                    <span className="text-red-500">›</span>
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Useful Links & Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white font-serif uppercase tracking-wider border-l-2 border-red-600 pl-2">
              सेवाएं & पोर्टल
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/epaper" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500">›</span>
                  <span>दैनिक ई-पेपर (PDF)</span>
                </Link>
              </li>
              <li>
                <Link href="/send-news" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500">›</span>
                  <span>अपनी खबर भेजें (Citizen News)</span>
                </Link>
              </li>
              <li>
                <Link href="/category/jobs" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500">›</span>
                  <span>सरकारी नौकरी भर्ती 2026</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500">›</span>
                  <span>संपादकीय नीति (Editorial Policy)</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition flex items-center gap-1.5">
                  <span className="text-red-500">›</span>
                  <span>फैक्ट चेक नीति (Fact-Check)</span>
                </Link>
              </li>
            </ul>
            <div className="pt-4 space-y-3">
              <button
                onClick={() => setShowDonatePopup(true)}
                className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs transition-colors"
              >
                DONATE US
              </button>
              <Link href="/pay-for-advertisement" className="w-full block text-center bg-[#cc0000] hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs transition-colors">
                PAY FOR ADVERTISEMENT
              </Link>
            </div>
          </div>

          {/* Col 4: Grievance Officer & Contact (Compliance) */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white font-serif uppercase tracking-wider border-l-2 border-red-600 pl-2">
              अनुपालन & संपर्क
            </h4>
            <div className="bg-zinc-900 p-3.5 rounded-2xl border border-zinc-800 text-xs space-y-2">
              <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">
                शिकायत अधिकारी
              </span>
              <p className="text-zinc-300 font-semibold">अधिवक्ता श्री. तन्मय म. शेंडे (शिकायत अधिकारी)</p>
              <p className="text-zinc-400 text-[11px]">ई-मेल: grievance@kamgartimes.com</p>
              <p className="text-zinc-400 text-[11px] leading-relaxed">कार्यालय: कामगार टाइम्स, पुलिस थाने के सामने, काटोल रोड, कळमेश्वर (Nagpur) 441501</p>
              <p className="text-zinc-400 text-[11px]">Phone no.: 07118272000 | Mob. 9404517414</p>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="space-y-1 text-center sm:text-left">
            <p>© 2026 कामगार टाइम्स मीडिया नेटवर्क। सर्वाधिकार सुरक्षित।</p>
            <p className="text-[11px] text-zinc-600">
              RNI Registration No: MAH/KT/2026/78412 | ISO 9001:2026 Certified Digital Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-zinc-300">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-zinc-300">Contact Us</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-zinc-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-zinc-300">Disclaimer</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-zinc-300">Terms of Service</Link>
            <span>•</span>
            <button
              suppressHydrationWarning
              onClick={scrollToTop}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-red-600 text-white transition"
              title="ऊपर जाएं"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Donate Popup Modal */}
      {showDonatePopup && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 pt-24 pb-10 backdrop-blur-sm">
          <div className="relative bg-white p-1 sm:p-2 rounded-xl flex flex-col animate-in zoom-in duration-200 mt-8">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowDonatePopup(false)}
              className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white z-10 transition-transform hover:scale-110"
            >
              &times;
            </button>
            
            {/* Text Description */}
            <div className="text-center px-4 pt-6 pb-4 max-w-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">कामगार टाइम्स का सहयोग करें</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                निष्पक्ष और स्वतंत्र पत्रकारिता को जीवित रखने में हमारी मदद करें। 
                कृपया नीचे दिए गए QR कोड को स्कैन करके अपना अमूल्य योगदान दें।
              </p>
            </div>
            
            {/* Image Container - No scroll, auto fits screen */}
            <div className="rounded-lg flex justify-center items-center pb-4 px-4">
              <img 
                src="/payment_logo.jpeg" 
                alt="Donate via UPI" 
                className="max-h-[50vh] max-w-[90vw] sm:max-w-[350px] w-auto h-auto object-contain rounded shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* FIXED BOTTOM TICKER */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black text-white z-[999] flex items-center border-t-2 border-[#e60000] shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        {/* Clock Section */}
        <div suppressHydrationWarning className="bg-gray-200 text-black font-bold h-full px-3 sm:px-4 flex items-center justify-center text-sm sm:text-base shrink-0 z-10 border-r-2 border-gray-400">
          {timeStr || '15:16'}
        </div>
        
        {/* Marquee Section */}
        <div className="flex-1 overflow-hidden h-full flex items-center relative">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-10 sm:gap-14">
            {BREAKING_NEWS_TICKER.concat(BREAKING_NEWS_TICKER).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm sm:text-base font-medium">
                <span className="text-blue-400">📲</span>
                <span>कामगार टाइम्स | {item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
