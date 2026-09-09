import { GameResult } from './types';

const STORAGE_KEY = 'smriti_game_history';
const MEMORIES_EXPLORED_KEY = 'smriti_memories_explored_count';

export function saveGameResult(result: GameResult): void {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const history: GameResult[] = existingRaw ? JSON.parse(existingRaw) : [];
    history.unshift(result); // most recent first
    // keep up to 100 entries locally
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 100)));
  } catch (err) {
    console.warn('Unable to save game result locally:', err);
  }
}

export function getGameHistory(): GameResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordMemoryExplored(): void {
  try {
    const current = getMemoriesExploredCount();
    localStorage.setItem(MEMORIES_EXPLORED_KEY, String(current + 1));
  } catch {}
}

export function getMemoriesExploredCount(): number {
  try {
    const raw = localStorage.getItem(MEMORIES_EXPLORED_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export interface ProgressSummary {
  activitiesCompleted: number;
  memoriesExplored: number;
  momentsOfPeace: number;
  recentWords: Array<{ word: string; category?: string; completedAt: string }>;
}

export function getProgressSummary(): ProgressSummary {
  const history = getGameHistory();
  const completedGames = history.filter(h => h.completed);
  const exploredCount = getMemoriesExploredCount();

  const recentWords = completedGames
    .filter(g => g.wordFound)
    .slice(0, 8)
    .map(g => ({
      word: g.wordFound || '',
      category: g.category,
      completedAt: g.completedAt,
    }));

  return {
    activitiesCompleted: completedGames.length,
    memoriesExplored: exploredCount,
    momentsOfPeace: completedGames.length + exploredCount + 2, // gentle baseline affirmation
    recentWords,
  };
}
