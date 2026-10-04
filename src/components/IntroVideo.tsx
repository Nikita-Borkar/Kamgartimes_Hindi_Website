'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function IntroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Check if the intro has already been shown in this session
    const hasSeenIntro = sessionStorage.getItem('kamgartimes_has_seen_intro');
    if (!hasSeenIntro) {
      setShowVideo(true);
    }
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Try to autoplay with sound
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay with sound fails (browser policy), fallback to muted autoplay
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }
  }, [showVideo]);

  const handleVideoEnd = () => {
    setShowVideo(false);
    sessionStorage.setItem('kamgartimes_has_seen_intro', 'true');
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isMounted || !showVideo) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center">
      {/* Skip Button */}
      <button 
        onClick={handleVideoEnd}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-bold text-sm transition z-10 cursor-pointer shadow-lg border border-white/30"
      >
        Skip Intro
      </button>

      {/* Unmute/Mute Toggle */}
      <button 
        onClick={toggleMute}
        className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-3 rounded-full transition z-10 cursor-pointer shadow-lg"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      <video
        ref={videoRef}
        src="/intro_video.mp4"
        playsInline
        className="w-full h-full object-contain"
        onEnded={handleVideoEnd}
      />
    </div>
  );
}
