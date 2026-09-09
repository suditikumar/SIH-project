'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Plus, Filter, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { CaregiverMemory } from '@/lib/memory/types';
import {
  getCaregiverMemories,
  saveCaregiverMemory,
  deleteCaregiverMemory,
} from '@/lib/memory/memoryStore';
import { MemoryCard } from '@/components/memories/MemoryCard';
import { AddMemoryModal } from '@/components/memories/AddMemoryModal';
import { Badge } from '@/components/ui/Badge';

export default function MemoriesPage() {
  const { t } = useLanguage();
  const [memories, setMemories] = useState<CaregiverMemory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMemories(getCaregiverMemories());
  }, []);

  const handleSaveMemory = (
    newMemory: Omit<CaregiverMemory, 'id' | 'createdAt'>
  ) => {
    const saved = saveCaregiverMemory(newMemory);
    setMemories((prev) => [saved, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    deleteCaregiverMemory(id);
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const categories = [
    'All',
    'Family',
    'Childhood',
    'Hometown',
    'Festivals',
    'Nature',
  ];

  const filteredMemories =
    selectedCategory === 'All'
      ? memories
      : memories.filter((m) => m.relationshipOrCategory === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header & Caregiver Call to Action */}
      <div className="bg-gradient-to-br from-[#FAF8F5] to-white border-2 border-[#E5D7C9] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warm">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Caregiver &amp; Family Portal</span>
              </Badge>
              <span className="text-sm text-[#7D6B5F] font-semibold hidden sm:inline">
                Backend-Ready Local Architecture
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#18281E]">
              {t.memories.title}
            </h1>
            <p className="text-xl sm:text-2xl text-[#55463C] mt-2 max-w-2xl font-medium leading-relaxed">
              {t.memories.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#C86938] hover:bg-[#B35829] active:translate-y-0.5 text-white font-extrabold text-lg sm:text-xl border-2 border-[#9E4A1E] shadow-md shadow-[#C86938]/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-6 h-6" />
            <span>{t.memories.addMemoryButton}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-sm font-bold text-[#5F7C68] shrink-0 pl-1 mr-1 flex items-center gap-1">
          <Filter className="w-4 h-4" /> Category:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-base transition-all cursor-pointer shrink-0 border-2 ${
                isSelected
                  ? 'bg-[#2C5E3B] text-white border-[#173822] shadow-sm'
                  : 'bg-white text-[#496352] border-[#D5E0D7] hover:border-[#2C5E3B]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Memory Cards Grid */}
      {filteredMemories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onDelete={handleDeleteMemory}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border-2 border-dashed border-[#D5E0D7] rounded-3xl p-8">
          <Heart className="w-16 h-16 text-[#C86938] mx-auto opacity-40 mb-3" />
          <h3 className="text-2xl font-bold text-[#18281E]">
            {t.memories.emptyNote}
          </h3>
          <p className="text-lg text-[#496352] mt-2 max-w-md mx-auto">
            Click the button below to add your first family photograph and voice note.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3.5 rounded-2xl bg-[#C86938] text-white font-bold text-lg hover:bg-[#B35829] cursor-pointer"
          >
            {t.memories.addMemoryButton}
          </button>
        </div>
      )}

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMemory}
      />
    </div>
  );
}
