'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Heart, Compass, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      href: '/',
      label: t.nav.home,
      icon: Home,
      isActive: pathname === '/',
    },
    {
      href: '/games/word-puzzle',
      label: t.nav.games,
      icon: Sparkles,
      isActive: pathname.startsWith('/games'),
    },
    {
      href: '/memories',
      label: t.nav.memories,
      icon: Heart,
      isActive: pathname === '/memories',
    },
    {
      href: '/journey',
      label: t.nav.journey,
      icon: Compass,
      isActive: pathname === '/journey',
    },
    {
      href: '/settings',
      label: t.nav.settings,
      icon: Settings,
      isActive: pathname === '/settings',
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#D5E0D7] px-2 sm:px-6 py-2 shadow-lg shadow-black/5"
      aria-label="Main Navigation"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-around gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[60px] sm:min-h-[66px] px-2 sm:px-4 py-1.5 rounded-2xl transition-all select-none border-2 ${
                item.isActive
                  ? 'bg-[#E3EEE5] text-[#1E4329] border-[#2C5E3B] font-bold shadow-sm'
                  : 'text-[#496352] border-transparent hover:bg-[#F2F6F3] font-medium'
              }`}
              aria-current={item.isActive ? 'page' : undefined}
            >
              <Icon
                className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${
                  item.isActive ? 'text-[#2C5E3B] stroke-[2.4]' : 'text-[#5F7C68]'
                }`}
              />
              <span className="text-xs sm:text-sm mt-1 text-center leading-tight truncate max-w-[80px] sm:max-w-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
