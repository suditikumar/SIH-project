import { GridCell, GridCoordinate } from './types';
import { SupportedLanguage } from '../i18n/types';

// Gentle authentic character pools for distractors per language/script
const DISTRACTOR_POOLS: Record<SupportedLanguage, string[]> = {
  en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W'],
  as: ['ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ত', 'থ', 'দ', 'ন', 'প', 'ফ', 'ব', 'ম', 'য', 'ৰ', 'ল', 'হ', 'মা', 'বা', 'না'],
  bn: ['ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ত', 'থ', 'দ', 'ন', 'প', 'ফ', 'ব', 'ম', 'য', 'র', 'ল', 'হ', 'মা', 'বা', 'না'],
  mni: ['ক', 'খ', 'গ', 'চ', 'জ', 'ত', 'থ', 'দ', 'ন', 'প', 'ফ', 'ব', 'ম', 'য', 'র', 'ল', 'হ', 'চা', 'মা'],
  kha: ['A', 'B', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'],
  lus: ['A', 'AW', 'B', 'CH', 'D', 'E', 'F', 'G', 'NG', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'Z'],
  brx: ['क', 'ख', 'ग', 'घ', 'ङ', 'ज', 'झ', 'थ', 'द', 'ध', 'न', 'फ', 'ब', 'म', 'र', 'ल', 'ह', 'सा', 'हा'],
  ne: ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'र', 'ल', 'स', 'ह'],
  grt: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W'],
};

const DIRECTIONS: [number, number][] = [
  [-1, 0],  // up
  [1, 0],   // down
  [0, -1],  // left
  [0, 1],   // right
  [-1, -1], // up-left
  [-1, 1],  // up-right
  [1, -1],  // down-left
  [1, 1],   // down-right
];

export function isAdjacent(c1: GridCoordinate, c2: GridCoordinate): boolean {
  const rowDiff = Math.abs(c1.row - c2.row);
  const colDiff = Math.abs(c1.col - c2.col);
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

export function generateWordGrid(
  letters: string[],
  language: SupportedLanguage,
  size: 5 | 6 = 5
): { grid: GridCell[][]; path: GridCoordinate[] } {
  const pool = DISTRACTOR_POOLS[language] || DISTRACTOR_POOLS.en;
  
  // Try up to 50 times to generate a guaranteed connected path
  let path: GridCoordinate[] = [];
  let attempts = 0;

  while (path.length < letters.length && attempts < 100) {
    attempts++;
    path = tryGenerateConnectedPath(letters.length, size);
  }

  // Fallback: simple linear placement if random walk failed
  if (path.length < letters.length) {
    path = [];
    const startRow = Math.floor((size - 1) / 2);
    const startCol = Math.max(0, Math.floor((size - letters.length) / 2));
    for (let i = 0; i < letters.length; i++) {
      path.push({
        row: startRow,
        col: Math.min(size - 1, startCol + i),
      });
    }
  }

  // Initialize empty grid
  const grid: GridCell[][] = [];
  for (let r = 0; r < size; r++) {
    const row: GridCell[] = [];
    for (let c = 0; c < size; c++) {
      // Find if this cell is part of target path
      const pathIndex = path.findIndex(p => p.row === r && p.col === c);
      if (pathIndex !== -1) {
        row.push({
          id: `cell-${r}-${c}`,
          row: r,
          col: c,
          letter: letters[pathIndex],
          isTarget: true,
          orderIndex: pathIndex,
          isSelected: false,
          isHinted: false,
        });
      } else {
        // Pick random distractor from pool
        const randomChar = pool[Math.floor(Math.random() * pool.length)];
        row.push({
          id: `cell-${r}-${c}`,
          row: r,
          col: c,
          letter: randomChar,
          isTarget: false,
          isSelected: false,
          isHinted: false,
        });
      }
    }
    grid.push(row);
  }

  return { grid, path };
}

function tryGenerateConnectedPath(length: number, size: number): GridCoordinate[] {
  // Pick random start with margin
  const startRow = Math.floor(Math.random() * size);
  const startCol = Math.floor(Math.random() * size);
  const path: GridCoordinate[] = [{ row: startRow, col: startCol }];

  for (let step = 1; step < length; step++) {
    const current = path[path.length - 1];
    // Shuffle directions
    const shuffledDirs = [...DIRECTIONS].sort(() => Math.random() - 0.5);
    
    let foundNext = false;
    for (const [dr, dc] of shuffledDirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      // Check bounds
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        // Check not already in path
        const alreadyUsed = path.some(p => p.row === nr && p.col === nc);
        if (!alreadyUsed) {
          path.push({ row: nr, col: nc });
          foundNext = true;
          break;
        }
      }
    }

    if (!foundNext) {
      // Dead end, abort this attempt
      return [];
    }
  }

  return path;
}
