import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
}

export function Logo({ className, size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl', 
    xl: 'text-4xl'
  };

  if (variant === 'icon') {
    return (
      <div className={cn(
        'flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold',
        sizeClasses[size],
        className
      )}>
        <span className="text-white font-bold">SE</span>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span className={cn(
        'font-bold text-blue-900 dark:text-blue-100',
        textSizeClasses[size],
        className
      )}>
        SE Repairs
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-lg',
        sizeClasses[size]
      )}>
        <span className="text-white font-bold">SE</span>
      </div>
      <span className={cn(
        'font-bold text-blue-900 dark:text-blue-100',
        textSizeClasses[size]
      )}>
        Repairs
      </span>
    </div>
  );
}
