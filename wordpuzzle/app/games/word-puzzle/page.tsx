'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { PUZZLE_WORDS, WordPuzzleItem } from '@/lib/data/puzzleWords';
import { generateWordGrid, isAdjacent } from '@/lib/game/gridGenerator';
import { GridCell, GridCoordinate } from '@/lib/game/types';
import { GameHeader } from '@/components/games/GameHeader';
import { WordGrid } from '@/components/games/WordGrid';
import { MemoryEchoCard } from '@/components/games/MemoryEchoCard';
import { soundEffects } from '@/lib/voice/soundEffects';
import { speechService } from '@/lib/voice/speechService';
import { saveGameResult } from '@/lib/game/gameStorage';

export default function WordPuzzlePage() {
  const { language, t, familiarMode, voiceEnabled, soundEnabled } = useLanguage();

  // Filter word list according to Familiarity Mode
  const wordList = useMemo(() => {
    if (familiarMode) {
      const familiarOnly = PUZZLE_WORDS.filter((w) => w.isFamiliar);
      return familiarOnly.length > 0 ? familiarOnly : PUZZLE_WORDS;
    }
    return PUZZLE_WORDS;
  }, [familiarMode]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentWordItem: WordPuzzleItem = wordList[currentIndex] || wordList[0];

  const regionalData = useMemo(() => {
    return (
      currentWordItem.translations[language] ||
      currentWordItem.translations.en ||
      Object.values(currentWordItem.translations)[0]
    );
  }, [currentWordItem, language]);

  // Grid state
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [targetPath, setTargetPath] = useState<GridCoordinate[]>([]);
  const [selectedPath, setSelectedPath] = useState<GridCoordinate[]>([]);
  const [hintedCoord, setHintedCoord] = useState<GridCoordinate | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Initialize or reset puzzle grid when word or language changes
  const initPuzzle = useCallback(() => {
    const letters = regionalData.letters;
    const { grid: newGrid, path } = generateWordGrid(letters, language, 5);
    setGrid(newGrid);
    setTargetPath(path);
    setSelectedPath([]);
    setHintedCoord(null);
    setHintsUsed(0);
    setIsCompleted(false);
    setStartTime(Date.now());

    // Spoken prompt when starting a word
    if (voiceEnabled) {
      const instruction = `${t.games.findTargetWord} ${regionalData.targetWord}.`;
      speechService.speakInstruction(instruction, language);
    }
  }, [regionalData, language, voiceEnabled, t.games.findTargetWord]);

  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  // Handle letter cell tap
  const handleCellClick = (row: number, col: number) => {
    if (isCompleted) return;

    const letters = regionalData.letters;
    const expectedStep = selectedPath.length;

    // Check if user tapped the most recently selected cell -> treat as undo
    if (
      expectedStep > 0 &&
      selectedPath[expectedStep - 1].row === row &&
      selectedPath[expectedStep - 1].col === col
    ) {
      handleUndo();
      return;
    }

    // Check if cell was already tapped earlier in current path
    const alreadyIndex = selectedPath.findIndex((p) => p.row === row && p.col === col);
    if (alreadyIndex !== -1) {
      return; // prevent duplicate usage
    }

    if (expectedStep >= letters.length) {
      return;
    }

    const targetChar = letters[expectedStep];
    const cellChar = grid[row]?.[col]?.letter;

    // Adjacency check for steps after the first
    if (expectedStep > 0) {
      const prevCoord = selectedPath[expectedStep - 1];
      if (!isAdjacent(prevCoord, { row, col })) {
        // Not adjacent
        return;
      }
    }

    // Check if matches the next expected letter of the word
    if (cellChar === targetChar) {
      const newPath = [...selectedPath, { row, col }];
      setSelectedPath(newPath);
      setHintedCoord(null);

      // Play soft xylophone chime
      if (soundEnabled) {
        soundEffects.playLetterTap(newPath.length);
      }

      // Check if word completed
      if (newPath.length === letters.length) {
        setIsCompleted(true);
        saveGameResult({
          gameId: 'word-puzzle',
          completed: true,
          hintsUsed,
          language,
          duration: Math.round((Date.now() - startTime) / 1000),
          completedAt: new Date().toISOString(),
          wordFound: regionalData.targetWord,
          category: currentWordItem.category,
        });
      }
    }
  };

  // Provide gentle hint
  const handleHint = () => {
    if (isCompleted) return;
    const nextStep = selectedPath.length;
    if (nextStep < targetPath.length) {
      setHintedCoord(targetPath[nextStep]);
      setHintsUsed((prev) => prev + 1);
      if (soundEnabled) {
        soundEffects.playLetterTap(0);
      }
    }
  };

  // Undo last step
  const handleUndo = () => {
    if (selectedPath.length > 0 && !isCompleted) {
      setSelectedPath((prev) => prev.slice(0, prev.length - 1));
      setHintedCoord(null);
      if (soundEnabled) {
        soundEffects.playUndo();
      }
    }
  };

  // Reset current selection
  const handleReset = () => {
    setSelectedPath([]);
    setHintedCoord(null);
    if (soundEnabled) {
      soundEffects.playUndo();
    }
  };

  // Advance to next word
  const handleNextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % wordList.length);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb & Return to Activities */}
      <div className="flex items-center justify-between">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#D5E0D7] text-[#496352] hover:text-[#18281E] hover:border-[#2C5E3B] font-semibold text-base transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.games.backToGames}</span>
        </Link>

        <div className="text-base sm:text-lg font-bold text-[#2C5E3B] px-3.5 py-1.5 rounded-full bg-[#E3EEE5]">
          Word {currentIndex + 1} of {wordList.length}
        </div>
      </div>

      {/* Main Target Word & Controls */}
      <GameHeader
        wordData={regionalData}
        icon={currentWordItem.icon}
        category={currentWordItem.category}
        foundCount={selectedPath.length}
        totalLetters={regionalData.letters.length}
        onHint={handleHint}
        onUndo={handleUndo}
        onReset={handleReset}
        canUndo={selectedPath.length > 0}
      />

      {/* Dementia-Friendly Instruction Banner */}
      <div className="bg-[#FAFBF9] border border-[#DCE4DF] rounded-2xl px-5 py-3.5 text-center text-base sm:text-lg text-[#3E5846] font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-[#2C5E3B] shrink-0" />
        <span>{t.games.tapLettersInstruction}</span>
      </div>

      {/* Connected-Path Letter Grid */}
      <WordGrid
        grid={grid}
        selectedPath={selectedPath}
        hintedCoord={hintedCoord}
        onCellClick={handleCellClick}
        targetLetters={regionalData.letters}
      />

      {/* Cultural Heritage Note */}
      <div className="bg-white border border-[#D5E0D7] rounded-2xl p-4 sm:p-5 text-center text-sm sm:text-base text-[#496352]">
        <span className="font-bold text-[#18281E]">Northeast Heritage: </span>
        {regionalData.culturalNote}
      </div>

      {/* Unique Feature: Memory Echo Card Overlay */}
      {isCompleted && (
        <MemoryEchoCard
          wordData={regionalData}
          icon={currentWordItem.icon}
          onNextWord={handleNextWord}
        />
      )}
    </div>
  );
}
