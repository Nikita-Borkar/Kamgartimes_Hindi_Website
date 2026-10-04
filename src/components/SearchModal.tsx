'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, Clock, ChevronRight, HardHat } from 'lucide-react';
import { ARTICLES } from '@/data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? ARTICLES.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="खबर, टॉपिक या विषय खोजें (उदा: न्यूनतम वेतन, रेलवे भर्ती)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-zinc-900 dark:text-white focus:outline-none placeholder:text-zinc-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-400 text-xs sm:text-sm space-y-2">
              <p className="font-semibold text-zinc-600 dark:text-zinc-300">लोकप्रिय खोज सुझाव:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['न्यूनतम वेतन', 'EPFO पेंशन', 'नागपुर मेट्रो', 'रेलवे भर्ती', 'राशिफल'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-medium transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-zinc-800/80 transition group border border-transparent hover:border-red-200 dark:hover:border-zinc-700"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-16 h-14 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                    {article.categoryLabel}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 shrink-0 self-center" />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-zinc-400 text-xs sm:text-sm">
              &quot;{query}&quot; से संबंधित कोई खबर नहीं मिली।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
