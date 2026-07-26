import { NextResponse } from 'next/server';

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyP7zUFSAjwHEX38Y-ydjqnTWKLNewpEkg86fZnv4CqiAm36Q8Q2R9PPBcNdHYQ69swow/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.service || body.consent !== 'yes') {
      return NextResponse.json({ ok: false, message: '請完整填寫必填欄位。' }, { status: 400 });
    }

    const params = new URLSearchParams({
      __ping: '1',
      表單來源: '卓蘭妙玄宮中元普度報名網站',
      姓名: String(body.name),
      電話: String(body.phone),
      地址: String(body.address || ''),
      服務需求: String(body.service),
      數量份數: String(body.quantity || '1'),
      方便聯絡時段: String(body.contactTime || ''),
      填單內容: String(body.details || ''),
      報名編號: String(body.reference || ''),
      建立時間: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    });

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params,
      redirect: 'follow'
    });

    const upstreamText = await response.text();
    const isScriptError = upstreamText.includes('找不到以下指令碼函式') || upstreamText.includes('errorMessage');
    if (!response.ok || isScriptError) throw new Error(`Upstream ${response.status}: ${upstreamText.slice(0, 160)}`);

    try {
      const upstreamResult = JSON.parse(upstreamText);
      if (upstreamResult.ok === false) throw new Error(upstreamResult.message || 'Google Apps Script rejected submission');
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Some Apps Script versions return plain text on success.
      } else {
        throw error;
      }
    }

    return NextResponse.json({ ok: true, reference: body.reference });
  } catch (error) {
    console.error('submission_error', error);
    return NextResponse.json(
      { ok: false, message: '系統暫時無法送出，請撥打 04-25896101 或 0977-336880。' },
      { status: 502 }
    );
  }
}
