'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  textToRead: string;
  title: string;
}

export default function AudioPlayer({ textToRead, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handlePlayPause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${title}. ${textToRead}`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95; // Natural Hindi speech rate

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 border border-red-900/40 rounded-2xl p-4 my-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayPause}
          className={`w-11 h-11 rounded-xl font-bold flex items-center justify-center shadow-lg transition-all transform hover:scale-105 ${
            isPlaying ? 'bg-amber-500 text-zinc-950 animate-pulse' : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isPlaying ? "ऑडियो रोकें" : "खबर सुनें"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-white font-serif">
              ऑडियो बुलेटिन: खबर सुनें 🔊
            </h4>
            <span className="bg-red-900 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded">
              AI Voice
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            {isPlaying ? 'वाचन जारी है... रोकने के लिए बटन दबाएं' : 'क्लिक करके पूरी खबर हिंदी ऑडियो में सुनें'}
          </p>
        </div>
      </div>

      {isPlaying && (
        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>ऑडियो एक्टिव</span>
        </div>
      )}
    </div>
  );
}
