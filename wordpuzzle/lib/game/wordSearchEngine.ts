import { SupportedLanguage } from '../i18n/types';

export interface Coord {
  row: number;
  col: number;
}

export interface PlacedWord {
  word: string;
  cells: Coord[];
  colorIndex: number;
}

export interface GeneratedPuzzle {
  size: number;
  grid: string[][];
  placedWords: PlacedWord[];
}

/**
 * Strictly straight / forward reading directions (no reverse or backwards words):
 * 1. Horizontal Left-to-Right: [0, 1]
 * 2. Vertical Top-to-Bottom: [1, 0]
 * 3. Diagonal Down-Right: [1, 1]
 */
const STRAIGHT_DIRECTIONS: [number, number, string][] = [
  [0, 1, 'H-Right'],     // Horizontal Left-to-Right (→)
  [1, 0, 'V-Down'],      // Vertical Top-to-Bottom (↓)
  [1, 1, 'D-DownRight'], // Diagonal Down-Right (↘)
];

export const LANGUAGE_ALPHABETS: Record<SupportedLanguage, string[]> = {
  en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  as: ['অ', 'আ', 'ই', 'উ', 'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'ৰ', 'ল', 'ৱ', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়'],
  bn: ['অ', 'আ', 'ই', 'উ', 'ক', 'খ', 'গ', 'ঘ', 'চ', 'ছ', 'জ', 'ঝ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়'],
  mni: ['অ', 'আ', 'ই', 'ক', 'খ', 'গ', 'ঘ', 'চ', 'জ', 'ঝ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'ৰ', 'ল', 'শ', 'হ', 'ঙ', 'চা', 'ঙা', 'পা'],
  kha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lus: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  brx: ['अ', 'आ', 'इ', 'उ', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  ne: ['अ', 'आ', 'इ', 'उ', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  grt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

// Original nature-inspired palette for highlighting found words
export const WORD_HIGHLIGHT_COLORS = [
  {
    bg: 'bg-[#D7EAD9] dark:bg-[#1E3B27]',
    border: 'border-[#2C5E3B]',
    text: 'text-[#1E4329] dark:text-[#E0F2E4]',
    tag: '#2C5E3B',
  },
  {
    bg: 'bg-[#FCEFE8] dark:bg-[#3D251A]',
    border: 'border-[#C86938]',
    text: 'text-[#9E4A1E] dark:text-[#FDDED1]',
    tag: '#C86938',
  },
  {
    bg: 'bg-[#FEF6E4] dark:bg-[#3D3316]',
    border: 'border-[#D99518]',
    text: 'text-[#8C6207] dark:text-[#FDECC0]',
    tag: '#D99518',
  },
  {
    bg: 'bg-[#E3EEE5] dark:bg-[#1C3324]',
    border: 'border-[#418255]',
    text: 'text-[#1B3F27] dark:text-[#D5EADB]',
    tag: '#418255',
  },
  {
    bg: 'bg-[#EBF0EC] dark:bg-[#223528]',
    border: 'border-[#5A7C64]',
    text: 'text-[#284230] dark:text-[#DCEAE0]',
    tag: '#5A7C64',
  },
  {
    bg: 'bg-[#FDEEEB] dark:bg-[#3E211D]',
    border: 'border-[#B85742]',
    text: 'text-[#8C3420] dark:text-[#FCDDD7]',
    tag: '#B85742',
  },
  {
    bg: 'bg-[#E6F3F3] dark:bg-[#183636]',
    border: 'border-[#2A7575]',
    text: 'text-[#154E4E] dark:text-[#D0EEEE]',
    tag: '#2A7575',
  },
  {
    bg: 'bg-[#F4F8F5] dark:bg-[#1B2F23]',
    border: 'border-[#38764E]',
    text: 'text-[#1F4C2E] dark:text-[#DAEDE0]',
    tag: '#38764E',
  },
];

/**
 * Splits any word into natural grapheme units (supports English, Assamese, Bengali, Devanagari, Meitei, etc.)
 */
export function getWordGraphemes(word: string, language: SupportedLanguage = 'en'): string[] {
  const clean = word.trim();
  if (!clean) return [];
  try {
    const segmenter = new Intl.Segmenter(language, { granularity: 'grapheme' });
    const segments = [...segmenter.segment(clean)].map((s) => s.segment);
    // If English or Latin script, convert to uppercase
    if (/[a-zA-Z]/.test(clean)) {
      return segments.map((s) => s.toUpperCase());
    }
    return segments;
  } catch {
    return Array.from(clean);
  }
}

export function generateWordSearch(
  words: string[],
  size: number = 10,
  language: SupportedLanguage = 'en'
): GeneratedPuzzle {
  // Initialize grid with empty spaces
  const grid: string[][] = Array.from({ length: size }, () =>
    Array(size).fill('')
  );

  const placedWords: PlacedWord[] = [];
  
  // De-duplicate words and parse graphemes
  const uniqueWords = Array.from(new Set(words));
  const parsedWords = uniqueWords
    .map((w) => ({
      rawWord: w,
      graphemes: getWordGraphemes(w, language),
    }))
    .filter((item) => item.graphemes.length >= 1 && item.graphemes.length <= size)
    .sort((a, b) => b.graphemes.length - a.graphemes.length);

  parsedWords.forEach((item, wordIndex) => {
    let placed = false;
    let attempts = 0;
    const len = item.graphemes.length;

    while (!placed && attempts < 400) {
      attempts++;
      // Pick random straight direction (Horizontal L->R, Vertical T->B, Diagonal Down-Right)
      const [dRow, dCol] =
        STRAIGHT_DIRECTIONS[Math.floor(Math.random() * STRAIGHT_DIRECTIONS.length)];

      const maxRow = size - (len - 1) * dRow - 1;
      const maxCol = size - (len - 1) * dCol - 1;

      if (maxRow < 0 || maxCol < 0) continue;

      const startRow = Math.floor(Math.random() * (maxRow + 1));
      const startCol = Math.floor(Math.random() * (maxCol + 1));

      // Verify placement without conflict
      let canPlace = true;
      const proposedCells: Coord[] = [];

      for (let i = 0; i < len; i++) {
        const r = startRow + i * dRow;
        const c = startCol + i * dCol;

        if (r < 0 || r >= size || c < 0 || c >= size) {
          canPlace = false;
          break;
        }

        const existing = grid[r][c];
        if (existing !== '' && existing !== item.graphemes[i]) {
          canPlace = false;
          break;
        }

        proposedCells.push({ row: r, col: c });
      }

      if (canPlace && proposedCells.length === len) {
        proposedCells.forEach((cell, idx) => {
          grid[cell.row][cell.col] = item.graphemes[idx];
        });

        placedWords.push({
          word: item.rawWord,
          cells: proposedCells,
          colorIndex: wordIndex % WORD_HIGHLIGHT_COLORS.length,
        });

        placed = true;
      }
    }

    // Deterministic fallback for straight directions if random placement was crowded
    if (!placed) {
      outerLoop: for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          for (const [dRow, dCol] of STRAIGHT_DIRECTIONS) {
            const maxRow = size - (len - 1) * dRow - 1;
            const maxCol = size - (len - 1) * dCol - 1;

            if (r > maxRow || c > maxCol) continue;

            let canPlace = true;
            const proposedCells: Coord[] = [];

            for (let i = 0; i < len; i++) {
              const nr = r + i * dRow;
              const nc = c + i * dCol;

              if (nr < 0 || nr >= size || nc < 0 || nc >= size) {
                canPlace = false;
                break;
              }

              const existing = grid[nr][nc];
              if (existing !== '' && existing !== item.graphemes[i]) {
                canPlace = false;
                break;
              }

              proposedCells.push({ row: nr, col: nc });
            }

            if (canPlace && proposedCells.length === len) {
              proposedCells.forEach((cell, idx) => {
                grid[cell.row][cell.col] = item.graphemes[idx];
              });

              placedWords.push({
                word: item.rawWord,
                cells: proposedCells,
                colorIndex: wordIndex % WORD_HIGHLIGHT_COLORS.length,
              });

              placed = true;
              break outerLoop;
            }
          }
        }
      }
    }
  });

  // Character pool for filling remaining empty cells in the chosen script
  const alphabetPool = LANGUAGE_ALPHABETS[language] || LANGUAGE_ALPHABETS.en;
  
  // Also include placed graphemes so filler letters match the puzzle font and script
  const wordGraphemePool = parsedWords.flatMap((p) => p.graphemes);
  const combinedPool = wordGraphemePool.length > 0 
    ? [...alphabetPool, ...wordGraphemePool]
    : alphabetPool;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = combinedPool[Math.floor(Math.random() * combinedPool.length)];
      }
    }
  }

  return {
    size,
    grid,
    placedWords,
  };
}

/**
 * Given drag start and current coordinate, calculates straight forward line coords:
 * - Horizontal Right (→)
 * - Vertical Down (↓)
 * - Diagonal Down-Right (↘)
 * No backwards/reverse vectors.
 */
export function getLineCoords(start: Coord, current: Coord, size: number): Coord[] {
  const dRow = current.row - start.row;
  const dCol = current.col - start.col;

  // Single tile
  if (dRow === 0 && dCol === 0) {
    return [start];
  }

  // Only allow forward directions (dRow >= 0 and dCol >= 0)
  // If user drags backwards or upwards, snap gracefully to single start tile
  if (dRow < 0 && dCol < 0) {
    return [start];
  }

  const absRow = Math.max(0, dRow);
  const absCol = Math.max(0, dCol);

  let stepRow = 0;
  let stepCol = 0;
  let length = 0;

  if (absRow === 0 && absCol > 0) {
    // Straight Horizontal (→)
    stepRow = 0;
    stepCol = 1;
    length = absCol;
  } else if (absCol === 0 && absRow > 0) {
    // Straight Vertical (↓)
    stepRow = 1;
    stepCol = 0;
    length = absRow;
  } else if (absRow === absCol) {
    // Straight Diagonal (↘)
    stepRow = 1;
    stepCol = 1;
    length = absRow;
  } else {
    // Approximate snap to closest straight direction
    if (absRow > absCol * 2) {
      stepRow = 1;
      stepCol = 0;
      length = absRow;
    } else if (absCol > absRow * 2) {
      stepRow = 0;
      stepCol = 1;
      length = absCol;
    } else {
      stepRow = 1;
      stepCol = 1;
      length = Math.max(absRow, absCol);
    }
  }

  const coords: Coord[] = [];
  for (let i = 0; i <= length; i++) {
    const r = start.row + i * stepRow;
    const c = start.col + i * stepCol;

    if (r >= 0 && r < size && c >= 0 && c < size) {
      coords.push({ row: r, col: c });
    } else {
      break;
    }
  }

  return coords;
}
