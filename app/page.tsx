'use client';

import { FormEvent, useState } from 'react';

const services = [
  ['宮務諮詢', '先填寫需求與方便聯絡時間'],
  ['祈福登記', '登記祈福人與祈願事項'],
  ['活動報名', '法會、祭典及宮慶活動'],
  ['功德芳名', '資料先登記，項目由宮方確認']
];

export default function Home() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const reference = `MXG-${Date.now().toString().slice(-8)}`;

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, reference })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setStatus(`送出成功，報名編號：${reference}`);
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '送出失敗，請稍後再試。');
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header>
        <a className="brand" href="#top"><b>妙</b><span><strong>妙玄宮</strong><small>苗栗卓蘭</small></span></a>
        <nav><a href="#about">本宮介紹</a><a href="#services">服務項目</a><a href="#form">線上填單</a><a href="#contact">聯絡資訊</a></nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroText">
            <p className="kicker">苗栗卓蘭・祈福敬神</p>
            <h1>妙玄宮</h1>
            <p>誠心祈願，護佑平安。提供信眾宮務諮詢、活動報名與線上自動填單服務。</p>
            <div className="actions"><a className="primary" href="#form">立即線上填單</a><a className="secondary" href="tel:0425896101">電話聯絡</a></div>
          </div>
          <aside><span>開放時間</span><strong>每日 15:00–21:00</strong><p>前往前建議先致電確認宮務安排。</p></aside>
        </section>

        <section id="about" className="section">
          <div className="heading"><span>ABOUT</span><h2>關於妙玄宮</h2></div>
          <div className="cards">
            {[
              ['01', '誠心敬神', '以莊重、清淨與尊重傳統的精神服務信眾。'],
              ['02', '便利服務', '線上先填資料，減少現場重複登記。'],
              ['03', '在地信仰', '位於苗栗卓蘭，傳承良善、感恩與互助精神。']
            ].map((item) => <article key={item[0]}><em>{item[0]}</em><h3>{item[1]}</h3><p>{item[2]}</p></article>)}
          </div>
        </section>

        <section id="services" className="dark section">
          <div className="heading"><span>SERVICES</span><h2>服務項目</h2></div>
          <div className="serviceGrid">{services.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
        </section>

        <section id="form" className="section formSection">
          <div>
            <div className="heading"><span>ONLINE FORM</span><h2>自動填單系統</h2></div>
            <p>系統會自動產生報名編號並將資料送至宮方登記表。實際服務內容與費用由宮方聯絡確認。</p>
            <ul><li>手機與電腦皆可使用</li><li>自動整理姓名、電話與服務需求</li><li>送出後顯示專屬報名編號</li></ul>
          </div>
          <form onSubmit={submit}>
            <div className="two"><label>姓名＊<input name="name" autoComplete="name" required /></label><label>聯絡電話＊<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label></div>
            <div className="two"><label>服務需求＊<select name="service" required defaultValue=""><option value="" disabled>請選擇</option>{services.map((item) => <option key={item[0]}>{item[0]}</option>)}<option>其他</option></select></label><label>方便聯絡時段<select name="contactTime"><option>15:00–17:00</option><option>17:00–19:00</option><option>19:00–21:00</option></select></label></div>
            <label>地址<input name="address" autoComplete="street-address" /></label>
            <label>填單內容或祈願事項＊<textarea name="details" rows={5} required /></label>
            <label className="agree"><input type="checkbox" required />我確認資料正確，並同意宮方為聯絡與宮務處理使用。</label>
            <button disabled={sending}>{sending ? '送出中…' : '送出資料'}</button>
            <p className="status" aria-live="polite">{status}</p>
          </form>
        </section>

        <section id="contact" className="contact section">
          <div className="heading"><span>CONTACT</span><h2>聯絡與交通</h2></div>
          <div className="contactGrid"><p><span>地址</span><strong>苗栗縣卓蘭鎮仁愛路14-1號</strong></p><p><span>電話</span><a href="tel:0425896101">04-25896101</a></p><p><span>營業時間</span><strong>下午3點至晚上9點</strong></p></div>
          <div className="actions"><a className="primary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=%E8%8B%97%E6%A0%97%E7%B8%A3%E5%8D%93%E8%98%AD%E9%8E%AE%E4%BB%81%E6%84%9B%E8%B7%AF14-1%E8%99%9F">開啟地圖</a><a className="secondary" href="tel:0425896101">立即撥打</a></div>
        </section>
      </main>

      <footer><strong>妙玄宮</strong><p>苗栗縣卓蘭鎮仁愛路14-1號・04-25896101</p><small>© {new Date().getFullYear()} 妙玄宮</small></footer>
    </>
  );
}
