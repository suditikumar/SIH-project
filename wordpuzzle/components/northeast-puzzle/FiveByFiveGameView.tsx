'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { NorthEastTopic, TopicWordItem } from '@/lib/data/northeastTopics';
import { Coord, generateWordSearch } from '@/lib/game/wordSearchEngine';
import { FiveByFiveGrid } from './FiveByFiveGrid';
import { MemoryEchoCard } from '@/components/games/MemoryEchoCard';
import { soundEffects } from '@/lib/voice/soundEffects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FiveByFiveGameViewProps {
  topic: NorthEastTopic;
  level: 'easy' | 'medium' | 'hard';
  onBack: () => void;
  onCompletedTopic: () => void;
  onWordFound?: (word: string) => void;
}

export const FiveByFiveGameView: React.FC<FiveByFiveGameViewProps> = ({
  topic,
  level,
  onBack,
  onCompletedTopic,
  onWordFound,
}) => {
  const { wp, language } = useLanguage();

  // Filter words by level or use topic words
  const wordsForLevel = useMemo(() => {
    const filtered = topic.words.filter((w) => w.level === level);
    return filtered.length > 0 ? filtered : topic.words;
  }, [topic, level]);

  const [wordIndex, setWordIndex] = useState(0);
  const currentWordItem: TopicWordItem = wordsForLevel[wordIndex] || wordsForLevel[0];

  const [gridData, setGridData] = useState<{ grid: string[][]; targetPath: Coord[] }>({
    grid: [],
    targetPath: [],
  });
  const [showEcho, setShowEcho] = useState(false);
  const [isTopicFinished, setIsTopicFinished] = useState(false);

  // Generate 5x5 grid containing strictly this one target word
  const initOneWordGrid = useCallback((item: TopicWordItem, lang: any) => {
    const result = generateWordSearch([item.word], 5, lang);
    const placed = result.placedWords.find((pw) => pw.word === item.word);
    setGridData({
      grid: result.grid,
      targetPath: placed ? placed.cells : [],
    });
    setShowEcho(false);
  }, []);

  useEffect(() => {
    initOneWordGrid(currentWordItem, language);
  }, [currentWordItem, language, initOneWordGrid]);

  const handleWordFound = () => {
    setShowEcho(true);
    if (onWordFound) {
      onWordFound(currentWordItem.word);
    }
  };

  const handleNextWord = () => {
    setShowEcho(false);
    if (wordIndex + 1 < wordsForLevel.length) {
      setWordIndex((prev) => prev + 1);
    } else {
      setIsTopicFinished(true);
      soundEffects.playWordCelebration();
      onCompletedTopic();
    }
  };

  // Convert currentWordItem to format expected by MemoryEchoCard
  const echoWordData = useMemo(() => {
    return {
      targetWord: currentWordItem.word,
      letters: currentWordItem.letters,
      phoneticHint: currentWordItem.word,
      meaningEnglish: currentWordItem.word,
      memoryPrompt: currentWordItem.memoryPrompt,
      associations: currentWordItem.associations,
      culturalNote: currentWordItem.clue,
      verifiedBy: 'North-East Cultural Heritage',
    };
  }, [currentWordItem]);

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-300">
      {/* Top Bar with Back Button & Progress */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-[#D8C7B5] hover:border-[#2C5E3B] text-[#18281E] font-bold text-base transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#2C5E3B]" />
          <span>{wp.back}</span>
        </button>

        <div className="text-sm sm:text-base font-extrabold text-[#1E4329] px-4 py-1.5 rounded-full bg-[#E3EEE5] border border-[#C1D7C6]">
          {wp.wordCounter} {wordIndex + 1} {wp.ofWord} {wordsForLevel.length}
        </div>
      </div>

      {!isTopicFinished ? (
        <>
          {/* 5x5 One-Word-At-A-Time Letter Grid with In-Box Undo and No Timer */}
          {gridData.grid.length > 0 && (
            <FiveByFiveGrid
              wordItem={currentWordItem}
              grid={gridData.grid}
              targetPath={gridData.targetPath}
              onWordFound={handleWordFound}
              levelTitle={`${topic.state} • ${level.toUpperCase()}`}
            />
          )}

          {/* Memory Echo Card Overlay upon finding the word */}
          {showEcho && (
            <MemoryEchoCard
              wordData={echoWordData}
              icon={currentWordItem.icon}
              onNextWord={handleNextWord}
            />
          )}
        </>
      ) : (
        /* Topic Completed Celebration */
        <div className="bg-white border-4 border-[#2C5E3B] rounded-3xl p-7 sm:p-9 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FEF6E4] border-2 border-[#EED79D] flex items-center justify-center text-4xl shadow-inner">
            <Trophy className="w-10 h-10 text-[#D99518]" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EEE5] text-[#1E4329] text-xs font-bold uppercase tracking-wider border border-[#C1D7C6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Topic Completed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#18281E]">
              Wonderful Job!
            </h2>
            <p className="text-base text-[#496352] font-semibold">
              You explored all words in {topic.title}.
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#2C5E3B] hover:bg-[#234C2F] text-white font-black text-xl border-2 border-[#1E4329] shadow-lg shadow-[#2C5E3B]/20 transition-all cursor-pointer"
          >
            <span>Explore More Topics</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
