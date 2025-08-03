'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ThumbsUp, Eye } from 'lucide-react';
import { Video } from '@/types';
import { formatViews, timeAgo, cn } from '@/utils';

interface VideoCardProps {
  video: Video;
  size?: 'small' | 'medium' | 'large';
  showUploader?: boolean;
  className?: string;
}

export function VideoCard({ 
  video, 
  size = 'medium', 
  showUploader = true,
  className 
}: VideoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-full max-w-sm',
    medium: 'w-full max-w-md',
    large: 'w-full max-w-lg',
  };

  return (
    <div className={cn('video-card group', sizeClasses[size], className)}>
      <Link href={`/video/${video.id}`} className="block">
        {/* Thumbnail Container */}
        <div className="relative aspect-video bg-primary-card rounded-lg overflow-hidden">
          {/* Thumbnail Image */}
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className={cn(
                'object-cover transition-all duration-300 group-hover:scale-105',
                !imageLoaded && 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-card to-primary-secondary flex items-center justify-center">
              <Play className="h-12 w-12 text-text-muted" />
            </div>
          )}

          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton rounded-lg" />
          )}

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>

          {/* Quality Badge */}
          {video.quality === '4K' && (
            <div className="absolute top-2 left-2 bg-accent-primary text-white text-xs px-2 py-1 rounded font-semibold">
              4K
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{Math.round(video.rating * 20)}%</span>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-3 space-y-2">
          {/* Title */}
          <h3 className="text-text-primary font-medium leading-tight line-clamp-2 group-hover:text-accent-primary transition-colors">
            {video.title}
          </h3>

          {/* Uploader Info */}
          {showUploader && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">
                  {video.uploader.displayName.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-text-secondary text-sm truncate hover:text-text-primary transition-colors">
                  {video.uploader.displayName}
                </p>
              </div>
            </div>
          )}

          {/* Video Metadata */}
          <div className="flex items-center space-x-4 text-text-muted text-sm">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{formatViews(video.views)}</span>
            </div>
            <span>•</span>
            <span>{timeAgo(video.uploadDate)}</span>
          </div>

          {/* Video Stats */}
          <div className="flex items-center space-x-4 text-text-muted text-sm">
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{formatViews(video.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span>{video.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Tags */}
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {video.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-card text-text-muted px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

// Loading skeleton for video cards
export function VideoCardSkeleton({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-full max-w-sm',
    medium: 'w-full max-w-md',
    large: 'w-full max-w-lg',
  };

  return (
    <div className={cn('video-card', sizeClasses[size])}>
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-primary-card rounded-lg overflow-hidden">
        <div className="absolute inset-0 skeleton" />
      </div>

      {/* Info Skeleton */}
      <div className="mt-3 space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex items-center space-x-2">
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  );
}