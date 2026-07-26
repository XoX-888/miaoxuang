import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://miaoxuang.vercel.app'),
  title: { default: '卓蘭妙玄宮｜代行僧菩薩・中元普度法會', template: '%s｜卓蘭妙玄宮' },
  description: '卓蘭妙玄宮官方網站。丙午年慶贊中元植福普度福世法會現正報名，提供普度、超薦、祈福、志工與線上自動填單服務。',
  keywords: ['卓蘭妙玄宮', '代行僧菩薩', '中元普度', '苗栗宮廟', '卓蘭宮廟', '超薦', '法會報名'],
  openGraph: {
    title: '卓蘭妙玄宮｜代行僧菩薩',
    description: '慈悲化世・代行祈願・功德圓滿。中元普度法會現正報名。',
    locale: 'zh_TW',
    type: 'website',
    url: 'https://miaoxuang.vercel.app'
  },
  twitter: {
    card: 'summary_large_image',
    title: '卓蘭妙玄宮｜代行僧菩薩',
    description: '中元植福普度福世法會現正報名。'
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
