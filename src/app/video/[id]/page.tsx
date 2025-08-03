'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Share, 
  Download,
  Heart,
  MessageCircle,
  MoreVertical
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VideoCard } from '@/components/VideoCard';
import { mockVideos, mockUsers } from '@/lib/mockData';
import { formatViews, timeAgo, formatDate } from '@/utils';

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;
  
  // Find the video by ID
  const video = mockVideos.find(v => v.id === videoId);
  const relatedVideos = mockVideos.filter(v => v.id !== videoId).slice(0, 8);
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  
  // UI state
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  if (!video) {
    return (
      <div className="min-h-screen bg-primary-bg">
        <Header />
        <main className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">视频未找到</h1>
            <p className="text-text-secondary mb-6">抱歉，您要查找的视频不存在或已被删除。</p>
            <Link 
              href="/" 
              className="bg-accent-primary text-white px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors"
            >
              返回首页
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group-hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="h-10 w-10 text-white ml-1" />
                    ) : (
                      <Play className="h-10 w-10 text-white ml-2" />
                    )}
                  </button>
                </div>

                {/* Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="relative h-1 bg-white/20 rounded-full cursor-pointer">
                      <div 
                        className="absolute left-0 top-0 h-full bg-accent-primary rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-accent-primary transition-colors"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-accent-primary transition-colors"
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-20 h-1 bg-white/20 rounded-full appearance-none slider"
                        />
                      </div>
                      
                      <span className="text-white text-sm">
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {video.duration}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select className="bg-white/20 text-white text-sm rounded px-2 py-1 border-none">
                        <option value="auto">自动</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                      
                      <button className="text-white hover:text-accent-primary transition-colors">
                        <Maximize className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
                  {video.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4 text-text-secondary">
                    <span>{formatViews(video.views)} 次观看</span>
                    <span>•</span>
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked 
                          ? 'bg-accent-primary text-white' 
                          : 'bg-primary-card text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{formatViews(video.likes + (isLiked ? 1 : 0))}</span>
                    </button>
                    
                    <button
                      onClick={() => setIsDisliked(!isDisliked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isDisliked 
                          ? 'bg-red-600 text-white' 
                          : 'bg-primary-card text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isFavorited 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-primary-card text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Star className="h-4 w-4" />
                      <span>收藏</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-card text-text-secondary hover:text-text-primary transition-colors">
                      <Share className="h-4 w-4" />
                      <span>分享</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-card text-text-secondary hover:text-text-primary transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Uploader Info */}
              <div className="bg-primary-card rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {video.uploader.displayName.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {video.uploader.displayName}
                      </h3>
                      <p className="text-text-secondary">
                        {formatViews(video.uploader.subscribers)} 订阅者
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      isSubscribed
                        ? 'bg-primary-secondary text-text-primary border border-primary-secondary'
                        : 'bg-accent-primary text-white hover:bg-accent-hover'
                    }`}
                  >
                    {isSubscribed ? '已订阅' : '订阅'}
                  </button>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <div className={`text-text-secondary ${!showDescription ? 'line-clamp-3' : ''}`}>
                    {video.description}
                  </div>
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="text-accent-primary hover:text-accent-hover mt-2 text-sm"
                  >
                    {showDescription ? '收起' : '显示更多'}
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-accent-primary hover:text-accent-hover cursor-pointer text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-primary-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">
                    评论 (234)
                  </h3>
                  <select className="bg-primary-secondary text-text-primary px-3 py-1 rounded border border-primary-secondary">
                    <option>按热度排序</option>
                    <option>按时间排序</option>
                  </select>
                </div>

                {/* Comment Form */}
                <div className="mb-6">
                  <textarea
                    placeholder="添加评论..."
                    className="w-full bg-primary-secondary border border-primary-secondary/50 rounded-lg p-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-accent-primary text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors">
                      发布评论
                    </button>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="border-b border-primary-secondary/20 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-semibold">U</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-text-primary">用户{index}</span>
                            <span className="text-text-muted text-sm">{index}小时前</span>
                          </div>
                          <p className="text-text-secondary mb-2">
                            这个视频真的很棒！制作质量很高，内容也很有趣。
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <button className="flex items-center space-x-1 text-text-muted hover:text-text-primary">
                              <ThumbsUp className="h-3 w-3" />
                              <span>12</span>
                            </button>
                            <button className="flex items-center space-x-1 text-text-muted hover:text-text-primary">
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                            <button className="text-text-muted hover:text-text-primary">
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-8 lg:mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">相关推荐</h3>
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <div key={relatedVideo.id} className="flex space-x-3">
                      <Link 
                        href={`/video/${relatedVideo.id}`}
                        className="w-40 aspect-video bg-primary-card rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          width={160}
                          height={90}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          unoptimized
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/video/${relatedVideo.id}`}>
                          <h4 className="text-text-primary font-medium text-sm line-clamp-2 hover:text-accent-primary transition-colors">
                            {relatedVideo.title}
                          </h4>
                        </Link>
                        <p className="text-text-muted text-xs mt-1">{relatedVideo.uploader.displayName}</p>
                        <div className="flex items-center space-x-1 text-text-muted text-xs mt-1">
                          <span>{formatViews(relatedVideo.views)} 观看</span>
                          <span>•</span>
                          <span>{timeAgo(relatedVideo.uploadDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}