'use client';

import React from 'react';
import { Home, Star, Compass } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export type ActiveScreen = 'home' | 'play-5x5' | 'word-search';

interface ScreenBottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
}

export const ScreenBottomNav: React.FC<ScreenBottomNavProps> = ({
  activeScreen,
  onNavigate,
}) => {
  const { wp } = useLanguage();

  const items: Array<{ id: ActiveScreen; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: wp.navHome, icon: Home },
    { id: 'play-5x5', label: wp.navPlay5x5, icon: Star },
    { id: 'word-search', label: wp.navWordSearch, icon: Compass },
  ];

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border-2 border-[#D8C7B5] rounded-3xl p-1.5 shadow-xl shadow-black/10 select-none"
      aria-label="Bottom Navigation"
    >
      <div className="flex items-center justify-around gap-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#367C4A] text-white font-extrabold shadow-sm'
                  : 'text-[#496352] hover:bg-[#F4F8F5] font-bold'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs sm:text-sm mt-1 leading-tight tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
