import { SupportedLanguage } from '../i18n/types';

export interface GameResult {
  gameId: string;
  completed: boolean;
  score?: number;
  hintsUsed: number;
  language: SupportedLanguage;
  duration: number; // in seconds
  completedAt: string;
  wordFound?: string;
  category?: string;
}

export interface GridCoordinate {
  row: number;
  col: number;
}

export interface GridCell {
  id: string;
  row: number;
  col: number;
  letter: string;
  isTarget: boolean;
  orderIndex?: number; // 0, 1, 2... order in target word
  isSelected: boolean;
  isHinted: boolean;
  stepNumber?: number; // Visual 1, 2, 3 badge when tapped
}

export interface WordGridConfig {
  size: 5 | 6;
  allowDiagonal: boolean;
}

export interface GameModuleInfo {
  id: string;
  nameKey: string;
  descKey: string;
  path: string;
  icon: string;
  badge: string;
  isReady: boolean;
}
