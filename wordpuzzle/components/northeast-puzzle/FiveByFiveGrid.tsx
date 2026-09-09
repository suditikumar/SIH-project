'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Volume2, HelpCircle, Undo2, RotateCcw, Sparkles, Check } from 'lucide-react';
import { TopicWordItem } from '@/lib/data/northeastTopics';
import { Coord, getLineCoords } from '@/lib/game/wordSearchEngine';
import { speechService } from '@/lib/voice/speechService';
import { soundEffects } from '@/lib/voice/soundEffects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FiveByFiveGridProps {
  wordItem: TopicWordItem;
  grid: string[][];
  targetPath: Coord[];
  onWordFound: () => void;
  onNextWord?: () => void;
  levelTitle: string;
}

export const FiveByFiveGrid: React.FC<FiveByFiveGridProps> = ({
  wordItem,
  grid,
  targetPath,
  onWordFound,
  onNextWord,
  levelTitle,
}) => {
  const { wp, language } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [startCoord, setStartCoord] = useState<Coord | null>(null);
  const [currentCoord, setCurrentCoord] = useState<Coord | null>(null);
  const [hintCoord, setHintCoord] = useState<Coord | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSolved(false);
    setHintCoord(null);
    setStartCoord(null);
    setCurrentCoord(null);
  }, [wordItem]);

  // Compute active drag coordinates
  const activeDragCoords = useMemo(() => {
    if (!isDragging || !startCoord || !currentCoord) return [];
    return getLineCoords(startCoord, currentCoord, 5);
  }, [isDragging, startCoord, currentCoord]);

  // Current selected letters string
  const currentSelection = useMemo(() => {
    return activeDragCoords.map((c) => grid[c.row]?.[c.col] || '').join('');
  }, [activeDragCoords, grid]);

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    if (isSolved) return;
    e.preventDefault();
    setIsDragging(true);
    setStartCoord({ row, col });
    setCurrentCoord({ row, col });
  };

  const updateCoordFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY);
      if (!element) return;
      const tile = element.closest('[data-5x5-cell="true"]');
      if (tile) {
        const r = parseInt(tile.getAttribute('data-row') || '-1', 10);
        const c = parseInt(tile.getAttribute('data-col') || '-1', 10);
        if (r >= 0 && c >= 0 && (r !== currentCoord?.row || c !== currentCoord?.col)) {
          setCurrentCoord({ row: r, col: c });
        }
      }
    },
    [currentCoord]
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isSolved) return;
    e.preventDefault();
    updateCoordFromPoint(e.clientX, e.clientY);
  };

  const checkSelection = useCallback(
    (coords: Coord[]) => {
      const selected = coords.map((c) => grid[c.row]?.[c.col] || '').join('');
      if (selected === wordItem.word) {
        // Solved!
        setIsSolved(true);
        soundEffects.playLetterTap(3);
        speechService.speakWord(wordItem.word, language);
        onWordFound();
      } else if (coords.length > 2) {
        soundEffects.playUndo();
      }
    },
    [grid, wordItem.word, language, onWordFound]
  );

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (activeDragCoords.length > 1) {
      checkSelection(activeDragCoords);
    }
    setStartCoord(null);
    setCurrentCoord(null);
  };

  // Global listener for pointer releases
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (activeDragCoords.length > 1) {
          checkSelection(activeDragCoords);
        }
        setStartCoord(null);
        setCurrentCoord(null);
      }
    };
    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('pointercancel', handleGlobalUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('pointercancel', handleGlobalUp);
    };
  }, [isDragging, activeDragCoords, checkSelection]);

  // In-box undo button action
  const handleInBoxUndo = () => {
    setIsDragging(false);
    setStartCoord(null);
    setCurrentCoord(null);
    setHintCoord(null);
    soundEffects.playUndo();
  };

  // Hint action
  const handleHint = () => {
    if (targetPath.length > 0) {
      setHintCoord(targetPath[0]);
      soundEffects.playLetterTap(0);
      setTimeout(() => {
        setHintCoord(null);
      }, 3000);
    }
  };

  const handleSpeakTarget = () => {
    speechService.speakWord(wordItem.word, language);
  };

  return (
    <div className="bg-[#FAFDFB] border-3 border-[#2C5E3B] rounded-3xl p-5 sm:p-8 shadow-lg shadow-[#2C5E3B]/10 max-w-xl mx-auto space-y-6">
      {/* Target Word Display (One word at a time) */}
      <div className="bg-white border-2 border-[#D5E0D7] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {/* Large Picture */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#EBF2EC] border-2 border-[#C6D8CB] flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
            {wordItem.icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E3EEE5] text-[#1E4329] text-xs font-bold uppercase tracking-wider border border-[#C1D7C6]">
                {levelTitle}
              </span>
              <span className="text-xs font-semibold text-[#5F7C68]">
                {wp.targetWord}:
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#18281E] tracking-wider mt-1">
              {wordItem.word}
            </div>
            <p className="text-xs sm:text-sm text-[#496352] mt-0.5 max-w-xs">
              {wordItem.clue}
            </p>
          </div>
        </div>

        {/* Pronounce & Hint Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSpeakTarget}
            className="flex items-center gap-1.5 px-4 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#EBF2EC] hover:bg-[#DCE9DF] text-[#1E4329] border-2 border-[#C3D8C8] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm"
            title="Listen to word"
          >
            <Volume2 className="w-5 h-5 text-[#2C5E3B]" />
            <span className="font-mono">{wordItem.word}</span>
          </button>

          <button
            onClick={handleHint}
            className="flex items-center gap-1 px-3.5 py-2.5 sm:px-3.5 sm:py-3 rounded-2xl bg-[#FEF6E4] hover:bg-[#FDF0D0] text-[#8C6207] border-2 border-[#EED79D] font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm"
            title="Show hint"
          >
            <HelpCircle className="w-5 h-5 text-[#D99518]" />
            <span>{wp.hint}</span>
          </button>
        </div>
      </div>

      {/* In-Box Toolbar with Selection Preview & Undo inside the box */}
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-5 h-5 text-[#2C5E3B] shrink-0" />
          <span className="text-sm font-bold text-[#496352] shrink-0">
            {wp.selected}:
          </span>
          <div className="px-3 py-1 rounded-xl bg-white border border-[#D5E0D7] font-black text-lg text-[#18281E] tracking-widest min-w-[70px] text-center truncate">
            {currentSelection || '—'}
          </div>
        </div>

        {/* Undo inside the box */}
        <button
          onClick={handleInBoxUndo}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-[#F2F6F3] text-[#1E4329] font-bold text-sm border-2 border-[#C3D8C8] transition-all cursor-pointer shadow-sm"
          title="Undo selection"
        >
          <Undo2 className="w-4 h-4 text-[#2C5E3B]" />
          <span>{wp.undo}</span>
        </button>
      </div>

      {/* 5x5 Grid Container (Touch & Mouse Drag, No Timer) */}
      <div
        ref={gridContainerRef}
        onPointerMove={handlePointerMove}
        className="touch-none bg-[#EBF2EC]/80 border-2 border-[#C6D8CB] p-3 sm:p-5 rounded-3xl shadow-inner w-full"
        style={{ touchAction: 'none' }}
      >
        <div
          className="grid grid-cols-5 grid-rows-5 gap-2 sm:gap-3 aspect-square w-full select-none"
        >
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => {
              const inActiveDrag = activeDragCoords.some(
                (c) => c.row === rIdx && c.col === cIdx
              );
              const inTargetPath = targetPath.some(
                (c) => c.row === rIdx && c.col === cIdx
              );
              const isHinted =
                hintCoord !== null &&
                hintCoord.row === rIdx &&
                hintCoord.col === cIdx;

              let tileStyle =
                'bg-white text-[#18281E] border-2 border-[#D0DDD4] hover:border-[#2C5E3B] shadow-sm';

              if (inActiveDrag) {
                tileStyle =
                  'bg-[#2C5E3B] text-white border-2 border-[#173822] shadow-md shadow-[#2C5E3B]/30 scale-105 z-10';
              } else if (isSolved && inTargetPath) {
                tileStyle =
                  'bg-[#D7EAD9] text-[#1E4329] border-3 border-[#2C5E3B] font-black shadow-md scale-102';
              } else if (isHinted) {
                tileStyle =
                  'bg-[#FEF6E4] text-[#8C6207] border-2 border-[#D99518] ring-4 ring-[#D99518]/30 animate-pulse scale-105';
              }

              return (
                <button
                  key={`5x5-${rIdx}-${cIdx}`}
                  data-5x5-cell="true"
                  data-row={rIdx}
                  data-col={cIdx}
                  onPointerDown={(e) => handlePointerDown(rIdx, cIdx, e)}
                  className={`flex items-center justify-center aspect-square rounded-2xl font-black text-2xl sm:text-3xl md:text-4xl transition-transform duration-75 cursor-pointer select-none outline-none ${tileStyle}`}
                  aria-label={`Letter ${letter}, row ${rIdx + 1}, col ${cIdx + 1}`}
                >
                  <span>{letter}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
