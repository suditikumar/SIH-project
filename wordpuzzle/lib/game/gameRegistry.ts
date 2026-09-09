import { GameModuleInfo } from './types';

export const REGISTERED_GAMES: GameModuleInfo[] = [
  {
    id: 'word-puzzle',
    nameKey: 'wordPuzzleTitle',
    descKey: 'wordPuzzleDesc',
    path: '/games/word-puzzle',
    icon: '🔤',
    badge: 'Core Experience',
    isReady: true,
  },
  {
    id: 'memory-match',
    nameKey: 'memoryMatchTitle',
    descKey: 'memoryMatchDesc',
    path: '/games/memory-match',
    icon: '🎴',
    badge: 'Teammate Module Ready',
    isReady: false,
  },
  {
    id: 'pattern-flow',
    nameKey: 'patternFlowTitle',
    descKey: 'patternFlowDesc',
    path: '/games/pattern-flow',
    icon: '🌊',
    badge: 'Teammate Module Ready',
    isReady: false,
  },
];
