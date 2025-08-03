'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VideoGrid } from '@/components/VideoGrid';
import { mockVideos, mockUsers } from '@/lib/mockData';
import { formatViews, timeAgo } from '@/utils';
import { Settings, Edit3, Users, Calendar, Play } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  
  // Using first user as example profile
  const user = mockUsers[0];
  const userVideos = mockVideos.filter(video => video.uploader.id === user.id);
  const favoriteVideos = mockVideos.slice(0, 3); // Mock favorites

  const stats = [
    { label: '上传视频', value: userVideos.length },
    { label: '总观看数', value: userVideos.reduce((acc, video) => acc + video.views, 0) },
    { label: '订阅者', value: user.subscribers },
    { label: '获得点赞', value: userVideos.reduce((acc, video) => acc + video.likes, 0) },
  ];

  const tabs = [
    { id: 'videos', label: '我的视频', count: userVideos.length },
    { id: 'favorites', label: '收藏夹', count: favoriteVideos.length },
    { id: 'playlists', label: '播放列表', count: 2 },
    { id: 'analytics', label: '数据分析', count: null },
  ];

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-primary-card rounded-xl p-6 lg:p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {user.displayName.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-bg rounded-full flex items-center justify-center hover:bg-primary-secondary transition-colors">
                  <Edit3 className="h-4 w-4 text-text-primary" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                      {user.displayName}
                    </h1>
                    <p className="text-text-secondary mt-1">@{user.username}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 bg-primary-secondary hover:bg-primary-bg text-text-primary px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>编辑资料</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>设置</span>
                    </button>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  {isEditing ? (
                    <textarea
                      defaultValue={user.bio}
                      className="w-full bg-primary-secondary border border-primary-secondary/50 rounded-lg p-3 text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
                      rows={3}
                      placeholder="介绍一下你自己..."
                    />
                  ) : (
                    <p className="text-text-secondary leading-relaxed">
                      {user.bio}
                    </p>
                  )}
                </div>

                {/* Join Date */}
                <div className="flex items-center space-x-4 text-text-muted text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>加入于 {new Date(user.joinDate).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{formatViews(user.subscribers)} 订阅者</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex items-center space-x-3">
                    <button className="bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors">
                      保存更改
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-primary-secondary hover:bg-primary-bg text-text-primary px-4 py-2 rounded-lg transition-colors"
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-primary-secondary/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-accent-primary">
                    {typeof stat.value === 'number' ? formatViews(stat.value) : stat.value}
                  </div>
                  <div className="text-text-muted text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-primary-secondary/20">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-accent-primary text-accent-primary'
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span className="bg-primary-card text-text-muted px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'videos' && (
              <div>
                {userVideos.length > 0 ? (
                  <VideoGrid
                    videos={userVideos}
                    title={`${user.displayName} 的视频`}
                    showLoadMore={false}
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto bg-primary-card rounded-full flex items-center justify-center mb-6">
                      <Play className="h-12 w-12 text-text-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      还没有上传视频
                    </h3>
                    <p className="text-text-secondary mb-6">
                      开始创作并分享你的精彩内容吧！
                    </p>
                    <button className="bg-accent-primary hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors">
                      上传第一个视频
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <VideoGrid
                  videos={favoriteVideos}
                  title="收藏的视频"
                  showLoadMore={false}
                />
              </div>
            )}

            {activeTab === 'playlists' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-primary">播放列表</h2>
                  <button className="bg-accent-primary hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors">
                    创建播放列表
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample Playlists */}
                  {[
                    { name: '我的最爱', count: 12, thumbnail: '/thumbnails/video1.jpg' },
                    { name: '稍后观看', count: 8, thumbnail: '/thumbnails/video2.jpg' },
                  ].map((playlist, index) => (
                    <div key={index} className="bg-primary-card rounded-lg overflow-hidden hover:bg-primary-secondary transition-colors cursor-pointer">
                      <div className="aspect-video bg-primary-secondary relative">
                        <img
                          src={playlist.thumbnail}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {playlist.count} 个视频
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-text-primary">{playlist.name}</h3>
                        <p className="text-text-muted text-sm mt-1">
                          {playlist.count} 个视频 • 私人
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">数据分析</h2>
                
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-primary-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">总体统计</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">总观看时长</span>
                        <span className="text-text-primary font-semibold">2,840 小时</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">平均观看时长</span>
                        <span className="text-text-primary font-semibold">8.2 分钟</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">观看完成率</span>
                        <span className="text-text-primary font-semibold">72%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">过去30天</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">新增观看</span>
                        <span className="text-accent-primary font-semibold">+12.5K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">新增订阅</span>
                        <span className="text-accent-primary font-semibold">+234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">总点赞数</span>
                        <span className="text-accent-primary font-semibold">+1.8K</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-card rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">热门视频</h3>
                    <div className="space-y-3">
                      {userVideos.slice(0, 3).map((video, index) => (
                        <div key={video.id} className="flex items-center space-x-3">
                          <span className="text-accent-primary font-bold">#{index + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-text-primary text-sm truncate">{video.title}</p>
                            <p className="text-text-muted text-xs">{formatViews(video.views)} 观看</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}