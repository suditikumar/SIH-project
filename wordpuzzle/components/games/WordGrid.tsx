'use client';

import React from 'react';
import { GridCell, GridCoordinate } from '@/lib/game/types';

interface WordGridProps {
  grid: GridCell[][];
  selectedPath: GridCoordinate[];
  hintedCoord: GridCoordinate | null;
  onCellClick: (row: number, col: number) => void;
  targetLetters: string[];
}

export const WordGrid: React.FC<WordGridProps> = ({
  grid,
  selectedPath,
  hintedCoord,
  onCellClick,
  targetLetters,
}) => {
  const isSelected = (r: number, c: number): number => {
    return selectedPath.findIndex((p) => p.row === r && p.col === c);
  };

  const isHinted = (r: number, c: number): boolean => {
    return hintedCoord !== null && hintedCoord.row === r && hintedCoord.col === c;
  };

  return (
    <div
      className="flex flex-col items-center justify-center my-4"
      role="region"
      aria-label="Word puzzle letter grid"
    >
      <div className="bg-[#EBF2EC]/80 border-3 border-[#C6D8CB] p-3 sm:p-5 rounded-3xl shadow-inner max-w-full overflow-x-auto">
        <div
          className="grid gap-2 sm:gap-3.5 select-none"
          style={{
            gridTemplateColumns: `repeat(${grid[0]?.length || 5}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const stepIdx = isSelected(rIdx, cIdx);
              const selected = stepIdx !== -1;
              const hinted = isHinted(rIdx, cIdx);

              return (
                <button
                  key={cell.id}
                  onClick={() => onCellClick(rIdx, cIdx)}
                  className={`relative flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl sm:rounded-3xl font-extrabold text-2xl sm:text-3xl md:text-4xl transition-all cursor-pointer border-3 focus-visible:ring-4 ${
                    selected
                      ? 'bg-[#2C5E3B] text-white border-[#173822] scale-105 shadow-md shadow-[#2C5E3B]/30'
                      : hinted
                      ? 'bg-[#FEF6E4] text-[#8C6207] border-[#D99518] ring-4 ring-[#D99518]/30 animate-pulse'
                      : 'bg-white text-[#18281E] border-[#D0DDD4] hover:bg-[#F4F8F5] hover:border-[#2C5E3B]'
                  }`}
                  aria-label={`Letter ${cell.letter}, row ${rIdx + 1}, column ${cIdx + 1}${
                    selected ? `, step ${stepIdx + 1}` : ''
                  }${hinted ? ', recommended hint' : ''}`}
                >
                  {/* Letter in script */}
                  <span>{cell.letter}</span>

                  {/* Step Number Badge */}
                  {selected && (
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E4A834] text-[#1C2A22] text-xs sm:text-sm font-bold flex items-center justify-center shadow-sm">
                      {stepIdx + 1}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
