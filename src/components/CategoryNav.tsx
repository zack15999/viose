'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCategories } from '@/lib/mockData';
import { cn } from '@/utils';

interface CategoryNavProps {
  activeCategory?: string;
  className?: string;
}

export function CategoryNav({ activeCategory, className }: CategoryNavProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 200;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
      
      // Update scroll button states
      setTimeout(() => {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }, 100);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-primary-bg/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary-secondary/80 transition-colors"
          aria-label="向左滚动"
        >
          <ChevronLeft className="h-4 w-4 text-text-primary" />
        </button>
      )}

      {/* Category List */}
      <div
        id="category-scroll"
        className="flex items-center space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollBehavior: 'smooth' }}
        onScroll={(e) => {
          const container = e.currentTarget;
          setCanScrollLeft(container.scrollLeft > 0);
          setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth
          );
        }}
      >
        {/* All Categories */}
        <Link
          href="/"
          className={cn(
            'flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap',
            !activeCategory
              ? 'bg-accent-primary text-white shadow-lg'
              : 'bg-primary-card hover:bg-primary-secondary text-text-secondary hover:text-text-primary'
          )}
        >
          <span>🏠</span>
          <span>全部</span>
        </Link>

        {/* Category Items */}
        {mockCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap',
              activeCategory === category.id
                ? 'bg-accent-primary text-white shadow-lg'
                : 'bg-primary-card hover:bg-primary-secondary text-text-secondary hover:text-text-primary'
            )}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <span className="text-xs opacity-60">({category.videoCount})</span>
          </Link>
        ))}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-primary-bg/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary-secondary/80 transition-colors"
          aria-label="向右滚动"
        >
          <ChevronRight className="h-4 w-4 text-text-primary" />
        </button>
      )}

      {/* Gradient Overlays */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary-bg to-transparent pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary-bg to-transparent pointer-events-none" />
      )}
    </div>
  );
}

// Quick category chips for mobile
export function CategoryChips({ activeCategory, className }: CategoryNavProps) {
  return (
    <div className={cn('flex flex-wrap gap-2 p-4', className)}>
      <Link
        href="/"
        className={cn(
          'px-3 py-1 rounded-full text-sm transition-all',
          !activeCategory
            ? 'bg-accent-primary text-white'
            : 'bg-primary-card text-text-secondary hover:text-text-primary'
        )}
      >
        全部
      </Link>
      {mockCategories.slice(0, 6).map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className={cn(
            'flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-all',
            activeCategory === category.id
              ? 'bg-accent-primary text-white'
              : 'bg-primary-card text-text-secondary hover:text-text-primary'
          )}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
}