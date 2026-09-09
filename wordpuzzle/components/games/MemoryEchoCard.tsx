'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight, Sparkles, Check } from 'lucide-react';
import { RegionalWordData } from '@/lib/data/puzzleWords';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { soundEffects } from '@/lib/voice/soundEffects';
import { speechService } from '@/lib/voice/speechService';
import { recordMemoryExplored } from '@/lib/game/gameStorage';

interface MemoryEchoCardProps {
  wordData: RegionalWordData;
  icon: string;
  onNextWord: () => void;
}

export const MemoryEchoCard: React.FC<MemoryEchoCardProps> = ({
  wordData,
  icon,
  onNextWord,
}) => {
  const { language, t, soundEnabled, voiceEnabled, reducedMotion } = useLanguage();
  const [showAssociations, setShowAssociations] = useState<boolean>(false);
  const [selectedAssociations, setSelectedAssociations] = useState<string[]>([]);

  useEffect(() => {
    // Gentle celebration sound
    if (soundEnabled) {
      soundEffects.playWordCelebration();
    }

    // Gentle celebration visual (disabled if reducedMotion is active)
    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2C5E3B', '#D99518', '#E3EEE5', '#C86938'],
          disableForReducedMotion: true,
        });
      } catch {}
    }

    // Voice announcement
    if (voiceEnabled) {
      const congratulation = `${t.echo.foundCelebration} ${wordData.targetWord}.`;
      speechService.speakInstruction(congratulation, language);
    }
  }, [wordData, language, t, soundEnabled, voiceEnabled, reducedMotion]);

  const handleYesRemember = () => {
    recordMemoryExplored();
    setShowAssociations(true);
    if (soundEnabled) {
      soundEffects.playLetterTap(2);
    }
  };

  const toggleAssociation = (id: string) => {
    if (soundEnabled) {
      soundEffects.playLetterTap(0);
    }
    setSelectedAssociations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Memory Echo Card"
    >
      <div className="bg-white border-4 border-[#2C5E3B] rounded-3xl max-w-xl w-full p-6 sm:p-9 shadow-2xl text-center max-h-[90vh] overflow-y-auto">
        {/* Soft Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3EEE5] text-[#1E4329] font-bold text-sm sm:text-base mb-4 border border-[#BDD6C3]">
          <Sparkles className="w-4 h-4 text-[#2C5E3B]" />
          <span>{t.echo.cardTitle}</span>
        </div>

        {/* Large Illustration / Emoji */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-[#FAFDFB] border-3 border-[#C2D8C7] flex items-center justify-center text-5xl sm:text-6xl shadow-inner mb-4">
          {icon}
        </div>

        {/* Celebration Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18281E]">
          {t.echo.foundCelebration}{' '}
          <span className="text-[#2C5E3B] underline decoration-[#D99518] decoration-4 underline-offset-4">
            {wordData.targetWord}
          </span>
        </h2>

        {/* Conversational Memory Prompt */}
        <div className="bg-[#FAFBF9] border-2 border-[#DCE4DF] rounded-2xl p-5 sm:p-6 my-6 text-xl sm:text-2xl text-[#2B3F32] font-medium leading-relaxed">
          &ldquo;{wordData.memoryPrompt}&rdquo;
        </div>

        {!showAssociations ? (
          /* Step 1: Two Prominent Buttons */
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-2">
            <button
              onClick={handleYesRemember}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#C86938] hover:bg-[#B35829] active:translate-y-0.5 text-white font-extrabold text-xl sm:text-2xl border-2 border-[#9E4A1E] transition-all cursor-pointer shadow-md shadow-[#C86938]/20"
            >
              <Heart className="w-6 h-6 fill-white" />
              <span>{t.echo.yesRemember}</span>
            </button>

            <button
              onClick={onNextWord}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#EBF2EC] hover:bg-[#DCE7DD] active:translate-y-0.5 text-[#1E4329] font-bold text-xl border-2 border-[#C3D8C8] transition-all cursor-pointer"
            >
              <span>{t.games.nextWord}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        ) : (
          /* Step 2: Gentle Associations */
          <div className="mt-2 animate-in fade-in duration-300">
            <p className="text-lg sm:text-xl text-[#496352] font-semibold mb-4">
              {t.echo.warmAssociations}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {wordData.associations.map((assoc) => {
                const isSelected = selectedAssociations.includes(assoc.id);
                return (
                  <button
                    key={assoc.id}
                    onClick={() => toggleAssociation(assoc.id)}
                    className={`flex items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl border-2 font-semibold text-base sm:text-lg transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#FEF6E4] border-[#D99518] text-[#7A5405] ring-2 ring-[#D99518]/30 scale-102'
                        : 'bg-white border-[#D5E0D7] text-[#18281E] hover:border-[#2C5E3B]'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{assoc.icon}</span>
                    <span className="leading-snug">{assoc.label}</span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[#D99518] ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-base text-[#5F7C68] italic mb-6">
              {t.echo.thankYouNote}
            </p>

            <button
              onClick={onNextWord}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#2C5E3B] hover:bg-[#234C2F] active:translate-y-0.5 text-white font-extrabold text-xl sm:text-2xl border-2 border-[#1E4329] transition-all cursor-pointer shadow-lg shadow-[#2C5E3B]/20"
            >
              <span>{t.games.nextWord}</span>
              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
