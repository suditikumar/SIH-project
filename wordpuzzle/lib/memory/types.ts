export interface CaregiverMemory {
  id: string;
  name: string;
  relationshipOrCategory: 'Family' | 'Childhood' | 'Hometown' | 'Festivals' | 'Tradition' | 'Nature';
  description: string;
  imageUrl: string;
  imageAlt: string;
  language: string;
  voiceAuthor?: string;
  audioNoteText?: string;
  isSample?: boolean;
  createdAt: string;
}
