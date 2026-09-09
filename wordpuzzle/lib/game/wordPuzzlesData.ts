export interface WordPuzzleLevel {
  id: string;
  puzzleNumber: number;
  title: string;
  theme: string;
  description: string;
  gridSize: number; // e.g. 10 for 10x10
  words: string[];
}

export const PUZZLE_LEVELS: WordPuzzleLevel[] = [
  {
    id: 'puzzle-01',
    puzzleNumber: 1,
    title: 'Nature & Landscapes',
    theme: 'Earth & Waters',
    description: 'Find calming words from rivers, forests, and the open sky.',
    gridSize: 10,
    words: [
      'RIVER',
      'MOUNTAIN',
      'FOREST',
      'OCEAN',
      'CLOUD',
      'SUN',
      'VALLEY',
      'RAIN',
    ],
  },
  {
    id: 'puzzle-02',
    puzzleNumber: 2,
    title: 'Fresh Fruits & Garden',
    theme: 'Orchard Harvest',
    description: 'Search for sweet fruits and nourishing garden produce.',
    gridSize: 10,
    words: [
      'APPLE',
      'MANGO',
      'ORANGE',
      'PAPAYA',
      'BANANA',
      'BERRY',
      'MELON',
      'GUAVA',
    ],
  },
  {
    id: 'puzzle-03',
    puzzleNumber: 3,
    title: 'Wonderful Wildlife',
    theme: 'Creatures of the Earth',
    description: 'Spot graceful birds and gentle animals hidden in the grid.',
    gridSize: 10,
    words: [
      'ELEPHANT',
      'HORNBILL',
      'TIGER',
      'DOLPHIN',
      'EAGLE',
      'DEER',
      'OTTER',
      'FALCON',
    ],
  },
  {
    id: 'puzzle-04',
    puzzleNumber: 4,
    title: 'Warm Hearth & Home',
    theme: 'Comfort & Hearth',
    description: 'Find familiar, comforting objects from cozy home life.',
    gridSize: 10,
    words: [
      'GARDEN',
      'HEARTH',
      'TEAPOT',
      'KITCHEN',
      'VERANDA',
      'BLANKET',
      'LANTERN',
      'WINDOW',
    ],
  },
  {
    id: 'puzzle-05',
    puzzleNumber: 5,
    title: 'Natural Wonders',
    theme: 'Wonders of the World',
    description: 'Discover breathtaking formations across mountain and sea.',
    gridSize: 10,
    words: [
      'AURORA',
      'CANYON',
      'GLACIER',
      'VOLCANO',
      'REEF',
      'DESERT',
      'ISLAND',
      'MEADOW',
    ],
  },
  {
    id: 'puzzle-06',
    puzzleNumber: 6,
    title: 'Peaceful Seasons',
    theme: 'Cycles of Time',
    description: 'Cherish the passing rhythms of autumn, spring, and winter mist.',
    gridSize: 10,
    words: [
      'SPRING',
      'SUMMER',
      'AUTUMN',
      'WINTER',
      'BREEZE',
      'SUNSHINE',
      'BLOSSOM',
      'HARVEST',
    ],
  },
];
