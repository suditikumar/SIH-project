'use client';

import React from 'react';
import { soundEffects } from '@/lib/voice/soundEffects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'warm' | 'outline' | 'ghost';
  size?: 'normal' | 'large' | 'xlarge';
  icon?: React.ReactNode;
  enableSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'large',
  icon,
  className = '',
  onClick,
  enableSound = true,
  disabled,
  ...props
}) => {
  const { soundEnabled } = useLanguage();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (enableSound && soundEnabled) {
      soundEffects.playLetterTap(1);
    }
    onClick?.(e);
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all select-none border-2 focus-visible:ring-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    normal: 'px-5 py-3 text-lg min-h-[52px] gap-2.5',
    large: 'px-6 py-4 text-xl min-h-[62px] gap-3',
    xlarge: 'px-8 py-5 text-2xl min-h-[72px] gap-4',
  };

  const variantStyles = {
    primary: 'bg-[#2C5E3B] text-white border-[#1E4329] hover:bg-[#234C2F] active:translate-y-0.5 shadow-md shadow-[#2C5E3B]/20',
    secondary: 'bg-[#EBF2EC] text-[#1E4329] border-[#C3D8C8] hover:bg-[#DCE9DF] active:translate-y-0.5',
    warm: 'bg-[#C86938] text-white border-[#9E4A1E] hover:bg-[#B35829] active:translate-y-0.5 shadow-md shadow-[#C86938]/20',
    outline: 'bg-transparent text-[#18281E] border-[#2C5E3B] hover:bg-[#2C5E3B]/10 active:translate-y-0.5',
    ghost: 'bg-transparent text-[#18281E] border-transparent hover:bg-black/5 active:translate-y-0.5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
