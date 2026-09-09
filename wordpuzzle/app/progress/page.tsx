'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Sun, Flower2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getProgressSummary, ProgressSummary } from '@/lib/game/gameStorage';
import { Badge } from '@/components/ui/Badge';

export default function ProgressPage() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState<ProgressSummary>({
    activitiesCompleted: 0,
    memoriesExplored: 0,
    momentsOfPeace: 2,
    recentWords: [],
  });

  useEffect(() => {
    setProgress(getProgressSummary());
  }, []);

  // Visual blooming petal count (up to 8 petals)
  const petalCount = Math.min(8, Math.max(2, progress.activitiesCompleted + 1));

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="gold">
            <Sun className="w-3.5 h-3.5 text-[#D99518]" />
            <span>Encouraging Progress</span>
          </Badge>
          <span className="text-sm font-semibold text-[#5F7C68]">
            Zero Pressure, Maximum Dignity
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#18281E]">
          {t.progress.title}
        </h1>
        <p className="text-xl sm:text-2xl text-[#496352] mt-2 max-w-2xl">
          {t.progress.subtitle}
        </p>
      </div>

      {/* Encouragement Banner */}
      <div className="bg-[#FAFDFB] border-2 border-[#C8DACD] rounded-3xl p-6 sm:p-7 text-center">
        <div className="w-14 h-14 rounded-full bg-[#E3EEE5] text-[#1E4329] mx-auto flex items-center justify-center text-2xl mb-3 shadow-inner">
          🌸
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18281E]">
          {t.progress.encouragementMessage}
        </h2>
        <p className="text-lg text-[#496352] mt-2 max-w-xl mx-auto">
          {t.progress.gentleNotice}
        </p>
      </div>

      {/* Gentle Non-Judgmental Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#E3EEE5] text-[#1E4329] mx-auto flex items-center justify-center text-xl mb-3">
            🔤
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#2C5E3B]">
            {progress.activitiesCompleted}
          </div>
          <div className="text-lg font-bold text-[#18281E] mt-2">
            {t.progress.activitiesCompleted}
          </div>
          <p className="text-sm text-[#5F7C68] mt-1">
            Words gently connected
          </p>
        </div>

        <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FCEFE8] text-[#9E4A1E] mx-auto flex items-center justify-center text-xl mb-3">
            ❤️
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#C86938]">
            {progress.memoriesExplored}
          </div>
          <div className="text-lg font-bold text-[#18281E] mt-2">
            {t.progress.memoriesExplored}
          </div>
          <p className="text-sm text-[#5F7C68] mt-1">
            Cherished family recollections
          </p>
        </div>

        <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF6E4] text-[#8C6207] mx-auto flex items-center justify-center text-xl mb-3">
            🕊️
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#D99518]">
            {progress.momentsOfPeace}
          </div>
          <div className="text-lg font-bold text-[#18281E] mt-2">
            {t.progress.momentsOfPeace}
          </div>
          <p className="text-sm text-[#5F7C68] mt-1">
            Peaceful moments enjoyed today
          </p>
        </div>
      </div>

      {/* Visual Blooming Garden Graphic */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-[#18281E] mb-2 flex items-center justify-center gap-2">
          <Flower2 className="w-6 h-6 text-[#2C5E3B]" />
          <span>Blooming Garden of Mindfulness</span>
        </h3>
        <p className="text-base sm:text-lg text-[#496352] max-w-lg mx-auto mb-6">
          Each activity you enjoy opens a petal of peace in your garden.
        </p>

        {/* SVG Flower with glowing petals */}
        <div className="flex items-center justify-center my-4">
          <svg
            className="w-48 h-48 sm:w-56 sm:h-56 animate-pulse"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            {/* Center disc */}
            <circle cx="100" cy="100" r="28" fill="#E4A834" stroke="#B87F17" strokeWidth="3" />
            <circle cx="100" cy="100" r="14" fill="#FCE98F" />

            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const isBloomed = idx < petalCount;
              return (
                <ellipse
                  key={idx}
                  cx="100"
                  cy="45"
                  rx="16"
                  ry="35"
                  fill={isBloomed ? '#2C5E3B' : '#E0ECE3'}
                  stroke={isBloomed ? '#1E4329' : '#C4D6C8'}
                  strokeWidth="2.5"
                  transform={`rotate(${angle} 100 100)`}
                  className="transition-colors duration-700"
                />
              );
            })}
          </svg>
        </div>
        <div className="text-sm font-semibold text-[#2C5E3B] bg-[#E3EEE5] inline-block px-4 py-1.5 rounded-full border border-[#BED6C3]">
          {petalCount} Blossoms in Bloom
        </div>
      </div>

      {/* Words Found Recently */}
      {progress.recentWords.length > 0 && (
        <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#18281E] mb-4">
            {t.progress.recentWordsTitle}
          </h3>
          <div className="flex flex-wrap gap-3">
            {progress.recentWords.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F4F8F5] border border-[#CCE0D3] text-lg font-extrabold text-[#18281E]"
              >
                <span>🌱</span>
                <span>{item.word}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Return to Word Puzzle Action */}
      <div className="text-center pt-2">
        <Link
          href="/games/word-puzzle"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#2C5E3B] hover:bg-[#234C2F] text-white font-extrabold text-xl shadow-lg shadow-[#2C5E3B]/20 transition-all cursor-pointer"
        >
          <span>Continue Word Puzzle</span>
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
