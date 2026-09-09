'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Undo2, RotateCcw, Sparkles } from 'lucide-react';
import { Coord, getLineCoords, WORD_HIGHLIGHT_COLORS } from '@/lib/game/wordSearchEngine';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface FoundCellInfo {
  row: number;
  col: number;
  colorIndex: number;
}

interface WordSearchGridProps {
  grid: string[][];
  size: number;
  foundCells: FoundCellInfo[];
  hintCoord: Coord | null;
  onSelectionComplete: (coords: Coord[]) => void;
  onUndoLastFound?: () => void;
  canUndoLastFound?: boolean;
  disabled?: boolean;
}

export const WordSearchGrid: React.FC<WordSearchGridProps> = ({
  grid,
  size,
  foundCells,
  hintCoord,
  onSelectionComplete,
  onUndoLastFound,
  canUndoLastFound = false,
  disabled = false,
}) => {
  const { wp } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [startCoord, setStartCoord] = useState<Coord | null>(null);
  const [currentCoord, setCurrentCoord] = useState<Coord | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Compute active drag coordinates
  const activeDragCoords = React.useMemo(() => {
    if (!isDragging || !startCoord || !currentCoord) return [];
    return getLineCoords(startCoord, currentCoord, size);
  }, [isDragging, startCoord, currentCoord, size]);

  // Letters currently selected in real time
  const currentSelectedLetters = React.useMemo(() => {
    return activeDragCoords.map((c) => grid[c.row]?.[c.col] || '').join('');
  }, [activeDragCoords, grid]);

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    setStartCoord({ row, col });
    setCurrentCoord({ row, col });
  };

  const updateCoordFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY);
      if (!element) return;
      const tile = element.closest('[data-grid-cell="true"]');
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
    if (!isDragging || disabled) return;
    e.preventDefault();
    updateCoordFromPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (activeDragCoords.length > 1) {
      onSelectionComplete(activeDragCoords);
    }
    setStartCoord(null);
    setCurrentCoord(null);
  };

  // Global pointer up listener
  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (activeDragCoords.length > 1) {
          onSelectionComplete(activeDragCoords);
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
  }, [isDragging, activeDragCoords, onSelectionComplete]);

  // In-box cancel/undo
  const handleInBoxUndo = () => {
    if (isDragging) {
      setIsDragging(false);
      setStartCoord(null);
      setCurrentCoord(null);
    } else if (onUndoLastFound && canUndoLastFound) {
      onUndoLastFound();
    }
  };

  const isCellInActiveDrag = (r: number, c: number): boolean => {
    return activeDragCoords.some((coord) => coord.row === r && coord.col === c);
  };

  const getCellFoundInfo = (r: number, c: number): FoundCellInfo | undefined => {
    return foundCells.find((cell) => cell.row === r && cell.col === c);
  };

  const isCellHinted = (r: number, c: number): boolean => {
    return hintCoord !== null && hintCoord.row === r && hintCoord.col === c;
  };

  return (
    <div className="bg-[#FAFDFB] border-3 border-[#2C5E3B] rounded-3xl p-4 sm:p-7 shadow-lg shadow-[#2C5E3B]/10 w-full max-w-2xl mx-auto space-y-4">
      {/* In-Box Toolbar with Selection Preview & Undo Button */}
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b-2 border-[#E2EAE4]">
        {/* Selection Preview */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Sparkles className="w-5 h-5 text-[#2C5E3B] shrink-0" />
          <span className="text-sm sm:text-base font-bold text-[#496352] shrink-0">
            {wp.selected}:
          </span>
          <div className="px-3 py-1 rounded-xl bg-white border border-[#CCE0D3] font-black text-base sm:text-lg text-[#18281E] tracking-widest min-w-[70px] text-center truncate">
            {currentSelectedLetters || '—'}
          </div>
        </div>

        {/* Undo inside the box */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInBoxUndo}
            disabled={!isDragging && !canUndoLastFound}
            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white hover:bg-[#F2F6F3] active:translate-y-0.5 text-[#1E4329] font-bold text-sm sm:text-base border-2 border-[#C3D8C8] hover:border-[#2C5E3B] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
            title={wp.undo}
            aria-label={wp.undo}
          >
            <Undo2 className="w-4 h-4 text-[#2C5E3B]" />
            <span>{wp.undo}</span>
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div
        ref={gridContainerRef}
        onPointerMove={handlePointerMove}
        className="touch-none bg-[#EBF2EC]/80 border-2 border-[#C6D8CB] p-2.5 sm:p-4 rounded-3xl shadow-inner w-full"
        style={{ touchAction: 'none' }}
      >
        <div
          className="grid gap-1 sm:gap-2 mx-auto aspect-square w-full select-none"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => {
              const inActiveDrag = isCellInActiveDrag(rIdx, cIdx);
              const foundInfo = getCellFoundInfo(rIdx, cIdx);
              const isHinted = isCellHinted(rIdx, cIdx);

              let styleClasses =
                'bg-white text-[#18281E] border-2 border-[#D0DDD4] hover:bg-[#F4F8F5] hover:border-[#2C5E3B] shadow-sm';

              if (inActiveDrag) {
                styleClasses =
                  'bg-[#2C5E3B] text-white border-2 border-[#173822] shadow-md shadow-[#2C5E3B]/30 scale-105 z-10';
              } else if (foundInfo) {
                const colorTheme =
                  WORD_HIGHLIGHT_COLORS[foundInfo.colorIndex % WORD_HIGHLIGHT_COLORS.length];
                styleClasses = `${colorTheme.bg} ${colorTheme.text} border-2 ${colorTheme.border} font-black shadow-sm`;
              } else if (isHinted) {
                styleClasses =
                  'bg-[#FEF6E4] text-[#8C6207] border-2 border-[#D99518] animate-pulse scale-105 ring-4 ring-[#D99518]/30';
              }

              return (
                <button
                  key={`cell-${rIdx}-${cIdx}`}
                  data-grid-cell="true"
                  data-row={rIdx}
                  data-col={cIdx}
                  onPointerDown={(e) => handlePointerDown(rIdx, cIdx, e)}
                  className={`flex items-center justify-center aspect-square rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl md:text-3xl transition-transform duration-75 cursor-pointer select-none outline-none ${styleClasses}`}
                  aria-label={`Letter ${letter}, row ${rIdx + 1}, column ${cIdx + 1}`}
                >
                  <span className="leading-none">{letter}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
