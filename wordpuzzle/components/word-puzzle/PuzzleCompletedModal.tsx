'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, ArrowRight, Sparkles, Award } from 'lucide-react';
import { soundEffects } from '@/lib/voice/soundEffects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PuzzleCompletedModalProps {
  puzzleNumber: number;
  puzzleTitle: string;
  totalWords: number;
  score: number;
  onNextPuzzle: () => void;
  onReplay: () => void;
}

export const PuzzleCompletedModal: React.FC<PuzzleCompletedModalProps> = ({
  puzzleNumber,
  puzzleTitle,
  totalWords,
  score,
  onNextPuzzle,
  onReplay,
}) => {
  const { wp } = useLanguage();

  useEffect(() => {
    // Gentle celebration chime
    soundEffects.playWordCelebration();

    // Gentle confetti burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2C5E3B', '#D99518', '#C86938', '#E3EEE5'],
        disableForReducedMotion: true,
      });
    } catch {}
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={wp.puzzleCompleted}
    >
      <div className="bg-white border-4 border-[#2C5E3B] rounded-3xl max-w-md w-full p-6 sm:p-9 text-center shadow-2xl space-y-6">
        {/* Celebration Trophy */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-[#FEF6E4] border-2 border-[#EED79D] flex items-center justify-center text-4xl shadow-inner">
          <Trophy className="w-10 h-10 text-[#D99518]" />
          <span className="absolute -top-2 -right-2 text-xl">✨</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E3EEE5] text-[#1E4329] text-xs font-bold uppercase tracking-wider border border-[#C1D7C6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{wp.puzzle} {puzzleNumber.toString().padStart(2, '0')} {wp.completed}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#18281E]">
            {wp.wonderfulWork}
          </h2>
          <p className="text-base text-[#496352] font-semibold">
            {puzzleTitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 py-1">
          <div className="bg-[#FAFBF9] border-2 border-[#DCE4DF] rounded-2xl p-4">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#496352] mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#2C5E3B]" />
              <span>{wp.wordsFound}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#18281E]">
              {totalWords} / {totalWords}
            </div>
          </div>

          <div className="bg-[#FAFBF9] border-2 border-[#DCE4DF] rounded-2xl p-4">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#496352] mb-1">
              <Award className="w-4 h-4 text-[#D99518]" />
              <span>{wp.mastery}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#2C5E3B]">
              100%
            </div>
          </div>
        </div>

        {/* Total Score */}
        <div className="p-4 rounded-2xl bg-[#FEF6E4] border-2 border-[#EED79D] flex items-center justify-between">
          <span className="font-extrabold text-[#8C6207] text-base">
            {wp.totalScoreEarned}
          </span>
          <span className="text-2xl font-black text-[#D99518]">
            {score} {wp.pts}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onNextPuzzle}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#2C5E3B] hover:bg-[#234C2F] text-white font-extrabold text-xl border-2 border-[#1E4329] shadow-lg shadow-[#2C5E3B]/20 transition-all cursor-pointer"
          >
            <span>{wp.nextPuzzle}</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={onReplay}
            className="w-full py-2.5 rounded-2xl text-[#5F7C68] hover:text-[#18281E] font-bold text-sm transition-colors cursor-pointer"
          >
            {wp.replayPuzzle}
          </button>
        </div>
      </div>
    </div>
  );
};
