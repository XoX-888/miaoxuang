import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { newsItems } from '../site-data';

export const metadata: Metadata = {
  title: '最新消息',
  description: '法會報名、公告與活動相簿。'
};

export default function NewsPage() {
  return (
    <main className="newsPage">
      <section className="newsIndexHero">
        <span>NEWS</span>
        <h1>最新消息</h1>
        <p>活動報名、宮務公告與法會紀實，分頁整理，一目了然。</p>
      </section>
      <section className="newsIndexGrid" aria-label="最新消息列表">
        <div className="newsIndexImage">
          <Image src="/daixing-bodhisattva-blessing.jpg" alt="代行僧菩薩法會主視覺" fill priority sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div className="newsIndexList">
          {newsItems.map((item) => (
            <Link href={`/news/${item.slug}`} key={item.slug}>
              <time>{item.date}</time>
              <span className={`newsTag ${item.tone}`}>{item.category}</span>
              <div><h2>{item.title}</h2><p>{item.excerpt}</p></div>
              <b aria-hidden="true">›</b>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
