'use client';

import React from 'react';
import {
  Volume2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Check,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { speechService } from '@/lib/voice/speechService';
import { WORD_HIGHLIGHT_COLORS } from '@/lib/game/wordSearchEngine';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface WordStatus {
  word: string;
  isFound: boolean;
  colorIndex: number;
}

interface WordSearchDashboardProps {
  puzzleNumber: number;
  puzzleTitle: string;
  puzzleTheme: string;
  wordsStatus: WordStatus[];
  score: number;
  onHint: () => void;
  onRestart: () => void;
  onNextPuzzle: () => void;
  canHint: boolean;
}

export const WordSearchDashboard: React.FC<WordSearchDashboardProps> = ({
  puzzleNumber,
  puzzleTitle,
  puzzleTheme,
  wordsStatus,
  score,
  onHint,
  onRestart,
  onNextPuzzle,
  canHint,
}) => {
  const { wp, language } = useLanguage();

  const totalWords = wordsStatus.length;
  const foundWordsCount = wordsStatus.filter((w) => w.isFound).length;
  const remainingCount = totalWords - foundWordsCount;
  const progressPercent = totalWords > 0 ? Math.round((foundWordsCount / totalWords) * 100) : 0;

  const handleSpeakWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speakWord(word, language);
  };

  return (
    <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 w-full max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* Dashboard Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2 border-[#E2EAE4]">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl bg-[#2C5E3B] text-white flex items-center justify-center font-black text-2xl shadow-sm">
            🌿
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E3EEE5] text-[#1E4329] font-extrabold text-sm border border-[#C1D7C6]">
                {wp.puzzle} {puzzleNumber.toString().padStart(2, '0')}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#18281E]">
                {puzzleTitle}
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#496352] mt-0.5">
              {wp.theme}: {puzzleTheme}
            </p>
          </div>
        </div>

        {/* Score Badge (No Timer) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FEF6E4] border-2 border-[#EED79D] text-[#8C6207] font-extrabold text-base sm:text-lg shadow-xs">
            <Trophy className="w-5 h-5 text-[#D99518] shrink-0" />
            <span>{score} {wp.pts}</span>
          </div>
        </div>
      </div>

      {/* Progress Metric & Visual Progress Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-base sm:text-lg font-extrabold">
          <div className="flex items-center gap-2 text-[#18281E]">
            <span>{wp.wordsFound}:</span>
            <span className="text-[#2C5E3B]">
              {foundWordsCount} / {totalWords}
            </span>
          </div>
          <div className="text-sm sm:text-base font-bold text-[#5F7C68]">
            {remainingCount > 0 ? `${remainingCount} ${wp.remaining}` : wp.allWordsFound} • {progressPercent}%
          </div>
        </div>

        {/* Animated Nature-Green Progress Bar */}
        <div className="w-full h-5 bg-[#EBF2EC] rounded-full overflow-hidden border-2 border-[#C8DACD] p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#2C5E3B] to-[#418255] rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Target Word Checklist - FULLY VISIBLE WORDS, NO TRUNCATION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-[#18281E] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2C5E3B]" />
            <span>{wp.targetWordsTitle}</span>
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-[#5F7C68] hidden sm:inline">
            {wp.dragToSelect}
          </span>
        </div>

        {/* Spacious responsive grid for 100% full word visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {wordsStatus.map((item, idx) => {
            const colorTheme =
              WORD_HIGHLIGHT_COLORS[item.colorIndex % WORD_HIGHLIGHT_COLORS.length];

            return (
              <div
                key={idx}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 font-bold transition-all shadow-xs ${
                  item.isFound
                    ? `${colorTheme.bg} ${colorTheme.border} ${colorTheme.text} line-through opacity-90`
                    : 'bg-[#FAFBF9] border-[#DCE4DF] text-[#18281E] hover:border-[#2C5E3B]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.isFound ? (
                    <span className="w-6 h-6 rounded-full bg-[#2C5E3B] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#A0B4A6] shrink-0" />
                  )}
                  {/* Full Word - NO truncate, clear uppercase font */}
                  <span className="font-mono font-black text-base sm:text-lg tracking-wider whitespace-nowrap">
                    {item.word}
                  </span>
                </div>

                <button
                  onClick={(e) => handleSpeakWord(item.word, e)}
                  className="p-2 rounded-xl text-[#5F7C68] hover:text-[#2C5E3B] hover:bg-white/90 transition-colors shrink-0 cursor-pointer ml-2"
                  title={`Pronounce ${item.word}`}
                  aria-label={`Pronounce ${item.word}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#E2EAE4]">
        <div className="flex items-center gap-2">
          {/* Hint Button */}
          <button
            onClick={onHint}
            disabled={!canHint}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FEF6E4] hover:bg-[#FDF0D0] text-[#8C6207] border-2 border-[#EED79D] font-bold text-base transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            <HelpCircle className="w-5 h-5 text-[#D99518]" />
            <span>{wp.hint}</span>
          </button>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#FAFBF9] hover:bg-[#F2F6F3] text-[#496352] border-2 border-[#DCE4DF] font-bold text-base transition-colors cursor-pointer"
            title="Restart current puzzle"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">{wp.restart}</span>
          </button>
        </div>

        {/* Next Puzzle Button */}
        <button
          onClick={onNextPuzzle}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#2C5E3B] hover:bg-[#234C2F] text-white font-extrabold text-base sm:text-lg border-2 border-[#1E4329] shadow-md shadow-[#2C5E3B]/20 transition-all cursor-pointer"
        >
          <span>{wp.nextPuzzle}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
