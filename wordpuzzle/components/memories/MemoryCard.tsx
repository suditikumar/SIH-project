'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Trash2, Heart } from 'lucide-react';
import { CaregiverMemory } from '@/lib/memory/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { speechService } from '@/lib/voice/speechService';
import { soundEffects } from '@/lib/voice/soundEffects';

interface MemoryCardProps {
  memory: CaregiverMemory;
  onDelete?: (id: string) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  const { t, soundEnabled } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayVoice = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    if (soundEnabled) {
      soundEffects.playLetterTap(2);
    }

    setIsPlaying(true);
    const spokenMessage = memory.audioNoteText || memory.description;
    speechService.speakInstruction(spokenMessage, 'en', () => {
      setIsPlaying(false);
    });
  };

  const categoryBadges: Record<string, { bg: string; text: string; border: string }> = {
    Family: { bg: 'bg-[#FCEFE8]', text: 'text-[#9E4A1E]', border: 'border-[#ECCFC0]' },
    Hometown: { bg: 'bg-[#E3EEE5]', text: 'text-[#1E4329]', border: 'border-[#C1D7C6]' },
    Childhood: { bg: 'bg-[#FEF6E4]', text: 'text-[#8C6207]', border: 'border-[#EED79D]' },
    Festivals: { bg: 'bg-[#F9ECEF]', text: 'text-[#962A48]', border: 'border-[#EBC2CD]' },
    Nature: { bg: 'bg-[#E6F3F3]', text: 'text-[#1B5E5E]', border: 'border-[#BDDCDC]' },
    Tradition: { bg: 'bg-[#F0ECF8]', text: 'text-[#503282]', border: 'border-[#D2C5E7]' },
  };

  const badgeStyle = categoryBadges[memory.relationshipOrCategory] || categoryBadges.Family;

  return (
    <div className="bg-white border-2 border-[#D5E0D7] hover:border-[#2C5E3B] rounded-3xl overflow-hidden shadow-sm transition-all flex flex-col justify-between">
      {/* Photo Header */}
      <div className="relative h-56 sm:h-64 w-full bg-[#EBF2EC] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={memory.imageUrl}
          alt={memory.imageAlt || memory.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // Fallback placeholder
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} shadow-sm backdrop-blur-sm`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{memory.relationshipOrCategory}</span>
          </span>
        </div>

        {memory.isSample && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
            Sample Card
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18281E] leading-tight">
            {memory.name}
          </h3>

          <p className="text-base sm:text-lg text-[#3E5846] mt-3 leading-relaxed">
            {memory.description}
          </p>

          {memory.voiceAuthor && (
            <div className="mt-4 p-3 rounded-2xl bg-[#FAFBF9] border border-[#E0E8E2] text-sm sm:text-base text-[#496352] flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <span className="font-semibold">{memory.voiceAuthor}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-[#E5EDE7] flex items-center justify-between gap-3">
          <button
            onClick={handlePlayVoice}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-base sm:text-lg border-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#FEF6E4] text-[#8C6207] border-[#D99518] ring-2 ring-[#D99518]/30'
                : 'bg-[#EBF2EC] hover:bg-[#DCE7DD] text-[#1E4329] border-[#C3D8C8]'
            }`}
            aria-label={`Listen to voice note for ${memory.name}`}
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-5 h-5 text-[#8C6207]" />
                <span>Playing Voice...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 text-[#2C5E3B]" />
                <span>{t.memories.listenRecording}</span>
              </>
            )}
          </button>

          {onDelete && !memory.isSample && (
            <button
              onClick={() => onDelete(memory.id)}
              className="p-3.5 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete memory card"
              aria-label="Delete this memory"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
