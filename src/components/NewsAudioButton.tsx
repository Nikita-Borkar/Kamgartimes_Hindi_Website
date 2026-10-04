'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Headphones } from 'lucide-react';

interface NewsAudioButtonProps {
  title: string;
  summary?: string;
  variant?: 'icon' | 'badge' | 'full';
  className?: string;
}

// Global reference to stop previous active audio when a new one is played
let globalActiveStop: (() => void) | null = null;

export default function NewsAudioButton({
  title,
  summary = '',
  variant = 'badge',
  className = '',
}: NewsAudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setTimeout(() => setIsSupported(false), 0);
    }
  }, []);

  const handleToggleSpeech = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      globalActiveStop = null;
    } else {
      if (globalActiveStop) {
        globalActiveStop();
      }

      window.speechSynthesis.cancel();

      const cleanTitle = title.replace(/[^\u0900-\u097F\s0-9a-zA-Z]/g, '');
      const cleanSummary = summary.replace(/[^\u0900-\u097F\s0-9a-zA-Z]/g, '');
      const textToRead = `${cleanTitle}. ${cleanSummary}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;

      const stopCurrent = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      };

      globalActiveStop = stopCurrent;

      utterance.onend = () => {
        setIsPlaying(false);
        if (globalActiveStop === stopCurrent) {
          globalActiveStop = null;
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        if (globalActiveStop === stopCurrent) {
          globalActiveStop = null;
        }
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  if (variant === 'icon') {
    return (
      <button
        suppressHydrationWarning
        onClick={handleToggleSpeech}
        className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
          isPlaying
            ? 'bg-amber-500 text-zinc-950 animate-pulse ring-2 ring-amber-300'
            : 'bg-zinc-900/80 hover:bg-red-600 text-zinc-200 hover:text-white border border-zinc-700/60'
        } ${className}`}
        title={isPlaying ? 'ऑडियो रोकें' : 'खबर ऑडियो में सुनें'}
        aria-label="Audio Reader"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === 'full') {
    return (
      <button
        suppressHydrationWarning
        onClick={handleToggleSpeech}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
          isPlaying
            ? 'bg-amber-500 text-zinc-950 animate-pulse'
            : 'bg-red-600 hover:bg-red-700 text-white'
        } ${className}`}
        title={isPlaying ? 'ऑडियो बंद करें' : 'खबर सुनें'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
        <span>{isPlaying ? 'ऑडियो चल रहा है (रोकें)' : 'ऑडियो में सुनें 🔊'}</span>
      </button>
    );
  }

  // Default 'badge' variant
  return (
    <button
      suppressHydrationWarning
      onClick={handleToggleSpeech}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all duration-200 cursor-pointer shadow-md ${
        isPlaying
          ? 'bg-amber-400 text-zinc-950 animate-pulse ring-2 ring-amber-300/60'
          : 'bg-zinc-950/80 hover:bg-red-600 text-amber-300 hover:text-white border border-amber-400/40'
      } ${className}`}
      title={isPlaying ? 'ऑडियो बंद करें' : 'खबर सुनें'}
    >
      {isPlaying ? (
        <>
          <Pause className="w-3 h-3 text-zinc-950" />
          <span>रुकें</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping"></span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>सुनें 🔊</span>
        </>
      )}
    </button>
  );
}
