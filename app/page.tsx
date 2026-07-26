import Image from 'next/image';
import Link from 'next/link';
import { RegistrationForm } from './components/RegistrationForm';
import { newsItems, pujaOptions } from './site-data';

export default function Home() {
  return (
    <>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="回到卓蘭妙玄宮首頁">
          <Image className="brandLogo" src="/miaoxuang-logo.svg" alt="卓蘭妙玄宮" width={360} height={92} priority unoptimized />
        </a>
        <nav aria-label="主要導覽">
          <a href="#puja">最新公告</a>
          <a href="#belief">宮廟介紹</a>
          <a href="#items">普度項目</a>
          <a href="#volunteer">志工招募</a>
          <a href="#register">線上報名</a>
          <a href="#contact">聯絡資訊</a>
        </nav>
        <div className="headerActions">
          <a className="socialLink" href="https://www.facebook.com/100064331726590/" target="_blank" rel="noreferrer">Facebook</a>
          <a className="navRegister" href="#register">立即報名</a>
        </div>
      </header>

      <main id="top">
        <section className="hero heroBlessing">
          <Image
            className="heroBackdrop"
            src="/daixing-bodhisattva-blessing.jpg"
            alt="代行僧菩薩在高處慈悲俯視宮廟與眾生"
            fill
            priority
            sizes="100vw"
          />
          <div className="heroVeil" aria-hidden="true" />
          <div className="heroCopy heroNews">
            <p className="heroKicker">最新資訊</p>
            <h1 className="heroNewsTitle">丙午年<span>慶贊中元植福普度福世法會</span></h1>
            <p>法會現正受理報名，歡迎善信大德參與普度、超薦、功德及志工服務。</p>
            <div className="actions"><Link className="primary" href="/news/zhongyuan-announcement">查看完整資訊</Link><Link className="ghost" href="/news/zhongyuan-registration">立即報名</Link></div>
          </div>
        </section>

        <section id="puja" className="latestNews section">
          <div className="latestNewsHeading">
            <span>NEWS</span>
            <h2>最新消息</h2>
            <Link href="/news">更多消息 <b aria-hidden="true">→</b></Link>
          </div>
          <div className="latestNewsBody">
            <Link className="latestNewsVisual" href="/news/zhongyuan-registration" aria-label="查看中元普度法會線上報名">
              <Image src="/daixing-bodhisattva-blessing.jpg" alt="代行僧菩薩法會主視覺" fill sizes="(max-width: 900px) 100vw, 38vw" />
              <span>中元普度法會<br /><b>現正報名</b></span>
            </Link>
            <div className="latestNewsList">
              {newsItems.map((item) => (
                <Link href={`/news/${item.slug}`} key={item.slug}>
                  <time>{item.date}</time>
                  <span className={`newsTag ${item.tone}`}>{item.category}</span>
                  <strong>{item.title}</strong>
                  <b className="newsArrow" aria-hidden="true">›</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="belief" className="belief section">
          <div className="quote">「一心虔誠，萬事圓成」</div>
          <div>
            <p>代行僧菩薩祖靈源自浙江奉化雪竇寺，左手持蒲扇，象徵慈悲、無懼與引導；身掛佛珠，象徵智慧、佛法與輪迴。</p>
            <p>佛珠一轉，轉盡悲歡離合緣滅起；願眾生以善念植福，以慈心同行。</p>
          </div>
        </section>

        <section id="items" className="items section">
          <div className="titleBlock light"><span>PUJA ITEMS</span><h2>普度參與項目</h2><p>「時價」項目依廠商或採買報價實收工本費。個人贊普桌等大項需擲筊，三聖杯即可參加。</p></div>
          <div className="itemGrid">
            {pujaOptions.slice(0, 17).map((item, index) => <article key={item[0]}><em>{String(index + 1).padStart(2, '0')}</em><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
          </div>
        </section>

        <section id="volunteer" className="volunteer section">
          <div><span>VOLUNTEERS</span><h2>善心志工招募</h2><p>8 月 18、19、20 日歡迎前來參加，其中 8 月 18、19 日需要大量志工。讓我們一同共襄盛舉。</p></div>
          <a href="#register">我要報名志工</a>
        </section>

        <section id="register" className="register section">
          <div className="formIntro">
            <span>ONLINE REGISTRATION</span><h2>法會線上報名</h2>
            <p>填寫後系統會產生專屬報名編號，資料送至宮方登記表。名額、擲筊、付款及收據由宮方聯絡確認。</p>
            <ul><li>普渡後會告知細項及收據證明</li><li>供品如需自行帶回，請在備註提前告知</li><li>專超嬰靈採不公開姓名方式</li></ul>
          </div>
          <RegistrationForm />
        </section>

        <section id="contact" className="contact section">
          <div><span>CONTACT</span><h2>聯絡資訊</h2><p><b>宮址：</b>苗栗縣卓蘭鎮新榮里仁愛路14之1</p></div>
          <div className="contactLinks"><a href="tel:0425896101"><small>聯絡電話</small>04-25896101</a><a href="tel:0977336880"><small>行動電話</small>0977-336880</a><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=苗栗縣卓蘭鎮新榮里仁愛路14之1"><small>宮址導航</small>開啟 Google 地圖</a><a target="_blank" rel="noreferrer" href="https://www.facebook.com/100064331726590/"><small>社群聯繫</small>Facebook 粉絲專頁</a></div>
        </section>
      </main>

      <footer><small>© {new Date().getFullYear()}｜官方網站</small></footer>
    </>
  );
}
