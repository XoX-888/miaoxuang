import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RegistrationForm } from '../../components/RegistrationForm';
import { newsItems, pujaOptions } from '../../site-data';

type NewsDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.excerpt } : {};
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <main className="newsDetailPage">
      <section className="newsDetailHero">
        <Image src="/daixing-bodhisattva-blessing.jpg" alt="代行僧菩薩法會主視覺" fill priority sizes="100vw" />
        <div aria-hidden="true" />
        <article>
          <span className={`newsTag ${item.tone}`}>{item.category}</span>
          <time>{item.date}</time>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </article>
      </section>

      {item.kind === 'registration' && (
        <section className="newsRegistration section">
          <div className="newsDetailIntro">
            <span>ONLINE REGISTRATION</span>
            <h2>丙午年中元普渡法會</h2>
            <p>選擇參與項目並填寫資料，送出後系統會產生報名編號，再由宮方聯絡確認名額、費用及收據。</p>
            <ul><li>供品如需自行帶回，請於備註說明</li><li>專超嬰靈採不公開姓名方式</li><li>志工日期為 8 月 18、19、20 日</li></ul>
            <section className="newsPujaSummary" aria-labelledby="news-puja-heading">
              <h3 id="news-puja-heading">普度參與項目</h3>
              <p>「時價」項目依廠商或採買報價實收工本費。個人贊普桌等大項需擲筊，三聖杯即可參加。</p>
              <ol>
                {pujaOptions.slice(0, 17).map((option, index) => (
                  <li key={option[0]}>
                    <em>{String(index + 1).padStart(2, '0')}</em>
                    <div><h4>{option[0]}</h4><p>{option[1]}</p></div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <RegistrationForm />
        </section>
      )}

      {item.kind === 'announcement' && (
        <section className="announcementDetail section">
          <header><span>PUJA INFORMATION</span><h2>法會項目與金額</h2><p>「時價」項目依廠商或採買報價實收工本費；需擲筊項目以三聖杯為準。</p></header>
          <div className="announcementItems">
            {pujaOptions.map((option, index) => <article key={option[0]}><em>{String(index + 1).padStart(2, '0')}</em><div><h3>{option[0]}</h3><p>{option[1]}</p></div></article>)}
          </div>
          <aside><h3>志工招募</h3><p>8 月 18、19、20 日歡迎參與，其中 18、19 日需要大量志工。</p><Link href="/news/zhongyuan-registration">前往報名</Link></aside>
        </section>
      )}

      {item.kind === 'gallery' && (
        <section className="galleryDetail section">
          <header><span>EVENT GALLERY</span><h2>活動相片上傳區</h2><p>法會結束後，照片會依照準備、儀式及志工紀實分類上傳。</p></header>
          <div className="galleryPlaceholders">
            {['法會準備', '普度儀式', '志工紀實'].map((title, index) => <article key={title}><em>0{index + 1}</em><h3>{title}</h3><p>活動結束後更新</p></article>)}
          </div>
        </section>
      )}

      <nav className="newsDetailNav" aria-label="消息頁面導覽"><Link href="/news">← 返回最新消息</Link><Link href="/">回到首頁</Link></nav>
    </main>
  );
}

