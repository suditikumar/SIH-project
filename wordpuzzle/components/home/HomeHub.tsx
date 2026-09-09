'use client';

import React from 'react';
import { Star, Compass, ArrowRight, Trophy, Sparkles, Volume2, Award, CheckCircle2 } from 'lucide-react';
import { speechService } from '@/lib/voice/speechService';
import { NORTHEAST_TOPICS, NorthEastTopic } from '@/lib/data/northeastTopics';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface HomeHubProps {
  onNavigateToPlay5x5: (topic?: NorthEastTopic) => void;
  onNavigateToWordSearch: () => void;
  totalScore: number;
  totalWordsFound: number;
  puzzlesCompleted: number;
  recentWords: string[];
}

export const HomeHub: React.FC<HomeHubProps> = ({
  onNavigateToPlay5x5,
  onNavigateToWordSearch,
  totalScore,
  totalWordsFound,
  puzzlesCompleted,
  recentWords,
}) => {
  const { wp, language } = useLanguage();

  // Gentle progress target (e.g. 20 words for full daily milestone)
  const targetWords = 20;
  const progressPercent = Math.min(100, Math.round((totalWordsFound / targetWords) * 100));

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speakWord(word, language);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* 1. Welcoming Sky & Sun Header (Matching reference screenshot) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#DDF0FC] to-[#F1F8FD] border-2 border-[#C6DFED] p-6 sm:p-8 shadow-sm text-left">
        {/* Soft glowing sun in top-right corner */}
        <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-amber-300/60 blur-xl pointer-events-none" />
        <div className="absolute top-4 right-5 w-16 h-16 rounded-full bg-amber-400/90 shadow-lg shadow-amber-300/40 pointer-events-none" />

        {/* Pillowy white clouds */}
        <div className="absolute top-6 left-1/4 opacity-80 pointer-events-none">
          <div className="w-20 h-7 bg-white/90 rounded-full blur-[0.5px]" />
        </div>
        <div className="absolute top-12 left-8 opacity-70 pointer-events-none">
          <div className="w-16 h-6 bg-white/90 rounded-full blur-[0.5px]" />
        </div>

        <div className="relative z-10 space-y-1">
          <span className="text-base sm:text-lg font-extrabold text-[#3B6682]">
            {wp.helloFriend}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#152B3C] tracking-tight leading-tight">
            {wp.whereToGo}
          </h1>
          <p className="text-base text-[#466980] font-medium pt-1">
            {wp.homeSubtitle}
          </p>
        </div>
      </div>

      {/* 2. Today's Progress Section (Directly answering user's request) */}
      <div className="bg-[#FFFDF9] border-2 border-[#D8C7B5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E3EEE5] text-[#1E4329] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{wp.todaysJourney}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#18281E]">
              {wp.yourWordProgress}
            </h2>
            <p className="text-sm sm:text-base text-[#5F7C68] font-medium">
              {wp.homeActivitySub}
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-[#E3EEE5] text-[#1E4329] font-bold text-center border border-[#BED6C3] shrink-0">
            <div className="text-2xl font-black">{puzzlesCompleted}</div>
            <div className="text-xs font-semibold">{wp.puzzlesSolved}</div>
          </div>
        </div>

        {/* Progress Bar with Percentage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-[#18281E]">
            <span>{wp.dailyGoal}</span>
            <span className="text-[#2C5E3B]">{progressPercent}% {wp.completed}</span>
          </div>
          <div className="w-full h-4 bg-[#EBF2EC] rounded-full overflow-hidden border-2 border-[#C8DACD] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#2C5E3B] to-[#418255] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <div className="text-xs text-[#5F7C68] font-medium text-right">
            {totalWordsFound >= targetWords
              ? wp.dailyGoalReached
              : `${targetWords - totalWordsFound} ${wp.moreWordsGoal}`}
          </div>
        </div>

        {/* 3 Large Friendly Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#DCE4DF] text-center shadow-xs">
            <div className="flex items-center justify-center text-amber-500 mb-1">
              <Trophy className="w-5 h-5 text-[#D99518]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#18281E]">
              {totalScore}
            </div>
            <div className="text-xs font-bold text-[#5F7C68]">{wp.totalPoints}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#DCE4DF] text-center shadow-xs">
            <div className="flex items-center justify-center text-emerald-600 mb-1">
              <CheckCircle2 className="w-5 h-5 text-[#2C5E3B]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#2C5E3B]">
              {totalWordsFound}
            </div>
            <div className="text-xs font-bold text-[#5F7C68]">{wp.wordsFound}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#DCE4DF] text-center shadow-xs">
            <div className="flex items-center justify-center text-blue-600 mb-1">
              <Award className="w-5 h-5 text-[#2B6A94]" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#18281E]">
              {puzzlesCompleted}
            </div>
            <div className="text-xs font-bold text-[#5F7C68]">{wp.solved}</div>
          </div>
        </div>

        {/* Words Discovered List */}
        {recentWords.length > 0 && (
          <div className="pt-2 space-y-2">
            <div className="text-xs font-extrabold text-[#5F7C68] uppercase tracking-wider">
              {wp.recentlyDiscovered}
            </div>
            <div className="flex flex-wrap gap-2">
              {recentWords.slice(-8).map((word, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleSpeak(word, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFBF9] border-2 border-[#DCE4DF] hover:border-[#2C5E3B] text-[#18281E] font-mono font-bold text-sm transition-all cursor-pointer shadow-xs"
                  title="Click to hear word"
                >
                  <span>{word}</span>
                  <Volume2 className="w-3.5 h-3.5 text-[#5F7C68]" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Easy Navigation Launch Buttons (Matching reference screenshot) */}
      <div className="space-y-3">
        {/* Play 5x5 Button (Big Green Card) */}
        <button
          onClick={() => onNavigateToPlay5x5()}
          className="w-full flex items-center justify-between p-5 rounded-3xl bg-[#367C4A] hover:bg-[#2C683E] active:scale-[0.99] text-white font-black border-2 border-[#204F2E] shadow-lg shadow-[#367C4A]/25 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
              <Star className="w-8 h-8 fill-white text-white" />
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">
                {wp.playWordPuzzle5x5}
              </div>
              <div className="text-sm sm:text-base font-medium text-emerald-100 mt-0.5">
                {wp.play5x5Sub}
              </div>
            </div>
          </div>
          <ArrowRight className="w-7 h-7 shrink-0 ml-2" />
        </button>

        {/* Word Search Button (Big Sky-Blue Card) */}
        <button
          onClick={onNavigateToWordSearch}
          className="w-full flex items-center justify-between p-5 rounded-3xl bg-[#70BCE0] hover:bg-[#5CAED4] active:scale-[0.99] text-[#0E354D] font-black border-2 border-[#4A99BF] shadow-lg shadow-[#70BCE0]/25 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-white/30 border border-white/40 flex items-center justify-center shrink-0 shadow-inner">
              <Compass className="w-8 h-8 text-[#0E354D]" />
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#0E354D]">
                {wp.wordSearchGrid}
              </div>
              <div className="text-sm sm:text-base font-medium text-[#1E4D69] mt-0.5">
                {wp.wordSearchSub}
              </div>
            </div>
          </div>
          <ArrowRight className="w-7 h-7 shrink-0 ml-2 text-[#0E354D]" />
        </button>
      </div>

      {/* 4. Quick Northeast Topic Selector on Home */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-[#18281E]">
              {wp.exploreNortheastTopics}
            </h3>
            <p className="text-sm text-[#5F7C68] font-medium">
              {wp.exploreTopicsSub}
            </p>
          </div>
          <span className="text-xs font-bold text-[#1E4329] px-3 py-1 rounded-full bg-[#E3EEE5]">
            {wp.topicsCount}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {NORTHEAST_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onNavigateToPlay5x5(topic)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAFDF9] border-2 border-[#DCE4DF] hover:border-[#2C5E3B] hover:bg-[#E3EEE5] transition-all cursor-pointer text-center group shadow-xs"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {topic.icon}
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-[#18281E] leading-tight">
                {topic.state}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
