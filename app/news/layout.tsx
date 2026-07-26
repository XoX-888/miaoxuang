import Image from 'next/image';
import Link from 'next/link';

export default function NewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="siteHeader newsSiteHeader">
        <Link className="brand" href="/" aria-label="回到首頁">
          <Image className="brandLogo" src="/miaoxuang-logo.svg" alt="卓蘭妙玄宮" width={360} height={92} priority unoptimized />
        </Link>
        <nav aria-label="消息頁導覽">
          <Link href="/">首頁</Link>
          <Link href="/news">最新消息</Link>
          <Link href="/news/zhongyuan-registration">活動報名</Link>
        </nav>
        <div className="headerActions">
          <a className="socialLink" href="https://www.facebook.com/100064331726590/" target="_blank" rel="noreferrer">Facebook</a>
          <Link className="navRegister" href="/news/zhongyuan-registration">立即報名</Link>
        </div>
      </header>
      {children}
      <footer className="newsFooter"><small>© {new Date().getFullYear()}｜官方網站</small></footer>
    </>
  );
}
