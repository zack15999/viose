export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  uploader: User;
  tags: string[];
  category: string;
  quality: 'HD' | '4K' | 'SD';
  rating: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  subscribers: number;
  isSubscribed?: boolean;
  bio?: string;
  joinDate: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  videoCount: number;
}

export interface SearchFilters {
  category?: string;
  duration?: 'short' | 'medium' | 'long';
  quality?: 'HD' | '4K' | 'SD';
  sortBy?: 'relevance' | 'newest' | 'most-viewed' | 'highest-rated' | 'longest';
  uploadDate?: 'today' | 'week' | 'month' | 'year';
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  quality: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  videos: Video[];
  creator: User;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}