'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'warm' | 'highlight';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white text-[#18281E] border-2 border-[#D5E0D7] shadow-sm',
    subtle: 'bg-[#F1F6F2] text-[#18281E] border-2 border-[#D2DFD5]',
    warm: 'bg-[#FDF6F2] text-[#18281E] border-2 border-[#ECCFC0]',
    highlight: 'bg-[#FAFDFB] text-[#18281E] border-3 border-[#2C5E3B] shadow-md shadow-[#2C5E3B]/10',
  };

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 transition-all ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
