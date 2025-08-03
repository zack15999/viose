'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VideoGrid } from '@/components/VideoGrid';
import { FilterBar } from '@/components/FilterBar';
import { mockVideos } from '@/lib/mockData';
import { SearchFilters } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Filter and search videos
  const filteredVideos = mockVideos.filter((video) => {
    // Text search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesTitle = video.title.toLowerCase().includes(searchLower);
      const matchesDescription = video.description.toLowerCase().includes(searchLower);
      const matchesTags = video.tags.some(tag => tag.toLowerCase().includes(searchLower));
      const matchesUploader = video.uploader.displayName.toLowerCase().includes(searchLower);
      
      if (!(matchesTitle || matchesDescription || matchesTags || matchesUploader)) {
        return false;
      }
    }

    // Filter criteria
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

  // Sort videos
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              {query ? `"${query}" 的搜索结果` : '搜索'}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <input
                type="text"
                placeholder="搜索视频、创作者或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary-secondary border border-primary-card/50 rounded-lg py-3 pl-4 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-accent-primary/20 transition-colors"
                aria-label="搜索"
              >
                <Search className="h-5 w-5 text-text-muted" />
              </button>
            </form>

            {/* Search Stats */}
            <div className="mt-4 text-text-secondary">
              {query && (
                <p>
                  找到 {sortedVideos.length} 个相关结果
                  {filters && Object.keys(filters).length > 0 && ' (已应用筛选条件)'}
                </p>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Search Results */}
          <div className="space-y-8">
            {sortedVideos.length > 0 ? (
              <VideoGrid
                videos={sortedVideos}
                title={query ? undefined : '全部视频'}
                showLoadMore={true}
              />
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-primary-card rounded-full flex items-center justify-center mb-6">
                  <Search className="h-12 w-12 text-text-muted" />
                </div>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  {query ? '未找到相关结果' : '开始搜索'}
                </h2>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  {query 
                    ? '尝试使用不同的关键词或调整筛选条件，可能会找到您要的内容。'
                    : '输入关键词来搜索您感兴趣的视频内容。'
                  }
                </p>
                {query && (
                  <div className="space-y-2">
                    <p className="text-text-secondary text-sm">搜索建议:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['热门', '最新', '4K', '教程', '娱乐'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            window.history.pushState({}, '', `/search?q=${encodeURIComponent(suggestion)}`);
                          }}
                          className="bg-primary-card hover:bg-primary-secondary text-text-secondary hover:text-text-primary px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-text-primary mb-6">热门搜索</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['旅行vlog', '美食制作', '科技评测', '音乐MV', '游戏直播', '艺术创作', '健身教程', '编程教学'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      window.history.pushState({}, '', `/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="bg-primary-card hover:bg-primary-secondary p-4 rounded-lg text-text-secondary hover:text-text-primary transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-accent-primary">🔥</span>
                      <span>{term}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}