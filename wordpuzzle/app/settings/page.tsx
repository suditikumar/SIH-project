'use client';

import React from 'react';
import {
  Globe,
  Type,
  Eye,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Sliders,
  Check,
  Shield,
} from 'lucide-react';
import { useLanguage, FontSizeSetting } from '@/lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n/types';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  const {
    language,
    setLanguage,
    t,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    soundEnabled,
    setSoundEnabled,
    voiceEnabled,
    setVoiceEnabled,
    familiarMode,
    setFamiliarMode,
    reducedMotion,
    setReducedMotion,
  } = useLanguage();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="green">
            <Sliders className="w-3.5 h-3.5" />
            <span>Accessibility &amp; Care</span>
          </Badge>
          <span className="text-sm font-semibold text-[#496352]">
            Universal Design for Seniors
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#18281E]">
          {t.settings.title}
        </h1>
        <p className="text-xl sm:text-2xl text-[#496352] mt-2 max-w-2xl">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Feature 1: Make it Familiar Mode */}
      <section className="bg-[#FAF8F5] border-3 border-[#C86938] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEFE8] text-[#9E4A1E] font-bold text-sm border border-[#ECCFC0]">
              <Heart className="w-4 h-4 fill-current" />
              <span>{t.familiar.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18281E]">
              {t.familiar.title}
            </h2>
            <p className="text-base sm:text-lg text-[#55463C] leading-relaxed">
              {t.familiar.description}
            </p>
          </div>

          <button
            onClick={() => setFamiliarMode(!familiarMode)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-extrabold text-lg sm:text-xl border-2 transition-all cursor-pointer shrink-0 ${
              familiarMode
                ? 'bg-[#C86938] text-white border-[#9E4A1E] shadow-md shadow-[#C86938]/20'
                : 'bg-white text-[#496352] border-[#D5E0D7] hover:border-[#C86938]'
            }`}
          >
            <Heart
              className={`w-6 h-6 ${familiarMode ? 'fill-white' : 'text-[#496352]'}`}
            />
            <span>{familiarMode ? t.familiar.enabled : 'Enable Familiar Mode'}</span>
          </button>
        </div>
      </section>

      {/* Feature 2: Language Selection */}
      <section className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xl font-extrabold text-[#18281E]">
          <Globe className="w-6 h-6 text-[#2C5E3B]" />
          <h2>{t.settings.languageTitle}</h2>
        </div>
        <p className="text-base sm:text-lg text-[#496352]">
          {t.settings.languageDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#E3EEE5] border-[#2C5E3B] ring-2 ring-[#2C5E3B]/20 shadow-sm'
                    : 'bg-[#FAFBF9] border-[#DCE4DF] hover:border-[#2C5E3B] hover:bg-white'
                }`}
              >
                <div>
                  <div className="text-xl font-bold text-[#18281E]">
                    {lang.nativeName}
                  </div>
                  <div className="text-sm font-semibold text-[#496352]">
                    {lang.name}
                  </div>
                  <div className="text-xs text-[#6A8574] mt-1">
                    {lang.culturalBadge}
                  </div>
                </div>
                {isSelected && (
                  <span className="w-8 h-8 rounded-full bg-[#2C5E3B] text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Feature 3: Font Size Control */}
      <section className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xl font-extrabold text-[#18281E]">
          <Type className="w-6 h-6 text-[#2C5E3B]" />
          <h2>{t.settings.fontSizeTitle}</h2>
        </div>
        <p className="text-base sm:text-lg text-[#496352]">
          {t.settings.fontSizeDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {[
            { id: 'normal', label: t.settings.sizeNormal, preview: 'Aa' },
            { id: 'large', label: t.settings.sizeLarge, preview: 'Aa+' },
            { id: 'xlarge', label: t.settings.sizeXLarge, preview: 'Aa++' },
          ].map((item) => {
            const isSelected = fontSize === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setFontSize(item.id as FontSizeSetting)}
                className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E3EEE5] border-[#2C5E3B] ring-2 ring-[#2C5E3B]/20 shadow-sm'
                    : 'bg-[#FAFBF9] border-[#DCE4DF] hover:border-[#2C5E3B]'
                }`}
              >
                <div className="text-3xl font-black text-[#18281E] mb-1">
                  {item.preview}
                </div>
                <div className="text-base font-bold text-[#2C5E3B]">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feature 4: High Contrast & Motion */}
      <section className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* High Contrast */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2EAE4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xl font-bold text-[#18281E]">
              <Eye className="w-5 h-5 text-[#2C5E3B]" />
              <h3>{t.settings.contrastTitle}</h3>
            </div>
            <p className="text-base text-[#496352]">
              {t.settings.contrastDesc}
            </p>
          </div>

          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-6 py-3.5 rounded-2xl font-bold text-lg border-2 transition-all cursor-pointer shrink-0 ${
              highContrast
                ? 'bg-[#18251D] text-[#F7D046] border-[#F7D046]'
                : 'bg-[#F2F6F3] text-[#18281E] border-[#D5E0D7]'
            }`}
          >
            {highContrast ? 'Contrast Enabled' : 'Enable High Contrast'}
          </button>
        </div>

        {/* Spoken Voice Guidance */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2EAE4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xl font-bold text-[#18281E]">
              <Volume2 className="w-5 h-5 text-[#2C5E3B]" />
              <h3>{t.settings.voiceTitle}</h3>
            </div>
            <p className="text-base text-[#496352]">
              {t.settings.voiceDesc}
            </p>
          </div>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-6 py-3.5 rounded-2xl font-bold text-lg border-2 transition-all cursor-pointer shrink-0 ${
              voiceEnabled
                ? 'bg-[#E3EEE5] text-[#1E4329] border-[#2C5E3B]'
                : 'bg-[#F2F6F3] text-[#5F7C68] border-[#D5E0D7]'
            }`}
          >
            {voiceEnabled ? 'Voice Enabled' : 'Voice Off'}
          </button>
        </div>

        {/* Gentle Sound Chimes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2EAE4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xl font-bold text-[#18281E]">
              <Sparkles className="w-5 h-5 text-[#2C5E3B]" />
              <h3>{t.settings.soundTitle}</h3>
            </div>
            <p className="text-base text-[#496352]">
              {t.settings.soundDesc}
            </p>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-6 py-3.5 rounded-2xl font-bold text-lg border-2 transition-all cursor-pointer shrink-0 ${
              soundEnabled
                ? 'bg-[#E3EEE5] text-[#1E4329] border-[#2C5E3B]'
                : 'bg-[#F2F6F3] text-[#5F7C68] border-[#D5E0D7]'
            }`}
          >
            {soundEnabled ? 'Chimes Active' : 'Chimes Off'}
          </button>
        </div>

        {/* Reduced Motion */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xl font-bold text-[#18281E]">
              <Shield className="w-5 h-5 text-[#2C5E3B]" />
              <h3>{t.settings.reducedMotionTitle}</h3>
            </div>
            <p className="text-base text-[#496352]">
              {t.settings.reducedMotionDesc}
            </p>
          </div>

          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-6 py-3.5 rounded-2xl font-bold text-lg border-2 transition-all cursor-pointer shrink-0 ${
              reducedMotion
                ? 'bg-[#E3EEE5] text-[#1E4329] border-[#2C5E3B]'
                : 'bg-[#F2F6F3] text-[#5F7C68] border-[#D5E0D7]'
            }`}
          >
            {reducedMotion ? 'Reduced Motion On' : 'Standard Motion'}
          </button>
        </div>
      </section>

      {/* Caregiver & Privacy Notice */}
      <div className="bg-[#FAFBF9] border-2 border-[#DCE4DF] rounded-3xl p-6 sm:p-7 flex items-start gap-4">
        <Shield className="w-8 h-8 text-[#2C5E3B] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xl font-bold text-[#18281E]">
            Caregiver Privacy &amp; Offline Assurance
          </h4>
          <p className="text-base text-[#496352] mt-1 leading-relaxed">
            All personalized memories, language preferences, and activity moments are stored securely on this device. No personal health records are transmitted externally. Ready for seamless integration with family databases when desired.
          </p>
        </div>
      </div>
    </div>
  );
}
