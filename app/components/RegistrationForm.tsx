Exit code: 0
Wall time: 0.5 seconds
Output:
'use client';

import { FormEvent, useMemo, useState } from 'react';
import { pujaOptions } from '../site-data';

const registrationOptions = pujaOptions.slice(7);

const fixedPrices: Record<string, number | null> = {
  個人普渡供品: 1700,
  共同普渡桌: 3200,
  贊普功德: null,
  冤親債主: 1500,
  專超嬰靈: 1500,
  專超亡靈: 1500,
  各姓祖先: 1500,
  地基主: 1500,
  寵物亡靈: 1500,
  當日隨緣贊助功德主: null,
  志工報名: 0
};

type Selection = {
  quantity: number;
  customAmount: string;
};

type SubmissionResult = {
  totalNumber: string;
  systemId: string;
  itemNumbers: Array<{ service: string; itemNumber: string }>;
  totalAmount: number;
  pendingItems: string[];
  message?: string;
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat('zh-TW').format(amount);
}

export function RegistrationForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  const summary = useMemo(() => {
    let total = 0;
    const pending: string[] = [];

    for (const [service, selection] of Object.entries(selections)) {
      const price = fixedPrices[service];
      if (price === null) {
        const customAmount = Number(selection.customAmount);
        if (Number.isFinite(customAmount) && customAmount > 0) total += Math.round(customAmount);
        else pending.push(service);
      } else {
        total += price * selection.quantity;
      }
    }

    return { total, pending };
  }, [selections]);

  function toggleService(service: string, checked: boolean) {
    setSelections((current) => {
      if (checked) return { ...current, [service]: { quantity: 1, customAmount: '' } };
      const next = { ...current };
      delete next[service];
      return next;
    });
  }

  function updateSelection(service: string, changes: Partial<Selection>) {
    setSelections((current) => ({
      ...current,
      [service]: { ...current[service], ...changes }
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const items = Object.entries(selections).map(([service, selection]) => ({
      service,
      quantity: selection.quantity,
      customAmount: selection.customAmount
    }));

    if (!String(data.name || '').trim() || !String(data.phone || '').trim() || data.consent !== 'yes') {
      setStatus('請填寫姓名與聯絡電話，並勾選最下方的資料確認。');
      return;
    }

    if (items.length === 0) {
      setStatus('請至少選擇一個報名項目。');
      return;
    }

    setSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items })
      });
      const result = (await response.json()) as SubmissionResult;
      if (!response.ok) throw new Error(result.message || '送出失敗，請稍後再試。');

      const itemNumbers = result.itemNumbers
        .map((item) => `${item.service} ${item.itemNumber}`)
        .join('、');
      const pendingText = result.pendingItems.length
        ? `；${result.pendingItems.join('、')}的金額待宮方確認`
        : '';

      setStatus(
        `報名成功。總表編號 ${result.totalNumber}；${itemNumbers}；已知應付總額 NT$ ${formatAmount(result.totalAmount)}${pendingText}。`
      );
      form.reset();
      setSelections({});
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '送出失敗，請稍後再試。');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="two">
        <label>姓名＊<input name="name" autoComplete="name" required /></label>
        <label>聯絡電話＊<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></label>
      </div>

      <fieldset className="registrationItems">
        <legend>報名項目＊ <small>可一次複選多項</small></legend>
        <div className="itemChoices">
          {registrationOptions.map(([service, description]) => {
            const selection = selections[service];
            const isSelected = Boolean(selection);
            const acceptsCustomAmount = fixedPrices[service] === null;

            return (
              <div className={`choiceCard${isSelected ? ' selected' : ''}`} key={service}>
                <label className="choiceTop">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(event) => toggleService(service, event.target.checked)}
                  />
                  <span className="choiceText"><strong>{service}</strong><small>{description}</small></span>
                </label>
                {isSelected && (
                  <div className="choiceControls">
                    <label>
                      數量／份數
                      <input
                        aria-label={`${service} 數量`}
                        type="number"
                        min="1"
                        max="999"
                        value={selection.quantity}
                        onChange={(event) => updateSelection(service, {
                          quantity: Math.max(1, Math.min(999, Number(event.target.value) || 1))
                        })}
                      />
                    </label>
                    {acceptsCustomAmount && (
                      <label>
                        預計贊助金額（選填）
                        <input
                          aria-label={`${service} 金額`}
                          type="number"
                          min="1"
                          inputMode="numeric"
                          placeholder="未填則由宮方確認"
                          value={selection.customAmount}
                          onChange={(event) => updateSelection(service, { customAmount: event.target.value })}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>

      {Object.keys(selections).length > 0 && (
        <div className="paymentSummary" aria-live="polite">
          <span>已選 {Object.keys(selections).length} 個項目</span>
          <strong>已知應付總額 NT$ {formatAmount(summary.total)}</strong>
          {summary.pending.length > 0 && <small>{summary.pending.join('、')}的金額待宮方確認</small>}
        </div>
      )}

      <div className="two">
        <label>方便聯絡時段<select name="contactTime"><option>15:00–18:00</option><option>19:00–21:00</option></select></label>
        <label>地址<input name="address" autoComplete="street-address" /></label>
      </div>
      <label>超薦對象／供品處理／其他說明（選填）<textarea name="details" rows={5} placeholder="例如：超薦姓名、供品自行帶回、志工可參與日期等" /></label>
      <label className="agree"><input name="consent" value="yes" type="checkbox" />我確認資料正確，並同意宮方為法會聯絡及宮務處理使用。</label>
      <button disabled={sending}>{sending ? '資料送出中…' : '送出法會報名'}</button>
      <p className="status" aria-live="polite">{status}</p>
    </form>
  );
}

