'use client';

import React from 'react';
import { Star, Compass, ArrowRight } from 'lucide-react';
import { NORTHEAST_TOPICS, NorthEastTopic } from '@/lib/data/northeastTopics';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TopicDashboardProps {
  onSelectTopic: (topic: NorthEastTopic, level: 'easy' | 'medium' | 'hard') => void;
  gamesPlayedCount: number;
  topics?: NorthEastTopic[];
}

export const TopicDashboard: React.FC<TopicDashboardProps> = ({
  onSelectTopic,
  gamesPlayedCount,
  topics = NORTHEAST_TOPICS,
}) => {
  const { wp } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = React.useState<string>('assam');
  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('easy');

  const selectedTopic =
    topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
      {/* Gentle Header with Sun & Clouds illustration (inspired by reference screenshots) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#DDF0FC] to-[#F1F8FD] border-2 border-[#C6DFED] p-6 sm:p-8 shadow-sm text-left">
        {/* Soft glowing sun in top-right */}
        <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-amber-300/60 blur-xl pointer-events-none" />
        <div className="absolute top-4 right-5 w-16 h-16 rounded-full bg-amber-400/90 shadow-lg shadow-amber-300/40 pointer-events-none" />

        {/* Soft white clouds */}
        <div className="absolute top-6 left-1/3 opacity-80 pointer-events-none">
          <div className="w-20 h-7 bg-white/90 rounded-full blur-[0.5px]" />
        </div>
        <div className="absolute top-12 left-10 opacity-70 pointer-events-none">
          <div className="w-16 h-6 bg-white/90 rounded-full blur-[0.5px]" />
        </div>

        <div className="relative z-10 space-y-1">
          <span className="text-base sm:text-lg font-bold text-[#3B6682]">
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

      {/* Main Activity Card (Matching Screenshot 1) */}
      <div className="bg-[#FFFDF9] border-2 border-[#D8C7B5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D5]">
          <div>
            <h2 className="text-2xl font-extrabold text-[#18281E]">
              {wp.todaysActivity}
            </h2>
            <p className="text-sm sm:text-base text-[#5F7C68] font-medium">
              {wp.homeActivitySub}
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-2xl bg-[#E3EEE5] text-[#1E4329] font-bold text-sm text-center border border-[#BED6C3] shrink-0">
            <div className="text-lg font-black">{gamesPlayedCount}</div>
            <div className="text-xs">{wp.roundsCount}</div>
          </div>
        </div>

        {/* Quick Launch Buttons (Matching Screenshot 1) */}
        <div className="space-y-3 pt-1">
          {/* Green Play Button */}
          <button
            onClick={() => onSelectTopic(selectedTopic, difficulty)}
            className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#367C4A] hover:bg-[#2C683E] active:translate-y-0.5 text-white font-black text-xl sm:text-2xl border-2 border-[#204F2E] shadow-md shadow-[#367C4A]/20 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Star className="w-7 h-7 fill-white" />
              </span>
              <div>
                <div>{wp.playWordPuzzle5x5}</div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-100 font-normal">
                  {selectedTopic.title} • {difficulty.toUpperCase()}
                </div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 shrink-0" />
          </button>

          {/* Light Blue North-East Explorer Button */}
          <div className="p-4 rounded-2xl bg-[#E8F4FA] border-2 border-[#BCDDEC] flex items-center gap-3.5 text-left">
            <span className="w-12 h-12 rounded-xl bg-[#70BCE0] text-white flex items-center justify-center shrink-0">
              <Compass className="w-7 h-7" />
            </span>
            <div>
              <div className="text-lg font-extrabold text-[#1B4E6B]">
                {wp.exploreNortheastTopics}
              </div>
              <div className="text-xs sm:text-sm text-[#3E6F8E] font-medium">
                {wp.exploreTopicsSub}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Level Selection (Matching Screenshot 2) */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 shadow-sm space-y-3">
        <h3 className="text-lg font-black text-[#18281E]">
          {wp.chooseHowToPlay}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              id: 'easy',
              title: wp.easyLevel,
              desc: wp.easyDesc,
              icon: '🍃',
            },
            {
              id: 'medium',
              title: wp.mediumLevel,
              desc: wp.mediumDesc,
              icon: '☀️',
            },
            {
              id: 'hard',
              title: wp.hardLevel,
              desc: wp.hardDesc,
              icon: '⛰️',
            },
          ].map((lvl) => {
            const isSelected = difficulty === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => setDifficulty(lvl.id as 'easy' | 'medium' | 'hard')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#E3EEE5] border-[#2C5E3B] ring-2 ring-[#2C5E3B]/20 shadow-xs'
                    : 'bg-[#FAFBF9] border-[#DCE4DF] hover:border-[#2C5E3B]'
                }`}
              >
                <span className="text-2xl">{lvl.icon}</span>
                <div>
                  <div className="font-extrabold text-base text-[#18281E]">
                    {lvl.title}
                  </div>
                  <div className="text-xs text-[#5F7C68] font-medium">
                    {lvl.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Choose a State Deck (Matching Screenshot 3) */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-[#18281E]">
            {wp.chooseTopic}
          </h3>
          <span className="text-xs font-bold text-[#1E4329] px-2.5 py-1 rounded-full bg-[#E3EEE5]">
            {wp.topicsCount}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {topics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                  isSelected
                    ? 'bg-[#E3EEE5] border-[#2C5E3B] ring-2 ring-[#2C5E3B]/20 shadow-sm'
                    : 'bg-[#FAFDF9] border-[#DCE4DF] hover:border-[#2C5E3B] hover:bg-white'
                }`}
              >
                <span className="w-14 h-14 rounded-2xl bg-[#367C4A] text-white flex items-center justify-center text-2xl shadow-inner mb-2">
                  {topic.icon}
                </span>
                <span className="font-black text-base text-[#18281E]">
                  {topic.state}
                </span>
                <span className="text-xs text-[#5F7C68] mt-0.5">
                  {topic.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
