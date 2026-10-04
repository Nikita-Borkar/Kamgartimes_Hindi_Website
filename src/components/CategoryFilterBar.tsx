'use client';

import React from 'react';
import Link from 'next/link';
import { Filter, HardHat } from 'lucide-react';
import { CATEGORIES } from '@/data/newsData';

interface CategoryFilterBarProps {
  activeCategory: string;
  onCategorySelect?: (slug: string) => void;
}

export default function CategoryFilterBar({ activeCategory = 'all', onCategorySelect }: CategoryFilterBarProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-3 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-3 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 px-3 py-1 text-xs font-black text-red-600 dark:text-red-400 shrink-0 border-r border-zinc-200 dark:border-zinc-800">
        <Filter className="w-4 h-4" />
        <span>फ़िल्टर:</span>
      </div>
      <div className="flex items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
              onClick={() => {
                if (onCategorySelect) onCategorySelect(cat.slug);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 shadow-xs ${
                isSelected
                  ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400/50 scale-105 font-extrabold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat.slug === 'labor' && <HardHat className="w-3.5 h-3.5 text-amber-300" />}
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
