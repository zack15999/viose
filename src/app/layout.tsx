import '../styles/globals.css';
import type { Metadata } from 'next';

// Use local font fallback instead of Google Fonts for build environment
const fontClass = 'font-sans';

export const metadata: Metadata = {
  title: 'Viose - 现代化视频平台',
  description: '探索高质量的视频内容，与创作者建立连接，享受沉浸式的视频体验。',
  keywords: '视频, 创作者, 内容平台, 在线视频, 视频分享',
  authors: [{ name: 'Viose Team' }],
  openGraph: {
    title: 'Viose - 现代化视频平台',
    description: '探索高质量的视频内容，与创作者建立连接，享受沉浸式的视频体验。',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viose - 现代化视频平台',
    description: '探索高质量的视频内容，与创作者建立连接，享受沉浸式的视频体验。',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={fontClass}>
      <body className="bg-primary-bg text-text-primary font-primary antialiased">
        {children}
      </body>
    </html>
  );
}