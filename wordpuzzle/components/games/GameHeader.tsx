'use client';

import React from 'react';
import { Volume2, HelpCircle, Undo2, RotateCcw } from 'lucide-react';
import { RegionalWordData } from '@/lib/data/puzzleWords';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { speechService } from '@/lib/voice/speechService';
import { Badge } from '../ui/Badge';

interface GameHeaderProps {
  wordData: RegionalWordData;
  icon: string;
  category: string;
  foundCount: number;
  totalLetters: number;
  onHint: () => void;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  wordData,
  icon,
  category,
  foundCount,
  totalLetters,
  onHint,
  onUndo,
  onReset,
  canUndo,
}) => {
  const { language, t, voiceEnabled } = useLanguage();

  const handleSpeak = () => {
    speechService.speakWord(wordData.targetWord, language, wordData.phoneticHint);
  };

  return (
    <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-5 sm:p-7 shadow-sm mb-6">
      {/* Category and Pronunciation hint banner */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#E2EAE4]">
        <div className="flex items-center gap-2">
          <Badge variant="green">{category.toUpperCase()}</Badge>
          <span className="text-sm sm:text-base text-[#5F7C68] font-medium hidden sm:inline">
            Verified regional dialect
          </span>
        </div>
        <div className="text-sm sm:text-base font-semibold text-[#2C5E3B]">
          {foundCount} of {totalLetters} {t.games.lettersFound}
        </div>
      </div>

      {/* Main Target Word Showcase */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {/* Large Picture / Emoji */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#F4F8F5] border-2 border-[#C8DACD] flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0"
            aria-hidden="true"
          >
            {icon}
          </div>

          <div>
            <div className="text-base text-[#496352] font-semibold">
              {t.games.findTargetWord}
            </div>
            {/* Target Word in Regional Script */}
            <div className="text-4xl sm:text-5xl font-extrabold text-[#18281E] tracking-wide mt-1">
              {wordData.targetWord}
            </div>
            {wordData.meaningEnglish && language !== 'en' && (
              <div className="text-sm sm:text-base text-[#688573] mt-0.5">
                English: {wordData.meaningEnglish} ({wordData.phoneticHint})
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Speaker, Hint, Undo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center">
          {/* Speaker Button */}
          <button
            onClick={handleSpeak}
            className="flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-[#EBF2EC] hover:bg-[#DCE7DD] active:translate-y-0.5 text-[#1E4329] font-bold text-lg sm:text-xl border-2 border-[#C3D8C8] transition-all cursor-pointer shadow-sm"
            aria-label={`Pronounce ${wordData.targetWord}`}
            title="Listen to pronunciation"
          >
            <Volume2 className="w-6 h-6 text-[#2C5E3B]" />
            <span>{t.games.listen}</span>
          </button>

          {/* Hint Button */}
          <button
            onClick={onHint}
            className="flex items-center gap-2 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl bg-[#FEF6E4] hover:bg-[#FDF0D0] active:translate-y-0.5 text-[#8C6207] font-bold text-base sm:text-lg border-2 border-[#EED79D] transition-all cursor-pointer shadow-sm"
            aria-label="Show hint for next letter"
            title="Show hint"
          >
            <HelpCircle className="w-5 h-5 text-[#D99518]" />
            <span>{t.games.hint}</span>
          </button>

          {/* Undo Button */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center gap-1.5 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl bg-white hover:bg-[#F4F7F5] disabled:opacity-40 disabled:cursor-not-allowed text-[#496352] font-semibold text-base border-2 border-[#D5E0D7] transition-all cursor-pointer shadow-sm"
            aria-label="Undo last letter"
            title="Undo"
          >
            <Undo2 className="w-5 h-5" />
            <span className="hidden sm:inline">{t.games.undo}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            disabled={!canUndo}
            className="flex items-center gap-1.5 px-3.5 py-3.5 sm:px-4 sm:py-4 rounded-2xl bg-white hover:bg-[#F4F7F5] disabled:opacity-40 disabled:cursor-not-allowed text-[#496352] font-semibold text-base border-2 border-[#D5E0D7] transition-all cursor-pointer shadow-sm"
            aria-label="Start word over"
            title="Start over"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
