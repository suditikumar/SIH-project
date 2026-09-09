import { CaregiverMemory } from './types';
import { SAMPLE_MEMORIES } from './sampleMemories';

const STORAGE_KEY = 'smriti_caregiver_memories';

export function getCaregiverMemories(): CaregiverMemory[] {
  if (typeof window === 'undefined') return SAMPLE_MEMORIES;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial sample memories
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MEMORIES));
      return SAMPLE_MEMORIES;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_MEMORIES;
  }
}

export function saveCaregiverMemory(
  item: Omit<CaregiverMemory, 'id' | 'createdAt'>
): CaregiverMemory {
  const newMemory: CaregiverMemory = {
    ...item,
    id: `mem-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const current = getCaregiverMemories();
    const updated = [newMemory, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save caregiver memory:', err);
  }

  return newMemory;
}

export function deleteCaregiverMemory(id: string): void {
  try {
    const current = getCaregiverMemories();
    const filtered = current.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {}
}
