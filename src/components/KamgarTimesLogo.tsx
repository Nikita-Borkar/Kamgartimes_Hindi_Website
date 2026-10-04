'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'auto' | 'dark' | 'light';
}

export default function KamgarTimesLogo({ 
  className = '', 
  size = 'md',
  variant = 'auto'
}: LogoProps) {
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-12 xs:h-14 sm:h-16 md:h-20',
    lg: 'h-16 sm:h-20 md:h-24'
  };

  return (
    <div className={`inline-flex items-center select-none group cursor-pointer max-w-full ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-white p-1.5 dark:bg-white/95 shadow-xs dark:shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <img 
          src="/kamgar_times_with_logo.jpeg" 
          alt="कामगार टाइम्स - जनसामान्यांचा बुलंद आवाज" 
          className={`w-auto ${heightClasses[size]} object-contain drop-shadow-xs`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/kamgartimes_with_logo.jpeg';
          }}
        />
      </div>
    </div>
  );
}

