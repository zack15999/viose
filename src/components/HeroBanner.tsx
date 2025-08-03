'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Video } from '@/types';
import { formatViews, timeAgo, cn } from '@/utils';

interface HeroBannerProps {
  featuredVideos: Video[];
  className?: string;
}

export function HeroBanner({ featuredVideos, className }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const currentVideo = featuredVideos[currentIndex];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredVideos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredVideos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredVideos.length);
    setIsAutoPlaying(false);
  };

  if (!featuredVideos.length) {
    return (
      <div className={cn('aspect-[21/9] bg-primary-card rounded-lg skeleton', className)} />
    );
  }

  return (
    <div className={cn('relative aspect-[21/9] rounded-xl overflow-hidden group', className)}>
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src={currentVideo.thumbnail}
          alt={currentVideo.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Navigation Controls */}
      {featuredVideos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            aria-label="上一个"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            aria-label="下一个"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-6 lg:p-8">
        <div className="max-w-2xl space-y-4">
          {/* Video Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <span className="bg-accent-primary px-2 py-1 rounded text-white font-semibold">
                特色推荐
              </span>
              <span>{formatViews(currentVideo.views)} 次观看</span>
              <span>{timeAgo(currentVideo.uploadDate)}</span>
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
              {currentVideo.title}
            </h1>
            
            <p className="text-white/90 text-base lg:text-lg leading-relaxed line-clamp-2">
              {currentVideo.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href={`/video/${currentVideo.id}`}
              className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>立即观看</span>
            </Link>
            
            <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
              <span>⭐</span>
              <span>收藏</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isMuted ? '取消静音' : '静音'}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {currentVideo.uploader.displayName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{currentVideo.uploader.displayName}</p>
              <p className="text-white/70 text-sm">
                {formatViews(currentVideo.uploader.subscribers)} 订阅者
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {featuredVideos.length > 1 && (
        <div className="absolute bottom-6 right-6 flex space-x-2">
          {featuredVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              )}
              aria-label={`切换到第 ${index + 1} 个视频`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {isAutoPlaying && featuredVideos.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-accent-primary transition-all duration-75"
            style={{
              width: `${((currentIndex + 1) / featuredVideos.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}