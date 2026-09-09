'use client';

import React, { useState } from 'react';
import { Compass, Volume2, Sparkles, MapPin, Heart } from 'lucide-react';
import { NORTHEAST_STATES, NortheastStateInfo } from '@/lib/data/northeastRegions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { speechService } from '@/lib/voice/speechService';
import { Badge } from '@/components/ui/Badge';

export default function RegionalJourneyPage() {
  const { t, language } = useLanguage();
  const [selectedStateId, setSelectedStateId] = useState<string>('assam');

  const activeState: NortheastStateInfo =
    NORTHEAST_STATES.find((s) => s.id === selectedStateId) || NORTHEAST_STATES[0];

  const handleSpeakPrompt = () => {
    speechService.speakInstruction(activeState.comfortMemoryPrompt, language);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="green">
            <Compass className="w-3.5 h-3.5" />
            <span>Regional Heritage</span>
          </Badge>
          <span className="text-sm font-semibold text-[#496352]">
            Celebrating 8 Distinct Sister States
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#18281E]">
          {t.journey.title}
        </h1>
        <p className="text-xl sm:text-2xl text-[#496352] mt-2 max-w-2xl">
          {t.journey.subtitle}
        </p>
      </div>

      {/* State Selector Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {NORTHEAST_STATES.map((st) => {
          const isSelected = st.id === selectedStateId;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedStateId(st.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-base sm:text-lg transition-all cursor-pointer shrink-0 border-2 ${
                isSelected
                  ? 'bg-[#2C5E3B] text-white border-[#173822] shadow-md shadow-[#2C5E3B]/20 scale-102'
                  : 'bg-white text-[#18281E] border-[#D5E0D7] hover:border-[#2C5E3B]'
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-xl">{st.bannerEmoji}</span>
              <span>{st.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active State Showcase Card */}
      <div className="bg-[#FAFDFB] border-3 border-[#2C5E3B] rounded-3xl p-6 sm:p-9 shadow-lg shadow-[#2C5E3B]/10 space-y-7">
        {/* Title & Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#E2EAE4]">
          <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#2C5E3B] mb-1">
              <MapPin className="w-4 h-4" />
              <span>Capital: {activeState.capital}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#18281E] flex items-center gap-3">
              <span>{activeState.name}</span>
              <span className="text-2xl sm:text-3xl text-[#5F7C68] font-normal">
                ({activeState.nativeName})
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-[#3E5846] mt-2 max-w-2xl font-medium">
              {activeState.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 max-w-xs">
            {activeState.primaryLanguages.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-[#CCE0D3] rounded-full text-xs sm:text-sm font-semibold text-[#1E4329]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Comfort Memory Prompt */}
        <div className="bg-[#FAF8F5] border-2 border-[#EADCCC] rounded-2xl p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-base font-bold text-[#9E4A1E] flex items-center gap-2">
              <Heart className="w-4 h-4 fill-current" />
              <span>Comfort Memory Prompt</span>
            </span>
            <button
              onClick={handleSpeakPrompt}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D5E0D7] text-[#1E4329] font-bold text-sm sm:text-base hover:border-[#2C5E3B] transition-colors cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-[#2C5E3B]" />
              <span>Listen</span>
            </button>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#18281E] leading-snug">
            &ldquo;{activeState.comfortMemoryPrompt}&rdquo;
          </p>
        </div>

        {/* Cultural Highlights & Weaves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-[#DCE4DF] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#18281E] mb-3 flex items-center gap-2">
              <span>🧵</span>
              <span>Traditional Weaves &amp; Craft</span>
            </h3>
            <p className="text-lg text-[#3E5846] leading-relaxed">
              {activeState.traditionalWeaves}
            </p>
          </div>

          <div className="bg-white border-2 border-[#DCE4DF] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#18281E] mb-3 flex items-center gap-2">
              <span>🌾</span>
              <span>Living Cultural Heritage</span>
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-[#3E5846]">
              {activeState.culturalHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#2C5E3B] font-bold">•</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scenic Touchstones */}
        <div>
          <h3 className="text-2xl font-bold text-[#18281E] mb-4 flex items-center gap-2">
            <span>🌿</span>
            <span>Scenic Touchstones</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeState.scenicElements.map((el, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#D5E0D7] rounded-2xl p-5"
              >
                <div className="text-4xl mb-2">{el.icon}</div>
                <h4 className="text-lg font-bold text-[#18281E]">{el.title}</h4>
                <p className="text-sm sm:text-base text-[#496352] mt-1">
                  {el.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
