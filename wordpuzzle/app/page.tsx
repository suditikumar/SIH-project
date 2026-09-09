'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WordPuzzleLevel } from '@/lib/game/wordPuzzlesData';
import {
  generateWordSearch,
  GeneratedPuzzle,
  Coord,
} from '@/lib/game/wordSearchEngine';
import { getPuzzleLevel, getLevelsForLanguage } from '@/lib/game/multilingualPuzzles';
import { WordSearchGrid } from '@/components/word-puzzle/WordSearchGrid';
import { WordSearchDashboard } from '@/components/word-puzzle/WordSearchDashboard';
import { PuzzleCompletedModal } from '@/components/word-puzzle/PuzzleCompletedModal';
import { soundEffects } from '@/lib/voice/soundEffects';
import { speechService } from '@/lib/voice/speechService';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { NorthEastTopic, getLocalizedNortheastTopics } from '@/lib/data/northeastTopics';
import { TopicDashboard } from '@/components/northeast-puzzle/TopicDashboard';
import { FiveByFiveGameView } from '@/components/northeast-puzzle/FiveByFiveGameView';
import { ScreenBottomNav, ActiveScreen } from '@/components/navigation/ScreenBottomNav';
import { HomeHub } from '@/components/home/HomeHub';

export default function UnifiedWordPuzzleApp() {
  const { soundEnabled, language, wp } = useLanguage();

  // Screen routing state: 'home' | 'play-5x5' | 'word-search'
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('assam');
  const [topicLevel, setTopicLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [isPlaying5x5, setIsPlaying5x5] = useState<boolean>(false);

  // Dynamic localized topics according to current language
  const localizedTopics = useMemo(() => getLocalizedNortheastTopics(language), [language]);
  const activeTopic = useMemo(() => {
    return localizedTopics.find((t) => t.id === selectedTopicId) || localizedTopics[0];
  }, [localizedTopics, selectedTopicId]);

  // Unified progress & stats
  const [fiveByFiveGamesPlayed, setFiveByFiveGamesPlayed] = useState<number>(0);
  const [puzzlesCompleted, setPuzzlesCompleted] = useState<number>(0);
  const [collectedWords, setCollectedWords] = useState<string[]>([
    'TEA', 'RICE', 'RAIN', 'PINE'
  ]);
  const [score, setScore] = useState<number>(400);

  // --- Classic Multi-Word Search State (No Timer) ---
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel: WordPuzzleLevel = useMemo(() => {
    return getPuzzleLevel(language, levelIndex);
  }, [language, levelIndex]);

  const [puzzle, setPuzzle] = useState<GeneratedPuzzle | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<
    Array<{ row: number; col: number; colorIndex: number }>
  >([]);
  const [hintCoord, setHintCoord] = useState<Coord | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize multi-word puzzle level with active language
  const initLevel = useCallback((lvl: WordPuzzleLevel, lang: any) => {
    const generated = generateWordSearch(lvl.words, lvl.gridSize, lang);
    setPuzzle(generated);
    setFoundWords([]);
    setFoundCells([]);
    setHintCoord(null);
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    initLevel(currentLevel, language);
  }, [currentLevel, language, initLevel]);

  // Handle Multi-Word Drag Selection Complete (Straight only: H, V, D)
  const handleMultiWordSelectionComplete = (coords: Coord[]) => {
    if (!puzzle || isCompleted) return;

    const forwardWord = coords
      .map((c) => puzzle.grid[c.row]?.[c.col] || '')
      .join('');

    const match = puzzle.placedWords.find(
      (pw) => pw.word === forwardWord && !foundWords.includes(pw.word)
    );

    if (match) {
      const newFoundWords = [...foundWords, match.word];
      setFoundWords(newFoundWords);

      const newFoundCells = [
        ...foundCells,
        ...match.cells.map((c) => ({
          row: c.row,
          col: c.col,
          colorIndex: match.colorIndex,
        })),
      ];
      setFoundCells(newFoundCells);
      setScore((prev) => prev + 100);
      setCollectedWords((prev) => Array.from(new Set([...prev, match.word])));

      if (soundEnabled) {
        soundEffects.playLetterTap(newFoundWords.length);
      }

      speechService.speakWord(match.word, language);
      setHintCoord(null);

      if (newFoundWords.length === currentLevel.words.length) {
        setIsCompleted(true);
        setPuzzlesCompleted((prev) => prev + 1);
        soundEffects.playWordCelebration();
      }
    } else if (soundEnabled && coords.length > 2) {
      soundEffects.playUndo();
    }
  };

  const handleUndoLastFound = () => {
    if (foundWords.length === 0 || isCompleted) return;

    const lastWord = foundWords[foundWords.length - 1];
    const newFoundWords = foundWords.slice(0, -1);
    setFoundWords(newFoundWords);

    const placed = puzzle?.placedWords.find((pw) => pw.word === lastWord);
    if (placed) {
      setFoundCells((prev) =>
        prev.filter(
          (c) =>
            !placed.cells.some(
              (pc) => pc.row === c.row && pc.col === c.col
            )
        )
      );
    }

    setScore((prev) => Math.max(0, prev - 100));
    if (soundEnabled) {
      soundEffects.playUndo();
    }
  };

  const handleHint = () => {
    if (!puzzle || isCompleted) return;

    const unfound = puzzle.placedWords.find((pw) => !foundWords.includes(pw.word));
    if (unfound && unfound.cells.length > 0) {
      const targetFirstCoord = unfound.cells[0];
      setHintCoord(targetFirstCoord);

      if (soundEnabled) {
        soundEffects.playLetterTap(0);
      }

      setTimeout(() => {
        setHintCoord(null);
      }, 3000);
    }
  };

  const handleRestart = () => {
    initLevel(currentLevel, language);
  };

  const handleNextPuzzle = () => {
    const levels = getLevelsForLanguage(language);
    const nextIndex = (levelIndex + 1) % levels.length;
    setLevelIndex(nextIndex);
  };

  const wordsStatus = useMemo(() => {
    if (!puzzle) return [];
    return currentLevel.words.map((target) => {
      const placed = puzzle.placedWords.find((pw) => pw.word === target);
      return {
        word: target,
        isFound: foundWords.includes(target),
        colorIndex: placed ? placed.colorIndex : 0,
      };
    });
  }, [puzzle, currentLevel.words, foundWords]);

  // --- Handlers for 5x5 North-East Topics ---
  const handleLaunchTopicGame = (
    topic: NorthEastTopic,
    level: 'easy' | 'medium' | 'hard'
  ) => {
    setSelectedTopicId(topic.id);
    setTopicLevel(level);
    setIsPlaying5x5(true);
    setActiveScreen('play-5x5');
  };

  const handle5x5WordFound = (word: string) => {
    setScore((prev) => prev + 100);
    setCollectedWords((prev) => Array.from(new Set([...prev, word])));
  };

  const handle5x5TopicCompleted = () => {
    setFiveByFiveGamesPlayed((prev) => prev + 1);
    setPuzzlesCompleted((prev) => prev + 1);
  };

  // --- Home Navigation Handlers ---
  const handleNavigateToPlay5x5 = (topic?: NorthEastTopic) => {
    if (topic) {
      setSelectedTopicId(topic.id);
      setIsPlaying5x5(true);
    } else {
      setIsPlaying5x5(false);
    }
    setActiveScreen('play-5x5');
  };

  const handleNavigateToWordSearch = () => {
    setActiveScreen('word-search');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-28 animate-in fade-in duration-300">
      {/* 1. Home Page (Navigation Hub + Progress Section) */}
      {activeScreen === 'home' && (
        <HomeHub
          onNavigateToPlay5x5={handleNavigateToPlay5x5}
          onNavigateToWordSearch={handleNavigateToWordSearch}
          totalScore={score}
          totalWordsFound={collectedWords.length}
          puzzlesCompleted={puzzlesCompleted}
          recentWords={collectedWords}
        />
      )}

      {/* 2. Play 5×5 Word Puzzle (One Word at a Time, Levels, No Timer) */}
      {activeScreen === 'play-5x5' && (
        <>
          {isPlaying5x5 && activeTopic ? (
            <FiveByFiveGameView
              topic={activeTopic}
              level={topicLevel}
              onBack={() => setIsPlaying5x5(false)}
              onCompletedTopic={handle5x5TopicCompleted}
              onWordFound={handle5x5WordFound}
            />
          ) : (
            <TopicDashboard
              topics={localizedTopics}
              onSelectTopic={handleLaunchTopicGame}
              gamesPlayedCount={fiveByFiveGamesPlayed}
            />
          )}
        </>
      )}

      {/* 3. Word Search Grid Mode (Multi-word, Fully Visible Words, No Timer) */}
      {activeScreen === 'word-search' && (
        <div className="space-y-6">
          <WordSearchDashboard
            puzzleNumber={currentLevel.puzzleNumber}
            puzzleTitle={currentLevel.title}
            puzzleTheme={currentLevel.theme}
            wordsStatus={wordsStatus}
            score={score}
            onHint={handleHint}
            onRestart={handleRestart}
            onNextPuzzle={handleNextPuzzle}
            canHint={foundWords.length < currentLevel.words.length}
          />

          {puzzle ? (
            <WordSearchGrid
              grid={puzzle.grid}
              size={puzzle.size}
              foundCells={foundCells}
              hintCoord={hintCoord}
              onSelectionComplete={handleMultiWordSelectionComplete}
              onUndoLastFound={handleUndoLastFound}
              canUndoLastFound={foundWords.length > 0}
              disabled={isCompleted}
            />
          ) : (
            <div className="flex items-center justify-center p-12 text-xl font-bold text-[#496352]">
              Loading WORD PUZZLE...
            </div>
          )}

          {isCompleted && (
            <PuzzleCompletedModal
              puzzleNumber={currentLevel.puzzleNumber}
              puzzleTitle={currentLevel.title}
              totalWords={currentLevel.words.length}
              score={score}
              onNextPuzzle={handleNextPuzzle}
              onReplay={handleRestart}
            />
          )}
        </div>
      )}

      {/* Streamlined 3-Tab Bottom Navigation: Home, Play (5×5), Word Search */}
      <ScreenBottomNav
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          if (screen === 'play-5x5' && !isPlaying5x5) {
            setIsPlaying5x5(false);
          }
        }}
      />
    </div>
  );
}
