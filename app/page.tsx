'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';

const options = [
  ['個人贊普桌', '3,600 元／桌（含金紙，限 9 桌）'],
  ['財水桌', '3,600 元／桌（限 13 桌）'],
  ['藥草桌', '3,600 元／桌（限 1 桌）'],
  ['五色豆桌', '材料實收工本費，依報價'],
  ['五蔬果桌', '材料實收工本費，依報價'],
  ['肉粽桌', '每桌 228 顆，材料實收工本費，限 2 名'],
  ['個人贊助白米', '每份 50 台斤，1,700 元，共 36 名'],
  ['個人普渡供品', '每份 1,700 元，可帶回或再次捐出'],
  ['共同普渡桌', '每人 3,200 元，普渡後統一佈施'],
  ['贊普功德', '金額請由宮方聯絡確認'],
  ['冤親債主', '每份 1,500 元'],
  ['專超嬰靈', '每份 1,500 元，不公開姓名'],
  ['專超亡靈', '每份 1,500 元'],
  ['各姓祖先', '每份 1,500 元'],
  ['地基主', '每份 1,500 元'],
  ['寵物亡靈', '每份 1,500 元'],
  ['當日隨緣贊助功德主', '隨緣贊助'],
  ['志工報名', '8 月 18、19、20 日']
];

export default function Home() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState(options[0][0]);
  const selectedInfo = useMemo(() => options.find((item) => item[0] === selected)?.[1], [selected]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const reference = `MXG-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`;

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, reference })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setStatus(`報名資料已送出，編號：${reference}。宮方將與您聯絡確認。`);
      form.reset();
      setSelected(options[0][0]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '送出失敗，請稍後再試。');
    } finally {
      setSending(false);
    }
  }

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
            <div className="actions"><a className="primary" href="#puja">查看完整資訊</a><a className="ghost" href="#register">立即報名</a></div>
          </div>
        </section>

        <section id="puja" className="announcement section">
          <div className="titleBlock"><span>NOW OPEN</span><h2>丙午年<br />慶贊中元植福普度福世法會</h2></div>
          <div className="notice">
            <b>❗️報名開始</b>
            <p>欲參與普度各項，歡迎透過網站完成登記。報名後由宮方確認名額、擲筊項目、費用與收據細項。</p>
            <div className="facts"><span>宮主 王祺</span><span>04-25896101</span><span>0977-336880</span></div>
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
            {options.slice(0, 17).map((item, index) => <article key={item[0]}><em>{String(index + 1).padStart(2, '0')}</em><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
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
          <form onSubmit={submit}>
            <div className="two"><label>姓名＊<input name="name" autoComplete="name" required /></label><label>聯絡電話＊<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label></div>
            <label>報名項目＊<select name="service" required value={selected} onChange={(event) => setSelected(event.target.value)}>{options.map((item) => <option key={item[0]}>{item[0]}</option>)}</select><small>{selectedInfo}</small></label>
            <div className="two"><label>數量／份數<input name="quantity" type="number" min="1" defaultValue="1" /></label><label>方便聯絡時段<select name="contactTime"><option>15:00–18:00</option><option>19:00–21:00</option></select></label></div>
            <label>地址<input name="address" autoComplete="street-address" /></label>
            <label>超薦對象／供品處理／其他說明＊<textarea name="details" rows={5} required placeholder="例如：超薦姓名、供品自行帶回、志工可參與日期等" /></label>
            <label className="agree"><input type="checkbox" required />我確認資料正確，並同意宮方為法會聯絡及宮務處理使用。</label>
            <button disabled={sending}>{sending ? '資料送出中…' : '送出法會報名'}</button>
            <p className="status" aria-live="polite">{status}</p>
          </form>
        </section>

        <section id="contact" className="contact section">
          <div><span>CONTACT</span><h2 className="templeWordmark">卓蘭妙玄宮</h2><p>苗栗縣卓蘭鎮新榮里仁愛路14之1</p></div>
          <div className="contactLinks"><a href="tel:0425896101">04-25896101</a><a href="tel:0977336880">0977-336880</a><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=苗栗縣卓蘭鎮新榮里仁愛路14之1">開啟地圖</a><a target="_blank" rel="noreferrer" href="https://www.facebook.com/100064331726590/">Facebook 粉絲專頁</a></div>
        </section>
      </main>

      <footer><strong className="templeWordmark">卓蘭妙玄宮</strong><small>© {new Date().getFullYear()} 卓蘭妙玄宮</small></footer>
    </>
  );
}
