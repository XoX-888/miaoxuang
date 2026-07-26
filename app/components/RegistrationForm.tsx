'use client';

import { FormEvent, useMemo, useState } from 'react';
import { pujaOptions } from '../site-data';

const registrationOptions = pujaOptions.slice(7);

export function RegistrationForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<string>(registrationOptions[0][0]);
  const selectedInfo = useMemo(() => registrationOptions.find((item) => item[0] === selected)?.[1], [selected]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!String(data.name || '').trim() || !String(data.phone || '').trim() || data.consent !== 'yes') {
      setStatus('請填寫姓名與聯絡電話，並勾選最下方的資料確認。');
      return;
    }

    setSending(true);
    setStatus('');
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
      setSelected(registrationOptions[0][0]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '送出失敗，請稍後再試。');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="two"><label>姓名＊<input name="name" autoComplete="name" required /></label><label>聯絡電話＊<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label></div>
      <label>報名項目＊<select name="service" required value={selected} onChange={(event) => setSelected(event.target.value)}>{registrationOptions.map((item) => <option key={item[0]}>{item[0]}</option>)}</select><small>{selectedInfo}</small></label>
      <div className="two"><label>數量／份數<input name="quantity" type="number" min="1" defaultValue="1" /></label><label>方便聯絡時段<select name="contactTime"><option>15:00–18:00</option><option>19:00–21:00</option></select></label></div>
      <label>地址<input name="address" autoComplete="street-address" /></label>
      <label>超薦對象／供品處理／其他說明（選填）<textarea name="details" rows={5} placeholder="例如：超薦姓名、供品自行帶回、志工可參與日期等" /></label>
      <label className="agree"><input name="consent" value="yes" type="checkbox" />我確認資料正確，並同意宮方為法會聯絡及宮務處理使用。</label>
      <button disabled={sending}>{sending ? '資料送出中…' : '送出法會報名'}</button>
      <p className="status" aria-live="polite">{status}</p>
    </form>
  );
}

