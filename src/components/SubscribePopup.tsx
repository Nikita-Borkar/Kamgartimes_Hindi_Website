'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { WhatsappIcon } from '@/components/SocialIcons';

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Check local storage for previous subscription decision
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem('kamgar_push_status');
      const dismissed = sessionStorage.getItem('kamgar_push_dismissed');

      if (status === 'subscribed') {
        setTimeout(() => setIsSubscribed(true), 0);
      } else if (!dismissed) {
        // Show popup after 3 seconds delay on first visit
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleSubscribe = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kamgar_push_status', 'subscribed');
    }
    setIsSubscribed(true);
    setIsOpen(false);
    setShowSuccessToast(true);

    // Auto-hide success toast after 4 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleLater = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kamgar_push_dismissed', 'true');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. NOTIFICATION POPUP (Top-Center Floating Card) */}
      {isOpen && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] max-w-[500px] w-[calc(100%-2rem)] select-none drop-shadow-2xl">
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 transition-all duration-300">
            
            {/* Close Cross Icon */}
            <button
              suppressHydrationWarning
              onClick={handleLater}
              className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Layout: Circular Logo on Left, Text & Buttons on Right */}
            <div className="flex items-center gap-3.5 sm:gap-4.5 pr-3">
              
              {/* Circular Emblem Logo */}
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white p-0.5 shadow-md flex items-center justify-center">
                <img
                  src="/images.jpg"
                  alt="Kamgar Times Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/dark_logo.jpeg';
                  }}
                />
              </div>

              {/* Text & Buttons Container */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-snug mb-3">
                  Subscribe to our notifications for the latest news and updates. You can disable anytime.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4">
                  <button
                    suppressHydrationWarning
                    onClick={handleLater}
                    className="text-[#0070f3] hover:text-[#0051cc] dark:text-sky-400 font-bold text-xs sm:text-sm transition cursor-pointer hover:underline px-1 py-0.5"
                  >
                    Later
                  </button>

                  <button
                    suppressHydrationWarning
                    onClick={handleSubscribe}
                    className="bg-[#0070f3] hover:bg-[#0051cc] text-white font-bold text-xs sm:text-sm px-5 py-1.5 rounded-lg shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2. FLOATING ICONS (Fixed at Bottom-Right corner) */}
      <div className="fixed bottom-16 right-5 z-[9999] flex flex-col items-end gap-3 sm:gap-4 select-none">
        
        {/* FLOATING WHATSAPP BUTTON */}
        <a
          href="https://api.whatsapp.com/send?phone=918055502228"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white ring-4 ring-emerald-500/20 group cursor-pointer"
          title="WhatsApp पर जुड़ें"
        >
          <WhatsappIcon className="w-7 h-7 text-white fill-current group-hover:rotate-12 transition-transform" />
        </a>

        {/* Subscribe Bell and Tooltip */}
        {!isOpen && (
          <div className="flex items-center gap-2">
            {/* Black Speech Bubble Tooltip */}
            <div 
              onClick={() => setIsOpen(true)}
              className="relative bg-black text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xl cursor-pointer hover:bg-zinc-800 transition items-center gap-1 hidden sm:flex"
            >
              <span>Subscribe to notifications</span>
              {/* Pointer arrow to the right pointing towards bell */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-black" />
            </div>

            {/* Vibrant Red Circular Bell Button */}
            <button
              suppressHydrationWarning
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white hover:from-red-500 hover:to-rose-500 transition duration-300 hover:scale-110 cursor-pointer flex items-center justify-center border-2 border-white ring-4 ring-red-500/30 group animate-bounce"
              title="Subscribe to notifications"
            >
              <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                <svg className="w-5 h-5 fill-current text-white group-hover:rotate-12 transition-transform drop-shadow-sm" viewBox="0 0 24 24">
                  <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C8.64 5.36 7 7.92 7 11v5l-2 2v1h14v-1l-2-2z" />
                </svg>
              </div>
              {isSubscribed && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* 4. SUCCESS TOAST */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Thank you! Notifications have been successfully enabled.</span>
        </div>
      )}
    </>
  );
}
