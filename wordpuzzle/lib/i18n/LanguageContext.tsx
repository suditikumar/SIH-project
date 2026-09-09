'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageInfo } from './types';
import { TRANSLATIONS, Translations } from './translations';
import { WP_TRANSLATIONS, WordPuzzleUI } from './wordPuzzleTranslations';

export type FontSizeSetting = 'normal' | 'large' | 'xlarge';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languageInfo: LanguageInfo;
  translations: Translations;
  t: Translations;
  wp: WordPuzzleUI;
  
  // Accessibility & Comfort Settings
  fontSize: FontSizeSetting;
  setFontSize: (size: FontSizeSetting) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
  familiarMode: boolean;
  setFamiliarMode: (val: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en'); // Default to English, fully switchable to any of 9 languages
  const [fontSize, setFontSizeState] = useState<FontSizeSetting>('normal');
  const [highContrast, setHighContrastState] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabledState] = useState<boolean>(true);
  const [familiarMode, setFamiliarModeState] = useState<boolean>(false);
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize from localStorage on client
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('smriti_language') as SupportedLanguage | null;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setLanguageState(savedLang);
      }

      const savedFontSize = localStorage.getItem('smriti_font_size') as FontSizeSetting | null;
      if (savedFontSize) {
        setFontSizeState(savedFontSize);
        applyFontSizeClass(savedFontSize);
      }

      const savedContrast = localStorage.getItem('smriti_high_contrast');
      if (savedContrast !== null) {
        const isContrast = savedContrast === 'true';
        setHighContrastState(isContrast);
        applyContrastClass(isContrast);
      }

      const savedSound = localStorage.getItem('smriti_sound');
      if (savedSound !== null) {
        setSoundEnabledState(savedSound === 'true');
      }

      const savedVoice = localStorage.getItem('smriti_voice');
      if (savedVoice !== null) {
        setVoiceEnabledState(savedVoice === 'true');
      }

      const savedFamiliar = localStorage.getItem('smriti_familiar_mode');
      if (savedFamiliar !== null) {
        setFamiliarModeState(savedFamiliar === 'true');
      }

      const savedMotion = localStorage.getItem('smriti_reduced_motion');
      if (savedMotion !== null) {
        const isReduced = savedMotion === 'true';
        setReducedMotionState(isReduced);
        applyReducedMotionClass(isReduced);
      }
    } catch {
      // Storage unavailable or blocked
    }
    setMounted(true);
  }, []);

  const applyFontSizeClass = (size: FontSizeSetting) => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    document.documentElement.classList.add(`font-size-${size}`);
  };

  const applyContrastClass = (active: boolean) => {
    if (typeof document === 'undefined') return;
    if (active) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const applyReducedMotionClass = (active: boolean) => {
    if (typeof document === 'undefined') return;
    if (active) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('smriti_language', lang);
    } catch {}
  };

  const setFontSize = (size: FontSizeSetting) => {
    setFontSizeState(size);
    applyFontSizeClass(size);
    try {
      localStorage.setItem('smriti_font_size', size);
    } catch {}
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    applyContrastClass(val);
    try {
      localStorage.setItem('smriti_high_contrast', String(val));
    } catch {}
  };

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    try {
      localStorage.setItem('smriti_sound', String(val));
    } catch {}
  };

  const setVoiceEnabled = (val: boolean) => {
    setVoiceEnabledState(val);
    try {
      localStorage.setItem('smriti_voice', String(val));
    } catch {}
  };

  const setFamiliarMode = (val: boolean) => {
    setFamiliarModeState(val);
    try {
      localStorage.setItem('smriti_familiar_mode', String(val));
    } catch {}
  };

  const setReducedMotion = (val: boolean) => {
    setReducedMotionState(val);
    applyReducedMotionClass(val);
    try {
      localStorage.setItem('smriti_reduced_motion', String(val));
    } catch {}
  };

  const currentTranslations = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentWp = WP_TRANSLATIONS[language] || WP_TRANSLATIONS.en;
  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languageInfo: currentLanguageInfo,
        translations: currentTranslations,
        t: currentTranslations,
        wp: currentWp,
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
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
