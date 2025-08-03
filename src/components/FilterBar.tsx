'use client';

import { useState } from 'react';
import { Filter, SortDesc, X } from 'lucide-react';
import { SearchFilters } from '@/types';
import { cn } from '@/utils';

interface FilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  className?: string;
}

export function FilterBar({ filters, onFiltersChange, className }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { value: '', label: '所有分类' },
    { value: 'entertainment', label: '娱乐' },
    { value: 'art', label: '艺术' },
    { value: 'cooking', label: '美食' },
    { value: 'nature', label: '自然' },
    { value: 'technology', label: '科技' },
    { value: 'music', label: '音乐' },
    { value: 'sports', label: '体育' },
    { value: 'education', label: '教育' },
  ];

  const durations = [
    { value: '', label: '任意时长' },
    { value: 'short', label: '短视频 (<10分钟)' },
    { value: 'medium', label: '中等 (10-20分钟)' },
    { value: 'long', label: '长视频 (>20分钟)' },
  ];

  const qualities = [
    { value: '', label: '任意质量' },
    { value: 'HD', label: '高清' },
    { value: '4K', label: '4K' },
    { value: 'SD', label: '标清' },
  ];

  const sortOptions = [
    { value: 'relevance', label: '相关性' },
    { value: 'newest', label: '最新上传' },
    { value: 'most-viewed', label: '最多观看' },
    { value: 'highest-rated', label: '最高评分' },
    { value: 'longest', label: '最长时间' },
  ];

  const uploadDates = [
    { value: '', label: '任意时间' },
    { value: 'today', label: '今天' },
    { value: 'week', label: '本周' },
    { value: 'month', label: '本月' },
    { value: 'year', label: '今年' },
  ];

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'relevance');

  return (
    <div className={cn('bg-primary-secondary/50 rounded-lg p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-text-secondary" />
          <h3 className="text-text-primary font-medium">筛选和排序</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-accent-primary text-white px-2 py-1 rounded-full">
              已筛选
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-text-muted hover:text-text-primary transition-colors text-sm"
            >
              <X className="h-4 w-4" />
              <span>清除</span>
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-muted hover:text-text-primary transition-colors text-sm lg:hidden"
          >
            {isExpanded ? '收起' : '展开'}
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className={cn(
        'grid gap-4',
        isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'hidden lg:grid lg:grid-cols-2 xl:grid-cols-5'
      )}>
        {/* Sort */}
        <div className="space-y-2">
          <label className="block text-text-secondary text-sm font-medium">
            排序方式
          </label>
          <select
            value={filters.sortBy || 'relevance'}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full bg-primary-card border border-primary-secondary/50 rounded-lg py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-text-secondary text-sm font-medium">
            分类
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full bg-primary-card border border-primary-secondary/50 rounded-lg py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-text-secondary text-sm font-medium">
            时长
          </label>
          <select
            value={filters.duration || ''}
            onChange={(e) => updateFilter('duration', e.target.value)}
            className="w-full bg-primary-card border border-primary-secondary/50 rounded-lg py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
          >
            {durations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quality */}
        <div className="space-y-2">
          <label className="block text-text-secondary text-sm font-medium">
            质量
          </label>
          <select
            value={filters.quality || ''}
            onChange={(e) => updateFilter('quality', e.target.value)}
            className="w-full bg-primary-card border border-primary-secondary/50 rounded-lg py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
          >
            {qualities.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Date */}
        <div className="space-y-2">
          <label className="block text-text-secondary text-sm font-medium">
            上传时间
          </label>
          <select
            value={filters.uploadDate || ''}
            onChange={(e) => updateFilter('uploadDate', e.target.value)}
            className="w-full bg-primary-card border border-primary-secondary/50 rounded-lg py-2 px-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
          >
            {uploadDates.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-primary-secondary/20">
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center space-x-1 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-sm">
                <span>分类: {categories.find(c => c.value === filters.category)?.label}</span>
                <button
                  onClick={() => updateFilter('category', '')}
                  className="hover:bg-accent-primary/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.duration && (
              <span className="inline-flex items-center space-x-1 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-sm">
                <span>时长: {durations.find(d => d.value === filters.duration)?.label}</span>
                <button
                  onClick={() => updateFilter('duration', '')}
                  className="hover:bg-accent-primary/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.quality && (
              <span className="inline-flex items-center space-x-1 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-sm">
                <span>质量: {qualities.find(q => q.value === filters.quality)?.label}</span>
                <button
                  onClick={() => updateFilter('quality', '')}
                  className="hover:bg-accent-primary/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.uploadDate && (
              <span className="inline-flex items-center space-x-1 bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-sm">
                <span>时间: {uploadDates.find(d => d.value === filters.uploadDate)?.label}</span>
                <button
                  onClick={() => updateFilter('uploadDate', '')}
                  className="hover:bg-accent-primary/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}