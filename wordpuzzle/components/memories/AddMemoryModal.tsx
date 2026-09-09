'use client';

import React, { useState } from 'react';
import { X, Image as ImageIcon, Heart } from 'lucide-react';
import { CaregiverMemory } from '@/lib/memory/types';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memory: Omit<CaregiverMemory, 'id' | 'createdAt'>) => void;
}

const PRESET_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    title: 'Smiling Elder Grandmother',
  },
  {
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    title: 'Family Gathering & Laughter',
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: 'Serene River & Sunset',
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    title: 'Misty Pine Forest',
  },
];

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CaregiverMemory['relationshipOrCategory']>('Family');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTOS[0].url);
  const [customUrl, setCustomUrl] = useState('');
  const [voiceAuthor, setVoiceAuthor] = useState('');
  const [audioNoteText, setAudioNoteText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    onSave({
      name: name.trim(),
      relationshipOrCategory: category,
      description: description.trim(),
      imageUrl: customUrl.trim() || imageUrl,
      imageAlt: name.trim(),
      language: 'English / Regional',
      voiceAuthor: voiceAuthor.trim() || undefined,
      audioNoteText: audioNoteText.trim() || undefined,
      isSample: false,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Add Cherished Memory"
    >
      <div className="bg-white border-3 border-[#2C5E3B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2EAE4] mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#FCEFE8] text-[#9E4A1E] flex items-center justify-center text-xl">
              <Heart className="w-5 h-5 fill-current" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-[#18281E]">
                Add a Family Memory
              </h2>
              <p className="text-sm sm:text-base text-[#496352]">
                Caregiver portal to personalize your elder&apos;s memories.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-black/5 text-[#496352] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-base font-bold text-[#18281E] mb-1.5">
              Memory Title or Person&apos;s Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aita sitting in courtyard, Grandpa’s fishing rod"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#D5E0D7] focus:border-[#2C5E3B] text-lg outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-base font-bold text-[#18281E] mb-1.5">
              Category / Relationship *
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as CaregiverMemory['relationshipOrCategory'])
              }
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#D5E0D7] focus:border-[#2C5E3B] text-lg outline-none bg-white"
            >
              <option value="Family">Family & Loved Ones</option>
              <option value="Childhood">Childhood & Ancestral Home</option>
              <option value="Hometown">Hometown & Rivers</option>
              <option value="Festivals">Bihu & Cultural Festivals</option>
              <option value="Nature">Nature & Hills</option>
              <option value="Tradition">Handlooms & Craft</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-bold text-[#18281E] mb-1.5">
              Heartwarming Memory Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the comforting memory or story in gentle, familiar words..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#D5E0D7] focus:border-[#2C5E3B] text-lg outline-none resize-none"
            />
          </div>

          {/* Photo Selection */}
          <div>
            <label className="block text-base font-bold text-[#18281E] mb-1.5">
              Choose a Photo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {PRESET_PHOTOS.map((photo, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImageUrl(photo.url);
                    setCustomUrl('');
                  }}
                  className={`relative h-20 rounded-xl overflow-hidden border-3 transition-all cursor-pointer ${
                    imageUrl === photo.url && !customUrl
                      ? 'border-[#2C5E3B] ring-2 ring-[#2C5E3B]/30'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#5F7C68] shrink-0" />
              <input
                type="url"
                placeholder="Or paste an image URL (e.g. from Google Drive/Cloud)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E0D7] text-base outline-none"
              />
            </div>
          </div>

          {/* Voice Prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-base font-bold text-[#18281E] mb-1">
                Voice Note Author (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Granddaughter Priya"
                value={voiceAuthor}
                onChange={(e) => setVoiceAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E0D7] text-base outline-none"
              />
            </div>
            <div>
              <label className="block text-base font-bold text-[#18281E] mb-1">
                Audio Message / Reading Text
              </label>
              <input
                type="text"
                placeholder="Spoken words when voice button is pressed"
                value={audioNoteText}
                onChange={(e) => setAudioNoteText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E0D7] text-base outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#E2EAE4] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[#D5E0D7] text-[#496352] font-semibold hover:bg-[#F2F6F3] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-[#2C5E3B] hover:bg-[#234C2F] text-white font-bold text-lg cursor-pointer shadow-md shadow-[#2C5E3B]/20"
            >
              Save Memory Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
