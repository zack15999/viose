'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Upload, Menu, User, Bell, Settings } from 'lucide-react';
import { cn } from '@/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-bg/95 backdrop-blur-sm border-b border-primary-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-primary-secondary/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="打开菜单"
            >
              <Menu className="h-6 w-6 text-text-primary" />
            </button>
            
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-text-primary hidden sm:block">
                Viose
              </span>
            </Link>
          </div>

          {/* Main Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/trending"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              热门
            </Link>
            <Link
              href="/recent"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              最新
            </Link>
            <Link
              href="/top-rated"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              最高评分
            </Link>
          </nav>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary-secondary/50 border border-primary-card/50 rounded-full py-2 pl-4 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-accent-primary/20 transition-colors"
                aria-label="搜索"
              >
                <Search className="h-4 w-4 text-text-muted" />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Upload Button */}
            <Link
              href="/upload"
              className="hidden sm:flex items-center space-x-2 bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>上传</span>
            </Link>

            {/* Notifications */}
            <button
              className="p-2 rounded-lg hover:bg-primary-secondary/50 transition-colors relative"
              aria-label="通知"
            >
              <Bell className="h-5 w-5 text-text-secondary" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-status-error rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary-secondary/50 transition-colors"
                aria-label="用户菜单"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary-card rounded-lg shadow-xl border border-primary-secondary/20 py-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-primary-secondary/30 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>个人资料</span>
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-primary-secondary/30 transition-colors"
                  >
                    <span>⭐</span>
                    <span>收藏</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-primary-secondary/30 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>设置</span>
                  </Link>
                  <hr className="my-2 border-primary-secondary/20" />
                  <button className="flex items-center space-x-2 px-4 py-2 w-full text-left text-text-secondary hover:text-text-primary hover:bg-primary-secondary/30 transition-colors">
                    <span>🚪</span>
                    <span>退出</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary-secondary/95 backdrop-blur-sm border-t border-primary-card/20">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/trending"
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              热门
            </Link>
            <Link
              href="/recent"
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              最新
            </Link>
            <Link
              href="/top-rated"
              className="block py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              最高评分
            </Link>
            <Link
              href="/upload"
              className="flex items-center space-x-2 py-2 text-accent-primary hover:text-accent-hover transition-colors sm:hidden"
            >
              <Upload className="h-4 w-4" />
              <span>上传</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}