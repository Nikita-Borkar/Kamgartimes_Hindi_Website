'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

export default function PayForAdvertisement() {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('नागपुर');
  const [currentLang, setCurrentLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleLangToggle = () => {
    setCurrentLang(prev => (prev === 'hi' ? 'mr' : prev === 'mr' ? 'en' : 'hi'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Header
        onSearchOpen={() => setIsSearchOpen(true)}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        currentLang={currentLang}
        onLangToggle={handleLangToggle}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      <div className="flex-grow pt-8 md:pt-12 pb-10">
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white font-serif tracking-wide">Pay For Advertisement</h1>
          <div className="h-1 w-24 bg-[#e60000] mx-auto mt-4 rounded-full"></div>
        </div>

      <div className="bg-[#f8f9fa] dark:bg-zinc-900/50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Form Section */}
          <div className="bg-transparent">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Your Address" 
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  Submit Your Advertisement ( Images , Video ) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="file" 
                  required
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 dark:file:bg-zinc-800 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-200 dark:hover:file:bg-zinc-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                  About Your Advertisement <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4}
                  placeholder="About Your Advertisement" 
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-[#e60000] hover:bg-red-700 text-white font-bold py-2 px-8 rounded transition-colors"
              >
                Send Now
              </button>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="text-black dark:text-zinc-300 space-y-6 text-sm">
            <h3 className="text-lg font-bold text-black dark:text-white">अपना व्यवसाय बढ़ाएं 'कामगार टाइम्स' के साथ!</h3>
            
            <p>
              'कामगार टाइम्स' भारत का अग्रणी हिंदी न्यूज़ पोर्टल है, जो आपके व्यवसाय के विज्ञापन के लिए एक प्रभावी माध्यम प्रदान करता है।
            </p>
            
            <p>
              📢 हमारी वेबसाइट पर अपना विज्ञापन दें और व्यवसाय बढ़ाएं!<br/>
              📧 विज्ञापन देने के लिए हमसे <a href="mailto:contact@kamgartimes.com" className="text-blue-600 hover:underline">contact@kamgartimes.com</a> पर संपर्क करें या <a href="tel:8055502228" className="text-blue-600 hover:underline">8055502228</a> पर कॉल करें।
            </p>
            
            <p>
              अपना विज्ञापन kamgartimes.com पर प्रकाशित कर अपने व्यवसाय को नई ऊंचाइयों पर ले जाएं! 🚀
            </p>
            
            <div>
              <p>Size : 1400×200 Horizontal</p>
              <p>Size : 1080×1080 square</p>
            </div>
            
            <div className="pt-2 font-medium">
              <p><strong>Bank Name</strong> - Central Bank Of India</p>
              <p><strong>Account No.</strong> - 5731427843</p>
              <p><strong>IFSC Code</strong> - CBIN0283912</p>
            </div>

            <button 
              onClick={() => setShowPaymentPopup(true)}
              className="mt-4 bg-[#e60000] hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              PAY NOW
            </button>
          </div>

        </div>
      </div>

      {/* Payment Popup Modal */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 pt-24 pb-10 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-zinc-900 p-1 sm:p-2 rounded-xl flex flex-col animate-in zoom-in duration-200 mt-8">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowPaymentPopup(false)}
              className="absolute -top-4 -right-4 bg-[#e60000] hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white z-10 transition-transform hover:scale-110"
            >
              &times;
            </button>
            
            {/* Image Container - No scroll, auto fits screen */}
            <div className="rounded-lg flex justify-center items-center">
              <img 
                src="/payment_logo.jpeg" 
                alt="Donate via UPI" 
                className="max-h-[70vh] max-w-[90vw] sm:max-w-[400px] w-auto h-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
      </div>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
