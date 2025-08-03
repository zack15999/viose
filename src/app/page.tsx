'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryNav } from '@/components/CategoryNav';
import { VideoGrid } from '@/components/VideoGrid';
import { FilterBar } from '@/components/FilterBar';
import { featuredVideos, mockVideos } from '@/lib/mockData';
import { SearchFilters } from '@/types';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({});

  // Filter videos based on current filters
  const filteredVideos = mockVideos.filter((video) => {
    if (filters.category && video.category !== filters.category) return false;
    if (filters.quality && video.quality !== filters.quality) return false;
    if (filters.duration) {
      const durationInMinutes = parseInt(video.duration.split(':')[0]) + 
                               parseInt(video.duration.split(':')[1]) / 60;
      if (filters.duration === 'short' && durationInMinutes >= 10) return false;
      if (filters.duration === 'medium' && (durationInMinutes < 10 || durationInMinutes > 20)) return false;
      if (filters.duration === 'long' && durationInMinutes <= 20) return false;
    }
    return true;
  });

  // Sort videos based on sort criteria
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'most-viewed':
        return b.views - a.views;
      case 'highest-rated':
        return b.rating - a.rating;
      case 'longest':
        const aDuration = parseInt(a.duration.split(':')[0]) * 60 + parseInt(a.duration.split(':')[1]);
        const bDuration = parseInt(b.duration.split(':')[0]) * 60 + parseInt(b.duration.split(':')[1]);
        return bDuration - aDuration;
      default:
        return 0; // relevance - keep original order
    }
  });

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <HeroBanner featuredVideos={featuredVideos} />
          </div>
        </section>

        {/* Category Navigation */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CategoryNav />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-primary-card rounded-lg p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent-primary mb-2">
                  {mockVideos.length.toLocaleString()}
                </div>
                <div className="text-text-secondary">精彩视频</div>
              </div>
              <div className="bg-primary-card rounded-lg p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent-primary mb-2">
                  {mockVideos.reduce((acc, video) => acc + video.views, 0).toLocaleString()}
                </div>
                <div className="text-text-secondary">总观看次数</div>
              </div>
              <div className="bg-primary-card rounded-lg p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent-primary mb-2">
                  {new Set(mockVideos.map(v => v.uploader.id)).size}
                </div>
                <div className="text-text-secondary">活跃创作者</div>
              </div>
              <div className="bg-primary-card rounded-lg p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent-primary mb-2">
                  24/7
                </div>
                <div className="text-text-secondary">持续更新</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>
        </section>

        {/* Video Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Trending Videos */}
            <VideoGrid
              videos={sortedVideos}
              title={
                Object.keys(filters).length > 0 
                  ? '筛选结果' 
                  : '推荐内容'
              }
              showLoadMore={true}
            />

            {/* Featured Sections */}
            {Object.keys(filters).length === 0 && (
              <>
                <VideoGrid
                  videos={mockVideos.filter(v => v.rating >= 4.5)}
                  title="高评分视频"
                />

                <VideoGrid
                  videos={mockVideos.filter(v => v.quality === '4K')}
                  title="4K 高清内容"
                />

                <VideoGrid
                  videos={mockVideos.sort((a, b) => b.views - a.views)}
                  title="热门播放"
                />
              </>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                准备分享你的创作了吗？
              </h2>
              <p className="text-white/90 text-lg mb-6">
                加入我们的创作者社区，与全世界分享你的精彩内容
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-accent-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  开始上传
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}