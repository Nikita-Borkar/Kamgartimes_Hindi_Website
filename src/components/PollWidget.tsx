'use client';

import React, { useState } from 'react';
import { Vote, CheckCircle, BarChart2 } from 'lucide-react';
import { TODAY_POLL } from '@/data/newsData';

export default function PollWidget() {
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [pollData, setPollData] = useState(TODAY_POLL);

  const handleVote = (optionId: string) => {
    if (votedOptionId) return;
    setVotedOptionId(optionId);
    setPollData((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950 text-white rounded-2xl p-4 sm:p-5 border border-indigo-900/40 shadow-xl my-2 md:my-4">
      <div className="flex items-center gap-2 pb-3 border-b border-indigo-900/50 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
          <Vote className="w-4 h-4 text-amber-300" />
        </div>
        <h3 className="font-extrabold text-base font-serif text-white">
          आज का जनमत (Public Poll)
        </h3>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-zinc-200 mb-4 leading-snug">
        {pollData.question}
      </p>

      <div className="space-y-2.5">
        {pollData.options.map((option) => {
          const percentage = Math.round((option.votes / pollData.totalVotes) * 100);
          const isSelected = votedOptionId === option.id;

          return (
            <button
              suppressHydrationWarning
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!!votedOptionId}
              className={`w-full text-left p-3 rounded-xl border text-xs transition relative overflow-hidden group ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-950/40'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-indigo-500 hover:bg-zinc-800'
              }`}
            >
              {/* Vote Percentage Progress Bar */}
              {votedOptionId && (
                <div
                  className={`absolute left-0 top-0 bottom-0 opacity-25 transition-all duration-700 ${
                    isSelected ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-medium">
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${isSelected ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-zinc-600'}`}>
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="text-zinc-100">{option.text}</span>
                </div>
                {votedOptionId && (
                  <span className="font-bold font-mono text-indigo-300 text-xs">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
        <span className="flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
          कुल मत: {pollData.totalVotes.toLocaleString()}
        </span>
        {votedOptionId && (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> आपका वोट दर्ज हुआ
          </span>
        )}
      </div>
    </div>
  );
}
