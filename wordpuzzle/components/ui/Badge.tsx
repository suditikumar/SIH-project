'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'warm' | 'gold' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  className = '',
}) => {
  const styles = {
    green: 'bg-[#E3EEE5] text-[#1E4329] border border-[#C1D7C6]',
    warm: 'bg-[#FCEFE8] text-[#9E4A1E] border border-[#E9C5B2]',
    gold: 'bg-[#FEF6E4] text-[#8C6207] border border-[#EED79D]',
    neutral: 'bg-[#EBF0EC] text-[#344D3D] border border-[#CFDCD1]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-base font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
