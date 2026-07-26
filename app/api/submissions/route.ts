import { NextResponse } from 'next/server';

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxywEzIABRBNQCQrkbYuzi16wWEfdpnmy_RKzV8TLNoL8KNBZksjVDzy1ZZ8nO7hKaPfQ/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.service || !body.details) {
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
      填單內容: String(body.details),
      報名編號: String(body.reference || ''),
      建立時間: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    });

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params,
      redirect: 'follow'
    });

    if (!response.ok) throw new Error(`Upstream ${response.status}`);

    return NextResponse.json({ ok: true, reference: body.reference });
  } catch (error) {
    console.error('submission_error', error);
    return NextResponse.json(
      { ok: false, message: '系統暫時無法送出，請撥打 04-25896101 或 0977-336880。' },
      { status: 502 }
    );
  }
}
