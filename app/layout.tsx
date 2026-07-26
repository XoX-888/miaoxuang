import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://miaoxuang.vercel.app'),
  title: { default: '妙玄宮｜苗栗卓蘭', template: '%s｜妙玄宮' },
  description: '妙玄宮官方網站，提供宮務資訊、祈福登記、活動報名與線上自動填單服務。',
  keywords: ['妙玄宮', '卓蘭宮廟', '苗栗宮廟', '祈福', '法會報名'],
  openGraph: {
    title: '妙玄宮｜苗栗卓蘭',
    description: '誠心祈願，護佑平安。',
    locale: 'zh_TW',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}
