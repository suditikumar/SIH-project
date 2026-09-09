'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Globe, Check, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n/types';

export const TopHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    languageInfo,
    voiceEnabled,
    setVoiceEnabled,
    soundEnabled,
    setSoundEnabled,
    fontSize,
    setFontSize,
    wp,
  } = useLanguage();

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  const fontSizeLabel = fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++';

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-md border-b-2 border-[#DCE4DF] px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Logo / App Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-4 rounded-2xl p-1 -m-1"
            aria-label={`${wp.appName} Home`}
          >
            <span className="w-12 h-12 rounded-2xl bg-[#2C5E3B] text-white flex items-center justify-center text-2xl shadow-sm group-hover:bg-[#234C2F] transition-colors shrink-0 font-black">
              🌿
            </span>
            <div className="flex flex-col">
              <span className="font-black text-2xl sm:text-3xl text-[#18281E] leading-none tracking-tight">
                {wp.appName}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#496352] mt-0.5">
                {wp.appSubtitle}
              </span>
            </div>
          </Link>

          {/* Top Corner Controls: Language, Font Size, Voice */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Small Option on Top Corner to Change Language */}
            <button
              onClick={() => setShowLanguageModal(true)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white border-2 border-[#D5E0D7] hover:border-[#2C5E3B] text-[#18281E] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-xs"
              aria-label={wp.changeLanguage}
              title={wp.changeLanguage}
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#2C5E3B] shrink-0" />
              <span className="max-w-[80px] sm:max-w-none truncate">
                {languageInfo.nativeName}
              </span>
            </button>

            {/* Font Size Button */}
            <button
              onClick={cycleFontSize}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white border-2 border-[#D5E0D7] hover:border-[#2C5E3B] text-[#18281E] font-bold text-sm sm:text-base transition-all cursor-pointer min-w-[44px] shadow-xs"
              aria-label={`${wp.textSize}: ${fontSize}`}
              title={wp.textSize}
            >
              {fontSizeLabel}
            </button>

            {/* Voice / Sound Toggle */}
            <button
              onClick={() => {
                const nextState = !(voiceEnabled && soundEnabled);
                setVoiceEnabled(nextState);
                setSoundEnabled(nextState);
              }}
              className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all cursor-pointer shadow-xs ${
                voiceEnabled && soundEnabled
                  ? 'bg-[#E3EEE5] text-[#1E4329] border-[#A8C6B0]'
                  : 'bg-white text-[#7A8F81] border-[#D5E0D7]'
              }`}
              aria-label={voiceEnabled && soundEnabled ? wp.soundOn : wp.soundMuted}
              title={voiceEnabled && soundEnabled ? wp.soundOn : wp.soundMuted}
            >
              {voiceEnabled && soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Language Picker Modal */}
      {showLanguageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={wp.selectLanguageTitle}
        >
          <div className="bg-white border-3 border-[#2C5E3B] rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#E2EAE4] mb-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#E3EEE5] flex items-center justify-center text-xl">
                  🌐
                </span>
                <div>
                  <h2 className="text-2xl font-black text-[#18281E]">
                    {wp.selectLanguageTitle}
                  </h2>
                  <p className="text-[#496352] text-sm sm:text-base mt-0.5">
                    Select language for the word puzzle and spoken audio.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-2.5 rounded-xl hover:bg-black/5 text-[#496352] cursor-pointer"
                aria-label="Close language selector"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as SupportedLanguage);
                      setShowLanguageModal(false);
                    }}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E3EEE5] border-[#2C5E3B] ring-2 ring-[#2C5E3B]/20'
                        : 'bg-[#FAFBF9] border-[#DCE4DF] hover:border-[#2C5E3B] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-[#18281E]">
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
                      <span className="w-7 h-7 rounded-full bg-[#2C5E3B] text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-[#E2EAE4] flex justify-end">
              <button
                onClick={() => setShowLanguageModal(false)}
                className="px-6 py-3 rounded-2xl bg-[#2C5E3B] text-white font-bold text-base sm:text-lg hover:bg-[#234C2F] cursor-pointer shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
