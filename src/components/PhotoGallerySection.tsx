'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Eye, Sparkles, ChevronRight } from 'lucide-react';

const PHOTO_STORIES = [
  {
    id: "photo-1",
    title: "नागपुर में कामगार सुरक्षा किट वितरण व जनसंवाद कार्यक्रम की मनमोहक तस्वीरें",
    count: "12 तस्वीरें",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    category: "विशेष चित्रावली"
  },
  {
    id: "photo-2",
    title: "नागपुर मेट्रो फेज-2 का नाइट व्यू: रोशनी में नहाया प्रजापति नगर स्टेशन",
    count: "8 तस्वीरें",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    category: "फोटो फीचर"
  },
  {
    id: "photo-3",
    title: "समृद्धि महामार्ग पर निर्मित अत्याधुनिक औद्योगिक पार्क की ड्रोन तस्वीरें",
    count: "15 तस्वीरें",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "विकास गाथा"
  },
  {
    id: "photo-4",
    title: "भारत बनाम ऑस्ट्रेलिया मैच: वानखेड़े में क्रिकेट प्रशंसकों का अभूतपूर्व उत्साह",
    count: "10 तस्वीरें",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    category: "खेल चित्रावली"
  }
];

export default function PhotoGallerySection() {
  return (
    <section className="bg-zinc-950 text-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-zinc-800 shadow-2xl space-y-4 md:space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-xl text-white font-serif flex items-center gap-2">
              फोटो गैलरी & विशेष चित्रावली (Photo Stories)
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-zinc-400">तस्वीरों में देखें देश और विदर्भ की प्रमुख खबरें</p>
          </div>
        </div>
        <Link href="/category/labor" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
          सभी फोटो अलबम <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {PHOTO_STORIES.map((item) => (
          <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-md hover:border-amber-400/50 transition">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              
              <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                {item.category}
              </div>

              <div className="absolute top-3 right-3 bg-zinc-900/90 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30 backdrop-blur-xs flex items-center gap-1">
                <Camera className="w-3 h-3 text-amber-400" />
                <span>{item.count}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-amber-300 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
