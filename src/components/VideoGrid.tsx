'use client';

import { useState, useEffect } from 'react';
import { VideoCard, VideoCardSkeleton } from './VideoCard';
import { Video } from '@/types';
import { cn } from '@/utils';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  className?: string;
}

export function VideoGrid({
  videos,
  loading = false,
  title,
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
  className,
}: VideoGridProps) {
  const [visibleVideos, setVisibleVideos] = useState(12);

  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      setVisibleVideos(prev => prev + 12);
    }
  };

  const displayedVideos = videos.slice(0, visibleVideos);
  const hasMoreVideos = videos.length > visibleVideos;

  if (loading) {
    return (
      <div className={cn('space-y-6', className)}>
        {title && (
          <div className="flex items-center justify-between">
            <div className="skeleton h-8 w-48 rounded" />
          </div>
        )}
        <div className="video-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={cn('space-y-6', className)}>
        {title && (
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        )}
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-primary-card rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">📹</span>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            暂无视频内容
          </h3>
          <p className="text-text-secondary">
            当前没有找到符合条件的视频，请尝试调整筛选条件。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Title */}
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <span className="text-text-secondary text-sm">
            {videos.length} 个视频
          </span>
        </div>
      )}

      {/* Video Grid */}
      <div className="video-grid">
        {displayedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}

        {/* Loading More Skeletons */}
        {loadingMore && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <VideoCardSkeleton key={`loading-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {(showLoadMore || hasMoreVideos) && !loadingMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            className="bg-primary-card hover:bg-primary-secondary text-text-primary px-8 py-3 rounded-lg transition-colors border border-primary-secondary/50 hover:border-accent-primary/50"
          >
            加载更多视频
          </button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="flex justify-center pt-8">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
            <span>正在加载更多内容...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact grid for sidebar or related videos
export function CompactVideoGrid({ 
  videos, 
  title, 
  maxItems = 6,
  className 
}: {
  videos: Video[];
  title?: string;
  maxItems?: number;
  className?: string;
}) {
  const displayedVideos = videos.slice(0, maxItems);

  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      )}
      <div className="space-y-3">
        {displayedVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            size="small"
            showUploader={false}
          />
        ))}
      </div>
    </div>
  );
}