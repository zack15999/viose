import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-secondary/50 border-t border-primary-card/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-text-primary">Viose</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              现代化的视频内容平台，为创作者和观众提供优质的视频分享体验。
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-text-muted hover:text-accent-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-accent-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-accent-primary transition-colors"
                aria-label="邮箱"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">导航</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trending" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  热门内容
                </Link>
              </li>
              <li>
                <Link href="/recent" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  最新上传
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  最高评分
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  分类浏览
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Resources */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">创作者</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/upload" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  上传视频
                </Link>
              </li>
              <li>
                <Link href="/creator-studio" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  创作者工作室
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  数据分析
                </Link>
              </li>
              <li>
                <Link href="/creator-guidelines" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  创作指南
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">支持</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-primary-card/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-text-muted text-sm">
              © 2024 Viose. 保留所有权利。
            </div>
            <div className="flex items-center space-x-1 text-text-muted text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-status-error fill-current" />
              <span>by the Viose Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}